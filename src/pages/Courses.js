import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCourses, updateCourseLikes } from '../redux/coursesSlice';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Heart } from 'lucide-react';

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.list);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = courses.filter(course => 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedCourses(filtered);
    } else if (showAll) {
      setDisplayedCourses(courses);
    } else {
      setDisplayedCourses(courses.slice(0, 6));
    }
  }, [courses, searchTerm, showAll]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Available Courses</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by course name or instructor"
          className="w-full p-4 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {status === 'loading' ? (
        <LoadingSpinner />
      ) : status === 'failed' ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <>
          <AnimatePresence>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {displayedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>
          {!showAll && courses.length > 6 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                View All Courses
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(course.likes);
  const [isLiked, setIsLiked] = useState(false);
  const statusColors = {
    'Open': 'bg-green-500',
    'Closed': 'bg-red-500',
    'In Progress': 'bg-yellow-500'
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'courses', course.id), (doc) => {
      setLikes(doc.data().likes);
    });

    return () => unsubscribe();
  }, [course.id]);

  const handleLike = async () => {
    const newLikes = isLiked ? likes - 1 : likes + 1;
    setIsLiked(!isLiked);
    setLikes(newLikes);

    const courseRef = doc(db, 'courses', course.id);
    await updateDoc(courseRef, { likes: newLikes });
    dispatch(updateCourseLikes({ id: course.id, likes: newLikes }));
  };

  return (
    <motion.div 
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      whileHover={{
        rotateY: 5,
        rotateX: 5,
        scale: 1.05,
      }}
    >
      <img src={course.thumbnail} alt={course.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-blue-400">{course.name}</h2>
        <p className="text-gray-400 mb-4">Instructor: {course.instructor}</p>
        <p className="text-gray-300 mb-4">{course.description.substring(0, 100)}...</p>
        <div className="flex justify-between items-center mb-4">
          <Link 
            to={`/courses/${course.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
          >
            View Details
          </Link>
          <span className={`text-white px-2 py-1 rounded-full text-sm ${statusColors[course.enrollmentStatus]}`}>
            {course.enrollmentStatus}
          </span>
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors duration-300`}
          >
            <Heart className={`${isLiked ? 'fill-current' : ''}`} size={20} />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <motion.div
      className="border-t-4 border-blue-500 rounded-full w-16 h-16"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default Courses;