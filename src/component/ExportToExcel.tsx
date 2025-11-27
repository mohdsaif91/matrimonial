import * as XLSX from "xlsx";

/**
 * Export JSON table data to an Excel file
 * @param {Array} data - Array of objects (table rows)
 * @param {String} fileName - Output Excel file name
 */
export const exportToExcel = (data: any, fileName: string = "export.xlsx") => {
  if (!data || data.length === 0) {
    console.error("No data to export");
    return;
  }

  // Convert JSON data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Export the Excel file
  XLSX.writeFile(workbook, fileName);
};
