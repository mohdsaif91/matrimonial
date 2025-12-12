import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const absentRows = [
  { id: 1, employee: "OUS Admin", status: "Absent" },
  { id: 2, employee: "Staff One", status: "Absent" },
  { id: 3, employee: "Staff One", status: "Absent" },
];

const absentColumns = [
  { headerName: "#", field: "id", width: 70 },
  { headerName: "Employee", field: "employee", flex: 1 },
  { headerName: "Status", field: "status", width: 120 },
];

export function AbsentToday() {
  return (
    <div
      className="mb-6 bg-white p-4 rounded shadow ag-theme-alpine"
      style={{ height: "300px" }}
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-blue-600">Absent Today</h3>
        <a href="#" className="text-xs text-blue-500 underline">
          View More
        </a>
      </div>
      <AgGridReact
        rowData={absentRows}
        columnDefs={absentColumns}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={[5, 20, 50, 100]}
        domLayout="autoHeight"
      />
    </div>
  );
}
