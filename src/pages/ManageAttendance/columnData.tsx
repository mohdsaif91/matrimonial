import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const manageAttendanceLoginColumn: ColumnDef<any>[] = [
  {
    header: "#",
    accessorKey: "",
    size: 150,
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Staff Name",
    accessorKey: "name",
  },
  {
    header: "Date",
    accessorKey: "created_at",
    size: 170,
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return <div>{moment(createdAt).format("YYYY-MM-DD")}</div>;
    },
  },
  {
    header: "Logged In",
    accessorKey: "login_time",
    cell: ({ row }) => {
      const login_time = row.original.login_time;
      return (
        <div>{login_time ? moment(login_time).format("hh:mm:ss A") : "-"}</div>
      );
    },
  },
  {
    header: "Last Activity",
    accessorKey: "last_activity_time",
    size: 150,
    cell: ({ row }) => {
      const lastActivity = row.original.last_activity_time;
      <div>
        {lastActivity ? moment(lastActivity).format("hh:mm:ss A") : "-"}
      </div>;
    },
  },
  {
    header: "Logged Out",
    accessorKey: "mobile",
    size: 150,
    cell: ({ row }) => {
      const clientMobile = "";
      return <div>{clientMobile}</div>;
    },
  },
];
export const manageAttendanceLogoutColumn: ColumnDef<any>[] = [
  {
    header: "#",
    accessorKey: "",
    size: 150,
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Staff Role",
    accessorKey: "role",
  },
  {
    header: "Staff Name",
    accessorKey: "name",
    size: 170,
  },
  {
    header: "Staff Email",
    accessorKey: "email",
  },
  {
    header: "Staff Phone",
    accessorKey: "phone",
    size: 150,
  },
];
