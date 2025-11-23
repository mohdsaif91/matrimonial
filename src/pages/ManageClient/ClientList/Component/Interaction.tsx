import React, { useState } from "react";
import { Edit2 } from "lucide-react";
import Table from "../../../../component/table/Table";
import { DropDown } from "../../../../component/form/SearchableDropdown";
import { interactionType } from "../../../../data/interaction";
import { yesNoOptions } from "../../../../data/ClientForm";
import TextArea from "../../../../component/form/TextArea";
import Button from "../../../../component/form/Button";

const initialData = {
  type: "",
  interactionWithClient: "",
  remark: "",
};
export default function Interaction({ data }) {
  const [formData, setFormData] = useState({ ...initialData });

  const columns = [
    {
      header: "#",
      accessorKey: "serial",
      Cell: ({ row }) => row.index + 1,
    },
    {
      header: "Remark",
      accessorKey: "remark",
    },
    {
      header: "Interaction",
      accessorKey: "interaction",
    },
    {
      header: "Interaction With Client",
      accessorKey: "interaction_with_client",
    },
    {
      header: "Added By",
      accessorKey: "added_by",
    },
    {
      header: "Created At",
      accessorKey: "created_at",
      Cell: ({ value }) => <span>{new Date(value).toLocaleString()}</span>,
    },
    {
      header: "Action",
      accessorKey: "action",
      Cell: ({ row }) => (
        <button
          onClick={() => console.log("Edit row", row.original)}
          className="p-1 rounded hover:bg-gray-200"
        >
          <Edit2 size={18} />
        </button>
      ),
    },
  ];

  const transformedClientList = [];

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <div className="mt-6 grid grid-cols-4 gap-4">
          <DropDown
            label="Select Type"
            name="selectType"
            options={interactionType}
            value={formData.type}
            onChange={(val) => {
              setFormData({ ...formData, type: val });
            }}
          />
          <DropDown
            label="Interaction With Client"
            name="interactionWitClient"
            options={yesNoOptions}
            value={formData.interactionWithClient}
            onChange={(val) => {
              setFormData({
                ...formData,
                interactionWithClient: val as string,
              });
            }}
          />

          <div className="col-span-2">
            <TextArea
              label="Remark"
              name="remark"
              value={formData.remark}
              onChange={(e) => setFormData({ ...formData, remark: e })}
            />
          </div>
        </div>
        <Button text="Save All" />
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 shadow rounded">
        <h3 className="text-lg font-semibold mb-3">Service Interactions</h3>

        <Table borderX columns={columns} data={transformedClientList} />
      </div>
    </div>
  );
}
