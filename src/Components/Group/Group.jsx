import React, { useEffect, useState } from "react";
import styles from "./Group.module.scss";
import { useSelector } from "react-redux";
import UserCard from "../UserCard/UserCard";

const Group = ({ users, group }) => {
  const splitedGroup = group.split("-");
  const start = +splitedGroup[0];
  const end = +splitedGroup[1];

  const [viewGroup, setViewGroup] = useState(false);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const filter = useSelector((state) => state.root.filter);

  useEffect(() => {
    setSortedUsers(
      users.filter((u) => u.registered.age >= start && u.registered.age <= end)
    );
  }, [users, start, end]);

  useEffect(() => {
    setFilteredUsers(
      sortedUsers.filter((user) => {
        const fullName = user.name.first + user.name.last;
        return fullName.toLowerCase().includes(filter.toLowerCase());
      })
    );
  }, [filter, sortedUsers]);

  return (
    <div
      className={`${styles.group} 
      ${styles.groupBorder && viewGroup} 
      ${filteredUsers.length === 0 && styles.emptyState}`}
    >
      <div
        className={styles.groupTitle}
        onClick={() => setViewGroup(!viewGroup)}
      >
        {group}
      </div>
      {viewGroup &&
        filteredUsers.map((u) => <UserCard key={u.login.uuid} user={u} />)}
    </div>
  );
};

export default Group;
