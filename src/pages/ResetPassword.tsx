import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Button from "../component/form/Button";
import { TextField } from "../component/form/TextField";
import { resetPassword } from "../service/auth";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    c_password: "",
    token: "",
  });
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      ...formData,
      email: searchParams.get("email"),
      token: searchParams.get("token"),
    });
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to update the password");
    },
  });

  const handlePassswordSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ ...formData });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handlePassswordSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Reset Password
        </h2>
        <TextField
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <TextField
          type="password"
          label="New Password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <div>
          <TextField
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.c_password}
            onChange={(e) => handleChange("c_password", e.target.value)}
          />
          {formData.c_password !== "" &&
            formData.password !== formData.c_password && (
              <span className="text-red-500">
                Password and Confirm Password is not same
              </span>
            )}
        </div>
        <div className="flex justify-between align-middle">
          <Button
            disabled={formData.password !== formData.c_password}
            text="Update Password"
            type="submit"
            loading={mutation.isPending}
            className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
          />
          <Button
            onClick={() => navigate("/")}
            text="Return to login"
            type="reset"
            className="mt-6 px-6 py-2 bg-[#161D27] text-white rounded-xl hover:bg-blue-600 flex align-middle"
          />
        </div>
      </form>
    </div>
  );
}
