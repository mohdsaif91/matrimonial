import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { statusOptions } from "../../../data/ClientForm";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { BackNavigationButton } from "../../../component/BackNavigationButton";
import { typeOptions } from "../../../data/adminSetting";
import TextArea from "../../../component/form/TextArea";
import { CRMSettingsProps } from "../../../types/crmSettings";
import {
  addCRMSetting,
  addCRMSettingAsImage,
  fetchCRMSetting,
  updateCRMSetting,
  updateCRMSettingAsImage,
} from "../../../service/crmSetting";
import { ImageField } from "../../../component/form/ImageField";
import LoadingPage from "../../Loading/Loading";

const initialFormItem = {
  slug_key: "",
  name: "",
  type: "",
  value: "",
  status: "",
  id: "",
};

function AddEditCrmSetting() {
  const [formData, setFormData] = useState<CRMSettingsProps>({
    ...initialFormItem,
  });

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.data) {
      setFormData({ ...state.data });
    }
  }, []);

  const {
    data: crmData,
    isLoading: crmLoading,
    isSuccess: crmDataSuccess,
    refetch,
  } = useQuery({
    queryKey: ["crm-setting-list"],
    queryFn: fetchCRMSetting,
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: addCRMSetting,
    onSuccess: async (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["crm-setting-list"] });
      // const freshData = await queryClient.fetchQuery({
      //   queryKey: ["crm-setting-list"],
      // });
      // sessionStorage.setItem("CRM", JSON.stringify(freshData));
      toast("Successfully added CRM Setting");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      console.error("❌ Error adding CRM Setting:", error);
      toast(error.response?.data?.message || "Failed to add CRM Setting");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCRMSetting,
    onSuccess: async (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["crm-setting-list"] });
      toast("Successfully Updated CRM Settings");
      setFormData({ ...initialFormItem });
      const freshData = await queryClient.fetchQuery({
        queryKey: ["crm-setting-list"],
      });

      sessionStorage.setItem("CRM", JSON.stringify(freshData));
      navigate("/crm-setting");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      console.error("❌ Error updating CRM Settings:", error);
      toast(error.response?.data?.message || "Failed to Update CRM Settings");
    },
  });

  const imageMutation = useMutation({
    mutationFn: addCRMSettingAsImage,
    onSuccess: (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["crm-setting-list"] });
      toast("Successfully Updated CRM Settings");
      setFormData({ ...initialFormItem });
      // navigate("/manage-users");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      console.error("❌ Error updating CRM Settings:", error);
      toast(error.response?.data?.message || "Failed to Update CRM Settings");
    },
  });

  const imageUpdateMutation = useMutation({
    mutationFn: updateCRMSettingAsImage,
    onSuccess: (data) => {
      refetch().then((res) => {
        // invalidate or refresh client list queries
        sessionStorage.setItem("CRM", JSON.stringify([...res.data.data]));
        queryClient.invalidateQueries({ queryKey: ["crm-setting-list"] });
        toast("Successfully Updated CRM Settings");
        setFormData({ ...initialFormItem });
        navigate("/crm-setting");
      });
      // if (crmDataSuccess && !crmSessionData) {
      // }
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      console.error("❌ Error updating CRM Settings:", error);
      toast(error.response?.data?.message || "Failed to Update CRM Settings");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state && formData.type === "file") {
      const actualFormData = new FormData();
      actualFormData.append("name", formData.name);
      actualFormData.append("slug_key", formData.slug_key);
      actualFormData.append("status", formData.status);
      actualFormData.append("type", formData.type);
      actualFormData.append("value", formData.value);
      actualFormData.append("file", formData.value);
      imageMutation.mutate(actualFormData);
    } else if (state && state.data) {
      if (formData.type === "file") {
        const actualFormData = new FormData();
        actualFormData.append("name", formData.name);
        actualFormData.append("slug_key", formData.slug_key);
        actualFormData.append("status", formData.status);
        actualFormData.append("type", formData.type);
        actualFormData.append("value", formData.value);
        // actualFormData.append("file", formData.value);
        imageUpdateMutation.mutate({ actualFormData, id: formData.id });
      } else {
        updateMutation.mutate(formData);
      }
    } else {
      mutation.mutate(formData);
    }
  };

  if (crmLoading) {
    return <LoadingPage />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">
        {state && state.data ? "Edit" : "ADD"} CRM Setting
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-4 gap-3 gap-y-5">
        <TextField
          labelPosition="top"
          label="Slug Key"
          name="slug_key"
          value={formData.slug_key}
          onChange={(e) => handleChange("slug_key", e.target.value)}
          required
        />
        <TextField
          labelPosition="top"
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
        <DropDown
          searchable={false}
          label="Type"
          name="type"
          options={typeOptions}
          value={formData.type}
          onChange={(val) => handleChange("type", val)}
        />
        <DropDown
          label="Status"
          name="status"
          options={statusOptions}
          value={formData.status}
          onChange={(val) => handleChange("status", val)}
        />
        <div className="col-span-4">
          {formData.type === "file" ? (
            <ImageField
              label="Choose file"
              name="chooseFile"
              onChange={(val) => handleChange("value", val)}
              required={true}
              showLabel={true}
            />
          ) : (
            <TextArea
              label="Value"
              name="value"
              onChange={(val) => handleChange("value", val)}
              value={formData.value}
            />
          )}
        </div>
      </div>
      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} CRM Settings`}
          type="submit"
          loading={
            mutation.isPending ||
            updateMutation.isPending ||
            imageMutation.isPending ||
            imageUpdateMutation.isPending
          }
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddEditCrmSetting;
