import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  incomeOptions,
  statusOptions,
  techLeadOptions,
} from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { BackNavigationButton } from "../../../component/BackNavigationButton";
import {
  addProfileSource,
  updateProfileSource,
} from "../../../service/profileSource";
import { IncomeProps } from "../../../types/income";
import { addIncome, updateIncome } from "../../../service/income";

const initialFormItem = {
  amount: 0,
  type: "",
  status: "",
  id: 0,
};

function AddEditProfileSource() {
  const [formData, setFormData] = useState<IncomeProps>({
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
    mutationFn: addIncome,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["income-list"] });
      toast("Successfully added Income");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Income:", error);
      toast(error.response?.data?.message || "Failed to add Income");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateIncome,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["income-list"] });
      toast("Successfully Updated Incom");
      setFormData({ ...initialFormItem });
      navigate("/income");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Incom:", error);
      toast(error.response?.data?.message || "Failed to Update Incom");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        {state && state.data ? "Edit" : "Add"} Income
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <TextField
          extraText="Note:- For 1 lakh, enter 1."
          type="number"
          label="Amount"
          name="amount"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          required
        />
        <DropDown
          searchable={false}
          label="Type"
          name="type"
          options={incomeOptions}
          value={formData.type}
          onChange={(val) => handleChange("type", val)}
          required
        />
        <DropDown
          searchable={false}
          label="Status"
          name="status"
          options={statusOptions}
          value={formData.status}
          onChange={(val) => handleChange("status", val)}
          required
        />
      </div>
      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} Income`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddEditProfileSource;
