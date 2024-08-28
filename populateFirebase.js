require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getRandomLikes = () => Math.floor(Math.random() * 1000) + 1;

const getNextDueDate = (startDate, index) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + index * 7); // Add 7 days for each course
  return date.toISOString().split('T')[0];
};

const courses = [
  {
    name: 'Introduction to React Native',
    instructor: 'John Doe',
    description: 'Learn the basics of React Native development and build your first mobile app.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to React Native',
        content: 'Overview of React Native, setting up your development environment.'
      },
      {
        week: 2,
        topic: 'Building Your First App',
        content: 'Creating a simple mobile app using React Native components.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 0),
    likes: getRandomLikes()
  },
  {
    name: 'Advanced JavaScript Concepts',
    instructor: 'Jane Smith',
    description: 'Deep dive into advanced JavaScript concepts and modern ES6+ features.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    duration: '10 weeks',
    schedule: 'Mondays and Wednesdays, 7:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['Intermediate JavaScript knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'ES6+ Features',
        content: 'Arrow functions, destructuring, spread/rest operators.'
      },
      {
        week: 2,
        topic: 'Asynchronous JavaScript',
        content: 'Promises, async/await, and error handling.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 1),
    likes: getRandomLikes()
  },
  {
    name: 'Python for Data Science',
    instructor: 'Alex Johnson',
    description: 'Learn Python programming with a focus on data science applications.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    duration: '12 weeks',
    schedule: 'Tuesdays and Fridays, 6:30 PM - 8:30 PM',
    location: 'Hybrid',
    prerequisites: ['Basic programming knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Python Basics',
        content: 'Variables, data types, control structures.'
      },
      {
        week: 2,
        topic: 'Data Manipulation with Pandas',
        content: 'Introduction to Pandas library for data analysis.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 2),
    likes: getRandomLikes()
  },
  {
    name: 'UI/UX Design Fundamentals',
    instructor: 'Emily Chen',
    description: 'Master the principles of user interface and user experience design.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    duration: '6 weeks',
    schedule: 'Saturdays, 10:00 AM - 2:00 PM',
    location: 'In-person',
    prerequisites: ['None'],
    syllabus: [
      {
        week: 1,
        topic: 'Design Thinking',
        content: 'Introduction to the design thinking process.'
      },
      {
        week: 2,
        topic: 'Wireframing and Prototyping',
        content: 'Creating low-fidelity wireframes and interactive prototypes.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 3),
    likes: getRandomLikes()
  },
  {
    name: 'Machine Learning Basics',
    instructor: 'Dr. Michael Brown',
    description: 'Introduction to machine learning algorithms and their applications.',
    enrollmentStatus: 'Closed',
    thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80',
    duration: '10 weeks',
    schedule: 'Thursdays, 6:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['Python programming', 'Basic statistics'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to ML',
        content: 'Overview of machine learning and its types.'
      },
      {
        week: 2,
        topic: 'Supervised Learning',
        content: 'Linear regression and classification algorithms.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 4),
    likes: getRandomLikes()
  },
  {
    name: 'Full Stack Web Development',
    instructor: 'Sarah Davis',
    description: 'Comprehensive course covering both front-end and back-end web development.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
    duration: '16 weeks',
    schedule: 'Mondays and Wednesdays, 6:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['Basic HTML, CSS, and JavaScript'],
    syllabus: [
      {
        week: 1,
        topic: 'Front-end Basics',
        content: 'Advanced HTML5 and CSS3 techniques.'
      },
      {
        week: 2,
        topic: 'JavaScript and DOM Manipulation',
        content: 'Working with the Document Object Model.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 5),
    likes: getRandomLikes()
  },
  {
    name: 'Cybersecurity Essentials',
    instructor: 'Robert Wilson',
    description: 'Learn the fundamentals of cybersecurity and network protection.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 7:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['Basic networking knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Cybersecurity',
        content: 'Overview of cybersecurity landscape and common threats.'
      },
      {
        week: 2,
        topic: 'Network Security',
        content: 'Firewalls, IDS/IPS, and VPNs.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 6),
    likes: getRandomLikes()
  },
  {
    name: 'Digital Marketing Strategies',
    instructor: 'Lisa Thompson',
    description: 'Comprehensive guide to modern digital marketing techniques and tools.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1715&q=80',
    duration: '6 weeks',
    schedule: 'Wednesdays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['None'],
    syllabus: [
      {
        week: 1,
        topic: 'Digital Marketing Overview',
        content: 'Introduction to various digital marketing channels.'
      },
      {
        week: 2,
        topic: 'Search Engine Optimization (SEO)',
        content: 'Basics of SEO and improving website visibility.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 7),
    likes: getRandomLikes()
  },
  {
    name: 'Mobile App Design',
    instructor: 'Chris Lee',
    description: 'Learn to design intuitive and attractive mobile app interfaces.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    duration: '8 weeks',
    schedule: 'Mondays and Fridays, 5:00 PM - 7:00 PM',
    location: 'Hybrid',
    prerequisites: ['Basic design skills'],
    syllabus: [
      {
        week: 1,
        topic: 'Mobile Design Principles',
        content: 'Understanding mobile-first design approach.'
      },
      {
        week: 2,
        topic: 'Prototyping for Mobile',
        content: 'Creating interactive prototypes for mobile apps.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 8),
    likes: getRandomLikes()
  },
  {
    name: 'Blockchain Fundamentals',
    instructor: 'Daniel White',
    description: 'Explore the basics of blockchain technology and its applications.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1621579429549-c4428b34cd60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    duration: '6 weeks',
    schedule: 'Thursdays, 7:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['Basic understanding of cryptography'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Blockchain',
        content: 'Understanding the core concepts of blockchain technology.'
      },
      {
        week: 2,
        topic: 'Cryptocurrencies',
        content: 'Exploring Bitcoin and other popular cryptocurrencies.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 9),
    likes: getRandomLikes()
  },
  {
    name: 'Cloud Computing Essentials',
    instructor: 'Jessica Martinez',
    description: 'Get started with cloud computing concepts and popular platforms.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
    duration: '10 weeks',
    schedule: 'Tuesdays and Thursdays, 6:30 PM - 8:30 PM',
    location: 'Online',
    prerequisites: ['Basic IT knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Cloud Computing',
        content: 'Understanding cloud services and deployment models.'
      },
      {
        week: 2,
        topic: 'Amazon Web Services (AWS) Basics',
        content: 'Introduction to AWS and its core services.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 10),
    likes: getRandomLikes()
  },
  {
    name: 'Data Visualization with D3.js',
    instructor: 'Mark Anderson',
    description: 'Learn to create interactive and compelling data visualizations using D3.js.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    duration: '8 weeks',
    schedule: 'Wednesdays and Fridays, 7:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['JavaScript, HTML, and CSS knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to D3.js',
        content: 'Setting up D3.js and creating basic charts.'
      },
      {
        week: 2,
        topic: 'Interactive Visualizations',
        content: 'Adding interactivity to data visualizations.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 11),
    likes: getRandomLikes()
  },
  {
    name: 'Artificial Intelligence Ethics',
    instructor: 'Dr. Samantha Lee',
    description: 'Explore the ethical considerations in AI development and deployment.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    duration: '6 weeks',
    schedule: 'Mondays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['Basic understanding of AI concepts'],
    syllabus: [
      {
        week: 1,
        topic: 'AI and Society',
        content: 'Understanding the impact of AI on various aspects of society.'
      },
      {
        week: 2,
        topic: 'Bias in AI Systems',
        content: 'Exploring sources of bias in AI and mitigation strategies.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 12),
    likes: getRandomLikes()
  },
  {
    name: 'Game Development with Unity',
    instructor: 'Tyler Greene',
    description: 'Learn to create 2D and 3D games using the Unity game engine.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    duration: '12 weeks',
    schedule: 'Saturdays, 10:00 AM - 1:00 PM',
    location: 'Hybrid',
    prerequisites: ['Basic C# programming'],
    syllabus: [
      {
        week: 1,
        topic: 'Unity Basics',
        content: 'Introduction to Unity interface and project setup.'
      },
      {
        week: 2,
        topic: '2D Game Development',
        content: 'Creating sprite-based 2D games in Unity.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 13),
    likes: getRandomLikes()
  },
  {
    name: 'Natural Language Processing',
    instructor: 'Dr. Alan Turing',
    description: 'Dive into the world of NLP and learn to process and analyze human language.',
    enrollmentStatus: 'Closed',
    thumbnail: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    duration: '10 weeks',
    schedule: 'Tuesdays and Thursdays, 7:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['Python programming', 'Basic machine learning knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to NLP',
        content: 'Overview of NLP tasks and applications.'
      },
      {
        week: 2,
        topic: 'Text Preprocessing',
        content: 'Tokenization, stemming, and lemmatization techniques.'
      },
    ],
    dueDate: getNextDueDate('2024-12-20', 14),
    likes: getRandomLikes()
  }
];

async function populateDatabase() {
  const coursesCollection = collection(db, 'courses');
  
  for (const course of courses) {
    try {
      await addDoc(coursesCollection, course);
      console.log(`Added course: ${course.name}`);
    } catch (error) {
      console.error(`Error adding course ${course.name}:`, error);
    }
  }
}

populateDatabase();