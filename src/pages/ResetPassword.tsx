import { useState } from "react";
import Button from "../component/form/Button";
import { TextField } from "../component/form/TextField";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Add API call here
    setTimeout(() => {
      setIsLoading(false);
      alert("Password updated!");
    }, 1000);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Reset Password
        </h2>

        <TextField
          type="password"
          label="New Password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <TextField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />

        <Button
          text="Update Password"
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
      </form>
    </div>
  );
}
