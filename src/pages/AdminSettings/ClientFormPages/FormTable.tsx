"use client";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

type ClientForm = {
  id: number;
  displayName: string;
  fieldName: string;
  module: string;
  validation: string;
  required: string;
  viewInPdf: string;
  divCss: string;
  status: string;
};

const data: ClientForm[] = [
  {
    id: 1,
    displayName: "Lead Id",
    fieldName: "lead_id",
    module: "Personal Details",
    validation: "",
    required: "No",
    viewInPdf: "No",
    divCss: "col-12 col-xxl-3 mb-2",
    status: "Inactive",
  },
  {
    id: 2,
    displayName: "Sourced From",
    fieldName: "sourced_from",
    module: "Personal Details",
    validation: "",
    required: "No",
    viewInPdf: "No",
    divCss: "col-12 col-xxl-3 mb-2",
    status: "Active",
  },
  {
    id: 3,
    displayName: "Profile Handled",
    fieldName: "profile_handled",
    module: "Personal Details",
    validation: "",
    required: "Yes",
    viewInPdf: "No",
    divCss: "col-12 col-xxl-3 mb-2",
    status: "Active",
  },
];

export default function FormTable() {
  const columns: ColumnDef<ClientForm>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "displayName",
      header: "Display Name",
    },
    {
      accessorKey: "fieldName",
      header: "Field Name",
    },
    {
      accessorKey: "module",
      header: "Module",
    },
    {
      accessorKey: "validation",
      header: "Validation",
    },
    {
      accessorKey: "required",
      header: "Required",
    },
    {
      accessorKey: "viewInPdf",
      header: "View In Pdf",
    },
    {
      accessorKey: "divCss",
      header: "Div Css",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => alert(`Edit ${row.original.id}`)}
            className="p-2 rounded hover:bg-gray-200"
          >
            <Pencil size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => alert(`Delete ${row.original.id}`)}
            className="p-2 rounded hover:bg-gray-200"
          >
            <Trash size={16} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4  rounded-xl shadow-md">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 text-sm text-gray-700 border-b"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
