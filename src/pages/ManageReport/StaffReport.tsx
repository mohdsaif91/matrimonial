import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import LoadingPage from "../Loading/Loading";
import Table from "../../component/table/Table";
import PaymentReportFilter from "./component/PaymentReportFilter";
import { fetchStaffReport } from "../../service/staffReport";
import { StaffReportsProps } from "../../types/staffReports";

const initialData = {
  filter: "",
  start_date: "",
  end_date: "",
};

export default function StaffReport() {
  const [filter, setFilter] = useState({ ...initialData });
  const [filters, setFilters] = useState();

  const { data: staffReportData, isLoading: paymentReportLoading } = useQuery({
    queryKey: ["staff-report-list", filters],
    queryFn: () => {
      return fetchStaffReport(filters);
    },
    retry: false,
  });

  const columns: ColumnDef<StaffReportsProps>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: "Name (Phone)",
      cell: ({ row }) => (
        <div>
          {row.original.name} ({row.original.phone})
        </div>
      ),
    },
    {
      accessorKey: "handle_client",
      header: "Handle Client",
    },
    {
      accessorKey: "created_client",
      header: "Created Client",
    },
    {
      accessorKey: "send_profiles",
      header: "Send Profiles",
    },
    {
      accessorKey: "created_tasks",
      header: "Created Tasks",
    },
    {
      accessorKey: "created_leads",
      header: "Created Leads",
    },
    {
      header: "Profile Shortlisting",
      accessorKey: "profile_shortlisting",
    },
  ];

  if (paymentReportLoading) {
    return <LoadingPage />;
  }

  const handledstaffReportData = staffReportData ? staffReportData.data : [];

  return (
    <div className="p-4 bg-white">
      <div className="flex">
        <PaymentReportFilter
          filterData={filter}
          setFilter={setFilter}
          onReset={() => {
            setFilter({ ...initialData });
            setFilters(null);
          }}
          callAPI={(f) => {
            setFilters(f);
          }}
        />
      </div>
      <div className="mt-2 mb-2">
        <Table borderX columns={columns} data={handledstaffReportData} />
      </div>
    </div>
  );
}
