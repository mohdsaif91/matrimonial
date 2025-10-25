import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ClientFilterForm from "../../component/ManageClient/ClientFilter";
import { deleteClientList, fetchClientList } from "../../api/client";
import LoadingPage from "../Loading/Loading";
import { ColumnDef } from "@tanstack/react-table";
import Table from "../../component/Table";
import Button from "../../component/form/Button";
import {
  Pencil,
  Eye,
  IndianRupee,
  SquarePlus,
  List,
  ChevronDown,
} from "lucide-react";
import { ClientData } from "../../types/client";
import Pagination from "../../component/Pagination";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { fetchCasteAPI } from "../../api/caste";
import { getLabelValue } from "../../util/ClientUtils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initialPaginationData = {
  current_page: 1,
  last_page: 0,
  per_page: 0,
};

export default function ClientList() {
  const [paginationData, setPaginationData] = useState({
    ...initialPaginationData,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: clientListData,
    error: clientListError,
    isLoading: clientListLoading,
  } = useQuery({
    queryKey: ["client-list", paginationData.current_page], // include page number
    queryFn: ({ queryKey }) => {
      const [, pageNumber] = queryKey; // destructure from key
      return fetchClientList(pageNumber);
    },
    retry: false,
  });

  const columns: ColumnDef<ClientData>[] = [
    {
      accessorKey: "status",
      header: "Profile Photo	",
      cell: ({ row }) => {
        const { client_documents } = row.original;
        const mainPhoto = client_documents.find(
          (f) => f.file_type === "main_photo"
        );
        console.log(mainPhoto, " <>?");
        return (
          <img
            alt="miain_photo"
            src={mainPhoto?.file_path}
            className="w-[200px] h-[140px]"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name | Profile ID | Lead ID | DOB",
      cell: ({ row }) => {
        console.log(row.original);
        const { items } = row.original;
        const leadValue = items.lead_id?.value;
        return (
          <div>
            {items.client_name?.value} | | {leadValue || "-"}|
            {moment(items.date_of_birth?.value).format("YYYY-MM-DD")}
          </div>
        );
      },
    },
    {
      header: "Profile Sent",
      cell: ({ row }) => (
        <div className="flex">
          <span>{3}</span>
          <ChevronDown
            size={24}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // prevent row click conflict
              row.toggleExpanded();
            }}
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Handle By | Sex | Height",
      cell: ({ row }) => {
        const { items } = row.original;
        const value = items.profile_handled?.value || "";
        const genderValue = items.gender?.value;
        const heightValue = items.height?.value;
        return (
          <div className="">
            <span>
              {value} | {genderValue} | {heightValue}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Astrologically | Caste | Gotra | Marital Status",
      cell: ({ row }) => {
        const { items } = row.original;
        const astroValue = items.astrologically?.value || "";
        const casteValue = items.caste?.value;
        const gotraValue = items.gotra?.value;
        const maritalValue = items.marital_status?.value;
        return (
          <div className="">
            <span>
              {astroValue} | {casteValue} | {gotraValue} | {maritalValue}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Education | Occupation | Personal Income | Annual Income",
      cell: ({ row }) => {
        const { items } = row.original;
        const qualification = items.highest_qualification?.value || "";
        const occupation = items && items.occupation?.value;
        const pIncome = items && items.personal_income?.value;
        const aIncome = items && items.annual_family_income?.value;
        return (
          <div className="">
            {qualification} | {occupation} | {pIncome || 0} | {aIncome || 0}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Client Mobile | Client Email",
      cell: ({ row }) => {
        const { items } = row.original;
        const cMobileValue = items.client_mobile?.value || "";
        const cEmailValue = items.client_email?.value;
        return (
          <div className="">
            <span>
              {cMobileValue} | {cEmailValue}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Budget",
      cell: ({ row }) => {
        const { items } = row.original;
        const fromBudgetValue = items.from_marriage_budget?.value || "";
        const toBudgetValue = items.to_marriage_budget?.value;

        return (
          <div className="flex">
            <div className="flex align-middle items-center">
              {fromBudgetValue || 0}
              <IndianRupee size={16} className="text-gray-600" /> -
            </div>
            <div className="flex align-middle items-center">
              {toBudgetValue || 0}
              <IndianRupee size={16} className="text-gray-600" />
            </div>
          </div>
        );
      },
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
      cell: ({ row }) => (
        <div className="flex flex-col gap-2">
          <Button text="Search Profile" />
          <div className="flex flex-row justify-between">
            <Eye size={16} className="cursor-pointer text-gray-600" />
            <Pencil
              onClick={() =>
                navigate("/editClient", { state: { data: row.original } })
              }
              size={16}
              className="cursor-pointer text-gray-600"
            />
            <IndianRupee size={16} className="cursor-pointer text-gray-600" />
            <SquarePlus size={16} className="cursor-pointer text-gray-600" />
            <List size={16} className="cursor-pointer text-gray-600" />
            {/* <Trash
              size={16}
              className="text-gray-600"
              onClick={() => {
                row.original.id && deleteMutation.mutate(row.original.id);
              }}
            /> */}
          </div>
        </div>
      ),
    },
  ];
  // deleteClientList

  const deleteMutation = useMutation({
    mutationFn: deleteClientList,
    onSuccess: () => {
      toast("Successfully deleted Clients");
      queryClient.invalidateQueries({ queryKey: ["client-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Clients:", error);
      toast(error.response?.data?.message || "Failed to delete Clients");
    },
  });

  if (clientListLoading) {
    return <LoadingPage />;
  }

  const transformedClientList =
    clientListData &&
    Array.isArray(clientListData.data) &&
    clientListData.data.map((m: ClientData) => ({
      id: m.client_id,
      items: Object.fromEntries(
        m.modules.flatMap((mm) =>
          mm.fields.map((field) => [field.field_name, field])
        )
      ),
      client_documents: m.client_documents,
    }));

  const handledPaginationData = clientListData
    ? {
        current_page: clientListData.meta.current_page,
        last_page: clientListData.meta.last_page,
        per_page: clientListData.meta.per_page,
      }
    : initialPaginationData;

  return (
    <div className="">
      <ToastContainer />
      <div className="">
        <ClientFilterForm onSubmit={(filter) => {}} key="Client-form-list" />
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
