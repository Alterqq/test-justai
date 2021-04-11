import React from 'react'
import styles from './Favorites.module.scss'
import FavoriteUserCard from '../FavoriteUserCard/FavoriteUserCard';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorites, setCurrentUser} from '../../redux/root';

const Favorites = () => {
  const favorites = useSelector(state => state.root.favorites)
  const currentUser = useSelector(state => state.root.currentUser)
  const favoriteBackground = useSelector(state => state.root.favoriteBackground)
  const dispatch = useDispatch()

  function handleDrop() {
    if (currentUser !== null && !favorites.filter(u => u.login.uuid === currentUser.login.uuid).length) {
      dispatch(addFavorites(currentUser))
    }
    dispatch(setCurrentUser(null))
  }

  function onDragOver(e) {
    e.preventDefault()
  }

  return (
      <div
          className={`${styles.favoritesArea} ${favoriteBackground && styles.background}`}
          onDragOver={onDragOver}
          onDrop={handleDrop}>
        <div className={styles.title}>Избранные</div>
        {favorites.length !== 0 && favorites.map(user => <FavoriteUserCard key={user.login.uuid} user={user}/>)}
        {!favorites.length && <div className={styles.emptyState}>Пока нет избранных пользователей</div>}
      </div>
  )
}

export default Favorites
