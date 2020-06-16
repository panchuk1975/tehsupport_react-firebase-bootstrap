import React, { useContext, useState, memo } from "react";
import { NavLink } from "react-router-dom";
import fire from "../config/Fire";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import "../CSS/NavbarStyle.scss";

export const Navbar = memo(() => {
  const [showBtn, setBtn] = useState("item");
  let logout = () => {
    fire.auth().signOut();
  };
  let setClass = () => {
    if (showBtn === "showBtn") {
      setBtn("item");
    } else {
      setBtn("showBtn");
    }
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width >= 900) {
      setBtn("item");
    }
    return showBtn;
  };
  const { changeCreate } = useContext(FirebaseContext);
  return (
    <nav>
      <ul>
        <li className="logo">TEHSUPPORT</li>
        <li className="btn">
          <i
            id="mainBtn"
            className="fa fa-bars fa-fw"
            onClick={() => setClass()}
          ></i>
        </li>
        <li className={showBtn} onClick={changeCreate}>
          <NavLink
            onClick={() => setClass()}
            className="nav-link"
            to="/createnew"
            exact
          >
            Новий
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/home">
            Автомобілі
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/autoagr">
            Авто-агрегати
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/agr">
            Агрегати
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/exploutation">
            Прилади
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/liquids">
            ПММ
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/profile">
            Профіль
          </NavLink>
        </li>
        <li className={showBtn}>
          <NavLink className="nav-link" to="/out" onClick={logout}>
            Вийти
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/help">
            ?
          </NavLink>
        </li>
      </ul>
      <small></small>
    </nav>
  );
});
