import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule]);


const birthdayRows = [
  { id: 101, name: "John Doe", dob: "1990-08-23", email: "john@example.com", mobile: "9090909090" },
  { id: 102, name: "Priya Singh", dob: "1985-08-23", email: "priya@example.com", mobile: "8080808080" },
];

const birthdayColumns = [
  { headerName: "Client Profile Id", field: "id", width: 150 },
  { headerName: "Client Name", field: "name", flex: 1 },
  { headerName: "Client DOB", field: "dob", width: 150 },
  { headerName: "Client Email", field: "email", flex: 1 },
  { headerName: "Client Mobile", field: "mobile", width: 150 },
];

export function TodaysBirthday() {
  return (
    <div className="mb-6 bg-white p-4 rounded shadow ag-theme-alpine" style={{height: "300px"}}>
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-blue-600">Today’s Client Birthday</h3>
        <a href="#" className="text-xs text-blue-500 underline">View More</a>
      </div>
      <AgGridReact
        rowData={birthdayRows}
        columnDefs={birthdayColumns}
        paginationPageSize={5}
        pagination={true}
        paginationPageSizeSelector={[5,20,50,100]}
        domLayout="autoHeight"
      />
    </div>
  );
}
