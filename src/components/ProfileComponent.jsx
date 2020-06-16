import React, { memo, useState, useContext } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { NewListLiquidsCount } from "../mathfunctions/listFunctions";
import { CreateCar } from "./CreateCar";
import { ModalBox } from "./ModalBox";
import { ListComponent } from "./ListComponent";
import { AlertBox } from "./AlertBox";
import "../CSS/ProfCompStyle.scss";
import fire from "../config/Fire";
var normalize = require("normalize-object");
var moment = require("moment");

export const ProfileComponent = memo(
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
    removeDates,
    userInfos,
    windowWidth,
    removeUserInfos,
  }) => {
    //-----------------------------User data----------------------------//
    const user = fire.auth().currentUser;
    const owner = fire.auth().currentUser.uid;
    const firebase = useContext(FirebaseContext);
    const userCars = cars.filter((car) => car.owner === owner);
    localStorage.setItem("carsLength", JSON.stringify(userCars.length));
    const date = dates.find((date) => date.owner === owner);
    let userInfo = normalize(userInfos.find((info) => info.owner === owner));
    let userInfoExsists = !!userInfo;
    if (userInfoExsists) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
    let currentUserEmail = fire.auth().currentUser.email;
    let cutEmail = currentUserEmail.split("@")[0];
    //------------------------------Alert box-----------------------------//
    let [alertClass, setAlertClass] = useState("modal");
    let [alertText, setAlertText] = useState("");
    //--------------------------Profile Initial form----------------------//
    let initialForm = {
      firstName: "",
      secondName: "",
      mobilePhon: "",
      company: cutEmail,
      jointCompany: "",
      email: currentUserEmail,
      carID: "",
      owner,
    };
    if (userInfo) {
      if (userInfo.owner === owner) {
        initialForm = userInfo;
      }
    }

    //------------------------------Form state----------------------------//
    let [form, setForm] = useState({
      ...initialForm,
    });
    //---------------------------Form change hendler----------------------//
    let existsCars = false;
    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };
    //---------------------------------Check ID-----------------------------//
    if(userInfoExsists){
        if (userInfo.company !== form.company) {
            existsCars = !!userInfos.filter((info) => info.company === form.company)
              .length;
          }
    }
    //-----------------------------Create user profile----------------------//
    const createProfileHandler = (event) => {
      event.preventDefault();
      !form.company && setAlertText("Особистий ідентифікатор обовязковий!");
      !form.company && setAlertClass("open");
      if (form.company) {
        firebase
          .addUserInfo({ ...form })
          .then(() => {})
          .catch(() => {
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Профіль створено!");
        setAlertClass("open");
      }
      setTimeout(() => {
        setAlertClass("modal");
      }, 1000);
    };
    //-----------------------------Change user profile----------------------//
    const changeProfileHandler = (event) => {
      event.preventDefault();
      !form.company && setAlertText("Особистий ідентифікатор обовязковий!");
      !form.company && setAlertClass("open");
      existsCars &&
        setAlertText("Такий ідентифікатор вже існує, оберіть інший!");
      existsCars && setAlertClass("open");
      if (form.company) {
        if (!existsCars) {
          firebase
            .changeUserInfo({ ...form, id: userInfo.id })
            .then(() => {})
            .catch(() => {
              setAlertText("Ошибка сервера!");
              setAlertClass("open");
            });
          setAlertText("Профіль змінено!");
          setAlertClass("open");
        }
      }
      setTimeout(() => {
        setAlertClass("modal");
      }, 1000);
    };
    //---------------------------Remove account function-----------------------//
    const dataAccountWarningText =
      "Ви намагаєтеся видалити дані аккаунта! Відновлення даних буде не можливим!!!";
    const removeAccounte = (user) => {
      let carsLength = JSON.parse(localStorage.getItem("carsLength"));
      if (carsLength === 0) {
        user.delete().catch((error) => {
          setAlertText(error.message);
          setAlertClass("open");
        });
        if (date) {
          removeDates(date.id);
        }
        if (userInfo) {
          removeUserInfos(userInfo.id);
        }
        return;
      } else {
        setAlertText("Для видалення аккаунта видаліть всі об'єкти!");
        setAlertClass("open");
      }
      setTimeout(() => {
        setAlertClass("modal");
      }, 1500);
    };
    //-------------------------------------Alert block------------------------------//
    const dataWarningText =
      "Ви намагаєтеся видалити дані! Після видалення відновлення даних буде не можливим!";
    const { removeCar, removeList } = useContext(FirebaseContext);
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
    //------------------------------------Open car for ID-----------------------------//
    if (userInfo) {
      if (userInfo.carID) {
        cars = cars.filter((car) => car.objectPassword === userInfo.carID);
      } else {
        cars = [];
      }
    } else {
      cars = [];
    }
    let carExists = !!cars.length;
    //-----------------------------------------JSX------------------------------------//
    return (
      <div>
        <div className="userInfoBasis">
          <div id="form" className="d-flex flex-wrap justify-content-between">
            <div className="form-group">
              <label htmlFor="firstName">
                <small>Ім'я</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ім'я"
                value={form.firstName}
                name="firstName"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="secondName">
                <small>Призвіще</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Призвіще"
                value={form.secondName}
                name="secondName"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobilePhon">
                <small>Телефон</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Телефон"
                value={form.mobilePhon}
                name="mobilePhon"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">
                <small>Ідентифікатор</small>
              </label>
              <input
                id="important"
                type="text"
                className="form-control"
                placeholder="Ідентифікатор"
                value={form.company}
                name="company"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="jointCompany">
                <small>Відображення</small>
              </label>
              <input
                id="important"
                type="text"
                className="form-control"
                placeholder="Відображення"
                value={form.jointCompany}
                name="jointCompany"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="carID">
                <small>Окремий ID</small>
              </label>
              <input
                type="id"
                className="form-control"
                placeholder="ID"
                value={form.carID}
                name="carID"
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className=" d-flex justify-content-between">
            <button
              id="changeInfoBtn"
              className="btn btn-danger"
              value="Зберегти"
              name="submit"
              onClick={() => {
                setFunct("removeAccount");
                setModalText(dataAccountWarningText);
                setModalClass();
              }}
            >
              <small>Видалити аккаунт!</small>
            </button>
            {userInfoExsists && (
              <button
                id="changeInfoBtn"
                className="btn btn-success"
                value="Зберегти"
                name="submit"
                onClick={changeProfileHandler}
              >
                <small>Зберегти</small>
              </button>
            )}
            {!userInfoExsists && (
              <button
                id="changeInfoBtn"
                className="btn btn-success"
                value="Зберегти"
                name="submit"
                onClick={createProfileHandler}
              >
                <small>Створити</small>
              </button>
            )}
          </div>
        </div>
        <hr className="hr" />
        <TransitionGroup
          id="TransitionGroup"
          component="ul"
          className="list-group"
        >
          {carExists &&
            cars.map((car) => {
              //---------------------------Car Data----------------------------------//
              let newLists = lists.filter((list) => list.listOwner === car.id);
              newLists.sort((a, b) => a.listNumber - b.listNumber);
              let carRoutes = routes.filter(
                (route) => route.listOwner === car.id
              );
              let listCarLiquids = NewListLiquidsCount(carRoutes);
              //----------------------------Data for TO----------------------------------//
              let TO2 =
                parseInt(
                  (Number(car.carIndicatorLastTO2) + Number(car.routeToTO2)) *
                    100
                ) / 100;
              let routeToTO2 =
                parseInt(
                  (Number(car.carIndicatorLastTO2) +
                    Number(car.routeToTO2) -
                    Number(car.carIndicatorLast)) *
                    100
                ) / 100;
              let TO1 =
                parseInt(
                  (Number(car.carIndicatorLastTO1) + Number(car.routeToTO1)) *
                    100
                ) / 100;
              let routeToTO1 =
                parseInt(
                  (Number(car.carIndicatorLastTO1) +
                    Number(car.routeToTO1) -
                    Number(car.carIndicatorLast)) *
                    100
                ) / 100;
              let timeTO2 =
                parseInt(
                  (Number(car.carTimeLastTO2) + Number(car.nextTimeTO2)) * 100
                ) / 100;
              let timeToTO2 =
                parseInt(
                  (Number(car.carTimeLastTO2) +
                    Number(car.nextTimeTO2) -
                    Number(car.carTimeFinish)) *
                    100
                ) / 100;
              let timeTO1 =
                parseInt(
                  (Number(car.carTimeLastTO1) + Number(car.nextTimeTO1)) * 100
                ) / 100;
              let timeToTO1 =
                parseInt(
                  (Number(car.carTimeLastTO1) +
                    Number(car.nextTimeTO1) -
                    Number(car.carTimeFinish)) *
                    100
                ) / 100;
              let КР =
                parseInt(
                  (Number(car.carIndicatorLastКР) + Number(car.routeToКР)) * 100
                ) / 100;
              let routeToКР =
                parseInt(
                  (Number(car.carIndicatorLastКР) +
                    Number(car.routeToКР) -
                    Number(car.carIndicatorLast)) *
                    100
                ) / 100;
              let СР =
                parseInt(
                  (Number(car.carIndicatorLastСР) + Number(car.routeToСР)) * 100
                ) / 100;
              let routeToСР =
                parseInt(
                  (Number(car.carIndicatorLastСР) +
                    Number(car.routeToСР) -
                    Number(car.carIndicatorLast)) *
                    100
                ) / 100;
              let timeКР =
                parseInt(
                  (Number(car.carTimeLastКР) + Number(car.nextTimeКР)) * 100
                ) / 100;
              let timeToКР =
                parseInt(
                  (Number(car.carTimeLastКР) +
                    Number(car.nextTimeКР) -
                    Number(car.carTimeFinish)) *
                    100
                ) / 100;
              let timeСР =
                parseInt(
                  (Number(car.carTimeLastСР) + Number(car.nextTimeСР)) * 100
                ) / 100;
              let timeToСР =
                parseInt(
                  (Number(car.carTimeLastСР) +
                    Number(car.nextTimeСР) -
                    Number(car.carTimeFinish)) *
                    100
                ) / 100;
              //--------------------------------Color types for TO-----------------------------//
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
              let typeTimeTO1 = null;
              if (car.carTimeFinish > timeTO1) {
                typeTimeTO1 = "carBrocken";
              } else {
                typeTimeTO1 = "routeTO2";
              }
              let typeTimeTO2 = null;
              if (car.carTimeFinish > timeTO2) {
                typeTimeTO2 = "carBrocken";
              } else {
                typeTimeTO2 = "routeTO2";
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
              let typeTimeКР = null;
              if (car.carTimeFinish > timeКР) {
                typeTimeКР = "carBrocken";
              } else {
                typeTimeКР = "routeTO2";
              }
              let typeTimeСР = null;
              if (car.carTimeFinish > timeСР) {
                typeTimeСР = "carBrocken";
              } else {
                typeTimeСР = "routeTO2";
              }
              //-----------------------------Car GSX---------------------------//
              if (!userInfo) {
                return null;
              }
              return (
                <CSSTransition key={car.id} classNames={"note"} timeout={800}>
                  <li key={car.id} id="carInnerLi" className="list-group-item">
                    <form
                      id="carBasis"
                      className="d-flex  justify-content-start"
                    >
                      {!car.openCar & (car.driver === "Автомобіль-агрегат") && (
                        <div
                          onClick={() => {
                            openCar(car);
                          }}
                        >
                          <table className="carTable">
                            <thead></thead>
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
                                {windowWidth > 319 && (
                                  <td width="60">
                                    <small>{car.carIndicatorLast}</small>
                                  </td>
                                )}
                                {windowWidth > 359 && (
                                  <td width="40">
                                    <small>{car.carTimeFinish}</small>
                                  </td>
                                )}
                                {windowWidth > 411 && (
                                  <td width="52">
                                    <small>{car.totalCarMileage}</small>
                                  </td>
                                )}
                                {windowWidth > 451 && (
                                  <td width="40">
                                    <small>{car.carTimeTotal}</small>
                                  </td>
                                )}
                                {windowWidth > 551 && (
                                  <td width="90">
                                    <small>{car.specialCarEquipment}</small>
                                  </td>
                                )}
                                {windowWidth > 770 && (
                                  <td width="110">
                                    <small>{car.carOwnerName}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="90">
                                    <small className={carType}>ТО1: </small>
                                    <small className={typeRouteTO1}>
                                      {TO1}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="52" className={typeRouteTO1}>
                                    <small>{routeToTO1}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="62" className={typeTimeTO1}>
                                    <small>{timeTO1}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="38" className={typeTimeTO1}>
                                    <small>{timeToTO1}</small>
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
                                  <td width="52" className={typeRouteTO2}>
                                    <small>{routeToTO2}</small>
                                  </td>
                                )}
                                {windowWidth > 1201 && (
                                  <td width="62" className={typeTimeTO2}>
                                    <small>{timeTO2}</small>
                                  </td>
                                )}
                                {windowWidth > 1201 && (
                                  <td width="38" className={typeTimeTO2}>
                                    <small>{timeToTO2}</small>
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                      {!car.openCar & (car.driver === "Автомобіль") && (
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
                                      {`${moment(car.dateOfRegistration).format(
                                        "DD.MM HH:mm"
                                      )}`}
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
                      {!car.openCar & (car.driver === "Агрегат") && (
                        <div
                          onClick={() => {
                            openCar(car);
                          }}
                        >
                          <table className="carTable">
                            <thead></thead>
                            <tbody>
                              <tr align="center">
                                {windowWidth > 255 && (
                                  <td width="120">
                                    <small className={carType}>
                                      {car.typeOfCar}
                                    </small>
                                  </td>
                                )}
                                <td width="68">
                                  <small className={carType}>
                                    {car.governmentCarNumber}
                                  </small>
                                </td>
                                {windowWidth > 305 && (
                                  <td width="60">
                                    <small>{car.carTimeFinish}</small>
                                  </td>
                                )}
                                {windowWidth > 362 && (
                                  <td width="40">
                                    <small>{car.carTimeTotal}</small>
                                  </td>
                                )}
                                {windowWidth > 425 && (
                                  <td width="90">
                                    <small>
                                      {`${moment(car.dateOfRegistration).format(
                                        "DD.MM HH:mm"
                                      )}`}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 545 && (
                                  <td width="90">
                                    <small>{car.carEngineNumber}</small>
                                  </td>
                                )}

                                {windowWidth > 770 && (
                                  <td width="150">
                                    <small>{car.specialCarEquipment}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="120">
                                    <small>{car.carOwnerName}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="92">
                                    <small className={carType}>ТО1: </small>
                                    <small className={typeTimeTO1}>
                                      {timeTO1}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="60" className={typeTimeTO1}>
                                    <small>{timeToTO1}</small>
                                  </td>
                                )}
                                {windowWidth > 1201 && (
                                  <td width="92">
                                    <small className={carType}>ТО2: </small>
                                    <small className={typeTimeTO2}>
                                      {timeTO2}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 1201 && (
                                  <td width="60" className={typeTimeTO2}>
                                    <small>{timeToTO2}</small>
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                      {!car.openCar & (car.driver === "Електроприлад") && (
                        <div
                          onClick={() => {
                            openCar(car);
                          }}
                        >
                          <table className="carTable">
                            <thead></thead>
                            <tbody>
                              <tr align="center">
                                {windowWidth > 236 && (
                                  <td width="150">
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
                                {windowWidth > 359 && (
                                  <td width="110">
                                    <small>{car.carTimeFinish}</small>
                                  </td>
                                )}
                                {windowWidth > 451 && (
                                  <td width="40">
                                    <small>{car.carTimeTotal}</small>
                                  </td>
                                )}
                                {windowWidth > 531 && (
                                  <td width="82">
                                    <small>
                                      {`${moment(car.dateOfRegistration).format(
                                        "DD.MM HH:mm"
                                      )}`}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 770 && (
                                  <td width="130">
                                    <small>{car.specialCarEquipment}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="110">
                                    <small>{car.carOwnerName}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="112">
                                    <small className={carType}>ТO1: </small>
                                    <small className={typeTimeTO1}>
                                      {timeTO1}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="58" className={typeTimeTO1}>
                                    <small>{timeToTO1}</small>
                                  </td>
                                )}
                                {windowWidth > 1201 && (
                                  <td width="112">
                                    <small className={carType}>ТO2: </small>
                                    <small className={typeTimeTO2}>
                                      {timeTO2}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 1201 && (
                                  <td width="58" className={typeTimeTO2}>
                                    <small>{timeToTO2}</small>
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
                          (userInfo.company === userInfo.jointCompany) &
                          (userInfo.owner === car.owner) && (
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
                    <form className="addingObjTableProf">
                      {car.openCar & (car.driver === "Автомобіль") && (
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
                                  <small className={typeRouteTO1}>{TO1}</small>
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
                                  <small className={typeRouteTO2}>{TO2}</small>
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
                      {car.openCar & (car.driver === "Автомобіль-агрегат") && (
                        <table
                          className="carTable"
                          onClick={() => {
                            closeCar(car);
                          }}
                        >
                          <tbody>
                            <tr align="center">
                              <td width="70">
                                <small className={carType}>КР: </small>
                                <small className={typeRouteКР}>{КР}</small>
                              </td>
                              {windowWidth > 247 && (
                                <td width="55" className={typeRouteКР}>
                                  <small>{routeToКР}</small>
                                </td>
                              )}
                              {windowWidth > 327 && (
                                <td width="70">
                                  <small className={carType}>СР: </small>
                                  <small className={typeRouteСР}>{СР}</small>
                                </td>
                              )}
                              {windowWidth > 377 && (
                                <td width="55" className={typeRouteСР}>
                                  <small>{routeToСР}</small>
                                </td>
                              )}
                              {windowWidth > 477 && (
                                <td width="80">
                                  <small className={carType}>ТО1: </small>
                                  <small className={typeRouteTO1}>{TO1}</small>
                                </td>
                              )}
                              {windowWidth > 527 && (
                                <td width="55" className={typeRouteTO1}>
                                  <small>{routeToTO1}</small>
                                </td>
                              )}
                              {windowWidth > 770 && (
                                <td width="80">
                                  <small className={carType}>ТО2: </small>
                                  <small className={typeRouteTO2}>{TO2}</small>
                                </td>
                              )}
                              {windowWidth > 770 && (
                                <td width="55" className={typeRouteTO2}>
                                  <small>{routeToTO2}</small>
                                </td>
                              )}
                              {windowWidth > 995 && (
                                <td width="70">
                                  <small className={carType}>ЧК: </small>
                                  <small className={typeTimeКР}>{timeКР}</small>
                                </td>
                              )}
                              {windowWidth > 995 && (
                                <td width="55" className={typeTimeКР}>
                                  <small>{timeToКР}</small>
                                </td>
                              )}
                              {windowWidth > 1205 && (
                                <td width="80">
                                  <small className={carType}>ЧС: </small>
                                  <small className={typeTimeСР}>{timeСР}</small>
                                </td>
                              )}
                              {windowWidth > 1205 && (
                                <td width="55" className={typeTimeСР}>
                                  <small>{timeToСР}</small>
                                </td>
                              )}
                              {windowWidth > 1205 && (
                                <td width="80">
                                  <small className={carType}>ЧТ1: </small>
                                  <small className={typeTimeTO1}>
                                    {timeTO1}
                                  </small>
                                </td>
                              )}
                              {windowWidth > 1205 && (
                                <td width="55" className={typeTimeTO1}>
                                  <small>{timeToTO1}</small>
                                </td>
                              )}
                              {windowWidth > 1205 && (
                                <td width="80">
                                  <small className={carType}>ЧТ2: </small>
                                  <small className={typeTimeTO2}>
                                    {timeTO2}
                                  </small>
                                </td>
                              )}
                              {windowWidth > 1205 && (
                                <td width="55" className={typeTimeTO2}>
                                  <small>{timeToTO2}</small>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>
                      )}
                      {car.openCar & (car.driver === "Агрегат") && (
                        <table
                          className="carTable"
                          onClick={() => {
                            closeCar(car);
                          }}
                        >
                          <tbody>
                            <tr align="center">
                              <td width="100">
                                <small className={carType}>ЧК: </small>
                                <small className={typeTimeКР}>{timeКР}</small>
                              </td>
                              {windowWidth > 260 && (
                                <td width="60" className={typeTimeКР}>
                                  <small>{timeToКР}</small>
                                </td>
                              )}
                              {windowWidth > 355 && (
                                <td width="100">
                                  <small className={carType}>ЧС: </small>
                                  <small className={typeTimeСР}>{timeСР}</small>
                                </td>
                              )}
                              {windowWidth > 420 && (
                                <td width="60" className={typeTimeСР}>
                                  <small>{timeToСР}</small>
                                </td>
                              )}
                              {windowWidth > 520 && (
                                <td width="100">
                                  <small className={carType}>ТО1: </small>
                                  <small className={typeTimeTO1}>
                                    {timeTO1}
                                  </small>
                                </td>
                              )}
                              {windowWidth > 770 && (
                                <td width="60" className={typeTimeTO1}>
                                  <small>{timeToTO1}</small>
                                </td>
                              )}
                              {windowWidth > 770 && (
                                <td width="100">
                                  <small className={carType}>ТО2: </small>
                                  <small className={typeTimeTO2}>
                                    {timeTO2}
                                  </small>
                                </td>
                              )}
                              {windowWidth > 995 && (
                                <td width="60" className={typeTimeTO2}>
                                  <small>{timeToTO2}</small>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>
                      )}
                      {car.openCar & (car.driver === "Електроприлад") && (
                        <table
                          className="carTable"
                          onClick={() => {
                            closeCar(car);
                          }}
                        >
                          <tbody>
                            <tr align="center">
                              <td width="100">
                                <small className={carType}>ЧК: </small>
                                <small className={typeTimeКР}>{timeКР}</small>
                              </td>
                              {windowWidth > 260 && (
                                <td width="60" className={typeTimeКР}>
                                  <small>{timeToКР}</small>
                                </td>
                              )}
                              {windowWidth > 355 && (
                                <td width="100">
                                  <small className={carType}>ЧС: </small>
                                  <small className={typeTimeСР}>{timeСР}</small>
                                </td>
                              )}
                              {windowWidth > 420 && (
                                <td width="60" className={typeTimeСР}>
                                  <small>{timeToСР}</small>
                                </td>
                              )}
                              {windowWidth > 520 && (
                                <td width="100">
                                  <small className={carType}>ТО1: </small>
                                  <small className={typeTimeTO1}>
                                    {timeTO1}
                                  </small>
                                </td>
                              )}
                              {windowWidth > 770 && (
                                <td width="60" className={typeTimeTO1}>
                                  <small>{timeToTO1}</small>
                                </td>
                              )}
                              {windowWidth > 770 && (
                                <td width="100">
                                  <small className={carType}>ТО2: </small>
                                  <small className={typeTimeTO2}>
                                    {timeTO2}
                                  </small>
                                </td>
                              )}
                              {windowWidth > 995 && (
                                <td width="60" className={typeTimeTO2}>
                                  <small>{timeToTO2}</small>
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
                        <CreateCar car={car} cars={cars} userInfo={userInfo} />
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
          {fun === "removeAccount" && (
            <ModalBox
              modalClass={modalClass}
              modalText={textModal}
              modalFunction={setClass}
              Id={user}
              innerFunction={removeAccounte}
            />
          )}
        </TransitionGroup>
        <AlertBox
          modalClass={alertClass}
          modalText={alertText}
          modalFunction={setAlertClass}
        />
      </div>
    );
  }
);
