import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { ModuleProps } from "../../types/module";
import Table from "../../component/Table";

const PhotoBioData = () => {
  const columns: ColumnDef<ModuleProps>[] = [
    {
      accessorKey: "name",
      header: "Profile Photo",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              status === "active"
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
            onClick={() => {
              //   navigate("/editCountry", { state: { data: row.original } });
            }}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            {/* <Pencil size={16} className="text-gray-600" /> */}
          </button>
          <button
            onClick={
              () => []
              //   row.original.id && deleteMutation.mutate(row.original.id)
            }
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            {/* <Trash size={16} className="text-red-500" /> */}
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="mt-2 mb-2">
      <Table columns={columns} data={[]} />
    </div>
  );
};

export default PhotoBioData;
