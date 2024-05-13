import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateUser } from "../../redux/authActions";

const UpdateProfil = () => {
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // update management
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/api/gamer/${user.id_gamer}`, {
        method: "UPDATE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateUser());
      navigate("/");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-profil">
        <div className="font-bold text-center text-2xl mt-20 ">
          <h2>
            <span className="text-[#FE2C65]">Bienvenue </span>
            <span className="text-[#FFB401]">sur Guess </span>
            <span className="text-[#0B8DFD]">My Draw !</span>
          </h2>
          <h2 className="text-[#FE2C65] my-16">Modifier son compte</h2>
        </div>
        {/* /TODO */}
      </div>
    </div>
  );
};

export default UpdateProfil;
