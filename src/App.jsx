import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LaunchPage from './components/LaunchPage';
import AboutPage from './components/AboutPage';
import ProgramsPage from './components/ProgramsPage';
import HelpPage from './components/HelpPage';
import ProfilePage from './components/ProfilePage';
import CodeEditorComingSoon from './components/CodeEditorComingSoon'; // New import
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LaunchPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/code-editor" element={<ProtectedRoute><CodeEditorComingSoon /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
);

export default App;