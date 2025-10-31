import React from "react";
import ManageShortlistFilters from "./ManageShortlistFilters";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ClientResponseProps } from "../../../types/clientResponse";
import { fetchClientResponse } from "../../../api/clientResponse";
import { ColumnDef } from "@tanstack/react-table";
import { toast, ToastContainer } from "react-toastify";
import Table from "../../../component/table/Table";
import Pagination from "../../../component/Pagination";
import LoadingPage from "../../Loading/Loading";
import { fetchShortList } from "../../../api/shortList";

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

  const columns: ColumnDef<ClientResponseProps>[] = [
    {
      accessorKey: "status",
      header: "Profile Id",
    },
    {
      accessorKey: "name",
      header: "Client Name",
    },
    {
      header: "Phone",
    },
    {
      accessorKey: "name",
      header: "Pending for Approval",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => <div className="flex flex-col gap-2"></div>,
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

  if (clientShortListLoading) {
    return <LoadingPage />;
  }

  console.log(clientShortListData, " <>?<>?");

  const transformedClientList = [];

  const handledPaginationData = initialPaginationData;
  return (
    <div>
      <ToastContainer />
      <ManageShortlistFilters />
      <div className="mt-2 mb-2">
        <Table columns={columns} data={transformedClientList || []} />
        <Pagination
          onPageChange={() => {}}
          pagination={handledPaginationData}
        />
      </div>
    </div>
  );
}
