import React, { useState } from "react";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { lastDaysOptions } from "../../../data/clientResponse";
import Button from "../../../component/form/Button";
import { DateTimePicker } from "../../../component/form/DateField";
import { data } from "react-router-dom";

export default function PaymentReportFilter({ callAPI }) {
  const [dayValue, setDayValue] = useState("");
  const [date, setDate] = useState({ fromDate: "", toDate: "" });
  return (
    <div className="flex w-full gap-2 bg-[#fff] p-4 rounded-[8px]">
      <DropDown
        options={lastDaysOptions}
        searchable={false}
        onChange={(val) => {
          setDayValue(val);
        }}
        label="Last Days"
        name="last_day"
        value={dayValue}
        placeholder="Select Days"
      />
      {dayValue === "desired_date" && (
        <React.Fragment>
          <DateTimePicker
            label="From Date"
            onChange={(d) => setDate({ ...date, fromDate: d })}
            value={date.fromDate}
            required={dayValue === "desired_date"}
          />
          <DateTimePicker
            label="From Date"
            onChange={(d) => setDate({ ...date, toDate: d })}
            value={date.toDate}
            required={dayValue === "desired_date"}
          />
        </React.Fragment>
      )}
      <div className="flex flex-row ml-4">
        <Button
          className="mt-4 mr-4"
          text="Search"
          onClick={() => {
            if (dayValue === "desired_date") {
              callAPI(date);
            } else {
              callAPI(dayValue);
            }
          }}
        />
        <Button className="mt-4" type="reset" text="Reset" onClick={() => {}} />
      </div>
    </div>
  );
}
