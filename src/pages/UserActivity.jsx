import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule]);
const activityRows = [
  { id: 1, addedBy: "OUS Admin", clientId: "Kavita Dhupar", module: "Profile Photo", desc: "add : photo.png", date: "2 hours ago", details: "#" },
  { id: 2, addedBy: "Staff", clientId: "Raj Mukesh", module: "Lead", desc: "edit : Raj Mukesh", date: "7 hours ago", details: "#" },
  { id: 3, addedBy: "Staff", clientId: "Raj Mukesh", module: "Lead", desc: "edit : Raj Mukesh", date: "7 hours ago", details: "#" },
];
const activityColumns = [
  { headerName: "#", field: "id", width: 70 },
  { headerName: "Added By", field: "addedBy", flex: 1 },
  { headerName: "Client Id", field: "clientId", flex: 1 },
  { headerName: "Module", field: "module", width: 150 },
  { headerName: "Description", field: "desc", flex: 1 },
  { headerName: "Date", field: "date", width: 140 },
  {
    headerName: "Details",
    field: "details",
    width: 100,
    cellRenderer: () => <a href="#" className="text-blue-500 underline text-xs">Details</a>,
  },
];

export function UserActivity() {
  return (
    <div className="mb-6 bg-white p-4 rounded shadow ag-theme-alpine" style={{height: "300px"}}>
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-blue-600">User Activity</h3>
        <a href="#" className="text-xs text-blue-500 underline">View More</a>
      </div>
      <AgGridReact
        rowData={activityRows}
        columnDefs={activityColumns}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={[5,20,50,100]}
        domLayout="autoHeight"
      />
    </div>
  );
}
