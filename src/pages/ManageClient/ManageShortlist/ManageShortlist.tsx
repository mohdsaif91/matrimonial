import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { toast, ToastContainer } from "react-toastify";
import { Eye } from "lucide-react";

import ManageShortlistFilters from "./ManageShortlistFilters";
import Table from "../../../component/table/Table";
import Pagination from "../../../component/Pagination";
import LoadingPage from "../../Loading/Loading";
import { fetchShortList } from "../../../service/shortList";
import { ClientDetailsResponseProps } from "../../../types/clientResponse";

const initialPaginationData = {
  current_page: 1,
  last_page: 0,
  per_page: 0,
};

export default function ManageShortlist() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: clientShortListData,
    error: clientShortListError,
    isLoading: clientShortListLoading,
  } = useQuery({
    queryKey: ["clients-short-list", "pending"], // include page number
    queryFn: ({ queryKey }) => {
      const [, status] = queryKey;
      return fetchShortList(status);
    },
    retry: false,
  });

  const columns: ColumnDef<ClientDetailsResponseProps>[] = [
    {
      accessorKey: "status",
      header: "Profile Id",
      cell: ({ row }) => {
        return <div>{row.original.client_id}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Client Name",
      cell: ({ row }) => {
        return <div>{row.original.form_data.client_name}</div>;
      },
    },
    {
      header: "Phone",
      cell: ({ row }) => {
        return <div>{row.original.form_data.mobile_number}</div>;
      },
    },
    {
      accessorKey: "shortlist_count",
      header: "Pending for Approval",
      cell: ({ getValue }) => {
        return <div className="ml-3">{getValue()}</div>;
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex flex-col gap-2 cursor-pointer">
          <Eye
            onClick={() =>
              navigate("/pendingApproveShortlist", {
                state: {
                  shortlistData: row.original,
                  shortListType: "pending",
                },
              })
            }
          />
        </div>
      ),
    },
  ];
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

  if (clientShortListLoading) {
    return <LoadingPage />;
  }

  const transformedClientList = clientShortListData
    ? clientShortListData.data
    : [];

  const handledPaginationData = initialPaginationData;
  return (
    <div>
      <ToastContainer />
      <ManageShortlistFilters />
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
