import React, { useState, useContext } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import {
  expendedWithoutCargo,
  addedExpendedWithCargo,
  addedExpendedWithTreiler,
  expendedWithTotalTime,
  routeBalanceStart,
} from "../mathfunctions/routeFunctions";
import {
  CommonListRoute,
  CommonListTime,
} from "../mathfunctions/listFunctions";
import "../CSS/CreateRouteStyle.scss";
var moment = require("moment");

export const CreateRoute = ({
  car,
  list,
  route,
  newRoutes,
  newCarRoutes,
  setAlertClass,
  setAlertText,
  oldCarRoutes,
  oldCarTimes,
  userInfo,
}) => {
  const firebase = useContext(FirebaseContext);
  let initialForm = {};
  if (!route) {
    let nextNumber =
      Number(list.listNumber) +
      Math.round((newRoutes.length / 100 + 0.01) * 100) / 100;
    initialForm = {
      routNumber: nextNumber,
      routDate: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      routeTotal: 0,
      routTotalTime: 0,
      routArrival: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      typeOfPavement: 1,
      liquidName: "",
      balanceStart: 0,
      received: 0,
      costCoefficient: 1,
      expended: 0,
      balanceFinish: 0,
      cargoCoefficient: 0.02,
      routeWithCargo: 0,
      routeWithoutCargo: 0,
      routeWithTrailer: 0,
      routeInaTow: 0,
      timeOnSite: 0,
      timeInaMotion: 0,
      trailerWeight: 0,
      cargoWeight: 0,
      routeWithRoute: 0,
      timeWithTime: 0,
      routeTo: "ППД",
      density: 1,
      cargoName: "Відсутній",
      openRoute: false,
      routeCost: car.fuelActiveСonsumption,
      timeCost: car.fuelPassiveСonsumption,
    };
  } else {
    initialForm = {
      ...route,
      openRoute: false,
    };
  }
  let [form, setForm] = useState({ ...initialForm });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  form.expended =
    parseInt(
      (expendedWithoutCargo(form) +
        addedExpendedWithCargo(form) +
        addedExpendedWithTreiler(form) +
        expendedWithTotalTime(form)) *
        100
    ) / 100;
  form.balanceFinish =
    Math.round(
      (Number(routeBalanceStart(form)) - Number(form.expended)) * 100
    ) / 100;
  form.timeOnSite =
    Math.round(
      (Number(form.routTotalTime) - Number(form.timeInaMotion)) * 100
    ) / 100;
  form.routeWithoutCargo =
    Number(form.routeTotal) - Number(form.routeWithCargo);
  let oldRoutes = Math.round(CommonListRoute(newRoutes) * 100) / 100;
  let oldTimes = Math.round(CommonListTime(newRoutes) * 100) / 100;
  let newListRoutes = [];
  let departureListDate = "";
  let arrivalListDate = "";
  if (newRoutes.length === 0) {
    newListRoutes = [
      {
        routDate: "1970-01-01T00:00",
        routArrival: "2070-01-01T00:00",
      },
    ];
  }
  newListRoutes = newRoutes.concat([form]);
  newListRoutes.sort((a, b) => new Date(a.routDate) - new Date(b.routDate));
  departureListDate = newListRoutes[0].routDate;
  arrivalListDate = newListRoutes[newListRoutes.length - 1].routArrival;

  let arrivalCarDate = "";
  if (newCarRoutes.length === 0) {
    newCarRoutes = [
      {
        routDate: "1970-01-01T00:00",
        routArrival: "2070-01-01T00:00",
      },
    ];
  }
  newCarRoutes = newRoutes.concat([form]);
  newCarRoutes.sort((a, b) => new Date(a.routDate) - new Date(b.routDate));
  arrivalCarDate = newCarRoutes[newListRoutes.length - 1].routArrival;
  const createHandler = (event) => {
    let isRouteExists = !!newRoutes.filter(
      // eslint-disable-next-line
      (route) => Number(route.routNumber) == Number(form.routNumber)
    ).length;
    !form.routDate && setAlertText("Дата маршруту обовязкова!");
    !form.routNumber && setAlertText("Номер маршруту обовязковий!");
    !form.routDate && setAlertClass("open");
    !form.routNumber && setAlertClass("open");
    event.preventDefault();
    if (form.routNumber) {
      if (form.routDate) {
        if (!route) {
          if (!isRouteExists) {
            if (userInfo.company === userInfo.jointCompany) {
              firebase
                .addRoute(form, car, list)
                .then(() => {
                  firebase.changeListRouteTime(
                    form,
                    list,
                    oldRoutes,
                    oldTimes,
                    departureListDate,
                    arrivalListDate
                  );
                  firebase.addCarRouteTime(
                    form,
                    car,
                    oldCarRoutes,
                    oldCarTimes,
                    arrivalCarDate
                  );
                })
                .catch(() => {
                  setAlertText("Ошибка сервера!");
                  setAlertClass("open");
                });
            } else {
              setAlertText("У Вас відсутні права вносити зміни в документи!");
              setAlertClass("open");
              return;
            }
          } else {
            setAlertText("Такий маршрут вже існує!");
            setAlertClass("open");
            return;
          }
        } else {
          if (userInfo.company === userInfo.jointCompany) {
            firebase
              .closeRoute(form)
              .then(() => {
                firebase.rewriteListRouteTime(
                  form,
                  route,
                  list,
                  oldRoutes,
                  oldTimes,
                  departureListDate,
                  arrivalListDate
                );
                firebase.rewriteCarRouteTime(
                  form,
                  route,
                  car,
                  oldCarRoutes,
                  oldCarTimes,
                  arrivalCarDate
                );
              })
              .catch(() => {
                setAlertText("Ошибка сервера!");
                setAlertClass("open");
              });
          } else {
            setAlertText("У Вас відсутні права вносити зміни в документи!");
            setAlertClass("open");
            return;
          }
        }
        if (!route) {
          setAlertText("Новий маршрут створено!");
          setAlertClass("open");
        } else {
          setAlertText("Маршрут збережено!");
          setAlertClass("open");
        }
        setTimeout(() => {
          setAlertClass("modal");
        }, 1000);
      }
    }
  };
  return (
    <div id="CreateRouteStyle">
      <div>
        <div className="d-flex  flex-wrap justify-content-between">
          <div className="form-group">
            <label htmlFor="routNumber">
              <small>Номер</small>
            </label>
            <input
              id="important"
              type="number"
              className="form-control"
              placeholder="Номер"
              value={form.routNumber}
              name="routNumber"
              onChange={changeHandler}
              required
            />
          </div>
          <div id="datetime-local" className="form-group">
            <label htmlFor="routDate">
              <small>Час початку</small>
            </label>
            <input
              id="createRouteDate"
              type="datetime-local"
              className="form-control"
              placeholder="Час початку"
              value={form.routDate}
              name="routDate"
              onChange={changeHandler}
              required
            />
          </div>
          <div id="datetime-local" className="form-group">
            <label htmlFor="routArrival">
              <small>Час закінчення</small>
            </label>
            <input
              id="createRouteDate"
              type="datetime-local"
              className="form-control"
              placeholder="Час закінчення"
              value={form.routArrival}
              name="routArrival"
              onChange={changeHandler}
            />
          </div>
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="routeTotal">
                <small>Загальний пробіг</small>
              </label>
              <input
                id="important"
                type="text"
                className="form-control"
                placeholder="Загальний пробіг"
                value={form.routeTotal}
                name="routeTotal"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Електроприлад" ||
            car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="routTotalTime">
                <small>Мотогодин</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="Мотогодин"
                value={form.routTotalTime}
                name="routTotalTime"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="routeWithRoute">
                <small>Без обліку пробігу</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Без обліку пробігу"
                value={form.routeWithRoute}
                name="routeWithRoute"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Електроприлад" ||
            car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="timeWithTime">
                <small>Без обліку часу</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Без обліку часу"
                value={form.timeWithTime}
                name="timeWithTime"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="typeOfPavement">
                <small>Коефіцієнт шляху</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="Коефіцієнт шляху"
                value={form.typeOfPavement}
                name="typeOfPavement"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="liquidName">
                <small>Тип ПММ</small>
              </label>
              <input
                id="important"
                type="text"
                className="form-control"
                placeholder="Тип ПММ"
                value={form.liquidName}
                name="liquidName"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="balanceStart">
                <small>Було ПММ</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="Було ПММ"
                value={form.balanceStart}
                name="balanceStart"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="received">
                <small>Отримано ПММ</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="Отримано ПММ"
                value={form.received}
                name="received"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="costCoefficient">
                <small>Коефіцієнт витрати</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="Коефіцієнт витрати"
                value={form.costCoefficient}
                name="costCoefficient"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="expended">
                <small>Витрачено ПММ</small>
              </label>
              <input
                id="danger"
                type="number"
                className="form-control"
                placeholder="Витрачено ПММ"
                value={form.expended}
                name="expended"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="balanceFinish">
                <small>Залишок ПММ</small>
              </label>
              <input
                id="danger"
                type="number"
                className="form-control"
                placeholder="Залишок ПММ"
                value={form.balanceFinish}
                name="balanceFinish"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="cargoCoefficient">
                <small>Коеф. завантаження</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="Коеф. завантаж."
                value={form.cargoCoefficient}
                name="cargoCoefficient"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="routeWithCargo">
                <small>Пробіг з вантажем</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Пробіг з вантажем"
                value={form.routeWithCargo}
                name="routeWithCargo"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="routeWithoutCargo">
                <small>Пробіг без вантажу</small>
              </label>
              <input
                id="danger"
                type="number"
                className="form-control"
                placeholder="Пробіг без вантажу"
                value={form.routeWithoutCargo}
                name="routeWithoutCargo"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="routeWithTrailer">
                <small>Пробіг з причепом</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Пробіг з причепом"
                value={form.routeWithTrailer}
                name="routeWithTrailer"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="routeInaTow">
                <small>Пробіг на буксирі</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Пробіг на буксирі"
                value={form.routeInaTow}
                name="routeInaTow"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="timeOnSite">
                <small>Годин на місці</small>
              </label>
              <input
                id="danger"
                type="number"
                className="form-control"
                placeholder="Годин на місці"
                value={form.timeOnSite}
                name="timeOnSite"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="timeInaMotion">
                <small>Годин в русі</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Годин в русі"
                value={form.timeInaMotion}
                name="timeInaMotion"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="trailerWeight">
                <small>Вага причепу, т</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Вага причепа"
                value={form.trailerWeight}
                name="trailerWeight"
                onChange={changeHandler}
              />
            </div>
          )}
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="cargoWeight">
                <small>Вага вантажу, т</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Вага вантажу"
                value={form.cargoWeight}
                name="cargoWeight"
                onChange={changeHandler}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="routeTo">
              <small>Мета(результат)</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Кінцева(результат)"
              value={form.routeTo}
              name="routeTo"
              onChange={changeHandler}
            />
          </div>
          {(car.driver === "Автомобіль" ||
            car.driver === "Автомобіль-агрегат" ||
            car.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="density">
                <small>Щільність</small>
              </label>
              <input
                id="important"
                type="text"
                className="form-control"
                placeholder="Щільність"
                value={form.density}
                name="density"
                onChange={changeHandler}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="cargoName">
              <small>Назва(мета)</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Назва(мета)"
              value={form.cargoName}
              name="cargoName"
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          id="createRouteBtn"
          className="btn btn-success"
          value="Enter"
          name="submit"
          onClick={createHandler}
        >
          {!route && "Створити новий маршрут"}
          {route && "Зберегти дані"}
        </button>
      </div>
    </div>
  );
};
