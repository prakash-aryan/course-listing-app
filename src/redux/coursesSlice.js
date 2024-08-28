import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const coursesCollection = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesCollection);
    return coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    updateCourseLikes: (state, action) => {
      const { id, likes } = action.payload;
      const course = state.list.find(course => course.id === id);
      if (course) {
        course.likes = likes;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateCourseLikes } = coursesSlice.actions;
export default coursesSlice.reducer;