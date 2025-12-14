import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../../Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import Table from "../../../component/table/Table";
import { assigneLeads, deleteLead, fetchLead } from "../../../service/leads";
import { LeadsProps } from "../../../types/leads";
import { fetchCity } from "../../../service/city";
import Checkbox from "../../../component/form/Checkbox";
import { useEffect, useState } from "react";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { getLabelValue } from "../../../util/ClientUtils";
import ModalPopup from "../../../component/ModalPopup";
import Tooltip from "../../../component/Tooltip";
import moment from "moment";
import LeadsFollowUp from "./component/LeadsFollowUp";
import LeadFilterForm from "./LeadsFilter";
import { fetchManageUserAPI } from "../../../service/manageUser";
import { fetchState } from "../../../service/state";
import { fetchCountry } from "../../../service/country";
import { fetchProfileSource } from "../../../service/profileSource";

const initialData = {
  lead_id: "",
  lead_name: "",
  contact_person_name: "",
  phone: "",
  email: "",
  country_id: "",
  state_id: "",
  city_id: "",
  address: "",
  looking_for: "",
  budget_from: "",
  budget_to: "",
  profile_source_id: "",
  assign_to: "",
  status: "",
  created_from: "",
  created_to: "",
  followup_from: "",
  followup_to: "",
  followup_required: "",
  lead_source_id: "",
};

