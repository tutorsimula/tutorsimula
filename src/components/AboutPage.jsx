import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
const founderPhoto = '/hari-krishna-chaitanya.jpg';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex flex-col pt-16">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-5xl mx-auto">
          {/* Page Title */}
          <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-8">
            About TutorSimula
          </h1>

          {/* Founder's Story with Photo */}
          <div className="mb-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
            <img 
            src={founderPhoto} alt="Hari Krishna Chaitanya" 
            className="w-48 h-48 rounded-full object-cover" />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-3xl font-bold text-white text-center md:text-left mb-6">
                Our Founder’s Story
              </h2>
              <p className="text-gray-300 text-lg text-center md:text-left">
                TutorSimula was founded by Hari Krishna Chaitanya, a passionate educator with over 17 years of experience in teaching and mentoring students. Having witnessed the challenges students face in accessing quality education, Hari envisioned a platform that leverages AI to provide personalized, empathetic, and accessible learning experiences for students of all ages. His mission is to bridge the gap in education and empower learners worldwide through innovative technology.
              </p>
            </div>
          </div>

          {/* New Section: Impact on EdTech and Students */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              How TutorSimula is Going to Change the World's EdTech Market and Students' Lives
            </h2>
            <p className="text-gray-300 text-lg text-center mb-4">
              TutorSimula is poised to revolutionize the global EdTech landscape by introducing an AI-powered avatar-based tutoring system that redefines how education is delivered and experienced. Our vision goes beyond traditional learning—we aim to create a world where every student thrives through personalized education and emotional support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Transforming EdTech with AI Innovation</h3>
                <p className="text-gray-400">
                  Our cutting-edge AI adapts to each student’s learning style and pace, offering tailored lessons that traditional EdTech platforms can’t match. This scalability ensures millions of students worldwide can access high-quality education.
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Making Education Accessible</h3>
                <p className="text-gray-400">
                  By offering affordable, multilingual support and offline capabilities, TutorSimula breaks down geographic and economic barriers, bringing quality education to underserved communities globally.
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Enhancing Student Outcomes</h3>
                <p className="text-gray-400">
                  Personalized learning paths and real-time feedback improve retention and academic performance, empowering students to excel in school and beyond.
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Supporting Emotional Growth</h3>
                <p className="text-gray-400">
                  Our empathetic AI avatars provide emotional support, reducing stress and building confidence, ensuring students’ mental well-being is as prioritized as their academic success.
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-lg text-center mt-6">
              TutorSimula isn’t just changing education—it’s changing lives. By equipping students with the tools to succeed academically and emotionally, we’re shaping a future where every learner can reach their full potential.
            </p>
          </div>

          {/* Mission and Vision */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Our Mission & Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Our Mission</h3>
                <p className="text-gray-400">
                  Transform education with AI-driven, personalized learning for all.
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Our Vision</h3>
                <p className="text-gray-400">
                  Build a global community of lifelong learners.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
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

export default AboutPage;