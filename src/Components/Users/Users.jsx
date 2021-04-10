import React, {useEffect, useState} from 'react'
import styles from './Users.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {filterUsers, setFilter} from '../../redux/root';
import {getGroups} from '../../utils';
import Group from '../Group/Group';


const Users = () => {
  const users = useSelector((state) => state.root.users)
  const filter = useSelector(state => state.root.filter)
  const dispatch = useDispatch()
  const [groups, setGroups] = useState([])

  useEffect(() => {
    if (users.length) {
      setGroups(getGroups(users))
    }
  }, [users])

  useEffect(() => {
    dispatch(filterUsers(filter))
  }, [filter, dispatch])

  const onFilterUsers = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
      <div className={styles.usersArea}>
        <input type="text" placeholder="Поиск" value={filter} onChange={onFilterUsers}/>
        {groups.map(g =>
            <Group filter={filter} key={g} users={users} group={g}/>
        )}
      </div>
  )
}

export default Users;
