import React from "react";
import AddUser from "../components/AddUser";
import { Link } from "react-router-dom";
import "../App.css";

export const AddPage = () => {
  return (
    <div className="adduser">
      <Link to="/" className="link-homebutton">
        {" "}
        <button className="home-btn"><ion-icon name="home-outline"></ion-icon> Home</button>
      </Link>

      <AddUser />
    </div>
  );
};
