import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useLocation } from "react-router-dom";
import Table from "../../../component/table/Table";
import { DropDown } from "../../../component/form/SearchableDropdown";
import TextArea from "../../../component/form/TextArea";
import Button from "../../../component/form/Button";
import { ClientResponseProps } from "../../../types/clientResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddCleintResponse,
  fetchClientResponseById,
} from "../../../service/clientResponse";
import { toast, ToastContainer } from "react-toastify";
import { responseOptions } from "../../../data/clientResponse";

const initailResponseData = {
  client_id: 0,
  profile_id: 0,
  response_status: "",
  client_remark: "",
  staff_remark: "",
  added_by: 0,
  added_by_user_type: "",
};

export default function ResponseRemarkTable({ data }: { data: any }) {
  const [formData, setFormData] = useState<ClientResponseProps>({
    ...initailResponseData,
  });

  console.log(data, " <>?");

  const { state } = useLocation();
  const queryClient = useQueryClient();

  const { data: clientResponseByIdData, isLoading: clientResponseByIdLoading } =
    useQuery({
      queryKey: ["single-client-response-list"],
      queryFn: ({ queryKey }) => {
        const [, clientId] = queryKey; // destructure from key

        return fetchClientResponseById(data?.shared_with_user_id);
      },
      retry: false,
    });

  useEffect(() => {
    if (state) {
      setFormData({ ...formData, client_id: state.id });
    }
  }, [state]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log(formData, data);
    const userId = JSON.parse(sessionStorage.getItem("authUser"))?.id || "";
    console.log(userId, " <>? MAIN ");
    const obj = {
      client_id: data.shared_with_user_id,
      profile_id: data.shared_profile_id,
      response_status: formData.response_status,
      client_remark: formData.client_remark,
      staff_remark: formData.staff_remark,
      added_by: userId,
      added_by_user_type: "client",
    };
    mutation.mutate(obj);
  };

  const handleReset = () => {
    setFormData({ ...initailResponseData });
  };

  console.log(clientResponseByIdData);

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
      accessorKey: "staff_remark",
      header: "Staff Remark",
    },
    {
      accessorKey: "added_by",
      header: "Added By",
    },
    {
      accessorKey: "added_by_user_type",
      header: "Added By User Type",
    },
    {
      accessorKey: "created_at",
      header: "Datetime",
    },
  ];

  const mutation = useMutation({
    mutationFn: AddCleintResponse,
    onSuccess: (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["client-response-list"] });
      setFormData({ ...initailResponseData });
      toast("Successfully added Response");
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      console.error("❌ Error adding Response:", error);
      toast(error.response?.data?.message || "Failed to add Response");
    },
  });

  const handledClientResponseById = clientResponseByIdData
    ? [clientResponseByIdData.data]
    : [];
  console.log(handledClientResponseById, " <>?<>?");

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
          <Button
            loading={mutation.isPending}
            text="Save"
            onClick={handleSave}
            type="button"
          />
          <Button text="Reset" onClick={handleReset} type="reset" />
        </div>
      </div>
      <Table data={handledClientResponseById} columns={columns} />
    </div>
  );
}
