import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: [],
  loading: false,
  currentPage: 1,
  entitiesPerPage: 50,
  totalPages: null,
};

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    entitiesFetched: (state, action) => {
      state.entities = action.payload;
      state.totalPages = Math.ceil(state.entities.length / state.entitiesPerPage);
      state.loading = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setEntitiesPerPage: (state, action) => {
      state.entitiesPerPage = action.payload;
      state.totalPages = Math.ceil(state.entities.length / state.entitiesPerPage);
    },
  },
});

export const { startLoading, entitiesFetched, setCurrentPage, setEntitiesPerPage } = entitiesSlice.actions;
export default entitiesSlice.reducer;
