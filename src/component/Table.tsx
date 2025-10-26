import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { Fragment, JSX, useState } from "react";
import ProfileCard from "../pages/ManageClient/Components/ProfileCard";
import { useNavigate } from "react-router-dom";
import ProfileCardExpandedRow from "../pages/ManageClient/ProfileCardExpandedRow";

export default function Table({
  columns,
  data,
  expandedRowChildren,
  onAddResponse,
}: {
  columns: any;
  data: any[];
  expandedRowChildren?: JSX.Element;
  onAddResponse?: () => void;
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
                      <ProfileCardExpandedRow
                        data={row.original}
                        age=""
                        dateTime=""
                        image=""
                        name=""
                      />
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
