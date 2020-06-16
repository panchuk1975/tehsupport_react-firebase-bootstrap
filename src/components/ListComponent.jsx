import React, { memo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { NewListLiquidsCount } from "../mathfunctions/listFunctions";
import { CreateList } from "./CreateList";
import { RouteComponent } from "./RouteComponent";
import fire from "../config/Fire";
import "../CSS/ListCompStyle.scss";
var moment = require("moment");

export const ListComponent = memo(
  ({
    car,
    dates,
    routes,
    openNewList,
    clouseNewList,
    openNewRoute,
    closeNewRoute,
    openList,
    closeList,
    openRoute,
    closeRoute,
    windowWidth,
    setAlertClass,
    setAlertText,
    setFunct,
    setModalText,
    setModalClass,
    setId,
    newLists,
    changeListRouteTime,
    modalClass,
    carRoutes,
    listCarLiquids,
    userInfo,
  }) => {
    let dataListWarningText =
      "Видалення листа! Для видалення авто необхідно видалити всі листи!!!";
    let owner = fire.auth().currentUser.uid;
    let ownerDates = dates.find((date) => date.owner === owner);
    if (!ownerDates) {
      ownerDates = { 
          dateStart: "1970-01-01T00:00", 
          dateFinish: "2070-01-01T00:00" };
    }
    newLists = newLists.filter((list) => list.listDate >= ownerDates.dateStart);
    newLists = newLists.filter(
      (list) => list.listDate <= ownerDates.dateFinish
    );
    let newCarRoutes = routes.filter((route) => route.listOwner === car.id);
    return (
      <form>
        <details>
          <summary id="summary">
            <div
              id="summaryConteiner"
              className="d-flex justify-content-between"
            >
              <small id="small">Листи</small>
              {userInfo.company === userInfo.jointCompany && (
                <small id="small" className="smallEnd">
                  {car.objectPassword}
                </small>
              )}
            </div>
          </summary>
          <div className="d-flex justify-content-between">
            {car.driver === "Автомобіль-агрегат" && (
              <table className="headTable">
                <tbody>
                  <tr align="center">
                    <td width="51">
                      <small>№</small>
                    </td>
                    <td width="58">
                      <small>Дата</small>
                    </td>
                    {windowWidth > 995 && (
                      <td width="52">
                        <small>Км</small>
                      </td>
                    )}
                    {windowWidth > 226 && (
                      <td width="52">
                        <small>Км+</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="52">
                        <small>Год</small>
                      </td>
                    )}
                    {windowWidth > 280 && (
                      <td width="52">
                        <small>Год+</small>
                      </td>
                    )}
                    {windowWidth > 333 && (
                      <td width="52">
                        <small>Пробіг</small>
                      </td>
                    )}
                    {windowWidth > 383 && (
                      <td width="52">
                        <small>М/год</small>
                      </td>
                    )}
                    {windowWidth > 490 && (
                      <td width="107">
                        <small>Водій</small>
                      </td>
                    )}
                    {windowWidth > 767 && (
                      <td width="107">
                        <small>Старший</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="103">
                        <small>Звідки</small>
                      </td>
                    )}
                    {windowWidth > 767 && (
                      <td width="103">
                        <small>Куди</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="102">
                        <small>Вибув</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="102">
                        <small>Прибув</small>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            )}
            {car.driver === "Автомобіль" && (
              <table className="headTable">
                <tbody>
                  <tr align="center">
                    <td width="60">
                      <small>№</small>
                    </td>
                    <td width="60">
                      <small>Дата</small>
                    </td>

                    {windowWidth > 245 && (
                      <td width="55">
                        <small>Км</small>
                      </td>
                    )}
                    {windowWidth > 300 && (
                      <td width="55">
                        <small>Км+</small>
                      </td>
                    )}
                    {windowWidth > 340 && (
                      <td width="40">
                        <small>Пробіг</small>
                      </td>
                    )}
                    {windowWidth > 440 && (
                      <td width="100">
                        <small>Початий</small>
                      </td>
                    )}
                    {windowWidth > 540 && (
                      <td width="100">
                        <small>Закінчений</small>
                      </td>
                    )}
                    {windowWidth > 770 && (
                      <td width="130">
                        <small>Водій</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="130">
                        <small>Старший</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="170">
                        <small>Звідки(зауваження)</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="170">
                        <small>Куди(мета)</small>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            )}
            {car.driver === "Агрегат" && (
              <table className="headTable">
                <tbody>
                  <tr align="center">
                    <td width="60">
                      <small>№</small>
                    </td>
                    <td width="60">
                      <small>Дата</small>
                    </td>

                    {windowWidth > 245 && (
                      <td width="55">
                        <small>Год</small>
                      </td>
                    )}
                    {windowWidth > 300 && (
                      <td width="55">
                        <small>Год+</small>
                      </td>
                    )}
                    {windowWidth > 340 && (
                      <td width="40">
                        <small>М/год</small>
                      </td>
                    )}
                    {windowWidth > 440 && (
                      <td width="100">
                        <small>Початий</small>
                      </td>
                    )}
                    {windowWidth > 540 && (
                      <td width="100">
                        <small>Закінчений</small>
                      </td>
                    )}
                    {windowWidth > 770 && (
                      <td width="140">
                        <small>Старший</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="280">
                        <small>Проблеми та зауваження</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="180">
                        <small>Призначення(мета)</small>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            )}
            {car.driver === "Електроприлад" && (
              <table className="headTable">
                <tbody>
                  <tr align="center">
                    <td width="60">
                      <small>№</small>
                    </td>
                    <td width="60">
                      <small>Дата</small>
                    </td>

                    {windowWidth > 245 && (
                      <td width="55">
                        <small>Год</small>
                      </td>
                    )}
                    {windowWidth > 300 && (
                      <td width="55">
                        <small>Год+</small>
                      </td>
                    )}
                    {windowWidth > 340 && (
                      <td width="40">
                        <small>М/год</small>
                      </td>
                    )}
                    {windowWidth > 440 && (
                      <td width="100">
                        <small>Початий</small>
                      </td>
                    )}
                    {windowWidth > 540 && (
                      <td width="100">
                        <small>Закінчений</small>
                      </td>
                    )}
                    {windowWidth > 770 && (
                      <td width="140">
                        <small>Старший</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="280">
                        <small>Проблеми та зауваження</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="180">
                        <small>Призначення(мета)</small>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <TransitionGroup component="ul" className="list-group">
            {newLists.map((list) => {
              let newRoutes = routes.filter(
                (route) => route.routeOwner === list.id
              );
              newRoutes.sort((a, b) => a.routNumber - b.routNumber);
              let listLiquids = NewListLiquidsCount(newRoutes);
              return (
                <CSSTransition key={list.id} classNames={"note"} timeout={800}>
                  <li id="innerLi" key={list.id} className="list-group-item">
                    {!list.openList && (
                      <div key={list.id} className="listBasis">
                        <div className="d-flex justify-content-between">
                          {car.driver === "Автомобіль-агрегат" && (
                            <table
                              className="listTable"
                              onClick={() => openList(list)}
                            >
                              <tbody>
                                <tr align="center">
                                  <td width="50" className="head">
                                    <small>{list.listNumber}</small>
                                  </td>
                                  <td width="58" className="head">
                                    <small>{`${moment(list.listDate).format(
                                      "DD.MM.YY"
                                    )}`}</small>
                                  </td>
                                  {windowWidth > 995 && (
                                    <td width="52">
                                      <small>{list.indicatorListStart}</small>
                                    </td>
                                  )}
                                  {windowWidth > 226 && (
                                    <td width="52">
                                      <small>{list.indicatorListFinish}</small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="52">
                                      <small>{list.timeListFirst}</small>
                                    </td>
                                  )}
                                  {windowWidth > 280 && (
                                    <td width="52">
                                      <small>{list.timeListLast}</small>
                                    </td>
                                  )}
                                  {windowWidth > 333 && (
                                    <td width="52">
                                      <small>{list.totalListMileage}</small>
                                    </td>
                                  )}
                                  {windowWidth > 383 && (
                                    <td width="52">
                                      <small>{list.timeListTotal}</small>
                                    </td>
                                  )}
                                  {windowWidth > 490 && (
                                    <td width="107">
                                      <small>{list.driverName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 767 && (
                                    <td width="107">
                                      <small>{list.seniorName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="103">
                                      <small>{list.listRouteFrom}</small>
                                    </td>
                                  )}
                                  {windowWidth > 767 && (
                                    <td width="103">
                                      <small>{list.listRouteTo}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1205 && (
                                    <td width="102">
                                      <small>{`${moment(list.departure).format(
                                        "DD.MM.YY HH.mm"
                                      )}`}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1205 && (
                                    <td width="102">
                                      <small>{`${moment(list.arrival).format(
                                        "DD.MM.YY HH.mm"
                                      )}`}</small>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          )}
                          {car.driver === "Автомобіль" && (
                            <table
                              className="listTable"
                              onClick={() => openList(list)}
                            >
                              <tbody>
                                <tr align="center">
                                  <td width="60" className="head">
                                    <small>{list.listNumber}</small>
                                  </td>
                                  <td width="60" className="head">
                                    <small>{`${moment(list.listDate).format(
                                      "DD.MM.YY"
                                    )}`}</small>
                                  </td>
                                  {windowWidth > 245 && (
                                    <td width="55">
                                      <small>{list.indicatorListStart}</small>
                                    </td>
                                  )}
                                  {windowWidth > 300 && (
                                    <td width="55">
                                      <small>{list.indicatorListFinish}</small>
                                    </td>
                                  )}
                                  {windowWidth > 340 && (
                                    <td width="40">
                                      <small>{list.totalListMileage}</small>
                                    </td>
                                  )}
                                  {windowWidth > 440 && (
                                    <td width="100">
                                      <small>{`${moment(list.departure).format(
                                        "DD.MM.YY HH.mm"
                                      )}`}</small>
                                    </td>
                                  )}
                                  {windowWidth > 540 && (
                                    <td width="100">
                                      <small>{`${moment(list.arrival).format(
                                        "DD.MM.YY HH.mm"
                                      )}`}</small>
                                    </td>
                                  )}
                                  {windowWidth > 770 && (
                                    <td width="130">
                                      <small>{list.driverName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="130">
                                      <small>{list.seniorName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1205 && (
                                    <td width="170">
                                      <small>{list.listRouteFrom}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1205 && (
                                    <td width="170">
                                      <small>{list.listRouteTo}</small>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          )}
                          {car.driver === "Агрегат" && (
                            <table
                              className="listTable"
                              onClick={() => openList(list)}
                            >
                              <tbody>
                                <tr align="center">
                                  <td width="60" className="head">
                                    <small>{list.listNumber}</small>
                                  </td>
                                  <td width="60" className="head">
                                    <small>{`${moment(list.listDate).format(
                                      "DD.MM.YY"
                                    )}`}</small>
                                  </td>
                                  {windowWidth > 245 && (
                                    <td width="55">
                                      <small>{list.timeListFirst}</small>
                                    </td>
                                  )}
                                  {windowWidth > 300 && (
                                    <td width="55">
                                      <small>{list.timeListLast}</small>
                                    </td>
                                  )}
                                  {windowWidth > 340 && (
                                    <td width="40">
                                      <small>{list.timeListTotal}</small>
                                    </td>
                                  )}
                                  {windowWidth > 440 && (
                                    <td width="100">
                                      <small>{`${moment(list.departure).format(
                                        "DD.MM.YY HH.mm"
                                      )}`}</small>
                                    </td>
                                  )}
                                  {windowWidth > 540 && (
                                    <td width="100">
                                      <small>{`${moment(list.arrival).format(
                                        "DD.MM.YY HH.mm"
                                      )}`}</small>
                                    </td>
                                  )}
                                  {windowWidth > 770 && (
                                    <td width="140">
                                      <small>{list.seniorName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="280">
                                      <small>{list.listRouteFrom}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1205 && (
                                    <td width="180">
                                      <small>{list.listRouteTo}</small>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          )}
                          {car.driver === "Електроприлад" && (
                            <table
                              className="listTable"
                              onClick={() => openList(list)}
                            >
                              <tbody>
                                <tr align="center">
                                  <td width="60" className="head">
                                    <small>{list.listNumber}</small>
                                  </td>
                                  <td width="60" className="head">
                                    <small>{`${moment(list.listDate).format(
                                      "DD.MM.YY"
                                    )}`}</small>
                                  </td>
                                  {windowWidth > 245 && (
                                    <td width="55">
                                      <small>{list.timeListFirst}</small>
                                    </td>
                                  )}
                                  {windowWidth > 300 && (
                                    <td width="55">
                                      <small>{list.timeListLast}</small>
                                    </td>
                                  )}
                                  {windowWidth > 340 && (
                                    <td width="40">
                                      <small>{list.timeListTotal}</small>
                                    </td>
                                  )}
                                  {windowWidth > 440 && (
                                    <td width="100">
                                      <small>{`${moment(list.departure).format(
                                        "DD.MM.YY HH.mm"
                                      )}`}</small>
                                    </td>
                                  )}
                                  {windowWidth > 540 && (
                                    <td width="100">
                                      <small>{`${moment(list.arrival).format(
                                        "DD.MM.YY HH.mm"
                                      )}`}</small>
                                    </td>
                                  )}
                                  {windowWidth > 770 && (
                                    <td width="140">
                                      <small>{list.seniorName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="280">
                                      <small>{list.listRouteFrom}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1205 && (
                                    <td width="180">
                                      <small>{list.listRouteTo}</small>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          )}
                          {!list.openList &
                            !newRoutes.length &
                            (userInfo.company === userInfo.jointCompany) &
                            (userInfo.owner === car.owner) && (
                            <button
                              id="deleteListBtn"
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setId(list.id);
                                setFunct("removeList");
                                setModalText(dataListWarningText);
                                setModalClass();
                              }}
                            >
                              Х
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="clouseListFormBasis">
                        {list.openList && (
                          <table
                            className="clouseListForm"
                            onClick={() => closeList(list)}
                          >
                            <tbody>
                              <tr className="listTable">
                                <td>Закрити форму листа</td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </div>
                      {list.openList && (
                        <CreateList
                          car={car}
                          list={list}
                          setAlertText={setAlertText}
                          setAlertClass={setAlertClass}
                          newLists={newLists}
                          userInfo={userInfo}
                        />
                      )}
                    </div>
                    <RouteComponent
                      car={car}
                      list={list}
                      setId={setId}
                      newRoutes={newRoutes}
                      newCarRoutes={newCarRoutes}
                      openRoute={openRoute}
                      closeRoute={closeRoute}
                      openNewRoute={openNewRoute}
                      closeNewRoute={closeNewRoute}
                      setFunct={setFunct}
                      setModalClass={setModalClass}
                      setModalText={setModalText}
                      windowWidth={windowWidth}
                      setAlertText={setAlertText}
                      setAlertClass={setAlertClass}
                      listLiquids={listLiquids}
                      changeListRouteTime={changeListRouteTime}
                      modalClass={modalClass}
                      carRoutes={carRoutes}
                      clouseNewList={clouseNewList}
                      userInfo={userInfo}
                    />
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          <div id="countRoutesGroup" className="d-flex justify-content-between">
            {windowWidth > 995 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headStart"> {liquid.balanceStart}</small>
                  </pre>
                );
              })}
            {windowWidth > 512 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headAdd"> {liquid.received}</small>
                  </pre>
                );
              })}
            {windowWidth > 770 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headExpended"> {liquid.expended}</small>
                  </pre>
                );
              })}
            {windowWidth > 335 &&
              listCarLiquids.map((liquid) => {
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
              onClick={() => openNewList(car)}
              style={{ marginRight: 4 }}
            >
              + Лист
            </button>
            <button
              type="button"
              id="closeListFormBtn"
              className="btn btn-outline-info btn-sm"
              onClick={() => clouseNewList(car)}
              style={{ marginRight: 4 }}
            >
              Закрити
            </button>
          </div>
          {car.openList && (
            <CreateList
              car={car}
              setAlertText={setAlertText}
              setAlertClass={setAlertClass}
              newLists={newLists}
              userInfo={userInfo}
            />
          )}
        </details>
      </form>
    );
  }
);
