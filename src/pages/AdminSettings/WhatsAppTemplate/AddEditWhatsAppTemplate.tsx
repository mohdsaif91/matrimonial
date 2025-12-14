import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusOptions } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { BackNavigationButton } from "../../../component/BackNavigationButton";
import TextArea from "../../../component/form/TextArea";
import { WhatsApptemplateProps } from "../../../types/whatsAppTemplate";
import {
  addWhatsAppTemplate,
  updateWhatsAppTemplate,
} from "../../../service/whatsAppTemplate";

const initialFormItem = {
  slug_key: "",
  title: "",
  value: "",
  status: "",
};

function AddEditWhatsAppTemplate() {
  const [formData, setFormData] = useState<WhatsApptemplateProps>({
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
    mutationFn: addWhatsAppTemplate,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["whatsapp-template-list"] });
      toast("Successfully added Whatsapp Template");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Whatsapp Template:", error);
      toast(error.response?.data?.message || "Failed to add Whatsapp Template");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateWhatsAppTemplate,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["whatsapp-template-list"] });
      toast("Successfully Updated Whatsapp Template");
      setFormData({ ...initialFormItem });
      navigate("/whatsapp-template");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Whatsapp Template:", error);
      toast(
        error.response?.data?.message || "Failed to Update Whatsapp Template"
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
      <h2 className="text-xl font-semibold mb-4">
        {state && state.data ? "Edit" : "ADD"} PDF Template
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 gap-y-5">
        <TextField
          label="Slug-Key"
          name="slugkey"
          value={formData.slug_key}
          onChange={(e) => handleChange("slug_key", e.target.value)}
          required
        />
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
        <TextArea
          name="value"
          label="Value"
          onChange={(e) => handleChange("value", e)}
          value={formData.value}
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
          text={`${state && state.data ? "Update" : "Save"} Whats App Template`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddEditWhatsAppTemplate;
