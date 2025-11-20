import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { statusOptions } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { gendereOptions } from "../../../data/manageUser";
import {
  addManageUserAPI,
  updateManageUserAPI,
} from "../../../service/manageUser";
import { BackNavigationButton } from "../../../component/BackNavigationButton";
import { fetchRole } from "../../../service/roles";
import { getLabelValue } from "../../../util/ClientUtils";
import { typeOptions } from "../../../data/adminSetting";
import TextArea from "../../../component/form/TextArea";
import CustomEditor from "../../../component/form/RichText";
import {
  addWhatsAppProvider,
  updateWhatsAppProvider,
} from "../../../service/whatsAppProvider";
import { WhatsAppProviderProps } from "../../../types/whatsAppProvider";

const initialFormItem = {
  base_url: "",
  base_url_with_file: "",
  name: "",
  status: "",
};

function AddEditWhatsAppProvider() {
  const [formData, setFormData] = useState<WhatsAppProviderProps>({
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
    mutationFn: addWhatsAppProvider,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["whatsapp-provider-list"] });
      toast("Successfully added Whatsapp Provider");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Whatsapp Provider:", error);
      toast(error.response?.data?.message || "Failed to add Whatsapp Provider");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateWhatsAppProvider,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["whatsapp-provider-list"] });
      toast("Successfully Updated Whatsapp Provider");
      setFormData({ ...initialFormItem });
      navigate("/whatsapp-provider");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Whatsapp Provider:", error);
      toast(
        error.response?.data?.message || "Failed to Update Whatsapp Provider"
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
        {state && state.data ? "Edit" : "ADD"} PDF Template
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 gap-y-5">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
        <TextField
          label="Base URL"
          name="baseUrl"
          value={formData.base_url}
          onChange={(e) => handleChange("base_url", e.target.value)}
          required
        />
        <TextField
          label="Base URL with file"
          name="name"
          value={formData.base_url_with_file}
          onChange={(e) => handleChange("base_url_with_file", e.target.value)}
          required
        />
        <DropDown
          value={formData.status}
          label="Status"
          name="status"
          onChange={(val) => handleChange("status", val)}
          options={statusOptions}
        />
      </div>
      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} Whats App Provider`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddEditWhatsAppProvider;
