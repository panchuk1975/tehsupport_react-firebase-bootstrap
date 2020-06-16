import React, { memo, useState, useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { NewListLiquidsCount } from "../mathfunctions/listFunctions";
import {
  ExportReactCSV,
  carExelInfo,
  carLiquidsExelInfo,
  carListLiquidsExelInfo,
} from "../mathfunctions/liquidsFunctions";
import { CreateCar } from "./CreateCar";
import { ModalBox } from "./ModalBox";
import { AlertBox } from "./AlertBox";
import fire from "../config/Fire";
import "../CSS/ObjCompStyle.scss";
import { ListComponent } from "./ListComponent";
var moment = require("moment");

export const CarsComponent = memo(
  ({
    cars,
    dates,
    lists,
    routes,
    openCar,
    closeCar,
    openNewList,
    clouseNewList,
    openNewRoute,
    closeNewRoute,
    openList,
    closeList,
    openRoute,
    closeRoute,
    windowWidth,
    userInfos,
  }) => {
    //------------------------------Alert functions block------------------------------//
    const dataWarningText =
      "Ви намагаєтеся видалити дані! Після видалення відновлення даних буде не можливим!";
    const { removeCar, removeList } = useContext(FirebaseContext);
    let [alertClass, setAlertClass] = useState("modal");
    let [alertText, setAlertText] = useState("");
    let [modalClass, setClass] = useState("modal");
    let [fun, setFunct] = useState("");
    let [textModal, setModalText] = useState();
    let [Id, setId] = useState();
    let setModalClass = () => {
      if ((modalClass = "modal")) {
        setClass("open");
      } else {
        setClass("modal");
      }
    };
    //--------------------------------Create user data---------------------------------//
    var owner = fire.auth().currentUser.uid;
    let userInfo = userInfos.find((info) => info.owner === owner);
    if (!userInfo) {
      return null;
    }
    let userInUse = userInfos.find(
      (infoUse) => infoUse.company === userInfo.jointCompany
    );
    if (!userInUse) {
      return null;
    }
    //------------------------------Create cars data array------------------------------//
    cars = cars.filter((car) => car.owner === userInUse.owner);
    cars = cars.filter((car) => car.driver === "Автомобіль");
    cars.sort(
      (a, b) => new Date(b.dateOfRegistration) - new Date(a.dateOfRegistration)
    );
    let carExists = cars.length;
    if (carExists === 0) {
      return null;
    }
    //---------------------------------Cars JSX block----------------------------------//
    return (
      <div>
        <div>
          <TransitionGroup component="ul" className="list-group">
            {carExists &&
              cars.map((car) => {
                //--------------------Create car lists and routes-----------------------//
                let newLists = lists.filter(
                  (list) => list.listOwner === car.id
                );
                newLists.sort((a, b) => a.listNumber - b.listNumber);
                let carRoutes = routes.filter(
                  (route) => route.listOwner === car.id
                );
                //---------------------------Car liquids array---------------------------//
                let listCarLiquids = NewListLiquidsCount(carRoutes);
                //-----------------------------Data for TO--------------------------------//
                let TO2 =
                  parseInt(
                    (Number(car.carIndicatorLastTO2) + Number(car.routeToTO2)) *
                      100,
                    10
                  ) / 100;
                let routeToTO2 =
                  parseInt(
                    (Number(car.carIndicatorLastTO2) +
                      Number(car.routeToTO2) -
                      Number(car.carIndicatorLast)) *
                      100,
                    10
                  ) / 100;
                let TO1 =
                  parseInt(
                    (Number(car.carIndicatorLastTO1) + Number(car.routeToTO1)) *
                      100,
                    10
                  ) / 100;
                let routeToTO1 =
                  parseInt(
                    (Number(car.carIndicatorLastTO1) +
                      Number(car.routeToTO1) -
                      Number(car.carIndicatorLast)) *
                      100,
                    10
                  ) / 100;
                let КР =
                  parseInt(
                    (Number(car.carIndicatorLastКР) + Number(car.routeToКР)) *
                      100,
                    10
                  ) / 100;
                let routeToКР =
                  parseInt(
                    (Number(car.carIndicatorLastКР) +
                      Number(car.routeToКР) -
                      Number(car.carIndicatorLast)) *
                      100,
                    10
                  ) / 100;
                let СР =
                  parseInt(
                    (Number(car.carIndicatorLastСР) + Number(car.routeToСР)) *
                      100,
                    10
                  ) / 100;
                let routeToСР =
                  parseInt(
                    (Number(car.carIndicatorLastСР) +
                      Number(car.routeToСР) -
                      Number(car.carIndicatorLast)) *
                      100,
                    10
                  ) / 100;
                //------------------------Color alert types for TO----------------------//
                let carType = null;
                if (car.serviceability === "Справний") {
                  carType = "head";
                } else {
                  carType = "carBrocken";
                }
                let typeRouteTO1 = null;
                if (car.carIndicatorLast > TO1) {
                  typeRouteTO1 = "carBrocken";
                } else {
                  typeRouteTO1 = "routeTO2";
                }
                let typeRouteTO2 = null;
                if (car.carIndicatorLast > TO2) {
                  typeRouteTO2 = "carBrocken";
                } else {
                  typeRouteTO2 = "routeTO2";
                }
                let typeRouteКР = null;
                if (car.carIndicatorLast > КР) {
                  typeRouteКР = "carBrocken";
                } else {
                  typeRouteКР = "routeTO2";
                }
                let typeRouteСР = null;
                if (car.carIndicatorLast > СР) {
                  typeRouteСР = "carBrocken";
                } else {
                  typeRouteСР = "routeTO2";
                }
                //--------------------------------JSX Car--------------------------------//
                return (
                  <CSSTransition key={car.id} classNames={"note"} timeout={800}>
                    <li
                      key={car.id}
                      id="carInnerLi"
                      className="list-group-item"
                    >
                      <form
                        id="carBasis"
                        className="d-flex  justify-content-between"
                      >
                        {!car.openCar && (
                          <div
                            onClick={() => {
                              openCar(car);
                            }}
                          >
                            <table className="carTable">
                              <tbody>
                                <tr align="center">
                                  {windowWidth > 265 && (
                                    <td width="100">
                                      <small className={carType}>
                                        {car.typeOfCar}
                                      </small>
                                    </td>
                                  )}
                                  <td width="88">
                                    <small className={carType}>
                                      {car.governmentCarNumber}
                                    </small>
                                  </td>
                                  {windowWidth > 315 && (
                                    <td width="60">
                                      <small>{car.carIndicatorLast}</small>
                                    </td>
                                  )}
                                  {windowWidth > 370 && (
                                    <td width="50">
                                      <small>{car.totalCarMileage}</small>
                                    </td>
                                  )}
                                  {windowWidth > 452 && (
                                    <td width="82">
                                      <small>
                                        {`${moment(
                                          car.dateOfRegistration
                                        ).format("DD.MM HH:mm")}`}
                                      </small>
                                    </td>
                                  )}
                                  {windowWidth > 532 && (
                                    <td width="80">
                                      <small>{car.carPassportNumber}</small>
                                    </td>
                                  )}
                                  {windowWidth > 762 && (
                                    <td width="90">
                                      <small>{car.factoryCarNumber}</small>
                                    </td>
                                  )}
                                  {windowWidth > 762 && (
                                    <td width="50">
                                      <small>{car.dateOfCarProduction}</small>
                                    </td>
                                  )}
                                  {windowWidth > 992 && (
                                    <td width="90">
                                      <small>{car.specialCarEquipment}</small>
                                    </td>
                                  )}
                                  {windowWidth > 992 && (
                                    <td width="90">
                                      <small>{car.carOwnerName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="90">
                                      <small className={carType}>ТО1: </small>
                                      <small className={typeRouteTO1}>
                                        {TO1}
                                      </small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="42" className={typeRouteTO1}>
                                      <small>{routeToTO1}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="90">
                                      <small className={carType}>ТО2: </small>
                                      <small className={typeRouteTO2}>
                                        {TO2}
                                      </small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="42" className={typeRouteTO2}>
                                      <small>{routeToTO2}</small>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                        <div>
                          {!car.openCar &
                            !newLists.length &
                            (userInfo.company === userInfo.jointCompany) && (
                            <button
                              id="deleteCarBtn"
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setId(car.id);
                                setFunct("removeCar");
                                setModalText(dataWarningText);
                                setModalClass();
                              }}
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      </form>
                      <form className="addingObjTable">
                        {car.openCar && (
                          <table
                            className="carTable"
                            onClick={() => {
                              closeCar(car);
                            }}
                          >
                            <tbody>
                              <tr align="center">
                                <td width="100">
                                  <small className={carType}>КР: </small>
                                  <small className={typeRouteКР}>{КР}</small>
                                </td>
                                {windowWidth > 247 && (
                                  <td width="50" className={typeRouteКР}>
                                    <small>{routeToКР}</small>
                                  </td>
                                )}
                                {windowWidth > 327 && (
                                  <td width="100">
                                    <small className={carType}>СР: </small>
                                    <small className={typeRouteСР}>{СР}</small>
                                  </td>
                                )}
                                {windowWidth > 377 && (
                                  <td width="50" className={typeRouteСР}>
                                    <small>{routeToСР}</small>
                                  </td>
                                )}
                                {windowWidth > 477 && (
                                  <td width="100">
                                    <small className={carType}>ТО1: </small>
                                    <small className={typeRouteTO1}>
                                      {TO1}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 527 && (
                                  <td width="50" className={typeRouteTO1}>
                                    <small>{routeToTO1}</small>
                                  </td>
                                )}
                                {windowWidth > 770 && (
                                  <td width="100">
                                    <small className={carType}>ТО2: </small>
                                    <small className={typeRouteTO2}>
                                      {TO2}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 770 && (
                                  <td width="50" className={typeRouteTO2}>
                                    <small>{routeToTO2}</small>
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </form>
                      {!car.openCar && (
                        <ListComponent
                          car={car}
                          dates={dates}
                          routes={routes}
                          newLists={newLists}
                          openNewList={openNewList}
                          clouseNewList={clouseNewList}
                          openNewRoute={openNewRoute}
                          closeNewRoute={closeNewRoute}
                          openList={openList}
                          closeList={closeList}
                          openRoute={openRoute}
                          closeRoute={closeRoute}
                          windowWidth={windowWidth}
                          setAlertClass={setAlertClass}
                          setAlertText={setAlertText}
                          setFunct={setFunct}
                          setModalText={setModalText}
                          setModalClass={setModalClass}
                          setId={setId}
                          modalClass={modalClass}
                          carRoutes={carRoutes}
                          listCarLiquids={listCarLiquids}
                          userInfo={userInfo}
                        />
                      )}
                      <form>
                        {car.openCar && (
                          <CreateCar
                            car={car}
                            cars={cars}
                            userInfo={userInfo}
                          />
                        )}
                      </form>
                    </li>
                  </CSSTransition>
                );
              })}
            {fun === "removeCar" && (
              <ModalBox
                modalClass={modalClass}
                modalText={textModal}
                modalFunction={setClass}
                Id={Id}
                innerFunction={removeCar}
              />
            )}
            {fun === "removeList" && (
              <ModalBox
                modalClass={modalClass}
                modalText={textModal}
                modalFunction={setClass}
                Id={Id}
                innerFunction={removeList}
              />
            )}
            <AlertBox
              modalClass={alertClass}
              modalText={alertText}
              modalFunction={setAlertClass}
            />
          </TransitionGroup>
        </div>
        <div className="d-flex justify-content-between">
          <ExportReactCSV
            csvData={carExelInfo(cars)}
            fileName={"авто"}
            textCSV="авто.xlx"
          />
          <ExportReactCSV
            csvData={carLiquidsExelInfo(cars, lists, routes)}
            fileName={"пммАвто"}
            textCSV="пмм.xlx"
          />
          <ExportReactCSV
            csvData={carListLiquidsExelInfo(cars, lists, routes)}
            fileName={"пммЛист"}
            textCSV="листи.xlx"
          />
        </div>
      </div>
    );
  }
);
