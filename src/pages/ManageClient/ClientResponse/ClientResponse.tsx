import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ClientResponseProps } from "../../../types/clientResponse";
import { fetchClientResponse } from "../../../service/clientResponse";
import { ColumnDef } from "@tanstack/react-table";
import { toast, ToastContainer } from "react-toastify";
import ClientResponseFilter from "./ClientResponseFilter";
import Table from "../../../component/table/Table";
import Pagination from "../../../component/Pagination";
import LoadingPage from "../../Loading/Loading";
import { Eye } from "lucide-react";

const initialPaginationData = {
  current_page: 1,
  last_page: 0,
  per_page: 0,
};

export default function ClientResponse() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: clientResponseData,
    error: clientResponseError,
    isLoading: clientResponseLoading,
  } = useQuery({
    queryKey: ["client-response-list"], // include page number
    queryFn: fetchClientResponse,
    retry: false,
  });

  const columns: ColumnDef<ClientResponseProps>[] = [
    {
      header: "Cleint Name	",
      cell: ({ row }) => {
        const mainPhoto = row.original.client_documents?.find(
          (f) => f.type === "main_photo"
        );
        return (
          <div className="">
            <img
              className="h-[160px] w-[160px]"
              src={mainPhoto && mainPhoto.file_path}
              alt="client-main-photo"
            />
            <div className="">{row.original.client?.name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "Profile Name",
      header: "Profile Name",
      cell: ({ row }) => {
        const mainPhoto = row.original.profile_documents?.find(
          (f) => f.type === "main_photo"
        );
        return (
          <div className="">
            <img
              className="h-[160px] w-[160px]"
              src={mainPhoto && mainPhoto.file_path}
              alt="profile-main-photo"
            />
            <div className="">{row.original.profile?.name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "response_status",
      header: "Response",
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
      cell: ({ row }) => {
        const name = row.original.added_by?.name || "-";
        return <span className="font-bold">{name}</span>;
      },
    },
    {
      accessorKey: "added_by_user_type",
      header: "Profile Handled By",
    },
    {
      accessorKey: "created_at",
      header: "Date",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex flex-col gap-2">
          <Eye
            className="cursor-pointer"
            onClick={() => {
              navigate("/viewSingleclientResponse", {
                state: { clientId: row.original.client?.id },
              });
            }}
          />
        </div>
      ),
    },
  ];
  // deleteClientList

  const deleteMutation = useMutation({
    // mutationFn: deleteClientList,
    onSuccess: () => {
      toast("Successfully deleted Clients");
      queryClient.invalidateQueries({ queryKey: ["client-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Clients:", error);
      toast(error.response?.data?.message || "Failed to delete Clients");
    },
  });

  if (clientResponseLoading) {
    return <LoadingPage />;
  }

  const transformedClientList = clientResponseData
    ? clientResponseData.data
    : [];

  const handledPaginationData = initialPaginationData;

  return (
    <div className="">
      <div className="">
        <ClientResponseFilter />
      </div>
      <div className="mt-2 mb-2">
        <Table
          borderX={true}
          columns={columns}
          data={transformedClientList || []}
        />
        <Pagination
          onPageChange={() => {}}
          pagination={handledPaginationData}
        />
      </div>
    </div>
  );
}
