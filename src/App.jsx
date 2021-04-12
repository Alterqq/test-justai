import React, { useEffect } from "react";
import styles from "./App.module.scss";
import Users from "./Components/Users/Users";
import Favorites from "./Components/Favorites/Favorites";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Components/common/Loader/Loader";
import { getUsers } from "./redux/root";

function App() {
  const isFetching = useSelector((state) => state.root.isFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isFetching) return <Loader />;

  return (
    <div className={styles.app}>
      <div className={styles.table}>
        <Users />
        <Favorites />
      </div>
    </div>
  );
}

export default App;
