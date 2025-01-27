import { useState } from "react";
import { update, resetPassword, auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });

    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };

  return (
    <div className="grid gap-y4 ">
      <form onSubmit={handleSubmit} className="grid gap-y-4 ">
        <h1 className="text-xl font-bold mb-4">Profili Güncelle</h1>

        <div>
          <label className="block text-md font-medium text-gray-700 ">
            Ad - Soyad
          </label>
          <div className="mt-1">
            <input
              type="text"
              autocomplete="email"
              className="shadow-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-600"
              placeholder="John Doe"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700 ">
            Fotoğraf
          </label>
          <div className="mt-1">
            <input
              type="text"
              autocomplete="email"
              className="shadow-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-600"
              placeholder="John Doe"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex cursor-pointer disabled:opacity-60 items-center px-4 py-2 border border-transparent bg-indigo-500 rounded my-3 text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Güncelle
          </button>
        </div>
      </form>

      <form onSubmit={handleResetSubmit} className="grid gap-y-4 ">
        <h1 className="text-xl font-bold mb-4">Parolayı Güncelle</h1>

        <div>
          <label className="block text-md font-medium text-gray-700 ">
            Parola
          </label>
          <div className="mt-1">
            <input
              type="password"
              autocomplete="email"
              className="shadow-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-600"
              placeholder="Değiştirmek istediğiniz parola..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            disabled={!password}
            type="submit"
            className="inline-flex cursor-pointer disabled:opacity-60 items-center px-4 py-2 border border-transparent bg-indigo-500 rounded my-3 text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Şifreyi Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
