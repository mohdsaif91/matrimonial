import React, { useState } from "react";
import Button from "../../../component/form/Button";
import { DateTimePicker } from "../../../component/form/DateField";

export default function AttendenceReportFilter({
  fetchAttendenceReport,
}: {
  fetchAttendenceReport: (fil: any) => void;
}) {
  const [filter, setFIlter] = useState(new Date());
  return (
    <form
      onSubmit={() => fetchAttendenceReport(filter)}
      className="grid grid-cols-3 gap-3 bg-[#fff] p-4 rounded-[8px] "
    >
      <DateTimePicker
        label="Year"
        dateFormat="yyyy"
        onChange={(val) => {
          setFIlter(val);
        }}
        required={true}
        showYear={true}
        value={filter}
      />
      <div className="flex flex-row ml-4">
        <Button className="mt-4 mr-4" type="submit" text="Search" />
        <Button
          className="mt-4"
          type="reset"
          text="Reset"
          onClick={() => {
            setFIlter(new Date());
          }}
        />
      </div>
    </form>
  );
}
