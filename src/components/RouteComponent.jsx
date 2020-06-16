import React, { memo, useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { CreateRoute } from "./CreateRoute";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import {
  CommonListRoute,
  CommonListTime,
} from "../mathfunctions/listFunctions";
import "../CSS/RouteCompStyle.scss";
var moment = require("moment");

export const RouteComponent = memo(
  ({
    car,
    list,
    newRoutes,
    newCarRoutes,
    openRoute,
    closeRoute,
    openNewRoute,
    closeNewRoute,
    windowWidth,
    setAlertText,
    setAlertClass,
    listLiquids,
    carRoutes,
    userInfo,
  }) => {
    const firebase = useContext(FirebaseContext);
    let oldRoutes = CommonListRoute(newRoutes);
    let oldTimes = CommonListTime(newRoutes);
    let oldCarRoutes = CommonListRoute(carRoutes);
    let oldCarTimes = CommonListTime(carRoutes);
    return (
      <div>
        <details className="routeDetails">
          <summary className="d-flex justify-content-start">
            <small className="routeDetailsSmall">Завдання(маршрути)</small>
          </summary>
          {car.driver === "Автомобіль-агрегат" && (
            <div className="d-flex justify-content-between">
              <table className="routeHeadTable">
                <tbody>
                  <tr align="center">
                    <td width="51">
                      <small>№/м</small>
                    </td>
                    {windowWidth > 425 && (
                      <td width="65">
                        <small>Вибув</small>
                      </td>
                    )}
                    <td width="45" className="head">
                      <small>Пробіг</small>
                    </td>
                    {windowWidth > 200 && (
                      <td width="38">
                        <small>М/год</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="70">
                        <small>Прибув</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="42">
                        <small>К/шлях.</small>
                      </td>
                    )}
                    {windowWidth > 490 && (
                      <td width="65" className="head">
                        <small>Тип ПММ</small>
                      </td>
                    )}
                    {windowWidth > 320 && (
                      <td width="38" className="headStart">
                        <small>Було</small>
                      </td>
                    )}
                    {windowWidth > 280 && (
                      <td width="38" className="headAdd">
                        <small>Отрим.</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="38">
                        <small>К/витр.</small>
                      </td>
                    )}
                    {windowWidth >= 360 && (
                      <td width="40" className="headExpended">
                        <small>Витрач.</small>
                      </td>
                    )}
                    {windowWidth > 240 && (
                      <td width="40" className="headEnd">
                        <small>Залиш.</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="43">
                        <small>З вант.</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="48">
                        <small>Без вант</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="43">
                        <small>З прич.</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="43">
                        <small>На букс.</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="38">
                        <small>Г/місці</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="38">
                        <small>Г/русі</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="38">
                        <small>Прич,т</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="38">
                        <small>Вант,т</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="95">
                        <small>Куди</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="65">
                        <small>Вантаж</small>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {car.driver === "Автомобіль" && (
            <div className="d-flex justify-content-between">
              <table className="routeHeadTable">
                <tbody>
                  <tr align="center">
                    <td width="51">
                      <small>№/м</small>
                    </td>
                    {windowWidth > 520 && (
                      <td width="65">
                        <small>Вибув</small>
                      </td>
                    )}
                    <td width="45" className="head">
                      <small>Пробіг</small>
                    </td>
                    {windowWidth > 769 && (
                      <td width="65">
                        <small>Прибув</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="42">
                        <small>К/шлях.</small>
                      </td>
                    )}
                    {windowWidth > 450 && (
                      <td width="70" className="head">
                        <small>Тип ПММ</small>
                      </td>
                    )}
                    {windowWidth > 275 && (
                      <td width="50" className="headStart">
                        <small>Було</small>
                      </td>
                    )}
                    {windowWidth >= 320 && (
                      <td width="50" className="headAdd">
                        <small>Отрим.</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="45">
                        <small>К/витр.</small>
                      </td>
                    )}
                    {windowWidth >= 360 && (
                      <td width="50" className="headExpended">
                        <small>Витрач.</small>
                      </td>
                    )}
                    {windowWidth > 225 && (
                      <td width="50" className="headEnd">
                        <small>Залиш.</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="50">
                        <small>З вант.</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="50">
                        <small>Без вант</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="50">
                        <small>З прич.</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="50">
                        <small>На букс.</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="45">
                        <small>Прич,т</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="45">
                        <small>Вант,т</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="95">
                        <small>Куди</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="65">
                        <small>Вантаж</small>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {car.driver === "Агрегат" && (
            <div className="d-flex justify-content-between">
              <table className="routeHeadTable">
                <tbody>
                  <tr align="center">
                    <td width="71">
                      <small>№/м</small>
                    </td>
                    {windowWidth > 470 && (
                      <td width="90">
                        <small>Початок</small>
                      </td>
                    )}
                    <td width="60">
                      <small>Мотогодин</small>
                    </td>
                    {windowWidth > 769 && (
                      <td width="90">
                        <small>Закінчення</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="90" className="head">
                        <small>Тип ПММ</small>
                      </td>
                    )}
                    {windowWidth > 325 && (
                      <td width="60" className="headStart">
                        <small>Було</small>
                      </td>
                    )}
                    {windowWidth > 385 && (
                      <td width="60" className="headAdd">
                        <small>Отримано</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="70">
                        <small>Коєф.витрат</small>
                      </td>
                    )}
                    {windowWidth > 530 && (
                      <td width="60" className="headExpended">
                        <small>Витрачено</small>
                      </td>
                    )}
                    {windowWidth > 260 && (
                      <td width="65" className="headEnd">
                        <small>Залишилось</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="175" className="headEnd">
                        <small>Зауваження щодо роботи</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="175" className="headEnd">
                        <small>Мета роботи агрегату</small>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {car.driver === "Електроприлад" && (
            <div className="d-flex justify-content-between">
              <table className="routeHeadTable">
                <tbody>
                  <tr align="center">
                    <td width="100">
                      <small>Порядковий номер</small>
                    </td>
                    {windowWidth >= 360 && (
                      <td width="90">
                        <small>Початок роботи</small>
                      </td>
                    )}
                    {windowWidth > 270 && (
                      <td width="100" className="headEnd">
                        <small>Відпрац. годин</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="100">
                        <small>Закінчення роботи</small>
                      </td>
                    )}
                    {windowWidth > 470 && (
                      <td width="170">
                        <small>Зауваження щодо роботи</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="500">
                        <small>Мета роботи приладу, додаткова інформація</small>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <TransitionGroup component="ul" className="list-group">
            {newRoutes.map((route) => {
              let newListRoutes = newRoutes.filter(
                (rout) => rout.id !== route.id
              );
              let departureListDate = "";
              let arrivalListDate = "";
              if (newListRoutes.length === 0) {
                newListRoutes = [
                  {
                    routDate: "1970-01-01T00:00",
                    routArrival: "2070-01-01T00:00",
                  },
                ];
              } else {
                newListRoutes.sort(
                  (a, b) => new Date(a.routDate) - new Date(b.routDate)
                );
              }
              departureListDate = newListRoutes[0].routDate;
              arrivalListDate =
                newListRoutes[newListRoutes.length - 1].routArrival;

              let arrivalCarDate = "";
              let newCarRoutesSort = newCarRoutes.filter(
                (rout) => rout.id !== route.id
              );

              if (newCarRoutesSort.length === 0) {
                newCarRoutes = [
                  {
                    routDate: "1970-01-01T00:00",
                    routArrival: "2070-01-01T00:00",
                  },
                ];
              }
              newCarRoutes.sort(
                (a, b) => new Date(a.routDate) - new Date(b.routDate)
              );
              arrivalCarDate =
                newCarRoutes[newListRoutes.length - 1].routArrival;

              return (
                <CSSTransition key={route.id} classNames={"note"} timeout={800}>
                  <li id="innerLi" key={route.id} className="list-group-item">
                    {!route.openRoute && (
                      <div
                        id="routeTableBasis"
                        className="d-flex justify-content-between"
                      >
                        {car.driver === "Автомобіль-агрегат" && (
                          <table
                            className="routeTable"
                            onClick={() => {
                              openRoute(route);
                            }}
                          >
                            <tbody>
                              <tr align="center">
                                <td width="50">
                                  <small className="routeHead">
                                    {route.routNumber}
                                  </small>
                                </td>
                                {windowWidth > 425 && (
                                  <td width="64">
                                    <small className="routeHead">
                                      {`${moment(route.routDate).format(
                                        "DD.MM HH:mm"
                                      )}`}
                                    </small>
                                  </td>
                                )}
                                <td width="45" className="head">
                                  <small>{route.routeTotal}</small>
                                </td>
                                {windowWidth > 200 && (
                                  <td width="38">
                                    <small>{route.routTotalTime}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="70" className="routeHead">
                                    <small>{`${moment(route.routArrival).format(
                                      "DD.MM HH:mm"
                                    )}`}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="42">
                                    <small>{route.typeOfPavement}</small>
                                  </td>
                                )}
                                {windowWidth > 490 && (
                                  <td width="65" className="head">
                                    <small>{route.liquidName}</small>
                                  </td>
                                )}
                                {windowWidth > 320 && (
                                  <td width="38" className="headStart">
                                    <small>{route.balanceStart}</small>
                                  </td>
                                )}
                                {windowWidth > 280 && (
                                  <td width="38" className="headAdd">
                                    <small>{route.received}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="38">
                                    <small>{route.costCoefficient}</small>
                                  </td>
                                )}
                                {windowWidth >= 360 && (
                                  <td width="40" className="headExpended">
                                    <small>{route.expended}</small>
                                  </td>
                                )}
                                {windowWidth > 240 && (
                                  <td width="40" className="headEnd">
                                    <small>{route.balanceFinish}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="43">
                                    <small>{route.routeWithCargo}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="48">
                                    <small>{route.routeWithoutCargo}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="43">
                                    <small>{route.routeWithTrailer}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="43">
                                    <small>{route.routeInaTow}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="38">
                                    <small>{route.timeOnSite}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="38">
                                    <small>{route.timeInaMotion}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="38">
                                    <small>{route.trailerWeight}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="38">
                                    <small>{route.cargoWeight}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="95">
                                    <small>{route.routeTo}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="65">
                                    <small>{route.cargoName}</small>
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        )}
                        {car.driver === "Автомобіль" && (
                          <table
                            className="routeTable"
                            onClick={() => {
                              openRoute(route);
                            }}
                          >
                            <tbody>
                              <tr align="center">
                                <td width="50">
                                  <small className="routeHead">
                                    {route.routNumber}
                                  </small>
                                </td>
                                {windowWidth > 520 && (
                                  <td width="65">
                                    <small className="routeHead">
                                      {`${moment(route.routDate).format(
                                        "DD.MM HH:mm"
                                      )}`}
                                    </small>
                                  </td>
                                )}
                                <td width="45" className="head">
                                  <small>{route.routeTotal}</small>
                                </td>
                                {windowWidth > 769 && (
                                  <td width="65" className="routeHead">
                                    <small>{`${moment(route.routArrival).format(
                                      "DD.MM HH:mm"
                                    )}`}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="42">
                                    <small>{route.typeOfPavement}</small>
                                  </td>
                                )}
                                {windowWidth > 450 && (
                                  <td width="70" className="head">
                                    <small>{route.liquidName}</small>
                                  </td>
                                )}
                                {windowWidth > 275 && (
                                  <td width="50" className="headStart">
                                    <small>{route.balanceStart}</small>
                                  </td>
                                )}
                                {windowWidth >= 320 && (
                                  <td width="50" className="headAdd">
                                    <small>{route.received}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="45">
                                    <small>{route.costCoefficient}</small>
                                  </td>
                                )}
                                {windowWidth >= 360 && (
                                  <td width="50" className="headExpended">
                                    <small>{route.expended}</small>
                                  </td>
                                )}
                                {windowWidth > 225 && (
                                  <td width="50" className="headEnd">
                                    <small>{route.balanceFinish}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="50">
                                    <small>{route.routeWithCargo}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="50">
                                    <small>{route.routeWithoutCargo}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="50">
                                    <small>{route.routeWithTrailer}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="50">
                                    <small>{route.routeInaTow}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="45">
                                    <small>{route.trailerWeight}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="45">
                                    <small>{route.cargoWeight}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="95">
                                    <small>{route.routeTo}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="65">
                                    <small>{route.cargoName}</small>
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        )}
                        {car.driver === "Агрегат" && (
                          <table
                            className="routeTable"
                            onClick={() => {
                              openRoute(route);
                            }}
                          >
                            <tbody>
                              <tr align="center">
                                <td width="70">
                                  <small className="routeHead">
                                    {route.routNumber}
                                  </small>
                                </td>
                                {windowWidth > 470 && (
                                  <td width="90">
                                    <small className="routeHead">
                                      {`${moment(route.routDate).format(
                                        "DD.MM HH:mm"
                                      )}`}
                                    </small>
                                  </td>
                                )}
                                <td width="60">
                                  <small>{route.routTotalTime}</small>
                                </td>
                                {windowWidth > 769 && (
                                  <td width="90" className="routeHead">
                                    <small>{`${moment(route.routArrival).format(
                                      "DD.MM HH:mm"
                                    )}`}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="90" className="head">
                                    <small>{route.liquidName}</small>
                                  </td>
                                )}
                                {windowWidth > 325 && (
                                  <td width="60" className="headStart">
                                    <small>{route.balanceStart}</small>
                                  </td>
                                )}
                                {windowWidth > 385 && (
                                  <td width="60" className="headAdd">
                                    <small>{route.received}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="70">
                                    <small>{route.costCoefficient}</small>
                                  </td>
                                )}
                                {windowWidth > 530 && (
                                  <td width="60" className="headExpended">
                                    <small>{route.expended}</small>
                                  </td>
                                )}
                                {windowWidth > 260 && (
                                  <td width="65" className="headEnd">
                                    <small>{route.balanceFinish}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="175">
                                    <small>{route.routeTo}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="175">
                                    <small>{route.cargoName}</small>
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        )}
                        {car.driver === "Електроприлад" && (
                          <table
                            className="routeTable"
                            onClick={() => {
                              openRoute(route);
                            }}
                          >
                            <tbody>
                              <tr align="center">
                                <td width="100">
                                  <small className="routeHead">
                                    {route.routNumber}
                                  </small>
                                </td>
                                {windowWidth >= 360 && (
                                  <td width="90">
                                    <small className="routeHead">
                                      {`${moment(route.routDate).format(
                                        "DD.MM HH:mm"
                                      )}`}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 270 && (
                                  <td width="100" className="head">
                                    <small>{route.routTotalTime}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="100" className="routeHead">
                                    <small>{`${moment(route.routArrival).format(
                                      "DD.MM HH:mm"
                                    )}`}</small>
                                  </td>
                                )}
                                {windowWidth > 470 && (
                                  <td width="170">
                                    <small>{route.routeTo}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="500">
                                    <small>{route.cargoName}</small>
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        )}
                        {userInfo.company === userInfo.jointCompany && (
                          <button
                            id="deleteRouteBtn"
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                              firebase.removeRoute(route.id);
                              firebase.removeListRouteTime(
                                route,
                                list,
                                oldRoutes,
                                oldTimes,
                                departureListDate,
                                arrivalListDate
                              );
                              firebase.removeCarRouteTime(
                                route,
                                car,
                                oldCarRoutes,
                                oldCarTimes,
                                arrivalCarDate
                              );
                              setAlertText(
                                "Маршрут видалено! Для видалення листа необхідно видалити всі маршрути!"
                              );
                              setAlertClass("open");
                              setTimeout(() => {
                                setAlertClass("modal");
                              }, 1500);
                            }}
                          >
                            Х
                          </button>
                        )}
                      </div>
                    )}
                    <div className="clouseListFormBasis">
                      {route.openRoute && (
                        <table
                          className="clouseListForm"
                          onClick={() => closeRoute(route)}
                        >
                          <tbody>
                            <tr className="listTable">
                              <td>Закрити форму</td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </div>
                    {route.openRoute && (
                      <CreateRoute
                        car={car}
                        list={list}
                        route={route}
                        newRoutes={newRoutes}
                        newCarRoutes={newCarRoutes}
                        setAlertText={setAlertText}
                        setAlertClass={setAlertClass}
                        oldCarRoutes={oldCarRoutes}
                        oldCarTimes={oldCarTimes}
                        userInfo={userInfo}
                      />
                    )}
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          <div id="countRoutesGroup" className="d-flex justify-content-between">
            {windowWidth > 995 &&
              listLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headStart"> {liquid.balanceStart}</small>
                  </pre>
                );
              })}
            {windowWidth > 512 &&
              listLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headAdd"> {liquid.received}</small>
                  </pre>
                );
              })}
            {windowWidth > 770 &&
              listLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headExpended"> {liquid.expended}</small>
                  </pre>
                );
              })}
            {windowWidth > 335 &&
              listLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headEnd"> {liquid.balanceFinish}</small>
                  </pre>
                );
              })}
          </div>
          <div id="listButtonsGrup" className="d-flex justify-content-between">
            <button
              type="button"
              id="addListBtn"
              className="btn btn-outline-primary btn-sm"
              onClick={() => openNewRoute(list)}
              style={{ marginRight: 4 }}
            >
              Додати
            </button>
            <button
              type="button"
              id="closeListFormBtn"
              className="btn btn-outline-info btn-sm"
              onClick={() => closeNewRoute(list)}
              style={{ marginRight: 4 }}
            >
              Закрити
            </button>
          </div>
          {list.openRoute && (
            <CreateRoute
              car={car}
              list={list}
              newRoutes={newRoutes}
              newCarRoutes={newCarRoutes}
              setAlertText={setAlertText}
              setAlertClass={setAlertClass}
              oldCarRoutes={oldCarRoutes}
              oldCarTimes={oldCarTimes}
              userInfo={userInfo}
            />
          )}
        </details>
      </div>
    );
  }
);
