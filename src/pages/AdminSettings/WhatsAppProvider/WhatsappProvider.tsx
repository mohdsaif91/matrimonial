import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../../Loading/Loading";
import Button from "../../../component/form/Button";
import Table from "../../../component/table/Table";
import {
  deleteWhatsAppProvider,
  fetchWhatsAppProvider,
} from "../../../service/whatsAppProvider";

export default function WhatsAppProvider() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: whatsAppProviderData, isLoading } = useQuery({
    queryKey: ["whatsapp-provider-list"],
    queryFn: fetchWhatsAppProvider,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWhatsAppProvider,
    onSuccess: () => {
      toast("Successfully deleted Whats App Provider");
      queryClient.invalidateQueries({ queryKey: ["whatsapp-provider-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Whats App Provider:", error);
      toast(
        error.response?.data?.message || "Failed to delete Whats App Provider"
      );
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
      header: "Name",
    },
    {
      accessorKey: "base_url",
      header: "Base URL",
    },
    {
      accessorKey: "base_url_with_file",
      header: "Base URL with file",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              navigate("/addWhatsAppProvider", {
                state: { data: row.original },
              });
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

  const handledTaskData = whatsAppProviderData
    ? whatsAppProviderData?.data
    : [];

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <Button
        text="+ Add Whats App Provider"
        onClick={() => navigate("/addWhatsAppProvider")}
      />
      <div className="mt-2 mb-2">
        <Table borderX={true} columns={columns} data={handledTaskData} />
      </div>
    </div>
  );
}
