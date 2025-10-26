import React, { useState } from "react";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { lastDaysOptions } from "../../../data/clientResponse";
import Button from "../../../component/form/Button";

export default function ClientResponseFilter({}) {
  const [dayValue, setDayValue] = useState("");
  return (
    <div className="flex bg-[#fff] p-4 rounded-[8px]">
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
      <div className="flex flex-row ml-4">
        <Button className="mt-4 mr-4" text="Search" onClick={() => {}} />
        <Button className="mt-4" type="reset" text="Reset" onClick={() => {}} />
      </div>
    </div>
  );
}