export default function LeadsList() {
  const [filters, setFilters] = useState<any>({});
  const [filter, setFilter] = useState<any>({ ...initialData });
  const [selected, setSelected] = useState([]);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState("");
  const [openFolowUp, setOpenFollowUp] = useState({ taskId: "", flag: false });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { state } = useLocation();

  const { data: leadData, isLoading: leadLoading } = useQuery({
    queryKey: ["leads-list", filters],
    queryFn: () => {
      return fetchLead(filters);
    },
    retry: false,
    enabled: !state,
  });

  const { data: leadDashboardData, isLoading: leadDashboardLoading } = useQuery(
    {
      queryKey: ["leads-list", filters],
      queryFn: () => {
        return fetchLead(filters);
      },
      retry: false,
      enabled: !!(
        state &&
        (state.leadStartDate || state.leadsDashboardThirtyDays)
      ),
    }
  );

  const { data: manageUserData, isLoading } = useQuery({
    queryKey: ["manage-user-list"],
    queryFn: fetchManageUserAPI,
    retry: false,
  });

  const {
    data: CityData,
    error: CityError,
    isLoading: CityLoading,
    refetch: CityRefetch,
  } = useQuery({
    queryKey: ["City-list"], // unique cache key
    queryFn: fetchCity,
  });

  const {
    data: stateData,
    error: stateError,
    isLoading: stateLoading,
    refetch: stateRefetch,
  } = useQuery({
    queryKey: ["state-list"], // unique cache key
    queryFn: fetchState,
  });

  const {
    data: countryData,
    error: countryError,
    isLoading: countryLoading,
    refetch: countryRefetch,
  } = useQuery({
    queryKey: ["country-list"],
    queryFn: fetchCountry,
  });
  const { data: assigneToData, isLoading: assigneToLoading } = useQuery({
    queryKey: ["profile-source-list"],
    queryFn: fetchProfileSource,
    retry: false,
  });

  useEffect(() => {
    if (state) {
      if (state.leadStartDate) {
        setFilters({
          ...filters,
          created_from: state.leadStartDate,
          created_to: state.leadStartDate,
        });
        setFilter({
          ...filters,
          created_from: state.leadStartDate,
          created_to: state.leadStartDate,
        });
      }
      if (state.leadsDashboardThirtyDays) {
        setFilters({
          ...filters,
          created_from: state.leadsDashboardThirtyDays,
          created_to: moment(new Date()).format("YYYY-MM-DD"),
        });
        setFilter({
          ...filters,
          created_from: state.leadsDashboardThirtyDays,
          created_to: moment(new Date()).format("YYYY-MM-DD"),
        });
      }
    }
  }, [state]);

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      toast("Successfully deleted Managed Lead");
      queryClient.invalidateQueries({ queryKey: ["leads-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Managed Lead:", error);
      toast(error.response?.data?.message || "Failed to delete Managed Lead");
    },
  });
  const getCityName = (CityId: number) => {
    let city = "";
    if (CityData) {
      const cityDataItem = CityData.data.find((f) => f.id === CityId);
      return cityDataItem.name;
    }
    return city;
  };

  const getUser = (assigneTo: number) => {
    let assigneTostr = "";

    if (manageUserData.data) {
      const manageUserDataItem = manageUserData.data.find(
        (f) => f.id === assigneTo
      );
      return (manageUserDataItem && manageUserDataItem.name) || "";
    }
    return assigneTostr;
  };

  const columns: ColumnDef<LeadsProps>[] = [
    {
      accessorKey: "",
      header: "#",
      cell: ({ row }) => (
        <div className="flex">
          <span className="mr-2">{row.index + 1}</span>
          <Checkbox
            checked={selected.includes(row.original?.id)}
            label=""
            onChange={(checked) => {
              if (checked) {
                setSelected([...selected, row.original?.id]);
              } else {
                setSelected([...selected.filter((f) => f != row.original?.id)]);
              }
            }}
          />
        </div>
      ),
    },
    {
      accessorKey: "lead_name",
      header: "Lead Name",
    },
    {
      accessorKey: "email",
      header: "Lead Source",
    },
    {
      accessorKey: "id",
      header: "Lead Id",
    },
    {
      accessorKey: "contactPerson/RelationWithLead",
      header: "Contact Person Name/Relation With Lead",
      cell: ({ row }) => {
        const { contact_person_name, relation_with_lead } = row.original;
        return <div>{`${contact_person_name} | ${relation_with_lead}`}</div>;
      },
    },
    {
      accessorKey: "phone/email",
      header: "Phone/Email",
      cell: ({ row }) => {
        const { phone, email } = row.original;
        return <div>{`${phone} | ${email}`}</div>;
      },
    },
    {
      accessorKey: "city_id",
      header: "City",
      cell: ({ getValue }) => {
        return <div>{getCityName(getValue())}</div>;
      },
    },
    {
      accessorKey: "looking_for",
      header: "Looking For",
    },
    {
      accessorKey: "gender",
      header: "Budget",
      cell: ({ row }) => {
        const { budget_from, budget_to } = row.original;
        return <div>{`${budget_from}-${budget_to}`}</div>;
      },
    },
    {
      accessorKey: "assignTo/CreatedBy",
      header: "Assign To/Created By",
      cell: ({ row }) => {
        const { assign_to, created_by } = row.original;
        return <div>{`${getUser(assign_to || 0)} | ${created_by}`}</div>;
      },
    },
    {
      accessorKey: "followups",
      header: "Follow Up",
      cell: ({ row }) => {
        return (
          <div className="flex">
            <Tooltip text="View Follow Up">
              <Eye
                onClick={() => {
                  setOpenFollowUp({ flag: true, taskId: row.original.id });
                }}
                size={16}
                className="text-red-500 cursor-pointer"
              />
            </Tooltip>
            <div className="ml-2">
              {Array.isArray(row.original?.followups)
                ? row.original?.followups.length
                : 0}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Followup Required",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ getValue }) => {
        return <div>{moment(getValue()).format("yyyy-MM-DD")}</div>;
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              navigate("/editLeads", { state: { data: row.original } });
            }}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Pencil size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() =>
              row.original.id && deleteMutation.mutate(row.original.id)
            }
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Trash size={16} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  const mutation = useMutation({
    mutationFn: assigneLeads,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["lead-assigned-list"] });
      toast("Successfully Assigned Leads");
      setSelectedAssignedTo("");
      setSelected([]);
    },
    onError: (error: any) => {
      console.error("❌ Error Assigning Leads:", error);
      toast(error.response?.data?.message || "Failed to Assign Leads");
    },
  });

  if (leadLoading) {
    return <LoadingPage />;
  }

  const handledCityData = CityData ? getLabelValue(CityData.data) : [];
  const handledStateData = stateData ? getLabelValue(stateData.data) : [];
  const handledCountryData = countryData ? getLabelValue(countryData.data) : [];

  const handledLeadData =
    state && state.leadStartDate
      ? leadDashboardData
        ? leadDashboardData.data
        : []
      : leadData
      ? leadData.data
      : [];

  const handledAssignedTo = manageUserData
    ? getLabelValue(manageUserData.data)
    : [];

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between">
        <label className="font-bold text-2xl">Leads</label>
        <Button text="+ Add Leads" onClick={() => navigate("/addLeads")} />
      </div>
      <div>
        <div className="">
          <LeadFilterForm
            onReset={() => setFilter({ ...initialData })}
            assigneTo={handledAssignedTo}
            setFilterData={setFilter}
            city={handledCityData}
            filterData={filter}
            country={handledCountryData}
            state={handledStateData}
            onSearch={(filter) => {
              setFilters({ ...filter });
            }}
          />
        </div>
      </div>
      <div className="mt-3 mb-3">
        <div className="flex align-middle">
          <p className="flex items-center">selected Count: {selected.length}</p>
          <div className="ml-3 ">
            <DropDown
              disabled={selected.length === 0}
              name="assigneTo"
              options={handledAssignedTo || []}
              showLabel={false}
              value={selectedAssignedTo}
              onChange={(val) => {
                setSelectedAssignedTo(val);
              }}
              required={false}
              label="Assigne To"
            />
          </div>

          <Button
            onClick={() => {
              mutation.mutate({ selected, selectedAssignedTo });
            }}
            loading={mutation.isPending}
            className="ml-3"
            disabled={selected.length === 0}
            text="Assigne To"
          />
        </div>
        <Table borderX columns={columns} data={handledLeadData} />
      </div>
      <ModalPopup
        title="Leads Follow up"
        width="560px"
        data={[]}
        isOpen={openFolowUp.flag}
        onClose={() => setOpenFollowUp({ flag: false, taskId: "" })}
        children={<LeadsFollowUp taskId={openFolowUp.taskId} />}
      />
    </div>
  );
}
