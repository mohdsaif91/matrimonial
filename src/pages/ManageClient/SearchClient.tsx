import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Eye, IndianRupee, SquarePlus, List, Info } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdvanceSearchFilter } from "./ClientAdvanceSearch/AdvanceSearchFilter";
import { ColumnDef } from "@tanstack/react-table";
import {
  ClientData,
  ClientDataProps,
  SearchClientDataProps,
} from "../../types/client";
import {
  fetchClientByFilters,
  fetchOppClientList,
  sendProfile,
} from "../../service/client";
import LoadingPage from "../Loading/Loading";
import Table from "../../component/table/Table";
import Button from "../../component/form/Button";
import TableInfoPopup from "../../component/table/TableInfoPopup";
import Checkbox from "../../component/form/Checkbox";
import { addShortList } from "../../service/shortList";
import { User } from "../../types/header";
import { fetchClientFormModule } from "../../service/clientFormModule";
import ModalPopup from "../../component/ModalPopup";
import AttachProfile from "./AttachProfile";
import { getAuthUserPermission } from "../../util/ClientUtils";

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
  const [selectClientDetails, setSelectedClientDetails] =
    useState<ClientDataProps>(null);
  const [filters, setFilters] = useState<any>({});
  const [formValues, setFormValues] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[] | null>(null);
  const [modalPopup, setModalPopup] = useState({ open: false, data: null });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { state } = useLocation();

  const authUser = queryClient.getQueryData<User>(["authUser"]) ?? null;

  useEffect(() => {
    if (state && state.profileData !== selectClientDetails) {
      setSelectedClientDetails({ ...state.profileData });
    }
  }, [state]);

  const { data: clientFormModuleData, isLoading: clientFromModuleLoading } =
    useQuery({
      queryKey: ["client-form-module-list"],
      queryFn: fetchClientFormModule,
      retry: false,
    });

  const {
    data: clientListData,
    error: clientListError,
    isLoading: clientListLoading,
  } = useQuery({
    queryKey: ["client-list", selectClientDetails?.id], // include it in the key
    queryFn: () => fetchOppClientList(selectClientDetails.id),
    enabled: !!selectClientDetails?.id, // run only when ID exists
    retry: false,
  });

  useEffect(() => {
    if (
      Object.keys(filters).length === 0 &&
      clientFormModuleData &&
      clientFormModuleData?.data?.length
    ) {
      const advanceSearchFeilds: any[] = [];
      clientFormModuleData?.data.filter((item) => {
        item.client_forms.filter((innerItem) => {
          if (innerItem.show_in_common === 1) {
            advanceSearchFeilds.push(innerItem);
            filters[innerItem.id] = {
              value: innerItem.value || "",
              field_id: innerItem.id,
            };
          }
        });
      });
      setFormValues(advanceSearchFeilds);
      // moduleRef.current = clientFormModuleData?.data;
    }
  }, [clientFormModuleData]);

  const mutation = useMutation({
    mutationFn: addShortList,
    onSuccess: (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["clients-short-list"] });
      toast(`Successfully Short listed client`);
      setSelectClient([]);
    },
    onError: (error: any) => {
      console.error("❌ Error adding Short list client:", error);
      alert(error.response?.data?.message || "Failed to add Short list client");
    },
  });

  const fetchMutation = useMutation({
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

  const senProfileMutation = useMutation({
    mutationFn: sendProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["client-Profile"] });
      toast("Successfully sent profile");
      setFilterData(data.data);
    },
    onError: (error: any) => {
      toast(error.response?.data?.message || "Failed to sent profile");
    },
  });

  const columns: ColumnDef<SearchClientDataProps>[] = [
    {
      header: "Shortlist Select",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <Checkbox
            checked={selectedClient.includes(id)}
            onChange={(checked) => {
              if (checked) {
                setSelectClient([...selectedClient, id]);
              } else {
                const removedClientID = selectedClient.filter((f) => f != id);
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
        const { documents } = row.original;
        const mainPhoto = (documents && documents[0]?.document_path) || "";
        return (
          <img
            alt="miain_photo"
            src={mainPhoto}
            className="w-[240px] h-[120px]"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name | Profile ID | Lead ID | DOB",
      cell: ({ row }) => {
        const { items } = row.original;
        const leadValue = items.lead_id;
        return (
          <div>
            {items.client_name} | | {leadValue || "-"}|
            {moment(items.date_of_birth?.value).format("YYYY-MM-DD")}
          </div>
        );
      },
    },
    {
      accessorKey: "handleBy",
      header: "Handle By | Sex | Height",
      cell: ({ row }) => {
        const { items } = row.original;
        const value = items.profile_handled || "";
        const genderValue = items.gender;
        const heightValue = items.height;
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
        const astroValue = items.astrologically || "";
        const casteValue = items.caste;
        const gotraValue = items.gotra;
        const maritalValue = items.marital_status;
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
        const qualification = items.highest_qualification || "";
        const occupation = items && items.occupation;
        const pIncome = items && items.personal_income;
        const aIncome = items && items.annual_family_income;
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
        const cMobileValue = items.client_mobile || "";
        const cEmailValue = items.client_email;
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
        const fromBudgetValue = items.from_marriage_budget || "";
        const toBudgetValue = items.to_marriage_budget;

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
        const countryeValue = items.residing_country;
        const cityValue = items.residential_city;
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
          {getAuthUserPermission().includes(
            "manage_send_profiles.view_profile_sent"
          ) && (
            <Button
              text="Send Profile"
              onClick={() => {
                const sendObjs = {
                  sendToName: selectClientDetails.items.client_name.value,
                  sendToMobile: selectClientDetails.items.client_mobile.value,
                  sendTPohoto: selectClientDetails.client_documents.find(
                    (f) => f.file_type === "main_photo"
                  ).file_path,
                  sendToEmail: selectClientDetails.items.client_email.value,
                  attachProfileName: row.original.items.client_name,
                  attachProfileMobile: row.original.items.client_mobile,
                  attachProfilePhoto: row.original.documents[0].document_path,
                  attachProfileEmail: row.original.items.client_email || "-",
                  subject: `Matrimonial Profile of ${selectClientDetails.items.client_name.value} for ${row.original.items.client_name}`,
                  from_client_id: selectClientDetails && selectClientDetails.id,
                  to_client_id: row.original.id,
                };

                setModalPopup({
                  open: true,
                  data: { ...sendObjs },
                });
              }}
            />
          )}
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

  const transformedClientList = !filterData
    ? clientListData &&
      Array.isArray(clientListData) &&
      clientListData.map((m: SearchClientDataProps) => ({
        id: m.client_id,
        items: Object.fromEntries(
          m.forms.map((item) => [item.field_name, item.value])
        ),
        documents: m.documents,
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

  const handleChange = (updateFilter: any) => {
    setFilters({ ...updateFilter });
  };

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
          filters={filters}
          formValues={formValues}
          clientFormModuleData={clientFormModuleData}
          handleChangeMethod={handleChange}
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
                    shortlisted_by:
                      (authUser && authUser.id) ||
                      JSON.parse(sessionStorage.getItem("authUser")).id,
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
        {/* <Pagination
          onPageChange={() => {}}
          pagination={handledPaginationData}
        /> */}
      </div>
      <ModalPopup
        children={
          <AttachProfile
            data={modalPopup.data}
            onClose={() => setModalPopup({ open: false, data: null })}
          />
        }
        data={modalPopup.data}
        isOpen={modalPopup.open}
        onClose={() => setModalPopup({ open: false, data: null })}
        title="Send Profile"
        width="520px"
      />
    </div>
  );
}
