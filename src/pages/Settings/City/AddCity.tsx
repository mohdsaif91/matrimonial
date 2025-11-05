import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { statusOptions, statusOptionsCap } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import { fetchReligion } from "../../../service/religion";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { addCasteAPI, updateCasteAPI } from "../../../service/caste";
import { CountryProps } from "../../../types/country";
import {
  addCountry,
  fetchCountry,
  updateCountry,
} from "../../../service/country";
import { CityProps } from "../../../types/city";
import { addCity, updateCity } from "../../../service/city";
import { fetchState } from "../../../service/state";
import LoadingPage from "../../Loading/Loading";
import { BackNavigationButton } from "../../../component/BackNavigationButton";

const initialFormItem = {
  id: 0,
  name: "",
  state_id: 0,
  country_id: 0,
  status: "",
  created_at: "",
  updated_at: "",
};

function AddCountry() {
  const [formData, setFormData] = useState<CityProps>({
    ...initialFormItem,
  });
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data: stateData, isLoading: stateLoading } = useQuery({
    queryKey: ["state-list"],
    queryFn: fetchState,
    retry: false,
  });

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
    mutationFn: addCity,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["city-list"] });
      toast("Successfully added City");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding City:", error);
      toast(error.response?.data?.message || "Failed to add City");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCity,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["city-list"] });
      toast("Successfully Updated City");
      setFormData({ ...initialFormItem });
      navigate("/city");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating City:", error);
      toast(error.response?.data?.message || "Failed to Update City");
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

  if (stateLoading || countryLoading) {
    return <LoadingPage />;
  }

  const transformStateData =
    stateData.data.map((m) => {
      return {
        label: m.name,
        value: m.id,
      };
    }) || [];

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
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">
        {state && state.data ? "Edit" : "Add"} City
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <DropDown
          searchable={true}
          label="Country"
          name="country"
          options={transformCountryData}
          value={formData.country_id}
          onChange={(val) => handleChange("country_id", val)}
        />
        <DropDown
          searchable={true}
          label="State"
          name="state"
          options={transformStateData}
          value={formData.state_id}
          onChange={(val) => handleChange("state_id", val)}
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
          text={`${state && state.data ? "Update" : "Save"} City`}
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
