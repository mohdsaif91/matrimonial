import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ClientResponseProps } from "../../../types/clientResponse";
import { fetchClientResponse } from "../../../api/clientResponse";
import { ColumnDef } from "@tanstack/react-table";
import { toast, ToastContainer } from "react-toastify";
import ClientResponseFilter from "./ClientResponseFilter";
import Table from "../../../component/Table";
import Pagination from "../../../component/Pagination";
import LoadingPage from "../../Loading/Loading";

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
      accessorKey: "status",
      header: "Profile Photo	",
    },
    {
      accessorKey: "name",
      header: "Name | Profile ID | Lead ID | DOB",
    },
    {
      header: "Profile Sent",
    },
    {
      accessorKey: "name",
      header: "Handle By | Sex | Height",
    },
    {
      accessorKey: "name",
      header: "Astrologically | Caste | Gotra | Marital Status",
    },
    {
      accessorKey: "name",
      header: "Education | Occupation | Personal Income | Annual Income",
    },
    {
      accessorKey: "name",
      header: "Client Mobile | Client Email",
    },
    {
      accessorKey: "name",
      header: "Budget",
    },
    {
      accessorKey: "name",
      header: "Country | City",
      cell: ({ row }) => {
        const { items } = row.original;
        const countryeValue = items.residing_country?.value;
        const cityValue = items.residential_city?.value;
        return (
          <div className="">
            {countryeValue} | {cityValue}
          </div>
        );
      },
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

  if (clientResponseLoading) {
    return <LoadingPage />;
  }

  const transformedClientList = [];

  const handledPaginationData = initialPaginationData;

  return (
    <div className="">
      <ToastContainer />
      <div className="">
        <ClientResponseFilter />
      </div>
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
