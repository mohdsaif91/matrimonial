import Button from "../../../component/form/Button";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../../Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import Table from "../../../component/table/Table";
import { deleteManageUserAPI } from "../../../service/manageUser";
import { deleteLead, fetchLead } from "../../../service/leads";
import { LeadsProps } from "../../../types/leads";
import { fetchCity } from "../../../service/city";
import { fetchProfileSource } from "../../../service/profileSource";
import LeadFilterForm from "./LeadsFilter";
import Checkbox from "../../../component/form/Checkbox";
import { useState } from "react";
import { getLabelValue } from "../../../util/ClientUtils";
import { fetchState } from "../../../service/state";
import { fetchCountry } from "../../../service/country";

const initialFilterData = {
  lead_name: "",
  contact_person_name: "",
  relation_with_lead: "",
  phone: "",
  alternate_phone: "",
  email: "",
  country_id: 0,
  state_id: 0,
  city_id: 0,
  address: "",
  looking_for: "",
  budget_from: "",
  budget_to: "",
  other_details: "",
  profile_source_id: 0,
  assign_to: 0,
  status: "",
  id: "",
};

export default function LeadsList() {
  const [filter, setFilter] = useState<LeadsProps>({ ...initialFilterData });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: leadData, isLoading: leadLoading } = useQuery({
    queryKey: ["leads-list"],
    queryFn: fetchLead,
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
    queryKey: ["country-list"], // unique cache key
    queryFn: fetchCountry,
  });

  const { data: assigneToData, isLoading: assigneToLoading } = useQuery({
    queryKey: ["profile-source-list"],
    queryFn: fetchProfileSource,
    retry: false,
  });

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

  const getAsssigneTo = (assigneTo: number) => {
    let assigneTostr = "";
    if (assigneToData.data) {
      const assigneToDataItem = assigneToData.data.find(
        (f) => f.id === assigneTo
      );
      return (assigneToDataItem && assigneToDataItem.name) || "";
    }
    return assigneTostr;
  };

  const columns: ColumnDef<LeadsProps>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ getValue }) => (
        <div className="flex">
          <span className="mr-2">{getValue()}</span>
          <Checkbox
            checked={true}
            label=""
            onChange={() => {}}
            id={(getValue && getValue()) || 1}
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
      accessorKey: "phone",
      header: "Lead Id",
    },
    {
      accessorKey: "gender",
      header: "Contact Person Name/Relation With Lead",
      cell: ({ row }) => {
        const { contact_person_name, relation_with_lead } = row.original;
        return <div>{`${contact_person_name} | ${relation_with_lead}`}</div>;
      },
    },
    {
      accessorKey: "role",
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
      accessorKey: "role",
      header: "Assign To/Created By",
      cell: ({ row }) => {
        const { assign_to } = row.original;
        return <div>{`${getAsssigneTo(assign_to || 0)} | ${1}`}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Follow Up",
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

  const handleFilterApiCall = () => {};

  if (leadLoading) {
    return <LoadingPage />;
  }

  const handledLeadData = leadData ? leadData.data : [];

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <div className="flex justify-between">
        <label className="font-bold text-2xl">Leads</label>
        <Button text="+ Add Leads" onClick={() => navigate("/addLeads")} />
      </div>
      <div>
        <LeadFilterForm
          city={getLabelValue(CityData.data || [])}
          state={getLabelValue(stateData.data || [])}
          country={getLabelValue(countryData.data || [])}
          onChange={() => {}}
          filters={{}}
          onReset={() => setFilter({ ...initialFilterData })}
          onSearch={() => handleFilterApiCall()}
          key="Filter-Leads"
        />
      </div>
      <div className="mt-2 mb-2">
        <Table columns={columns} data={handledLeadData} />
      </div>
    </div>
  );
}
