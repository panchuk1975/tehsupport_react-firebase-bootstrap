import React, { useContext, useEffect, memo } from "react";
import { ProfileComponent } from "../components/ProfileComponent";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import fire from "../config/Fire";

const Home = memo(({ windowWidth }) => {
  let email = fire.auth().currentUser.email;
  email = email.split("@")[0];
  const {
    cars,
    dates,
    lists,
    routes,
    userInfos,
    fetchCars,
    fetchDates,
    fetchLists,
    fetchRoutes,
    openCar,
    closeCar,
    openList,
    closeList,
    openRoute,
    closeRoute,
    openNewList,
    openNewRoute,
    closeNewRoute,
    clouseNewList,
    fetchUsersInfo,
    removeDates,
    removeUserInfos,
  } = useContext(FirebaseContext);
  useEffect(() => {
    fetchCars();
    fetchLists();
    fetchRoutes();
    fetchDates();
    fetchUsersInfo();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <small>{email}</small>
      <ProfileComponent
        cars={cars}
        lists={lists}
        routes={routes}
        openCar={openCar}
        closeCar={closeCar}
        openList={openList}
        closeList={closeList}
        openRoute={openRoute}
        closeRoute={closeRoute}
        openNewList={openNewList}
        clouseNewList={clouseNewList}
        openNewRoute={openNewRoute}
        closeNewRoute={closeNewRoute}
        dates={dates}
        userInfos={userInfos}
        windowWidth={windowWidth}
        removeDates={removeDates}
        removeUserInfos={removeUserInfos}
      />
    </div>
  );
});

export default Home;
