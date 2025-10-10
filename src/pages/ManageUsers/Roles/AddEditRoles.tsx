import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusOptions } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { ManageUserProps } from "../../../types/manageUser";
import { gendereOptions, roleOptions } from "../../../data/manageUser";
import { addManageUserAPI, updateManageUserAPI } from "../../../api/manageUser";
import { BackNavigationButton } from "../../../component/BackNavigationButton";

const initialFormItem = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  status: "",
  role_id: "",
  password: "",
  password_confirmation: "",
};

function AddEditRoles() {
  const [formData, setFormData] = useState<ManageUserProps>({
    ...initialFormItem,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(true);

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.data) {
      console.log(state.data);
      setFormData({ ...state.data });
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: addManageUserAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["manage-user-list"] });
      toast("Successfully added Managed user");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Managed user:", error);
      toast(error.response?.data?.message || "Failed to add Managed user");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateManageUserAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["manage-user-list"] });
      toast("Successfully Updated Managed user");
      setFormData({ ...initialFormItem });
      navigate("/manage-users");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Managed user:", error);
      toast(error.response?.data?.message || "Failed to Update Managed user");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: send API request
    setIsLoading(true);
    if (state && state.data) {
      updateMutation.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-xl shadow-md"
    >
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">
        {state && state.data ? "Edit" : "ADD"} Manage User
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          required
        />
        <DropDown
          searchable={false}
          label="Gender"
          name="module"
          options={gendereOptions}
          value={formData.gender}
          onChange={(val) => handleChange("gender", val)}
        />
        <DropDown
          searchable={false}
          label="Roles"
          name="module"
          options={roleOptions}
          value={formData.role_id}
          onChange={(val) => handleChange("role_id", val)}
        />
        <DropDown
          searchable={false}
          label="Status"
          name="module"
          options={statusOptions}
          value={formData.status}
          onChange={(val) => handleChange("status", val)}
        />
        <div className="flex flex-col">
          <TextField
            label="Password"
            type={password ? "password" : "text"}
            name="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
          <div className="mt-1 flex">
            <input
              type="checkbox"
              checked={!password}
              onChange={() => setPassword(!password)}
            />
            <label>Show password</label>
          </div>
        </div>
        <div className="flex flex-col">
          <TextField
            type="password"
            label="Confirm Password"
            name="confirmPasword"
            value={formData.password_confirmation}
            onChange={(e) =>
              handleChange("password_confirmation", e.target.value)
            }
            required
          />
          {formData.password !== formData.password_confirmation && (
            <span className="text-red-500">
              Password and Confirm Password is not same
            </span>
          )}
        </div>
      </div>
      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} Manage User`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddEditRoles;
