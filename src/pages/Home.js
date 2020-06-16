import React, { useContext, useEffect, memo } from "react";
import { CarsComponent } from "../components/CarsComponent";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/Loader";
import fire from "../config/Fire";

const Home = memo(({ windowWidth }) => {
    let email = "";
    if(fire.auth().currentUser){
        email = fire.auth().currentUser.email;
        email = email.split("@")[0];
    } 
  const {
    loading,
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
        <CarsComponent
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
          windowWidth={windowWidth}
          closeNewRoute={closeNewRoute}
          dates={dates}
          userInfos={userInfos}
        />
      )}
    </div>
  );
});

export default Home;
