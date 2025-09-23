import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { statusOptions, statusOptionsCap } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import {
  addReligion,
  fetchReligion,
  updateReligion,
} from "../../../axiosApi/religion";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { CasteProps } from "../../../types/caste";
import { addCasteAPI, updateCasteAPI } from "../../../axiosApi/caste";

const initialFormItem = {
  religion_id: 0,
  name: "",
  status: "",
};

function AddCaste() {
  const [formData, setFormData] = useState<CasteProps>({
    ...initialFormItem,
  });
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    data: relData,
    isLoading: rleigionLoading,
    refetch: religionRefetch,
  } = useQuery({
    queryKey: ["religion-list"],
    queryFn: fetchReligion,
    retry: false,
    enabled: false,
    refetchOnWindowFocus: false,
  });

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
    mutationFn: addCasteAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["caste-list"] });
      toast("Successfully added Caste");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding caste:", error);
      toast(error.response?.data?.message || "Failed to add caste");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCasteAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["caste-list"] });
      toast("Successfully Updated Caste");
      setFormData({ ...initialFormItem });
      navigate("/caste");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Caste:", error);
      toast(error.response?.data?.message || "Failed to Update Caste");
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

  console.log(relData);

  const transformData =
    (relData &&
      relData.data &&
      relData.data.map((m) => {
        return {
          label: m.name,
          value: m.id,
        };
      })) ||
    [];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-xl shadow-md"
    >
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">Add Caste</h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <DropDown
          searchable={false}
          loading={rleigionLoading}
          onClick={() => religionRefetch()}
          label="Religion"
          name="module"
          options={transformData}
          value={formData.religion_id}
          onChange={(val) => handleChange("religion_id", val)}
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
          options={statusOptionsCap}
          value={formData.status}
          onChange={(val) => handleChange("status", val)}
        />
      </div>
      <Button
        text={`${state && state.data ? "Update" : "Save"} Caste`}
        type="submit"
        loading={isLoading}
        className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
      />
    </form>
  );
}

export default AddCaste;
