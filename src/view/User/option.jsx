import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Optioncheck() {
  const navigate = useNavigate();

  const [operatorCode, setOperatorCode] = useState("");
  const [adminCode, setAdminCode] = useState("");

  const checkOp = (e) => {
    e.preventDefault();
    if (operatorCode === "100") {
      navigate("/dashboardop");
    } else {
      alert("Wrong PIN for Operator. Try again.");
    }
    setOperatorCode("");
  };

  const checkAd = (e) => {
    e.preventDefault();
    if (adminCode === "200") {
      navigate("/dashboardad");
    } else {
      alert("Wrong PIN for Admin. Try again.");
    }
    setAdminCode("");
  };

  return (
    <>
      <h1 className="text-center mt-20 text-5xl">CHOOSE ONE</h1>

      <div className="p-6 max-w-3xl mx-auto bg-blue-500 rounded-lg shadow-md mt-10 flex justify-around">
        {/* Operator Login */}
        <div className="border p-6 bg-blue-100 text-center rounded w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Operator Login</h2>
          <form onSubmit={checkOp} className="space-y-3">
            <label htmlFor="operator-pin" className="block text-sm font-medium text-red-400">
              PIN:
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={3}
              id="operator-pin"
              value={operatorCode}
              onChange={(e) => setOperatorCode(e.target.value.replace(/\D/g, ""))}
              className="w-24 text-center border border-gray-300 text-black rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 3-digit PIN"
            />
            <button type="submit" className="block w-full mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Enter
            </button>
          </form>
        </div>

        {/* Admin Login */}
        <div className="border p-6 bg-blue-100 text-center rounded w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Admin Login</h2>
          <form onSubmit={checkAd} className="space-y-3">
            <label htmlFor="admin-pin" className="block text-sm font-medium text-red-400">
              PIN:
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={3}
              id="admin-pin"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value.replace(/\D/g, ""))}
              className="w-24 text-center border border-gray-300 text-black rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 3-digit PIN"
            />
            <button type="submit" className="block w-full mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Enter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
