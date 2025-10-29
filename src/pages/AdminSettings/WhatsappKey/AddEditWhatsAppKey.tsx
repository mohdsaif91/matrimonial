import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { addManageUserAPI, updateManageUserAPI } from "../../../api/manageUser";
import { BackNavigationButton } from "../../../component/BackNavigationButton";
import { fetchRole } from "../../../api/roles";
import TextArea from "../../../component/form/TextArea";

const initialFormItem = {
  slug_key: "",
  name: "",
  type: "",
  value: "",
};

function AddEditWhatsAppKey() {
  const [formData, setFormData] = useState<any>({
    ...initialFormItem,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: roleData, isLoading: leadLoading } = useQuery({
    queryKey: ["crm-setting-list"],
    queryFn: fetchRole,
    retry: false,
  });
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.data) {
      console.log(state.data);

      setFormData({ ...state.data });
    }
  }, []);

  console.log(roleData, " <>?");

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: addManageUserAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["pdf-template-list"] });
      toast("Successfully added PDF Template");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding PDF Template:", error);
      toast(error.response?.data?.message || "Failed to add PDF Template");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateManageUserAPI,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["pdf-template-list"] });
      toast("Successfully Updated PDF Template");
      setFormData({ ...initialFormItem });
      navigate("/manage-users");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating PDF Template:", error);
      toast(error.response?.data?.message || "Failed to Update PDF Template");
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
          label="Slug Key"
          name="slug_key"
          value={formData.slug_key}
          onChange={(e) => handleChange("slug_key", e.target.value)}
          required
        />
        <TextField
          label="Title"
          name="title"
          value={formData.name}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <TextArea
          label="value"
          name="value"
          onChange={() => {}}
          required={false}
          value=""
        />
      </div>
      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} Whats App Key`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddEditWhatsAppKey;
