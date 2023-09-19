// Esse reducer será responsável por tratar as informações da pessoa usuária

import { AnyAction } from 'redux';
import UserType from '../types';

const INITIAL_STATE: UserType = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case 'STORE_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
