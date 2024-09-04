# Course Listing Application

This project is a comprehensive course management system built with React, showcasing advanced front-end development techniques and integration with Firebase backend services.

![Screenshot 2024-09-04 172921](https://github.com/user-attachments/assets/65e2f28f-1739-4030-8fe5-d543c4808c20)


## Features

- **Course Listing**: Browse through a list of available courses with search functionality.
  ![Screenshot 2024-09-04 172940](https://github.com/user-attachments/assets/1be6836f-98e5-4ba6-a8b7-0f6f89a84241)
- **Course Details**: View detailed information about each course, including syllabus and prerequisites.
  ![Screenshot 2024-09-04 173052](https://github.com/user-attachments/assets/cff11ecb-0ed8-4d95-9441-14de9eb1a37a)
- **Student Dashboard**: Manage enrolled courses, track progress, and mark courses as completed.
  ![Screenshot 2024-09-04 173002](https://github.com/user-attachments/assets/b6a4ff92-e7b3-4277-b35a-c5353d64c3b6)
- **Real-time Updates**: Experience live updates for course likes and enrollment status changes.

## Technologies Used

- React
- Redux for state management
- Firebase (Firestore) for backend services
- React Router for navigation
- Framer Motion for animations
- Tailwind CSS for styling

## Pages

1. **Home**: Landing page with an overview of the application.
2. **Courses**: List of all available courses with search and filter options.
3. **Course Details**: Detailed view of a specific course with enrollment options.
4. **Student Dashboard**: Personal space for students to manage their enrolled courses.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```
   git clone git@github.com:prakash-aryan/course-listing-app.git
   ```

2. Navigate to the project directory:
   ```
   cd course-listing-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. Populate the Firebase database:
   - Ensure you have the necessary permissions in your Firebase project.
   - Run the population script:
     ```
     node populateFirebase.js
     ```

6. Start the development server:
   ```
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Deployment

This project is set up for easy deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments on push.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
