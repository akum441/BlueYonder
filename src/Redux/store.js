import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import entitiesReducer from './entitiesSlice';
import paginationReducer from './paginationSlice';

const entitiesPersistConfig = {
  key: 'entities',
  storage,
};

const paginationPersistConfig = {
  key: 'pagination',
  storage,
};

const persistedEntitiesReducer = persistReducer(entitiesPersistConfig, entitiesReducer);
const persistedPaginationReducer = persistReducer(paginationPersistConfig, paginationReducer);

const store = configureStore({
  reducer: {
    entities: persistedEntitiesReducer,
    pagination: persistedPaginationReducer,
  },
});

export const persistor = persistStore(store);
export default store;
