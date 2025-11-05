import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusOptions } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { BackNavigationButton } from "../../../component/BackNavigationButton";
import { LeadStatusProps } from "../../../types/leadStatus";
import { addLeadStatus, updateLeadStatus } from "../../../service/leadStatus";
import {
  addMembershipPlan,
  updateMembershipPlan,
} from "../../../service/membershipPlan";

const initialFormItem = {
  name: "",
  status: "",
  id: 0,
};

export default function AddEditMembershipPlan() {
  const [formData, setFormData] = useState<LeadStatusProps>({
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
    mutationFn: addMembershipPlan,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["membership-plan-list"] });
      toast("Successfully added Membership Plan");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Membership Plan:", error);
      toast(error.response?.data?.message || "Failed to add Membership Plan");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateMembershipPlan,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["membership-plan-list"] });
      toast("Successfully Updated Membership Plan");
      setFormData({ ...initialFormItem });
      navigate("/membership-plan");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Membership Plan:", error);
      toast(
        error.response?.data?.message || "Failed to Update Membership Plan"
      );
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
        {state && state.data ? "Edit" : "Add"} Membership Plan
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
          text={`${state && state.data ? "Update" : "Save"} Membership Plan`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}
