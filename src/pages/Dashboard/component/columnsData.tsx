import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

type BirthdayRow = {
  id: string;
  name: string;
  dob: string;
  email: string;
  mobile: string;
};

export const birthdayColumns: ColumnDef<BirthdayRow>[] = [
  {
    header: "Client Profile Id",
    accessorKey: "client_id",
    size: 150,
  },
  {
    header: "Client Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const userName =
        (Array.isArray(row.original?.form_values) &&
          row.original?.form_values.find((f) => f.field_name === "client_name")
            .value) ||
        "";
      return <div className="capitalize">{userName}</div>;
    },
  },
  {
    header: "Client DOB",
    accessorKey: "dob",
    size: 150,
    cell: ({ row }) => {
      const DOB =
        (Array.isArray(row.original?.form_values) &&
          row.original?.form_values.find(
            (f) => f.field_name === "date_of_birth"
          ).value) ||
        "";
      return (
        <div className="capitalize">{moment(DOB).format("yyyy-MM-DD")}</div>
      );
    },
  },
  {
    header: "Client Email",
    accessorKey: "email",
    cell: ({ row }) => {
      const mobile =
        (Array.isArray(row.original?.form_values) &&
          row.original?.form_values.find((f) => f.field_name === "client_email")
            .value) ||
        "";
      return <div className="">{mobile}</div>;
    },
  },
  {
    header: "Client Mobile",
    accessorKey: "mobile",
    size: 150,
    cell: ({ row }) => {
      const mobile =
        (Array.isArray(row.original?.form_values) &&
          row.original?.form_values.find(
            (f) => f.field_name === "client_mobile"
          ).value) ||
        "";
      return <div className="capitalize">{mobile}</div>;
    },
  },
];

type AnniversaryRow = {
  id: string;
  name: string;
  anniversary: string;
  email: string;
  mobile: string;
};

export const anniversariesColumns: ColumnDef<AnniversaryRow>[] = [
  {
    header: "Client Profile Id",
    accessorKey: "client_id",
    size: 150,
  },
  {
    header: "Client Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const cleintName =
        (Array.isArray(row.original.form_values) &&
          row.original.form_values.find((f) => f.field_name === "client_name")
            .value) ||
        "";
      return <div className="capitalize">{cleintName}</div>;
    },
  },
  {
    header: "Client Anniversary",
    accessorKey: "anniversary",
    size: 170,
    cell: ({ row }) => {
      const clientAniversary =
        (Array.isArray(row.original.form_values) &&
          row.original.form_values.find(
            (f) => f.field_name === "father_and_mother_anniversary_date"
          ).value) ||
        "";
      return <div>{clientAniversary}</div>;
    },
  },
  {
    header: "Client Email",
    accessorKey: "email",
    cell: ({ row }) => {
      const clientEmail =
        (Array.isArray(row.original.form_values) &&
          row.original.form_values.find((f) => f.field_name === "client_email")
            .value) ||
        "";
      return <div>{clientEmail}</div>;
    },
  },
  {
    header: "Client Mobile",
    accessorKey: "mobile",
    size: 150,
    cell: ({ row }) => {
      const clientMobile =
        (Array.isArray(row.original.form_values) &&
          row.original.form_values.find((f) => f.field_name === "client_mobile")
            .value) ||
        "";
      return <div>{clientMobile}</div>;
    },
  },
];

export const absentColumn: ColumnDef<any>[] = [
  {
    header: "#",
    accessorKey: "",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    header: "Employee",
    accessorKey: "name",
  },
  {
    header: "Status",
    accessorKey: "status",
    size: 150,
    cell: () => {
      return <>Absent</>;
    },
  },
];

type ActivityRow = {
  id: number;
  addedBy: string;
  clientId: string;
  module: string;
  desc: string;
  date: string;
  details?: any;
};

export const activityColumns: ColumnDef<ActivityRow>[] = [
  {
    header: "#",
    accessorKey: "id",
    size: 70,
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    header: "Added By",
    accessorKey: "added_by",
  },
  {
    header: "Client Id",
    accessorKey: "client_id",
  },
  {
    header: "Module",
    accessorKey: "module",
    size: 150,
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Date",
    accessorKey: "created_at",
    cell: ({ getValue }) => {
      return <div>{moment(getValue()).format("yyyy-MM-DD")}</div>;
    },
  },
  {
    header: "Details",
    accessorKey: "details",
    size: 100,
    cell: () => (
      <a href="#" className="text-blue-500 underline text-xs">
        Details
      </a>
    ),
  },
];
