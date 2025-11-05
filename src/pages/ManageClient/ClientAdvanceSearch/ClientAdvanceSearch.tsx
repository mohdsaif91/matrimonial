import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import {
  Pencil,
  Eye,
  IndianRupee,
  SquarePlus,
  List,
  ChevronDown,
} from "lucide-react";

import { fetchClientByFilters, fetchClientList } from "../../../api/client";
import LoadingPage from "../../Loading/Loading";
import Table from "../../../component/table/Table";
import Button from "../../../component/form/Button";
import { ClientData } from "../../../types/client";
import Pagination from "../../../component/Pagination";
import { AdvanceSearchFilter } from "./AdvanceSearchFilter";
import { fetchClientFormModule } from "../../../api/clientFormModule";

const initialPaginationData = {
  current_page: 1,
  last_page: 0,
  per_page: 30,
};

export default function ClientAdvanceSearch() {
  const [filterData, setFilterData] = useState<any[] | null>(null);
  const [paginationData, setPaginationData] = useState({
    ...initialPaginationData,
  });
  const [filters, setFilters] = useState<any>({});

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: clientListData,
    error: clientListError,
    isLoading: clientListLoading,
  } = useQuery({
    queryKey: [
      "client-list",
      paginationData.current_page,
      paginationData.per_page,
    ], // include page number
    queryFn: ({ queryKey }) => {
      const [, pageNumber, perPage] = queryKey; // destructure from key
      return fetchClientList(pageNumber as number, perPage as number);
    },
    retry: false,
    enabled: !filterData,
  });

  const { data: clientFormModuleData, isLoading: clientFromModuleLoading } =
    useQuery({
      queryKey: ["client-form-module-list"],
      queryFn: fetchClientFormModule,
      retry: false,
      enabled: !filterData,
    });

  const mutation = useMutation({
    mutationFn: fetchClientByFilters,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["client-list"] });
      toast("Successfully fetched client by filter");
      setFilterData(data.data);
    },
    onError: (error: any) => {
      console.error("❌ Error adding Form Item:", error);
      toast(error.response?.data?.message || "Failed to add Form Item");
    },
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

  if (clientListLoading || mutation.isPending || clientFromModuleLoading) {
    return <LoadingPage />;
  }

  const handleChange = (updateFilter: any) => {
    setFilters({ ...updateFilter });
  };

  console.log(filterData, " <>?<>?");

  const transformedClientList = !filterData
    ? clientListData &&
      Array.isArray(clientListData.data) &&
      clientListData.data.map((m: ClientData) => ({
        id: m.client_id,
        items: Object.fromEntries(
          m.modules.flatMap((mm) =>
            mm.fields.map((field) => [field.field_name, field])
          )
        ),
        client_documents: m.client_documents,
      }))
    : Array.isArray(filterData) &&
      filterData.map((m: ClientData) => ({
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

  console.log(filters, " <>? MAIN FILGTER");

  return (
    <div className="">
      <ToastContainer />
      <div className="">
        <AdvanceSearchFilter
          filters={filters}
          onSubmit={(filter) => mutation.mutate({ search_fields: filter })}
          onReset={() => setFilterData(null)}
          clientFormModuleData={clientFormModuleData}
          handleChangeMethod={handleChange}
        />
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
