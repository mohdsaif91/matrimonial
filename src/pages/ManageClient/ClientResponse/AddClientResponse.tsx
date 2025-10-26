import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useLocation } from "react-router-dom";
import Table from "../../../component/Table";
import { DropDown } from "../../../component/form/SearchableDropdown";
import TextArea from "../../../component/form/TextArea";
import Button from "../../../component/form/Button";
import { ClientResponseProps } from "../../../types/clientResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCleintResponse } from "../../../api/clientResponse";
import { toast, ToastContainer } from "react-toastify";
import { responseOptions } from "../../../data/clientResponse";

const initailResponseData = {
  client_id: 0,
  profile_id: 0,
  response_status: "",
  client_remark: "",
  staff_remark: "",
};
export default function ResponseRemarkTable() {
  const [formData, setFormData] = useState<ClientResponseProps>({
    ...initailResponseData,
  });

  const { state } = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state) {
      console.log(state);
      setFormData({ ...formData, client_id: state.id });
    }
  }, [state]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    mutation.mutate(formData);
  };

  const handleReset = () => {
    setFormData({ ...initailResponseData });
  };

  const columns: ColumnDef<ClientResponseProps>[] = [
    {
      accessorKey: "",
      header: "#",
    },
    {
      accessorKey: "client_remark",
      header: "Client Remark",
    },
    {
      accessorKey: "",
      header: "Staff Remark",
    },
    {
      accessorKey: "added_by",
      header: "Added By",
    },
    {
      accessorKey: "name",
      header: "Added By User Type",
    },
    {
      accessorKey: "date_time",
      header: "Datetime",
    },
  ];

  const mutation = useMutation({
    mutationFn: AddCleintResponse,
    onSuccess: (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["client-response-list"] });
      toast("Successfully added Response");
      setFormData({ ...initailResponseData });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      console.error("❌ Error adding Response:", error);
      toast(error.response?.data?.message || "Failed to add Response");
    },
  });

  return (
    <div className="flex flex-col gap-6 bg-[#f8f9fb] p-6 rounded-2xl">
      <ToastContainer />
      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Response */}
          <DropDown
            searchable={false}
            label="Response"
            name="response_status"
            value={formData.response_status}
            onChange={(val) => handleChange("response_status", val)}
            options={responseOptions}
          />

          {/* Client Remark */}
          <TextArea
            showLabel={false}
            placeholder=""
            name="cleint_remark"
            onChange={(e) => handleChange("client_remark", e)}
            value={formData.client_remark}
            label="Client Remark"
          />

          <TextArea
            showLabel={false}
            name="staff_remark"
            onChange={(val) => handleChange("staff_remark", val)}
            value={formData.staff_remark}
            label="Staff Remark"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Button text="Save" onClick={handleSave} type="button" />
          <Button text="Reset" onClick={handleReset} type="reset" />
        </div>
      </div>
      <Table data={[]} columns={columns} />
    </div>
  );
}
