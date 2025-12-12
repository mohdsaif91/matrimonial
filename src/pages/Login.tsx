import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mutation,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import bgImage from "../assets/bg_image.webp";
import ousplLogo from "../assets/ouspl_logo.png";
import {
  getUserDataById,
  loginApi,
  markAttendenceCheckIN,
} from "../service/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const attendenceMutation = useMutation({
    mutationFn: markAttendenceCheckIN,
    onSuccess: (data) => {
      navigate("/dashboard");
    },
    onError: (error: any) => {
      setError("Invalid email or password.");
      alert(error.response?.data?.message || "Login failed");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const token = data?.token || data?.access_token || data?.data?.token;
      if (token) {
        queryClient.setQueryData(["authUser"], data.data.user);
        sessionStorage.setItem("authUser", JSON.stringify(data.data.user));
        sessionStorage.setItem("access_token", token);
        attendenceMutation.mutate();
        sessionStorage.setItem("staffUserID", data.data.user.id);
        // userMutation.mutate(data.data.user.id);
      } else {
        console.error("Token not found in response:", data);
        alert("Login succeeded but no token was returned.");
      }
    },
    onError: (error: any) => {
      setError("Invalid email or password.");
      alert(error.response?.data?.message || "Login failed");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    mutation.mutate({ email, password });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-start bg-center bg-no-repeat sm:bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 max-w-md w-full px-8 py-10 flex flex-col items-center ml-0 sm:ml-10">
        <img
          src={ousplLogo}
          alt="Logo"
          className="mb-3"
          style={{ height: "80px" }}
        />
        <h1 className="text-white text-2xl font-semibold mb-4">
          Sign in to our platform
        </h1>
        <form onSubmit={handleLogin} className="w-full">
          {error && (
            <div className="text-red-300 bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-2 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-white">
              Your Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/30 text-black placeholder-black/30 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="example@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/70">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-white">
              Your Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-black placeholder-black/30 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/70">
                {/* Lock Icon */}
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-white text-sm">
              <input
                type="checkbox"
                className="form-checkbox bg-white/60 mr-2 rounded w-5 h-5 outline-none font-bold"
                disabled={loading}
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-black-200 hover:underline">
              Lost password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2a3341] cursor-pointer text-white py-2 rounded-lg hover:bg-[#1d2029] transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
