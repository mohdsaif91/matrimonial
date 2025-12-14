import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addManageUserAPI,
  fetchManageUserAPI,
  updateManageUserAPI,
} from "../../../service/manageUser";
import { BackNavigationButton } from "../../../component/BackNavigationButton";
import { fetchRole } from "../../../service/roles";
import TextArea from "../../../component/form/TextArea";
import {
  addWhatsAppKey,
  updateWhatsAppKey,
} from "../../../service/whatsAppKey";
import { fetchWhatsAppProvider } from "../../../service/whatsAppProvider";
import { getLabelValue } from "../../../util/ClientUtils";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { WhatsAppKeyProps } from "../../../types/whatsAppKey";
import { assigneTypeOptions } from "../../../data/adminSetting";
import { statusOptions } from "../../../data/ClientForm";

const initialFormItem = {
  assigned_id: 0,
  assigned_type: "",
  config: { setting: "" },
  name: "",
  phone_number: "",
  status: "",
  token: "",
  whatsapp_provider: "",
  id: "",
};

function AddEditWhatsAppKey() {
  const [formData, setFormData] = useState<WhatsAppKeyProps>({
    ...initialFormItem,
  });
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data: whatsAppProviderData, isLoading: whatsAppProviderLoading } =
    useQuery({
      queryKey: ["whatsapp-provider-list"],
      queryFn: fetchWhatsAppProvider,
      retry: false,
    });

  const { data: roleData, isLoading: roleIsLoading } = useQuery({
    queryKey: ["role-list"],
    queryFn: fetchRole,
    retry: false,
    enabled: !!formData.assigned_type && formData.assigned_type !== "",
  });

  const { data: manageUserData, isLoading: manageUserLoading } = useQuery({
    queryKey: ["manage-user-list"],
    queryFn: fetchManageUserAPI,
    retry: false,
    enabled: !!formData.assigned_type && formData.assigned_type !== "",
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
    mutationFn: addWhatsAppKey,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["whatsapp-key-list"] });
      toast("Successfully added Whatsapp Key");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Whatsapp Key:", error);
      toast(error.response?.data?.message || "Failed to add Whatsapp Key");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateWhatsAppKey,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["whatsapp-key-list"] });
      toast("Successfully Updated Whatsapp Key");
      setFormData({ ...initialFormItem });
      navigate("/whatsapp-key");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Whatsapp Key:", error);
      toast(error.response?.data?.message || "Failed to Update Whatsapp Key");
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

  const handledWhatsAppProviderData =
    whatsAppProviderData && Array.isArray(whatsAppProviderData.data)
      ? whatsAppProviderData.data.map((m) => {
          return { label: m.name, value: m.name };
        })
      : [];

  const handledRoleData =
    roleData && Array.isArray(roleData.data)
      ? getLabelValue(roleData.data)
      : [];

  const handledUserData =
    manageUserData && Array.isArray(manageUserData.data)
      ? getLabelValue(manageUserData.data)
      : [];

  const userIdData =
    formData.assigned_type === "all"
      ? [...handledRoleData, ...handledUserData]
      : formData.assigned_type === "roles"
      ? handledRoleData
      : handledUserData;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">
        {state && state.data ? "Edit" : "ADD"} Whats App Key
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-3 gap-3">
        <DropDown
          label="Whatsapp Provider"
          name="whatsappProvider"
          value={formData.whatsapp_provider}
          onChange={(val) => handleChange("whatsapp_provider", val)}
          options={handledWhatsAppProviderData}
        />
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
        <TextField
          label="token"
          name="token"
          value={formData.token}
          onChange={(e) => handleChange("token", e.target.value)}
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          onChange={(e) => {
            handleChange("phone_number", e.target.value);
          }}
          required={false}
          value={formData.phone_number}
        />
        <DropDown
          label="Assigned Type"
          name="assignedType"
          value={formData.assigned_type}
          onChange={(val) => handleChange("assigned_type", val)}
          options={assigneTypeOptions}
        />
        <DropDown
          label="Assigned Id"
          name="assignedId"
          value={formData.assigned_id}
          onChange={(val) => handleChange("assigned_id", val)}
          options={userIdData}
        />
        <DropDown
          label="Status"
          name="status"
          value={formData.status}
          onChange={(val) => handleChange("status", val)}
          options={statusOptions}
        />
        <div className="col-span-4">
          <TextArea
            name="config"
            label="Config"
            showLabel
            onChange={(e) => {
              setFormData({ ...formData, config: { setting: e } });
            }}
            value={formData.config.setting}
          />
        </div>
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
