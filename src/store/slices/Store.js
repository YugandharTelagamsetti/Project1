// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { projectDetailsReducer } from './ProjectDetailsSlice';

// Combine reducers
const rootReducer = combineReducers({
  projectDetails: projectDetailsReducer,
  // Add other modules if needed
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
