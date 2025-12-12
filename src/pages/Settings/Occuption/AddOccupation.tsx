import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusOptions } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { updateQualificationAPI } from "../../../service/qualification";
import { addVisaAPI } from "../../../service/visa";
import { OccupationProps } from "../../../types/occupation";
import {
  addOccupationAPI,
  updateOccupationAPI,
} from "../../../service/occupation";
import { BackNavigationButton } from "../../../component/BackNavigationButton";

const initialFormItem = {
  id: 0,
  name: "",
  status: "",
  created_at: "",
  updated_at: "",
};

function AddOccupation() {
  const [formData, setFormData] = useState<OccupationProps>({
    ...initialFormItem,
  });
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.data) {
      setFormData({ ...state.data });
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: addOccupationAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["occupation-list"] });
      toast("Successfully added Occupation");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Occupation:", error);
      toast(error.response?.data?.message || "Failed to add Occupation");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateOccupationAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["occupation-list"] });
      toast("Successfully Updated Occupation");
      setFormData({ ...initialFormItem });
      navigate("/occupation");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Occupation:", error);
      toast(error.response?.data?.message || "Failed to Update Occupation");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (state && state.data) {
      const now = new Date();
      formData["created_at"] = now.toISOString();
      formData["updated_at"] = now.toISOString();
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
        {state && state.data ? "Edit" : "Add"} Occupation
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <DropDown
          required
          searchable={false}
          label="Status"
          name="module"
          options={statusOptions}
          value={formData.status}
          onChange={(val) => handleChange("status", val)}
        />
      </div>
      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} Occupation`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddOccupation;
