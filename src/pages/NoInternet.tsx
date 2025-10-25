import React from "react";
import { WifiOff } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../component/form/Button";
import { useNavigate } from "react-router-dom";

const NoInternetPage = () => {
  const navigate = useNavigate();
  const handleRetry = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <WifiOff className="w-20 h-20 text-gray-500 mb-6" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          No Internet Connection
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          It seems you’re offline. Please check your connection and try again.
        </p>
        <Button
          text="Retry"
          onClick={handleRetry}
          className="px-6 py-2 rounded-full text-base"
        />
      </motion.div>
      <motion.img
        src="/no-internet-illustration.svg"
        alt="No Internet"
        className="w-64 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </div>
  );
};

export default NoInternetPage;
