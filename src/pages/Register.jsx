import { register } from "../firebase";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = register(email, password);
    console.log(user);
  };

  return (
    <form
      className="max-w-xl mx-auto grid gap-y-4 py-4 px-5"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-md font-medium text-gray-700 ">
          E-posta
        </label>
        <div className="mt-1">
          <input
            type="email"
            autocomplete="email"
            className="shadow-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-600"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-md font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            autocomplete="password"
            className="shadow-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-600"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          disabled={!email || !password}
          type="submit"
          className="inline-flex cursor-pointer disabled:opacity-60 items-center px-4 py-2 border border-transparent bg-indigo-500 rounded my-3 text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Kayıt Ol
        </button>
      </div>
    </form>
  );
};

export default Register;
