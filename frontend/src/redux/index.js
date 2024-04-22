import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';  // Vérifie que le chemin est correct

const rootReducer = combineReducers({
  auth: authReducer,
  // Ajoute d'autres reducers ici si nécessaire
});

export default rootReducer;