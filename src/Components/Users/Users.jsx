import React, { useEffect, useState } from "react";
import styles from "./Users.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/root";
import { getGroups } from "../../utils";
import Group from "../Group/Group";

const Users = () => {
  const users = useSelector((state) => state.root.users);
  const filter = useSelector((state) => state.root.filter);
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (users.length) {
      setGroups(getGroups(users));
    }
  }, [users]);

  const onFilterUsers = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const clearFilter = () => {
    dispatch(setFilter(""));
  };

  return (
    <div className={styles.usersArea}>
      <input
        type="text"
        placeholder="Поиск"
        value={filter}
        onChange={onFilterUsers}
      />
      <span
        onClick={clearFilter}
        className={`material-icons ${styles.clearIcon}`}
      >
        clear
      </span>
      {groups.map((g) => (
        <Group filter={filter} key={g} users={users} group={g} />
      ))}
    </div>
  );
};

export default Users;
