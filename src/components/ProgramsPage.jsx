import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const ProgramsPage = () => {
  const navigate = useNavigate();
  const programs = [
    { title: 'Early Starters – Little Steps to Big Dreams', description: 'Ignite curiosity in young learners (LKG-1st Grade) with interactive English, Math, and Science lessons powered by AI avatars.' },
    { title: 'JEE Champs – JEE Made Easy', description: 'Master JEE with personalized coaching, real-time feedback, and AI-driven problem-solving strategies.' },
    { title: 'NEET Nexus – Unlock NEET Potential', description: 'Excel in NEET with tailored lessons and exam strategies delivered by empathetic AI tutors.' },
    { title: 'Special Start – Where Everyone Shines', description: 'Empower students with special needs through adaptive, inclusive learning plans designed for success.' },
    { title: 'Linguistic Lab – Break Language Barriers', description: 'Learn languages like English, Hindi, or Spanish with immersive, avatar-led courses for all ages.' },
    { title: 'DevDeck – Where Developers Grow', description: 'Build coding skills in Python, AI, and more with hands-on projects and expert AI mentorship.' },
    { title: 'Excelerate – Accelerate Your Career', description: 'Gain high-demand skills like Data Science and Digital Marketing with AI-crafted career paths.' },
    { title: 'VedaGyan – Journey Through Wisdom', description: 'Explore Vedic Mathematics, Sanskrit, and Yoga with AI-enhanced lessons blending tradition and tech.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 pt-16">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-8">
            Our Programs
          </h1>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Empowering Every Learner with Future-Ready Programs
            </h2>
            <p className="text-gray-300 text-lg text-center mb-6">
              Discover how TutorSimula’s AI-powered tutoring transforms education for students of all ages and aspirations. More innovative programs are under development—stay tuned!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((program, index) => (
                <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">{program.title}</h3>
                  <p className="text-gray-400">{program.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-glow-blue"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;