import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusOptions } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { updateQualificationAPI } from "../../../axiosApi/qualification";
import { VisaProps } from "../../../types/visa";
import { addVisaAPI } from "../../../axiosApi/visa";

const initialFormItem = {
  name: "",
  status: "",
};

function AddCaste() {
  const [formData, setFormData] = useState<VisaProps>({
    ...initialFormItem,
  });
  const [isLoading, setIsLoading] = useState(false);

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
    mutationFn: addVisaAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["visa-list"] });
      toast("Successfully added Visa");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Visa:", error);
      toast(error.response?.data?.message || "Failed to add Visa");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateQualificationAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["visa-list"] });
      toast("Successfully Updated Visa");
      setFormData({ ...initialFormItem });
      navigate("/visa");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Visa:", error);
      toast(error.response?.data?.message || "Failed to Update Visa");
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
        {state && state.data ? "Edit" : "Add"} Visa
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
      <Button
        text={`${state && state.data ? "Update" : "Save"} Visa`}
        type="submit"
        loading={isLoading}
        className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
      />
    </form>
  );
}

export default AddCaste;
