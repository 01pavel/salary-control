import { combineReducers } from 'redux';
import salaryReducer from './salary/reducer';

export default combineReducers({
  form: salaryReducer,
});
