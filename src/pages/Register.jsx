import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/postApi.js";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/auth/register", formData, {
        withCredentials: true,
      });
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen bg-[#fdfaf6] flex justify-center items-center px-4">
  <div className="bg-white w-full max-w-md p-6 border border-black rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <form>
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-4 py-2 mb-4 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 mb-4 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 mb-4 rounded"
          />
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span className="text-black font-medium cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
