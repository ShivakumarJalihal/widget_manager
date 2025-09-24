import { configureStore } from '@reduxjs/toolkit';
import widgetsReducer from './features/widgetsSlice';

const store = configureStore({
  reducer: { widgets: widgetsReducer },
});

export default store;
