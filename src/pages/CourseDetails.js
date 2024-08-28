import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Calendar, BookOpen } from 'lucide-react';

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const courseDoc = doc(db, 'courses', id);
      const courseSnapshot = await getDoc(courseDoc);
      if (courseSnapshot.exists()) {
        setCourse({ id: courseSnapshot.id, ...courseSnapshot.data() });
      }
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    );
  }

  if (!course) return <div className="text-center text-white">Course not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <button
        onClick={() => navigate('/courses')}
        className="mb-6 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Courses
      </button>

      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <img src={course.thumbnail} alt={course.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-400">{course.name}</h1>
          <p className="text-xl text-gray-300 mb-4">Instructor: {course.instructor}</p>
          <p className="text-gray-400 mb-6">{course.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <InfoItem icon={<Clock size={20} />} label="Duration" value={course.duration} />
            <InfoItem icon={<MapPin size={20} />} label="Location" value={course.location} />
            <InfoItem icon={<BookOpen size={20} />} label="Enrollment Status" value={course.enrollmentStatus} />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">Schedule:</h2>
            <div className="bg-gray-700 rounded-lg p-4">
              <InfoItem icon={<Calendar size={20} />} label="Days" value={course.schedule.split(',')[0]} />
              <InfoItem icon={<Clock size={20} />} label="Time" value={course.schedule.split(',')[1]} />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">Prerequisites:</h2>
            <ul className="list-disc list-inside text-gray-300">
              {course.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-400">Syllabus:</h2>
            <div className="space-y-4">
              {course.syllabus.map((item, index) => (
                <details key={index} className="bg-gray-700 rounded-lg p-4">
                  <summary className="font-semibold text-blue-300 cursor-pointer">
                    Week {item.week}: {item.topic}
                  </summary>
                  <p className="mt-2 text-gray-300">{item.content}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center text-gray-300">
    {icon}
    <span className="ml-2 font-semibold">{label}:</span>
    <span className="ml-2">{value}</span>
  </div>
);

export default CourseDetails;