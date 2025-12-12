"use client";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

type ModuleProps = {
  id: number;
  name: string;
  key: string;
  value: string[];
  status: string;
};

const data: ModuleProps[] = [
  {
    id: 1,
    name: "Lead Id",
    key: "Personal Details",
    value: [],
    status: "Inactive",
  },
  {
    id: 2,
    name: "Sourced From",
    key: "sourced_from",
    value: ["Personal Details"],
    status: "Active",
  },
];

export default function ModuleTable({
  columns,
  data,
}: {
  columns: any;
  data: any[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
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
