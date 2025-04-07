import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import NavBar from './NavBar';
import tutorsimulaLogo from '../tutorsimula-logo.png';
import tutorsimulaLogoPurple from '../tutorsimula-logo-purple.png';

const LaunchPage = () => {
  console.log('LaunchPage component rendering');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    console.log('Checking if styles are loaded:', document.styleSheets);
  }, []);

  // State for Sign Up form
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  // State for Sign In form
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [showSignInForm, setShowSignInForm] = useState(false);

  // Refs for form sections and fields
  const formSectionRef = useRef(null);
  const signUpNameRef = useRef(null);
  const signUpUsernameRef = useRef(null);
  const signUpPasswordRef = useRef(null);
  const signInUsernameRef = useRef(null);
  const signInPasswordRef = useRef(null);

  // Handle navigation state to show forms
  useEffect(() => {
    if (state?.showSignIn) {
      setShowSignInForm(true);
      setShowSignUpForm(false);
      setTimeout(() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (state?.showSignUp) {
      setShowSignUpForm(true);
      setShowSignInForm(false);
      setTimeout(() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [state]);

  // Clear Sign Up form fields when opened
  useEffect(() => {
    if (showSignUpForm) {
      setSignUpName('');
      setSignUpUsername('');
      setSignUpPassword('');
      setSignUpError('');
      if (signUpNameRef.current) signUpNameRef.current.value = '';
      if (signUpUsernameRef.current) signUpUsernameRef.current.value = '';
      if (signUpPasswordRef.current) signUpPasswordRef.current.value = '';
      setTimeout(() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [showSignUpForm]);

  // Clear Sign In form fields when opened
  useEffect(() => {
    if (showSignInForm) {
      setSignInUsername('');
      setSignInPassword('');
      setSignInError('');
      if (signInUsernameRef.current) signInUsernameRef.current.value = '';
      if (signInPasswordRef.current) signInPasswordRef.current.value = '';
      setTimeout(() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [showSignInForm]);

  // Generate random name for fields to prevent autofill
  const generateRandomName = () => `field-${Math.random().toString(36).substring(2, 15)}`;

  // Handle Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    if (signUpUsername && signUpPassword && signUpName) {
      try {
        console.log('Attempting sign-up with:', { signUpUsername, signUpPassword, signUpName });
        const success = signUp(signUpUsername, signUpPassword, signUpName);
        console.log('Sign-up result:', success);
        if (success) {
          setSignUpUsername('');
          setSignUpPassword('');
          setSignUpName('');
          setSignUpError('');
          setShowSignUpForm(false);
          navigate('/profile');
        } else {
          setSignUpError('Sign-up failed unexpectedly');
        }
      } catch (error) {
        console.error('Sign-up error:', error);
        setSignUpError(error.message || 'Sign up failed');
      }
    } else {
      setSignUpError('Please fill in all fields');
    }
  };

  // Handle Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    if (signInUsername && signInPassword) {
      try {
        console.log('Attempting sign-in with:', { signInUsername, signInPassword });
        const success = signIn(signInUsername, signInPassword);
        console.log('Sign-in result:', success);
        if (success) {
          setSignInUsername('');
          setSignInPassword('');
          setSignInError('');
          setShowSignInForm(false);
          navigate('/profile');
        } else {
          setSignInError('Invalid username or password');
        }
      } catch (error) {
        console.error('Sign-in error:', error);
        setSignInError(error.message || 'Invalid username or password');
      }
    } else {
      setSignInError('Please fill in all fields');
    }
  };

  // Handle Start Coding Now button
  const handleStartCoding = () => {
    setShowSignUpForm(true);
    setShowSignInForm(false);
    setTimeout(() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // Handle Continue Coding button
  const handleContinueCoding = () => {
    navigate('/code-editor');
  };

  // Toggle to Sign In form
  const toggleToSignIn = () => {
    setShowSignUpForm(false);
    setShowSignInForm(true);
    setTimeout(() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // Clear field on focus if autofilled
  const handleFocusClear = (ref, setter) => {
    if (ref.current && ref.current.value !== '') {
      ref.current.value = '';
      setter('');
    }
  };

  // Reset Sign Up form when closing
  const handleCancelSignUp = () => {
    setSignUpUsername('');
    setSignUpPassword('');
    setSignUpName('');
    setSignUpError('');
    setShowSignUpForm(false);
  };

  // Reset Sign In form when closing
  const handleCancelSignIn = () => {
    setSignInUsername('');
    setSignInPassword('');
    setSignInError('');
    setShowSignInForm(false);
  };

  // Check if a user has ever signed up
  const hasUserSignedUp = user || localStorage.getItem('hasSignedUp') === 'true';

  useEffect(() => {
    if (user) localStorage.setItem('hasSignedUp', 'true');
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex flex-col" style={{ display: 'flex', minHeight: '100vh' }}>
      <NavBar />
      <div className="flex-1 flex flex-col items-center px-6 py-8 pt-20">
        <div className="w-full max-w-5xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="./tutorsimula-logo.png"
              alt="TutorSimula Logo"
              className="max-w-xs w-full h-auto shadow-glow-white"
              onError={(e) => {
                console.error('Image failed to load');
                e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
              }}
            />
          </div>

          {/* Catchy Headline */}
          <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-6">
            Revolutionize Your Learning with AI-Powered Tutoring
          </h1>

          {/* Mission and Vision */}
          <div className="text-center mb-8">
            <p className="text-lg font-semibold text-gray-200">
              Our Mission: Transform education with AI-driven, personalized learning for all.
            </p>
            <p className="text-lg font-semibold text-gray-200">
              Our Vision: Build a global community of lifelong learners.
            </p>
          </div>

          {/* Brief Company Overview */}
          <p className="text-center text-gray-300 text-lg mb-10">
            TutorSimula uses empathetic AI avatars to deliver personalized, interactive learning
            experiences for students of all ages—anytime, anywhere.
          </p>

          {/* Key USPs */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Why Choose TutorSimula?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-800 rounded-lg p-6">
              <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold text-gray-200">Your Personal AI Tutor</h3>
                <p className="text-gray-400">Adaptive learning tailored just for you.</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold text-gray-200">Empathetic Avatars</h3>
                <p className="text-gray-400">Feel supported with emotional intelligence.</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold text-gray-200">Learn Anytime, Anywhere</h3>
                <p className="text-gray-400">High-quality education at your fingertips.</p>
              </div>
            </div>
          </div>

          {/* Founder's Story */}
          <div className="text-center mb-12">
            <p className="text-gray-300 text-lg mb-4">
              Founded by Hari Krishna Chaitanya, a passionate educator with 17 years of experience,
              TutorSimula is on a mission to make quality education accessible to every learner.
            </p>
            <button
              onClick={() => navigate('/about')}
              className="text-blue-400 hover:underline text-lg font-semibold"
            >
              Learn More
            </button>
          </div>

          {/* Program Teaser */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Programs for Every Learner</h2>
            <p className="text-gray-300 text-lg mb-4">
              From Early Starters for young minds to JEE Champs for exam success, we’ve got a
              program for every learner.
            </p>
            <button
              onClick={() => navigate('/programs')}
              className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:from-green-700 hover:to-green-900 transform hover:scale-105 transition-all duration-300 shadow-glow-green"
            >
              Explore Programs
            </button>
          </div>

          {/* Call-to-Action */}
          <div className="text-center mb-12">
            {user ? (
              <button
                onClick={handleContinueCoding}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-glow-blue"
              >
                Continue Coding
              </button>
            ) : (
              <button
                onClick={handleStartCoding}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-glow-blue"
              >
                Start Coding Now
              </button>
            )}
          </div>

          {/* Sign Up / Sign In Form Section */}
          {(showSignInForm || showSignUpForm) && (
            <div ref={formSectionRef} className="w-full max-w-md mx-auto px-6 py-8">
              {showSignInForm ? (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold text-white mb-4 text-center">Sign In</h2>
                  <form onSubmit={handleSignIn}>
                    <div className="mb-4">
                      <label htmlFor="signInUsername" className="block text-gray-300 mb-2">
                        Username
                      </label>
                      <input
                        ref={signInUsernameRef}
                        type="text"
                        id="signInUsername"
                        name={generateRandomName()}
                        autoComplete="new-username"
                        value={signInUsername}
                        onChange={(e) => setSignInUsername(e.target.value)}
                        onFocus={() => handleFocusClear(signInUsernameRef, setSignInUsername)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="signInPassword" className="block text-gray-300 mb-2">
                        Password
                      </label>
                      <input
                        ref={signInPasswordRef}
                        type="password"
                        id="signInPassword"
                        name={generateRandomName()}
                        autoComplete="new-password"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        onFocus={() => handleFocusClear(signInPasswordRef, setSignInPassword)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                        placeholder="Enter your password"
                      />
                    </div>
                    {signInError && (
                      <p className="text-red-500 text-sm mb-4 text-center">{signInError}</p>
                    )}
                    <div className="flex justify-center space-x-4">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-glow-blue"
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelSignIn}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transform hover:scale-105 transition-all duration-300 shadow-glow-gray"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold text-white mb-4 text-center">Sign Up</h2>
                  <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                      <label htmlFor="signUpName" className="block text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        ref={signUpNameRef}
                        type="text"
                        id="signUpName"
                        name="signup-name"
                        autoComplete="off-name"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="signUpUsername" className="block text-gray-300 mb-2">
                        Username
                      </label>
                      <input
                        ref={signUpUsernameRef}
                        type="text"
                        id="signUpUsername"
                        name="signup-username"
                        autoComplete="new-username"
                        value={signUpUsername}
                        onChange={(e) => setSignUpUsername(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                        placeholder="Choose a username"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="signUpPassword" className="block text-gray-300 mb-2">
                        Password
                      </label>
                      <input
                        ref={signUpPasswordRef}
                        type="password"
                        id="signUpPassword"
                        name="signup-password"
                        autoComplete="new-password"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                        placeholder="Choose a password"
                      />
                    </div>
                    {signUpError && (
                      <p className="text-red-500 text-sm mb-4 text-center">{signUpError}</p>
                    )}
                    <div className="flex justify-center space-x-4">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-900 transform hover:scale-105 transition-all duration-300 shadow-glow-green"
                      >
                        Sign Up
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelSignUp}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transform hover:scale-105 transition-all duration-300 shadow-glow-gray"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                  {hasUserSignedUp && (
                    <p className="text-gray-400 text-sm mt-4 text-center">
                      Already Registered User?{' '}
                      <button
                        onClick={toggleToSignIn}
                        className="text-blue-400 hover:underline focus:outline-none"
                      >
                        Sign In
                      </button>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchPage;