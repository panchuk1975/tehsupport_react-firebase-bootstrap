import React, { useContext, useEffect, memo } from "react";
import { AgrComponent } from "../components/AgrComponent";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/Loader";
import fire from "../config/Fire";

const Agreg = memo(({ contentWidth, windowWidth }) => {
  let email = fire.auth().currentUser.email;
  email = email.split("@")[0];
  const {
    loading,
    cars,
    dates,
    lists,
    routes,
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
    userInfos,
    fetchUsersInfo,
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
      {loading ? (
        <Loader />
      ) : (
        <AgrComponent
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
          contentWidth={contentWidth}
          windowWidth={windowWidth}
          closeNewRoute={closeNewRoute}
          dates={dates}
          userInfos={userInfos}
        />
      )}
    </div>
  );
});

export default Agreg;
