import React, {useEffect, useState} from 'react';
import styles from './Group.module.scss'
import {useSelector} from 'react-redux';
import UserCard from '../UserCard/UserCard';

const Group = ({users, group, filter}) => {
  const splitedGroup = group.split('-')
  const start = +splitedGroup[0]
  const end = +splitedGroup[1]

  const [viewGroup, setViewGroup] = useState(false)
  const [sortedUsers, setSortedUsers] = useState([])
  const filteredUsers = useSelector(state => state.root.filteredUsers)

/*  const getSymbols = (firstName, lastName) => {
    const fullName = firstName + ' ' + lastName
    return fullName
        .split('')
        .map((sym, idx) => <span key={idx}>{sym}</span>)
  }*/

  useEffect(() => {
    setSortedUsers(users.filter(user => user.registered.age >= start && user.registered.age <= end))
  }, [users, start, end])
  return (
      <div className={`${styles.group} ${styles.groupBorder && viewGroup}`}>
        <div className={styles.groupTitle} onClick={() => setViewGroup(!viewGroup)}>{group}</div>

        {viewGroup && filter.trim() === '' && sortedUsers.map(u => <UserCard key={u.login.uuid} user={u}/>)}

        {viewGroup && filter.trim() !== '' && filteredUsers
            .filter(user => user.registered.age >= start && user.registered.age <= end)
            .map(u => <UserCard key={u.login.uuid} user={u}/>)}
      </div>
  )
}

export default Group
