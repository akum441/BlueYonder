// entitiesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: [],
  loading: false,
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
      state.loading = false;
    },
  },
});

export const { startLoading, entitiesFetched } = entitiesSlice.actions;
export default entitiesSlice.reducer;
