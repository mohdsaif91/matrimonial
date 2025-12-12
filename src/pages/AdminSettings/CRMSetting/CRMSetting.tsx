import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../../Loading/Loading";
import Button from "../../../component/form/Button";
import Table from "../../../component/table/Table";
import { deleteCRMSetting, fetchCRMSetting } from "../../../service/crmSetting";
import React from "react";

export default function CRMSetting() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: CRMData, isLoading } = useQuery({
    queryKey: ["crm-setting-list"],
    queryFn: fetchCRMSetting,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCRMSetting,
    onSuccess: () => {
      toast("Successfully deleted CRM Setting");
      queryClient.invalidateQueries({ queryKey: ["crm-setting-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting CRM Setting:", error);
      toast(error.response?.data?.message || "Failed to delete CRM Setting");
    },
  });

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "name",
    },
    {
      accessorKey: "slug_key",
      header: "Key",
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => {
        const isFile = row.original.type === "file";
        const value = row.original.value;
        return (
          <React.Fragment>
            {isFile ? (
              <img className="w-[200px] h-[140px] p-2" src={value} />
            ) : (
              value
            )}
          </React.Fragment>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              navigate("/addCRMSetting", { state: { data: row.original } });
            }}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Pencil size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() =>
              row.original.id && deleteMutation.mutate(row.original.id)
            }
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Trash size={16} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  const handledCRMData = CRMData ? CRMData.data : [];
  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <Button
        text="+ Add CRM Setting"
        onClick={() => navigate("/addCRMSetting")}
      />
      <div className="mt-2 mb-2">
        <Table borderX={true} columns={columns} data={handledCRMData} />
      </div>
    </div>
  );
}
