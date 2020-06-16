import React, { memo, useState, useContext } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { ModalBox } from "./ModalBox";
import { AlertBox } from "./AlertBox";
import { CountStartDensity } from "../mathfunctions/liquidsFunctions";
import { ExportReactCSV } from "../mathfunctions/liquidsFunctions";
import "../CSS/LiqCompStyle.scss";

export const LiquidsComponent = memo(
  ({
    ownerRoutes,
    listLiquids,
    ownerDates,
    liquidWidth,
    ownerAllLists,
    ownerAllRoutes,
  }) => {
    const firebase = useContext(FirebaseContext);
    let [modalClass, setClass] = useState("modal");
    let [textModal, setModalText] = useState();
    let [Id, setId] = useState();
    let setModalClass = () => {
      if ((modalClass = "modal")) {
        setClass("open");
      } else {
        setClass("modal");
      }
    };
    let [alertClass, setAlertClass] = useState("modal");
    let [alertText, setAlertText] = useState("");
    let [form, setForm] = useState({
      ...ownerDates,
    });
    if (Object.keys(form).length === 0) {
      form = JSON.parse(localStorage.getItem("date"));
    } else {
      localStorage.setItem("date", JSON.stringify(form));
    }
    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };
    //------------------------Set deleted Data-----------------------//
    let holdTime = new Date();
    let requiredHoldTime = new Date();
    holdTime.setMonth(holdTime.getMonth() - Number(form.dateOfEnd));
    requiredHoldTime.setMonth(holdTime.getMonth() - 36);
    //----------------------Set deleted old Items--------------------//
    let routesForRemove = [];
    let listsForRemove = [];
    if (Number(form.dateOfEnd) > 36) {
      routesForRemove = ownerAllRoutes.filter(
        (route) => Date.parse(route.routArrival) < Date.parse(requiredHoldTime)
      );
      if (routesForRemove.length === 0) {
        routesForRemove = ownerAllRoutes.filter(
          (route) => Date.parse(route.routDate) < Date.parse(requiredHoldTime)
        );
      }
      listsForRemove = ownerAllLists.filter(
        (list) => Date.parse(list.listDate) < Date.parse(requiredHoldTime)
      );
    } else {
      routesForRemove = ownerAllRoutes.filter(
        (route) => Date.parse(route.routArrival) < Date.parse(holdTime)
      );
      if (routesForRemove.length === 0) {
        routesForRemove = ownerAllRoutes.filter(
          (route) => Date.parse(route.routDate) < Date.parse(holdTime)
        );
      }
      listsForRemove = ownerAllLists.filter(
        (list) => Date.parse(list.listDate) < Date.parse(holdTime)
      );
    }
    //----------------------------Set Date---------------------------//
    const createHandler = (event) => {
      event.preventDefault();
      if (routesForRemove.length !== 0) {
        setId(event);
        setModalText(dataWarningText);
        setModalClass();
      }
      if (listsForRemove.length !== 0) {
        setId(event);
        setModalText(dataWarningText);
        setModalClass();
      }
      if (!ownerDates) {
        firebase
          .addDates({ ...form })
          .then(() => {})
          .catch(() => {
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Дату встановлено!");
        setAlertClass("open");
      } else {
        firebase
          .changeDates({ ...form })
          .then(() => {})
          .catch(() => {
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Дату змінено!");
        setAlertClass("open");
      }
      setTimeout(() => {
        setAlertClass("modal");
      }, 1000);
    };
    //------------------------Delete Old Data-----------------------//
    const deleteHandler = (event) => {
      event.preventDefault();
      routesForRemove.forEach((element) => {
        firebase
          .removeRoute(element.id)
          .then(() => {})
          .catch(() => {
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Маршрути успішно видалено!");
        setAlertClass("open");
      });
      listsForRemove.forEach((element) => {
        firebase
          .removeList(element.id)
          .then(() => {})
          .catch(() => {
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Застарілі дані успішно видалено!");
        setAlertClass("open");
      });
      setTimeout(() => {
        setAlertClass("modal");
      }, 1000);
    };
    let newCarLiquidsInfo = [];
    let dataWarningText =
      "У вас є застарілі дані, необхідно видалити їх та звільніти місце!";
    let dataWarningThanksText =
      "Дякуємо за видалення застарілих даних, ви звільнили додаткове місце!";
    return (
      <div>
        <div id="2345" className="createTimeLiquidsBasis">
          <div className="d-flex flex-wrap justify-content-around">
            <div className="form-group">
              <label htmlFor="dateStart">
                <small>Початкова дата</small>
              </label>
              <input
                id="important"
                type="date"
                className="form-control"
                placeholder="Початкова дата"
                value={form.dateStart || ""}
                name="dateStart"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateFinish">
                <small>Кінцева дата</small>
              </label>
              <input
                id="important"
                type="date"
                className="form-control"
                placeholder="Кінцева дата"
                value={form.dateFinish || ""}
                name="dateFinish"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfEnd">
                <small>Час зберігання,міс</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="Період зберігання,міс"
                value={form.dateOfEnd}
                name="dateOfEnd"
                onChange={changeHandler}
              />
            </div>
            <div className="createDateBtnConteiner">
              <button
                id="createDateBtn"
                className="btn btn-success"
                value="Дата"
                name="submit"
                onClick={createHandler}
              >
                <small>Зберегти</small>
              </button>
            </div>
            <div className="createDateBtnConteiner">
              <button
                id="createDateBtn"
                className="btn btn-danger"
                value="Дата"
                name="submit"
                onClick={(event) => {
                  setId(event);
                  setModalText(dataWarningThanksText);
                  setModalClass();
                }}
              >
                <small>Очистити</small>
              </button>
            </div>
          </div>
        </div>
        <div
          id="liquidsConteiner"
          className="d-flex flex-wrap justify-content-around"
        >
          {listLiquids.map((liquid) => {
            ownerRoutes.sort((a, b) => a.routeDate - b.routeDate);
            let liquidDensities = CountStartDensity(ownerRoutes, liquid);
            let firstDensity = Number(liquidDensities[0]);
            if (!firstDensity) {
              firstDensity = 1;
            }
            let endDensity = Number(
              liquidDensities[liquidDensities.length - 1]
            );
            if (!endDensity) {
              endDensity = 1;
            }
            let balanceStartWeight =
              parseInt(liquid.balanceStart * firstDensity * 100) / 100;
            let balanceReceivedWeight =
              parseInt(liquid.received * endDensity * 100) / 100;
            let balanceExpendedWeight =
              parseInt(liquid.expended * endDensity * 100) / 100;
            let balanceFinishWeight =
              parseInt(liquid.balanceFinish * endDensity * 100) / 100;
            if (liquid.name === "") {
              return null;
            }
            let newCarLiquid = {};
            newCarLiquid = {
              "Тип ПММ": liquid.name,
              "Було,л": liquid.balanceStart,
              "Отримано,л": liquid.received,
              "Витрачено,л": liquid.expended,
              "Залишок,л": liquid.balanceFinish,
              "Було,кг": balanceStartWeight,
              "Отримано,кг": balanceReceivedWeight,
              "Витрачено,кг": balanceExpendedWeight,
              "Залишок,кг": balanceFinishWeight,
            };
            newCarLiquidsInfo = newCarLiquidsInfo.concat(newCarLiquid);
            return (
              <div
                key={liquid.name}
                className="createLiquidsBasis"
                width={{ liquidWidth }}
              >
                <div>
                  <div id="liquidNameCol">
                    <pre className="liquidName">
                      <small>{firstDensity} </small>
                      {liquid.name}
                      <small> {endDensity}</small>
                    </pre>
                  </div>
                  <table id="liquidTable">
                    <tbody>
                      <tr id="headLiquidTable">
                        <td>
                          <small className="liquidbalanceStart">Було</small>
                        </td>
                        <td>
                          <small className="liquidbalanceRecived">Отрим.</small>
                        </td>
                        <td>
                          <small className="liquidbalanceExpended">
                            Витрач.
                          </small>
                        </td>
                        <td>
                          <small className="liquidbalanceFinish">Залиш.</small>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <small className="liquidbalanceStart">
                            {liquid.balanceStart}
                          </small>
                        </td>
                        <td>
                          <small className="liquidbalanceRecived">
                            {liquid.received}
                          </small>
                        </td>
                        <td>
                          <small className="liquidbalanceExpended">
                            {liquid.expended}
                          </small>
                        </td>
                        <td>
                          <small className="liquidbalanceFinish">
                            {liquid.balanceFinish}
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <small className="liquidbalanceStart">
                            {balanceStartWeight}
                          </small>
                        </td>
                        <td>
                          <small className="liquidbalanceRecived">
                            {balanceReceivedWeight}
                          </small>
                        </td>
                        <td>
                          <small className="liquidbalanceExpended">
                            {balanceExpendedWeight}
                          </small>
                        </td>
                        <td>
                          <small className="liquidbalanceFinish">
                            {balanceFinishWeight}
                          </small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
        <ExportReactCSV
          csvData={newCarLiquidsInfo}
          fileName={"Сум.ПММ"}
          textCSV="EXEL з ПММ"
        />
        <ModalBox
          modalClass={modalClass}
          modalText={textModal}
          modalFunction={setClass}
          Id={Id}
          innerFunction={deleteHandler}
        />
        <AlertBox
          modalClass={alertClass}
          modalText={alertText}
          modalFunction={setAlertClass}
        />
      </div>
    );
  }
);
