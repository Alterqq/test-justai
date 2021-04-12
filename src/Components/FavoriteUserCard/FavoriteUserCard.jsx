import React from "react";
import styles from "./FavoriteUserCard.module.scss";
import { useDispatch } from "react-redux";
import { deleteFavoriteUser } from "../../redux/root";

const FavoriteUserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteFavoriteUser({ id }));
  };
  return (
    <div className={`${styles.card}`}>
      <img src={user.picture.thumbnail} alt="" />
      <div>
        <div>
          {user.name.first} {user.name.last}, дата регистрации:{" "}
          {new Date(user.registered.date).toLocaleDateString()}
        </div>
        <div>{user.email}</div>
      </div>
      <div
        onClick={() => handleDelete(user.login.uuid)}
        className={styles.deleteButton}
      >
        Удалить
      </div>
    </div>
  );
};

export default FavoriteUserCard;
