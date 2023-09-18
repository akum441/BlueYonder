
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  entitiesPerPage: 50,  // default value
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setEntitiesPerPage: (state, action) => {
      console.log("Setting entitiesPerPage:", action.payload);
      state.entitiesPerPage = action.payload;
    },
  },
});

export const {setCurrentPage, setEntitiesPerPage } = paginationSlice.actions;
export default paginationSlice.reducer;
