import React from "react";
import styles from "./UserCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, toggleFavoriteBackground } from "../../redux/root";

const UserCard = (props) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.root.filter);
  const dragStartHandler = (event, user) => {
    dispatch(toggleFavoriteBackground(true));
    dispatch(setCurrentUser(user));
  };

  function dragEndHandler() {
    dispatch(toggleFavoriteBackground(false));
  }

  const getFilteredName = (firstName, lastName) => {
    const fullName = firstName + " " + lastName;
    const match = fullName.toLowerCase().match(filter.toLowerCase());
    const start = match?.index;
    const end = start + filter.length;
    return (
      <div className={styles.fullName}>
        <span>{fullName.substr(0, start)}</span>
        <span className={styles.include}>{fullName.slice(start, end)}</span>
        <span>{fullName.substr(end, fullName.length)}</span>
      </div>
    );
  };
  return (
    <div
      draggable
      className={styles.user}
      onDragStart={(e) => dragStartHandler(e, props.user)}
      onDragEnd={dragEndHandler}
    >
      <img src={props.user.picture.thumbnail} alt="" />
      <div>
        <div>
          {getFilteredName(props.user.name.first, props.user.name.last)}, дата
          регистрации:{" "}
          {new Date(props.user.registered.date).toLocaleDateString()}
        </div>
        <div>{props.user.email}</div>
      </div>
    </div>
  );
};

export default UserCard;
