import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { authReducer } from './authSlice';
import { rolesPermissionsReducer } from './rolesPermissionsSlice';

// Dynamic import for storage to handle SSR
let storage: any;
if (typeof window !== 'undefined') {
  storage = require('redux-persist/lib/storage').default;
} else {
  // Create a noop storage for SSR
  storage = {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
}

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  rolesPermissions: rolesPermissionsReducer,
});

// Persist configuration (persist both auth and rolesPermissions slices)
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'rolesPermissions'],
};

// Create persisted root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;