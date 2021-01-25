import { createStore } from 'redux';
import rootReducer from './rootReducer';

export const store = ((window as any).devToolsExtension
  ? (window as any).devToolsExtension()(createStore)
  : createStore)(rootReducer);
