import React from 'react'
import styles from './UserCard.module.scss'
import {useDispatch} from 'react-redux';
import {setCurrentUser, toggleFavoriteBackground} from '../../redux/root';

const UserCard = ({user}) => {
  const dispatch = useDispatch()
  const dragStartHandler = (event, user) => {
    dispatch(toggleFavoriteBackground(true))
    dispatch(setCurrentUser(user))
  }

  function dragEndHandler() {
    dispatch(toggleFavoriteBackground(false))
  }

  return (
      <div
          draggable
          className={styles.user}
          onDragStart={e => dragStartHandler(e, user)}
          onDragEnd={dragEndHandler}
          >
        <img src={user.picture.thumbnail} alt=""/>
        <div>
          <div>{user.name.first} {user.name.last}, дата
            регистрации: {new Date(user.registered.date).toLocaleDateString()}
          </div>
          <div>{user.email}</div>
        </div>
      </div>
  )
}

export default UserCard
