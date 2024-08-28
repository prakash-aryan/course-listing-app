import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-5xl font-bold mb-4 text-blue-400">Welcome to CourseHub</h1>
        <motion.div
          className="w-64 h-64 mx-auto my-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <CourseHubLogo />
        </motion.div>
        <p className="text-xl mb-8 text-gray-300">Explore our wide range of courses and enhance your skills! Join thousands of learners and start your journey today.</p>
        <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 inline-block">
          Browse Courses
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4">
        <FeatureCard 
          icon="🚀"
          title="Learn at Your Pace"
          description="Access course materials anytime, anywhere. Learn at a schedule that suits you best."
        />
        <FeatureCard 
          icon="👨‍🏫"
          title="Expert Instructors"
          description="Learn from industry professionals with years of experience in their fields."
        />
        <FeatureCard 
          icon="🏆"
          title="Earn Certificates"
          description="Gain recognized certifications upon completion to boost your resume."
        />
      </div>
    </div>
  );
};

const CourseHubLogo = () => (
  <motion.svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <motion.path
      d="M100 20 L180 50 L180 150 L100 180 L20 150 L20 50 Z"
      fill="none"
      stroke="#60A5FA"
      strokeWidth="4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.path
      d="M100 20 L100 180"
      stroke="#60A5FA"
      strokeWidth="4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
    />
    <motion.path
      d="M20 50 L180 50"
      stroke="#60A5FA"
      strokeWidth="4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
    />
    <motion.circle
      cx="100"
      cy="100"
      r="30"
      fill="#60A5FA"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 1.5 }}
    />
  </motion.svg>
);

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-blue-400">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default Home;