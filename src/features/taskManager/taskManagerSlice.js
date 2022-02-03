import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodoListFromAPI, getCompleteListFromAPI } from "./taskManagerAPI";

const initialState = {
  todoListIsLoading: false,
  todoList: [],
  completeListIsLoading: false,
  completeList: [],
};

export const initialTodoList = createAsyncThunk(
  "taskManager/getTodoListFromAPI",
  async () => {
    const response = await getTodoListFromAPI();
    return response.data;
  }
);

export const initialCompleteList = createAsyncThunk(
  "taskManager/getCompleteListFromAPI",
  async () => {
    const response = await getCompleteListFromAPI();
    return response.data;
  }
);

export const taskManagerSlice = createSlice({
  name: "taskManager",
  initialState,
  reducers: {
    addNewTodo: (state, action) => {
      state.todoList.push(action.payload);
    },
    deleteTodo: (state, action) => {
      let index = state.todoList.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index != -1) {
        state.todoList.splice(index, 1);
      }
    },
    addNewComplete: (state, action) => {
      state.completeList.push(action.payload);
    },
    deleteComplete: (state, action) => {
      let index = state.completeList.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index != -1) {
        state.completeList.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // initialTodoList case
      .addCase(initialTodoList.pending, (state) => {
        state.todoListIsLoading = true;
      })
      .addCase(initialTodoList.fulfilled, (state, action) => {
        state.todoListIsLoading = false;
        state.todoList = action.payload;
      })
      // initialCompleteList case
      .addCase(initialCompleteList.pending, (state) => {
        state.completeListIsLoading = true;
      })
      .addCase(initialCompleteList.fulfilled, (state, action) => {
        state.completeListIsLoading = false;
        state.completeList = action.payload;
      });
  },
});

export const { addNewTodo, deleteTodo, addNewComplete, deleteComplete } =
  taskManagerSlice.actions;

// Get value from state
export const getTodoList = (state) => state.taskManager.todoList;
export const getCompleteList = (state) => state.taskManager.completeList;
export const getTodoListIsLoading = (state) =>
  state.taskManager.todoListIsLoading;
export const getCompleteListIsLoading = (state) =>
  state.taskManager.completeListIsLoading;

export default taskManagerSlice.reducer;
