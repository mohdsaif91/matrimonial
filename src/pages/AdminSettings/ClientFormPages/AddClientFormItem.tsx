import { useEffect, useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFormItem, updateFormItem } from "../../../service/clientForm";
import { ClientFormItem } from "../../../types/form";
import {
  formItemOptions,
  requiredOptions,
  statusOptions,
  validationOptions,
  viewInPdfOptions,
} from "../../../data/ClientForm";
import { UpdateModuleProps } from "../../../types/module";
import { toast, ToastContainer } from "react-toastify";
import { BackNavigationButton } from "../../../component/BackNavigationButton";
import { fetchClientFormModule } from "../../../service/clientFormModule";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Checkbox from "../../../component/form/Checkbox";

const initialFormItem = {
  client_module_id: 0,
  display_name: "",
  field_name: "",
  validation: "",
  required: false,
  view_in_pdf: false,
  status: false,
  div_css: "",
  field_type: "text",
  show_in_advance_search: false,
  show_in_common: false,
};

function AddClientFormItem() {
  const [formData, setFormData] = useState<ClientFormItem>({
    ...initialFormItem,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state && state.data) {
      setFormData({ ...state.data });
    }
  }, []);

  const { data: moduleData, isLoading: moduleLoading } = useQuery({
    queryKey: ["client-form-module-list"],
    queryFn: fetchClientFormModule,
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: addFormItem,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["addFromItem"] });
      toast("Successfully added Form Item");
      setFormData({ ...initialFormItem });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Form Item:", error);
      alert(error.response?.data?.message || "Failed to add Form Item");
    },
  });

  const editMutation = useMutation({
    mutationFn: updateFormItem,
    onSuccess: (data) => {
      toast("Client form item Updated successfully !", {
        onClose: () => {
          queryClient.invalidateQueries({ queryKey: ["form-item-list"] });
          setIsLoading(false);
          navigate("/client-form");
          setFormData({ ...initialFormItem });
        },
      });
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["form-item-list"] });
      navigate("/client-form");
      setIsLoading(false);
      setFormData({ ...initialFormItem });
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Form Item:", error);
      toast(error.response?.data?.message || "Failed to add Lead Status");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (state && state.data) {
      editMutation.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  const transformedModuleData =
    moduleData && Array.isArray(moduleData.data) && moduleData.data.length > 0
      ? moduleData.data.map((m: UpdateModuleProps) => {
          return { value: m.id, label: m.name };
        })
      : [];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">
        {state && state.data ? "Edit" : "Add"} Client Forms
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <TextField
          label="Display Name"
          name="displayName"
          value={formData.display_name}
          onChange={(e) => handleChange("display_name", e.target.value)}
          required
        />
        <TextField
          label="Field Name"
          name="fieldName"
          value={formData.field_name}
          onChange={(e) => handleChange("field_name", e.target.value)}
          required
        />
        <DropDown
          searchable={false}
          label="Module"
          required
          name="module"
          options={transformedModuleData}
          value={formData.client_module_id}
          onChange={(val) => handleChange("client_module_id", val)}
        />
        <DropDown
          searchable={false}
          label="Validation"
          name="validation"
          options={validationOptions}
          value={formData.validation}
          onChange={(val) => handleChange("validation", val)}
        />
        <DropDown
          searchable={false}
          label="Required"
          name="required"
          options={requiredOptions}
          value={formData.required}
          onChange={(val) => handleChange("required", val)}
        />
        <DropDown
          searchable={false}
          label="View In Pdf"
          name="viewInPdf"
          options={viewInPdfOptions}
          value={formData.view_in_pdf}
          onChange={(val) => handleChange("view_in_pdf", val)}
        />

        <DropDown
          searchable={false}
          label="Status"
          name="status"
          options={statusOptions}
          value={formData.status}
          onChange={(val) => handleChange("status", val)}
        />
        <DropDown
          searchable={false}
          label="Field Type"
          name="form_type"
          options={formItemOptions}
          value={formData.field_type}
          onChange={(val) => handleChange("field_type", val)}
        />
        <TextField
          label="Div Css"
          name="divCss"
          value={formData.div_css}
          onChange={(e) => handleChange("div_css", e.target.value)}
        />
        <Checkbox
          label="Advance Search Filter"
          checked={formData.show_in_advance_search}
          onChange={(val) => handleChange("show_in_advance_search", val)}
          id={"search_in_advance_search"}
        />
        <Checkbox
          label="Common Search Filter"
          checked={formData.show_in_common}
          onChange={(val) => handleChange("show_in_common", val)}
          id={"search_in_common"}
        />
      </div>

      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} Client Form Item`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddClientFormItem;
