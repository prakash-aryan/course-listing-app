import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [openCourses, setOpenCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = "101"; // Hardcoded for this example

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const coursesRef = collection(db, 'courses');
      const enrolledQuery = query(coursesRef, where("enrollmentStatus", "==", "In Progress"));
      const completedQuery = query(coursesRef, where("enrollmentStatus", "==", "Completed"));
      const openQuery = query(coursesRef, where("enrollmentStatus", "==", "Open"));

      const [enrolledSnapshot, completedSnapshot, openSnapshot] = await Promise.all([
        getDocs(enrolledQuery),
        getDocs(completedQuery),
        getDocs(openQuery)
      ]);

      setEnrolledCourses(enrolledSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        progress: Math.floor(Math.random() * 101)
      })));
      setCompletedCourses(completedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setOpenCourses(openSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const updateCourseStatus = async (courseId, newStatus) => {
    const courseRef = doc(db, 'courses', courseId);
    await updateDoc(courseRef, { enrollmentStatus: newStatus });
    toast.success(`Course marked as ${newStatus}`);
    
    // Refetch courses to update all sections
    const coursesRef = collection(db, 'courses');
    const [enrolledSnapshot, completedSnapshot, openSnapshot] = await Promise.all([
      getDocs(query(coursesRef, where("enrollmentStatus", "==", "In Progress"))),
      getDocs(query(coursesRef, where("enrollmentStatus", "==", "Completed"))),
      getDocs(query(coursesRef, where("enrollmentStatus", "==", "Open")))
    ]);

    setEnrolledCourses(enrolledSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      progress: Math.floor(Math.random() * 101)
    })));
    setCompletedCourses(completedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setOpenCourses(openSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Student Dashboard</h1>
      
      <CourseSection 
        title="My Enrolled Courses" 
        courses={enrolledCourses} 
        onUpdateStatus={(id) => updateCourseStatus(id, 'Completed')}
        buttonText="Mark as Completed"
        bgColor="bg-blue-900"
      />

      <CourseSection 
        title="Completed Courses" 
        courses={completedCourses} 
        onUpdateStatus={(id) => updateCourseStatus(id, 'In Progress')}
        buttonText="Mark as Incomplete"
        bgColor="bg-green-900"
      />

      <CourseSection 
        title="Open Courses" 
        courses={openCourses} 
        onUpdateStatus={(id) => updateCourseStatus(id, 'In Progress')}
        buttonText="Enroll"
        bgColor="bg-purple-900"
      />
    </div>
  );
};

const CourseSection = ({ title, courses, onUpdateStatus, buttonText, bgColor }) => (
  <section className={`mb-8 p-4 rounded-lg ${bgColor}`}>
    <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence>
        {courses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onUpdateStatus={onUpdateStatus}
            buttonText={buttonText}
          />
        ))}
      </AnimatePresence>
    </div>
  </section>
);

const CourseCard = ({ course, onUpdateStatus, buttonText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <img src={course.thumbnail} alt={course.name} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-400">{course.name}</h3>
        <p className="text-sm text-gray-400 mb-2">Instructor: {course.instructor}</p>
        <p className="text-sm text-gray-400 mb-2">Due Date: {course.dueDate}</p>
        {course.progress !== undefined && (
          <div className="mb-2">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-right text-xs text-gray-400 mt-1">{course.progress}% Complete</p>
          </div>
        )}
        <button
          onClick={() => onUpdateStatus(course.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded transition duration-300"
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;