import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { statusOptions } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import { fetchReligion } from "../../../service/religion";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { SubCasteProps } from "../../../types/caste";
import { fetchCasteAPI, updateCasteAPI } from "../../../service/caste";
import { addSubCasteAPI } from "../../../service/subCaste";
import { BackNavigationButton } from "../../../component/BackNavigationButton";

const initialFormItem = {
  religion_id: 0,
  cast_id: 0,
  name: "",
  status: "",
};

function AddCaste() {
  const [formData, setFormData] = useState<SubCasteProps>({
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

  const {
    data: casteData,
    isLoading: casteLoading,
    refetch: castenRefetch,
  } = useQuery({
    queryKey: ["caste-list"],
    queryFn: fetchCasteAPI,
    retry: false,
    enabled: false,
    refetchOnWindowFocus: false,
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
    mutationFn: addSubCasteAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["sub-caste-list"] });
      toast("Successfully added Sub Caste");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding sub caste:", error);
      toast(error.response?.data?.message || "Failed to add sub caste");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCasteAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["sub-caste-list"] });
      toast("Successfully Updated sub Caste");
      setFormData({ ...initialFormItem });
      navigate("/caste");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating sub Caste:", error);
      toast(error.response?.data?.message || "Failed to Update sub Caste");
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

  const transformReligionData =
    (relData &&
      relData.data &&
      relData.data.map((m) => {
        return {
          label: m.name,
          value: m.id,
        };
      })) ||
    [];

  const transformCasteData =
    (casteData &&
      casteData.data &&
      casteData.data.map((m) => {
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
      <h2 className="text-xl font-semibold mb-4">
        {state && state.data ? "Edit" : "Add"} Sub Caste
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <DropDown
          searchable={false}
          loading={rleigionLoading}
          onClick={() => religionRefetch()}
          label="Religion"
          name="religion"
          options={transformReligionData}
          value={formData.religion_id}
          onChange={(val) => handleChange("religion_id", val)}
        />
        <DropDown
          searchable={false}
          loading={casteLoading}
          onClick={() => castenRefetch()}
          label="Caste"
          name="caste"
          options={transformCasteData}
          value={formData.cast_id}
          onChange={(val) => handleChange("cast_id", val)}
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
          text={`${state && state.data ? "Update" : "Save"} Sub Caste`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddCaste;
