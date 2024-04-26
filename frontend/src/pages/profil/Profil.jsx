import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Header />
      <div className="font-bold text-center text-2xl mt-20">
        <h2>
          <span className="text-[#FE2C65]">Bienvenue </span>
          <span className="text-[#FFB401]">sur Guess </span>
          <span className="text-[#0B8DFD]">My Draw !</span>
        </h2>
        <h2 className="text-[#FE2C65] mt-16">Mon compte</h2>
      </div>
      <div className="mt-6 mx-auto max-w-xl flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 bg-[#F7F6F6] rounded-3xl p-5">
        <div className="w-40 h-40 overflow-hidden rounded-full">
          <img
            src={user.avatar}
            alt="avatar"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="text-lg">
          <p className="pb-2 ">
            Pseudo:
            <span className="text-gray-500 ml-16">{user.pseudo}</span>{" "}
          </p>
          <p className="pb-2">
            Email: <span className="text-gray-500 ml-20">{user.email}</span>
          </p>
          <p className="">
            Mot de passe: <span className="text-gray-500 ml-"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
