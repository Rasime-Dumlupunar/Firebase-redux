import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { logout, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "../components/UpdateProfile";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    console.log("USER CHANGED!", user);
  }, [user]);

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="max-w-2xl mx-auto py-5 px-5">
        <h1 className="flex gap-x-4 items-center">
          {user.photoURL && (
            <img src={user.photoURL} className="w-8 h-8 rounded-full" />
          )}
          Oturumun açık ({user.email})
          <button
            onClick={handleLogout}
            className="h-12 rounded px-4 text-sm text-white bg-indigo-700"
          >
            Çıkış Yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="h-12 rounded px-4 text-sm text-white bg-indigo-700"
            >
              E-Posta güncelle
            </button>
          )}
        </h1>
        <UpdateProfile />
      </div>
    );
  }
  return (
    <div className=" my-3 mx-5 grid ">
      <Link
        to="/register"
        className=" border border-neutral-600 rounded-md px-3 w-1/5 bg-indigo-500 py-2"
      >
        Kayıt Ol
      </Link>
      <Link
        to="/login"
        className=" border border-neutral-600 px-3 bg-orange-400 w-1/5 rounded-md py-2 my-3"
      >
        Giriş Yap
      </Link>
    </div>
  );
};

export default Home;
