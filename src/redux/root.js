import {randomUserAPI} from '../api/api';

const GET_USERS = 'GET_USERS'
const FILTER_USERS = 'FILTER_USERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const CHANGE_FILTER = 'CHANGE_FILTER'
const DELETE_FAVORITE_USER = 'DELETE_FAVORITE_USER'
const SET_CURRENT_USER = 'SET_CURRENT_USER'
const ADD_FAVORITES = 'ADD_FAVORITES'
const TOGGLE_FAVORITE_BACKGROUND = 'TOGGLE_FAVORITE_BACKGROUND'

const initialState = {
  users: [],
  groups: [],
  filteredUsers: [],
  isFetching: false,
  filter: '',
  favorites: [],
  currentUser: {},
  favoriteBackground: false
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.payload}
    case FILTER_USERS:
      return {
        ...state, filteredUsers: state.users.filter(user => {
          const fullName = user.name.first + user.name.last
          return fullName.toLowerCase().includes(action.payload.toLowerCase())
        })
      }
    case TOGGLE_IS_FETCHING:
      return {...state, isFetching: action.payload}
    case CHANGE_FILTER:
      return {...state, filter: action.payload}
    case DELETE_FAVORITE_USER:
      return {...state, favorites: state.favorites.filter(u => u.login.uuid !== action.payload.id)}
    case SET_CURRENT_USER:
      return {...state, currentUser: action.payload}
    case ADD_FAVORITES:
      return {...state, favorites: [...state.favorites, action.payload]}
    case TOGGLE_FAVORITE_BACKGROUND:
      return {...state, favoriteBackground: action.payload}
    default:
      return state
  }
}

export const filterUsers = (payload) => ({type: FILTER_USERS, payload})
export const setFilter = (payload) => ({type: CHANGE_FILTER, payload})
export const deleteFavoriteUser = (payload) => ({type: DELETE_FAVORITE_USER, payload})
export const setCurrentUser = (payload) => ({type: SET_CURRENT_USER, payload})
export const addFavorites = (payload) => ({type: ADD_FAVORITES, payload})
export const toggleFavoriteBackground = (payload) => ({type: TOGGLE_FAVORITE_BACKGROUND, payload})
const getUsersSuccess = (payload) => ({type: GET_USERS, payload})
const toggleFetching = (payload) => ({type: TOGGLE_IS_FETCHING, payload})

export const getUsers = () => async dispatch => {
  dispatch(toggleFetching(true))
  const users = await randomUserAPI.getUsers()
  dispatch(getUsersSuccess(users))
  dispatch(toggleFetching(false))
}

export default rootReducer
