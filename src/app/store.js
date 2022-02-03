import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
import taskManagerSlice from "../features/taskManager/taskManagerSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    taskManager: taskManagerSlice,
  },
});
