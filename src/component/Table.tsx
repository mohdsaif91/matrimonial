import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { Fragment, useState } from "react";
import ProfileCard from "../pages/ManageClient/Components/ProfileCard";

export default function Table({
  columns,
  data,
}: {
  columns: any;
  data: any[];
}) {
  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="p-4 bg-white rounded-xl shadow-md overflow-auto">
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 text-sm text-gray-700 border-b"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td
                      colSpan={row.getVisibleCells().length}
                      className="bg-gray-50 px-6 py-4"
                    >
                      <div className="flex justify-start">
                        <ProfileCard
                          image={
                            row.original.client_documents?.find(
                              (doc: any) => doc.file_type === "main_photo"
                            )?.file_path || "https://via.placeholder.com/150"
                          }
                          name={row.original.items?.client_name?.value || "N/A"}
                          age={row.original.items?.age?.value || "-"}
                          dateTime={
                            row.original.items?.created_at?.value || "N/A"
                          }
                          onAttachProfile={() =>
                            console.log("Attach clicked", row.original)
                          }
                          onAddResponse={() =>
                            console.log("Response clicked", row.original)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))
          ) : (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="px-4 py-6 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
