import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Pencil,
  Eye,
  IndianRupee,
  SquarePlus,
  List,
  ChevronDown,
  Info,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdvanceSearchFilter } from "./ClientAdvanceSearch/AdvanceSearchFilter";
import { ColumnDef } from "@tanstack/react-table";
import { ClientData } from "../../types/client";
import { fetchClientList } from "../../api/client";
import LoadingPage from "../Loading/Loading";
import Table from "../../component/table/Table";
import Pagination from "../../component/Pagination";
import Button from "../../component/form/Button";
import TableInfoPopup from "../../component/table/TableInfoPopup";
import Checkbox from "../../component/form/Checkbox";
import { addShortList } from "../../api/shortList";

const initialPaginationData = {
  current_page: 1,
  last_page: 0,
  per_page: 30,
};

export default function SearchClient() {
  const [paginationData, setPaginationData] = useState({
    ...initialPaginationData,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectClient] = useState<any[]>([]);
  const [selectClientDetails, setSelectedClientDetails] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { state } = useLocation();

  useEffect(() => {
    console.log(state.data, " <>? UseEffect <>?");

    if (state && state.profileData !== selectClientDetails) {
      setSelectedClientDetails({ ...state.profileData });
    }
  }, [state]);
  console.log(selectClientDetails, " <>? MAin");
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
  });

  const mutation = useMutation({
    mutationFn: addShortList,
    onSuccess: (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["clients-short-list"] });
      toast(`Successfully Short listed client`);
    },
    onError: (error: any) => {
      console.error("❌ Error adding Short list client:", error);
      alert(error.response?.data?.message || "Failed to add Short list client");
    },
  });

  const columns: ColumnDef<ClientData>[] = [
    {
      header: "Shortlist Select",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <Checkbox
            checked={selectedClient.includes(id)}
            onChange={(checked) => {
              if (checked) {
                selectedClient.push(id);
                setSelectClient([...selectedClient]);
              } else {
                const removedClientID = selectedClient.filter(
                  (f) => f != clientListData
                );
                setSelectClient([...removedClientID]);
              }
            }}
            id=""
            required={false}
            label=""
          />
        );
      },
    },
    {
      accessorKey: "status",
      header: "Profile Photo",
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
      accessorKey: "handleBy",
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
      accessorKey: "Astrologically",
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
      accessorKey: "Education",
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
      accessorKey: "clientMobile",
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
      accessorKey: "budget",
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
      accessorKey: "country",
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
          <Button text="Send Profile" />
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

  const clientName = selectClientDetails
    ? selectClientDetails?.items?.client_name?.value
    : "";
  const clientId = selectClientDetails ? selectClientDetails?.id : "";

  const partnerPrefrence = selectClientDetails
    ? selectClientDetails.items.partner_preferences.value
    : "";
  return (
    <div className="">
      <ToastContainer />
      {selectClientDetails && (
        <div className="p-2">
          <p>
            Advance Search Match for (Client Name: {clientName} ({clientId}))
          </p>
          <p>Partner Preferences : {partnerPrefrence}</p>
        </div>
      )}
      <div className="">
        <AdvanceSearchFilter
          onSubmit={(filter) => {}}
          onReset={(filter) => {}}
        />
      </div>
      <div className="mt-2 mb-2 bg-[#fff]">
        <div className="flex justify-between p-4">
          <div>
            <Button
              loading={mutation.isPending}
              text="Shortlist"
              className="mr-2"
              onClick={() => {
                if (clientId && clientId !== "") {
                  const shortListObj = {
                    client_id: clientId,
                    shortlisted_by: 1,
                    shortlisted_client_ids: selectedClient,
                  };
                  mutation.mutate(shortListObj);
                }
              }}
            />
            Short list client selected-{selectedClient.length}
          </div>
          <div className="flex justify-end">
            <Info
              fill="red"
              className="cursor-pointer"
              onClick={() => setModalOpen(true)}
            />
            <TableInfoPopup
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          </div>
        </div>
        <Table columns={columns} data={transformedClientList || []} />
        <Pagination
          onPageChange={() => {}}
          pagination={handledPaginationData}
        />
      </div>
    </div>
  );
}
