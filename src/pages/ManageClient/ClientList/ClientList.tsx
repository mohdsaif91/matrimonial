import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import {
  Pencil,
  Eye,
  IndianRupee,
  SquarePlus,
  List,
  ChevronDown,
  ChevronUp,
  Info,
  FileText,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { fetchClientByFilters, fetchClientList } from "../../../service/client";
import LoadingPage from "../../Loading/Loading";
import Table from "../../../component/table/Table";
import Button from "../../../component/form/Button";
import { ClientData } from "../../../types/client";
import Pagination from "../../../component/Pagination";
import TableInfoPopup from "../../../component/table/TableInfoPopup";
import CommonFilters from "../CommonFilters";
import { fetchClientFormModule } from "../../../service/clientFormModule";
import ModalPopup from "../../../component/ModalPopup";
import {
  convertDynamicFieldsToPaymentRows,
  getAuthUserPermission,
  getCRMObject,
  getStatusColor,
} from "../../../util/ClientUtils";
import ClientDetails from "./Component/ClientDetails";
import Tooltip from "../../../component/Tooltip";
import Interaction from "./Component/Interaction";
import Payment from "./Component/Payment";
import TaskAdd from "../../ManageTask/TaskAdd";

const initialPaginationData = {
  current_page: 1,
  last_page: 0,
  per_page: 30,
};

const initialClientModalData = {
  flag: false,
  data: null,
  type: "",
  title: "",
};

const CRMData = getCRMObject();

export default function ClientList() {
  const [paginationData, setPaginationData] = useState({
    ...initialPaginationData,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [formValues, setFormValues] = useState<any[]>([]);
  const [clientDataModal, setClientDataModal] = useState({
    ...initialClientModalData,
  });
  const [filterData, setFilterData] = useState<any[] | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: clientListData,
    error: clientListError,
    isLoading: clientListLoading,
    refetch: clientDataRefetch,
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
    refetchOnWindowFocus: true,
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
        let CRMImage = CRMData?.DEFAULT_IMAGE?.value || "";
        let color = "bg-[#fff]";
        const date = new Date();
        if (items?.expiry_date) {
          color =
            new Date(items?.expiry_date.value) <= new Date(date)
              ? "#FA9189"
              : getStatusColor(items?.membership_profile_status);
        }
        return (
          <div className="flex justify-start h-full">
            {mainPhoto?.file_path ? (
              <div
                style={{ backgroundColor: color }}
                className={` h-auto w-[8px] mr-1`}
              />
            ) : (
              <div
                style={{ backgroundColor: color }}
                className={` h-auto w-[32px] mr-1`}
              />
            )}
            <div>
              {mainPhoto?.file_path ? (
                <img
                  alt="miain_photo"
                  src={mainPhoto?.file_path}
                  className="w-[200px] h-[140px] p-2"
                />
              ) : (
                <img
                  alt="miain_photo"
                  src={CRMImage}
                  className="w-[800px] h-[140px] p-2"
                />
              )}
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
            <span className="capitalize">{items.client_name?.value} | </span>
            <span
              onClick={() => {
                setClientDataModal({
                  title: "Client Profile Detail",
                  type: "clientDetails",
                  flag: true,
                  data: row.original,
                });
              }}
              className="font-bold cursor-pointer"
            >
              ({row.original.client_id})
            </span>{" "}
            | {leadValue || "-"}|{" "}
            {items?.date_of_birth?.value &&
              moment(items?.date_of_birth?.value).format("YYYY-MM-DD")}
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
      cell: ({ row }) => {
        const clientName =
          (row.original.items && row.original.items?.client_name?.value) || "";
        const profileId = `${row.original?.client_id}` || "";
        return (
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
              <Tooltip text="View Interaction">
                <Eye
                  size={16}
                  onClick={() =>
                    setClientDataModal({
                      type: "interaction",
                      data: row.original,
                      flag: true,
                      title: `Interaction Client Name:- ${clientName}, Profile Id:- ${profileId}, Lead Id:-`,
                    })
                  }
                  className="cursor-pointer text-gray-600"
                />
              </Tooltip>
              <Tooltip text="Edit client">
                <Pencil
                  onClick={() =>
                    navigate("/editClient", { state: { data: row.original } })
                  }
                  size={16}
                  className="cursor-pointer text-gray-600"
                />
              </Tooltip>
              <Tooltip text="View PDF">
                <FileText
                  onClick={() =>
                    navigate("/pdfView", { state: { pdfData: row.original } })
                  }
                  size={16}
                  className="cursor-pointer text-gray-600"
                />
              </Tooltip>
              {getAuthUserPermission().includes("manage_payment.view") && (
                <Tooltip text="Payments">
                  <IndianRupee
                    onClick={() => {
                      const paymentModuleData = clientListData.data[
                        row.index
                      ].modules.find(
                        (f) => f.module_slug === "payment_details"
                      ).fields;

                      const convertedData = convertDynamicFieldsToPaymentRows(
                        paymentModuleData,
                        row.original.items.client_name.value
                      );
                      setClientDataModal({
                        type: "payment",
                        data: {
                          tableArr: convertedData,
                          client_id: row.original.id,
                        },
                        flag: true,
                        title: "Payments",
                      });
                    }}
                    size={16}
                    className="cursor-pointer text-gray-600"
                  />
                </Tooltip>
              )}
              <Tooltip text="Add Task">
                <SquarePlus
                  onClick={() => {
                    setClientDataModal({
                      data: row.original.id,
                      flag: true,
                      title: "Add Task",
                      type: "task",
                    });
                  }}
                  size={16}
                  className="cursor-pointer text-gray-600"
                />
              </Tooltip>
              <Tooltip text="View Task">
                <List
                  onClick={() => {
                    navigate("/task-list", {
                      state: {
                        clientIdForTask: row.original.id,
                        clientData: row.original,
                      },
                    });
                  }}
                  size={16}
                  className="cursor-pointer text-gray-600"
                />
              </Tooltip>
              {/* <Trash
              size={16}
              className="text-gray-600"
              onClick={() => {
                row.original.id && deleteMutation.mutate(row.original.id);
              }}
            /> */}
            </div>
          </div>
        );
      },
    },
  ];

  const mutation = useMutation({
    mutationFn: fetchClientByFilters,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["client-list"] });
      setFilterData(data.data);
    },
    onError: (error: any) => {
      console.error("❌ Error adding Form Item:", error);
      toast(error.response?.data?.message || "Failed to add Form Item");
    },
  });

  if (clientListLoading) {
    return <LoadingPage />;
  }

  const getComponent = (type) => {
    switch (type) {
      case "clientDetails":
        return <ClientDetails data={clientDataModal.data} />;
      case "interaction":
        return <Interaction data={clientDataModal.data} type="client" />;
      case "payment":
        return (
          <Payment
            client_id={clientDataModal.data?.client_id}
            tableArr={clientDataModal.data?.tableArr}
          />
        );
      case "task":
        return <TaskAdd client_id={clientDataModal.data} />;
      default:
        return <></>;
        break;
    }
  };

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
        client_id: m.client_profile_id,
        shared_profiles: m.shared_profiles,
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
        client_id: m.client_profile_id,
        client_documents: m.client_documents,
        shared_profiles: m.shared_profiles,
      }));

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
      <div className="">
        <CommonFilters
          loading={mutation.isPending}
          filters={filters}
          formValues={formValues}
          clientFormModuleData={clientFormModuleData}
          handleChangeMethod={handleChange}
          onSubmit={(filter) => {
            const finalObj: any[] = [];
            Object.keys(filters).forEach((key) => {
              if (filters[key].value !== "") {
                finalObj.push(filters[key]);
              }
            });
            mutation.mutate({ search_fields: finalObj });
          }}
          onReset={() => {
            setFilterData(null);
            setFilters({});
            clientDataRefetch();
          }}
        />
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
        <Table borderX columns={columns} data={transformedClientList || []} />
        <Pagination
          onActionChange={(pData) => {
            setPaginationData({
              current_page: pData.current_page,
              per_page: pData.per_page,
              last_page: paginationData.last_page,
            });
          }}
          pagination={handledPaginationData}
        />
      </div>
      <ModalPopup
        data={clientDataModal.data}
        title={clientDataModal.title}
        isOpen={clientDataModal.flag}
        children={getComponent(clientDataModal.type)}
        onClose={() => setClientDataModal(initialClientModalData)}
        width="640px"
      />
    </div>
  );
}
