import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule]);
const anniversariesRows = [
  { id: 201, name: "Asha Patel", anniversary: "2005-08-23", email: "asha@patel.com", mobile: "7070707070" },
  { id: 201, name: "Asha Patel", anniversary: "2005-08-23", email: "asha@patel.com", mobile: "7070707070" },
  { id: 201, name: "Asha Patel", anniversary: "2005-08-23", email: "asha@patel.com", mobile: "7070707070" },
];
const anniversariesColumns = [
  { headerName: "Client Profile Id", field: "id", width: 150 },
  { headerName: "Client Name", field: "name", flex: 1 },
  { headerName: "Client Anniversary", field: "anniversary", width: 170 },
  { headerName: "Client Email", field: "email", flex: 1 },
  { headerName: "Client Mobile", field: "mobile", width: 150 },
];

export function TodaysAnniversaries() {
  return (
    <div className="mb-6 bg-white p-4 rounded shadow ag-theme-alpine" style={{height: "300px"}}>
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-blue-600">Today’s Client Anniversaries</h3>
        <a href="#" className="text-xs text-blue-500 underline">View More</a>
      </div>
      <AgGridReact
        rowData={anniversariesRows}
        columnDefs={anniversariesColumns}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={[5,20,50,100]}
        domLayout="autoHeight"
      />
    </div>
  );
}
