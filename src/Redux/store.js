import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import entitiesReducer from './entitiesSlice';

const entitiesPersistConfig = {
  key: 'entities',
  storage,
};

const persistedEntitiesReducer = persistReducer(entitiesPersistConfig, entitiesReducer);

const store = configureStore({
  reducer: {
    entities: persistedEntitiesReducer,
  },
});

export const persistor = persistStore(store);
export default store;
