import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { statusOptions } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addCountry,
  fetchCountry,
  updateCountry,
} from "../../../service/country";
import { StateProps } from "../../../types/state";
import LoadingPage from "../../Loading/Loading";
import { addState, updateState } from "../../../service/state";
import { BackNavigationButton } from "../../../component/BackNavigationButton";

const initialFormItem = {
  status: "",
  name: "",
  country_id: 0,
};

function AddCountry() {
  const [formData, setFormData] = useState<StateProps>({
    ...initialFormItem,
  });
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data: countryData, isLoading: countryLoading } = useQuery({
    queryKey: ["country-list"],
    queryFn: fetchCountry,
    retry: false,
  });

  useEffect(() => {
    if (state && state.data) {
      setFormData({ ...state.data });
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: addState,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["state-list"] });
      toast("Successfully added State");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding State:", error);
      toast(error.response?.data?.message || "Failed to add State");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateState,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["state-list"] });
      toast("Successfully Updated State");
      setFormData({ ...initialFormItem });
      navigate("/state");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating State:", error);
      toast(error.response?.data?.message || "Failed to Update State");
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

  if (countryLoading) {
    return <LoadingPage />;
  }

  const transformCountryData =
    countryData.data.map((m) => {
      return {
        label: m.name,
        value: m.id,
      };
    }) || [];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">
        {state && state.data ? "Edit" : "Add"} State
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <DropDown
          searchable={false}
          label="Country"
          name="country"
          options={transformCountryData}
          value={formData.country_id}
          onChange={(val) => handleChange("country_id", val)}
        />
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
          name="module"
          options={statusOptions}
          value={formData.status}
          onChange={(val) => handleChange("status", val)}
        />
      </div>
      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} State`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddCountry;
