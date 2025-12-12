import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteClientList, fetchClientList } from "../../service/client";
import LoadingPage from "../Loading/Loading";
import { ColumnDef } from "@tanstack/react-table";
import Table from "../../component/table/Table";
import Button from "../../component/form/Button";
import {
  Pencil,
  Eye,
  IndianRupee,
  SquarePlus,
  List,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { ClientData } from "../../types/client";
import Pagination from "../../component/Pagination";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TableInfoPopup from "../../component/table/TableInfoPopup";
import CommonFilters from "./CommonFilters";
import { fetchClientFormModule } from "../../service/clientFormModule";

const initialPaginationData = {
  current_page: 1,
  last_page: 0,
  per_page: 30,
};

export default function MembershipExpired() {
  const [paginationData, setPaginationData] = useState({
    ...initialPaginationData,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [formValues, setFormValues] = useState<any[]>([]);

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
  });

  const { data: clientFormModuleData, isLoading: clientFromModuleLoading } =
    useQuery({
      queryKey: ["client-form-module-list"],
      queryFn: fetchClientFormModule,
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

  const columns: ColumnDef<ClientData>[] = [
    {
      accessorKey: "status",
      header: "Profile Photo	",
      cell: ({ row }) => {
        const { client_documents, items } = row.original;
        const mainPhoto = client_documents.find(
          (f) => f.file_type === "main_photo"
        );
        let color = "bg-[#fff]";
        const date = new Date();
        if (items?.expiry_date) {
          color =
            new Date(items?.expiry_date.value) <= new Date(date)
              ? "bg-[#FA9189]"
              : "bg-[#fff]";
        }
        return (
          <div className="flex justify-start h-full">
            <div className={` ${color} h-auto w-[8px] mr-1`}></div>
            <div>
              <img
                alt="miain_photo"
                src={mainPhoto?.file_path}
                className="w-[200px] h-[140px]"
              />
            </div>
          </div>
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
      cell: ({ row }) => {
        const isExpanded = row.getIsExpanded();
        const handledShortProfilecount = Array.isArray(
          row.original.shared_profiles
        )
          ? row.original.shared_profiles.length
          : 0;
        return (
          <div className="flex">
            <span>{handledShortProfilecount}</span>
            {isExpanded ? (
              <ChevronUp
                size={24}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // prevent row click conflict
                  row.toggleExpanded();
                }}
              />
            ) : (
              <ChevronDown
                size={24}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // prevent row click conflict
                  row.toggleExpanded();
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "handledBy",
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
      accessorKey: "astroligically",
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
      accessorKey: "education",
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
      accessorKey: "clientModile",
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
          <Button
            text="Search Profile"
            onClick={() =>
              navigate("/search-profile", {
                state: { profileData: row.original },
              })
            }
          />
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

  if (clientListLoading || clientFromModuleLoading) {
    return <LoadingPage />;
  }

  const date = new Date();
  const transformedClientList =
    clientListData &&
    Array.isArray(clientListData.data) &&
    clientListData.data
      .map((m: ClientData) => ({
        id: m.client_id,
        items: Object.fromEntries(
          m.modules.flatMap((mm) =>
            mm.fields.map((field) => [field.field_name, field])
          )
        ),
        shared_profiles: m.shared_profiles,
        client_documents: m.client_documents,
      }))
      .filter((f) => {
        if (
          f.items.expiry_date &&
          new Date(f.items.expiry_date.value) <= new Date(date)
        ) {
          return f;
        }
      });

  const handledPaginationData = clientListData
    ? {
        current_page: clientListData.meta.current_page,
        last_page: clientListData.meta.last_page,
        per_page: clientListData.meta.per_page,
      }
    : initialPaginationData;

  const handleChange = (updateFilter: any) => {
    setFilters({ ...updateFilter });
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="">
        <div className="">
          <CommonFilters
            filters={filters}
            formValues={formValues}
            clientFormModuleData={clientFormModuleData}
            handleChangeMethod={handleChange}
            onSubmit={(filter) => {}}
            onReset={(filter) => {}}
          />
          {/* <ClientFilterForm onSubmit={(filter) => {}} key="Client-form-list" /> */}
        </div>
        {/* <ClientFilterForm onSubmit={(filter) => {}} key="Client-form-list" /> */}
      </div>
      <div className="mt-2 mb-2">
        <div className="flex justify-end p-4 bg-[#fff]">
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
        <Table columns={columns} data={transformedClientList || []} />
        <Pagination
          onPageChange={() => {}}
          pagination={handledPaginationData}
        />
      </div>
    </div>
  );
}
