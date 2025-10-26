import React, { useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import {
  astrologicalOptions,
  complexionOptions,
  eatingHabitOptions,
  genderOptions,
  heightOptions,
  houseTypeOptions,
  incomeOptions,
  maritialStatusOptions,
  smokingHabitsOptions,
  statusOptionsCap,
} from "../../../data/ClientForm";
import { AdvanceSearchProps } from "../../../types/client";
import Button from "../../../component/form/Button";
import { yesNoArr } from "../../../util/ClientUtils";
import { DateTimePicker } from "../../../component/form/DateField";

interface OptionType {
  label: string;
  value: string;
}

// You can populate these dynamically from API later
const defaultOptions: OptionType[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

export const AdvanceSearchFilter = ({
  onSubmit,
  onReset,
}: AdvanceSearchProps) => {
  const [filters, setFilters] = useState({
    profile_id: "",
    client_name: "",
    client_mobile: "",
    client_email: "",
    gender: "",
    marital_status: "",
    religion: "",
    caste: "",
    occupation: "",
    highest_qualification: "",
    profile_visited: "",
    sourced_from: "",
    open_for_divorce: "",
    residing_country: "",
    residential_state: "",
    residential_city: "",
    house_status: "",
    membership_profile_status: "",
    nri_status: "",
    astrologically: "",
    eating_habits: "",
    smoking_habits: "",
    personality: "",
    complexion: "",
    willing_to_go_abroad: "",
    premium_college: "",
    height_from: "",
    height_to: "",
    from_birth_year: "",
    to_birth_year: "",
    personal_income_from: "",
    annual_family_income: "",
    from_marriage_budget: "",
    to_marriage_budget: "",
    profile_handled: "",
    profile_created: "",
    from_registration_date: "",
    to_registration_date: "",
    active: "",
    client_type: "",
    disability: "",
  });

  const handleChange = (name: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Applied Filters:", filters);
  };

  const handleReset = () => {
    setFilters(
      Object.fromEntries(Object.keys(filters).map((key) => [key, ""])) as any
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-white rounded-2xl"
    >
      {/* Row 1 */}
      <TextField
        label=""
        placeholder="Profile Id"
        name="profile_id"
        value={filters.profile_id}
        onChange={(e) => handleChange("profile_id", e.target.value)}
      />
      <TextField
        label=""
        placeholder="Client Name"
        name="client_name"
        value={filters.client_name}
        onChange={(e) => handleChange("client_name", e.target.value)}
      />
      <TextField
        label=""
        placeholder="Client Mobile"
        name="client_mobile"
        value={filters.client_mobile}
        onChange={(e) => handleChange("client_mobile", e.target.value)}
      />
      <TextField
        label=""
        placeholder="Client Email"
        name="client_email"
        value={filters.client_email}
        onChange={(e) => handleChange("client_email", e.target.value)}
      />

      {/* Row 2 */}
      <DropDown
        placeholder="Gender"
        sendLabel={false}
        searchable={false}
        label="Gender"
        name="gender"
        options={genderOptions}
        value={filters.gender}
        onChange={(val) => handleChange("gender", val)}
      />
      <DropDown
        placeholder="Marital Status"
        sendLabel={false}
        searchable={false}
        label="Marital Status"
        name="marital_status"
        options={maritialStatusOptions}
        value={filters.marital_status}
        onChange={(val) => handleChange("marital_status", val)}
      />
      <DropDown
        placeholder="Religion"
        sendLabel={false}
        searchable={false}
        label="Religion"
        name="religion"
        options={defaultOptions}
        value={filters.religion}
        onChange={(val) => handleChange("religion", val)}
      />
      <DropDown
        placeholder="Caste"
        sendLabel={false}
        searchable={false}
        label="Caste"
        name="caste"
        options={defaultOptions}
        value={filters.caste}
        onChange={(val) => handleChange("caste", val)}
      />

      {/* Row 3 */}
      <DropDown
        placeholder="Occupation"
        sendLabel={false}
        searchable={false}
        label="Occupation"
        name="occupation"
        options={defaultOptions}
        value={filters.occupation}
        onChange={(val) => handleChange("occupation", val)}
      />
      <DropDown
        placeholder="Highest Qualification"
        sendLabel={false}
        searchable={false}
        label="Highest Qualification"
        name="highest_qualification"
        options={defaultOptions}
        value={filters.highest_qualification}
        onChange={(val) => handleChange("highest_qualification", val)}
      />
      <DropDown
        placeholder="Profile Visited"
        sendLabel={false}
        searchable={false}
        label="Profile Visited"
        name="profile_visited"
        options={defaultOptions}
        value={filters.profile_visited}
        onChange={(val) => handleChange("profile_visited", val)}
      />
      <DropDown
        placeholder="Sourced From"
        sendLabel={false}
        searchable={false}
        label="Sourced From"
        name="sourced_from"
        options={defaultOptions}
        value={filters.sourced_from}
        onChange={(val) => handleChange("sourced_from", val)}
      />

      {/* Row 4 */}
      <DropDown
        placeholder="Open for divorce"
        sendLabel={false}
        searchable={false}
        label="Open for divorce"
        name="open_for_divorce"
        options={yesNoArr}
        value={filters.open_for_divorce}
        onChange={(val) => handleChange("open_for_divorce", val)}
      />
      <DropDown
        placeholder="Residing Country"
        sendLabel={false}
        searchable={false}
        label="Residing Country"
        name="residing_country"
        options={defaultOptions}
        value={filters.residing_country}
        onChange={(val) => handleChange("residing_country", val)}
      />
      <DropDown
        placeholder="Residential State"
        sendLabel={false}
        searchable={false}
        label="Residential State"
        name="residential_state"
        options={defaultOptions}
        value={filters.residential_state}
        onChange={(val) => handleChange("residential_state", val)}
      />
      <DropDown
        placeholder="Residential City"
        sendLabel={false}
        searchable={false}
        label="Residential City"
        name="residential_city"
        options={defaultOptions}
        value={filters.residential_city}
        onChange={(val) => handleChange("residential_city", val)}
      />

      {/* Row 5 */}
      <DropDown
        placeholder="House Status"
        sendLabel={false}
        searchable={false}
        label="House Status"
        name="house_status"
        options={houseTypeOptions}
        value={filters.house_status}
        onChange={(val) => handleChange("house_status", val)}
      />
      <DropDown
        placeholder="Membership Profile Status"
        sendLabel={false}
        searchable={false}
        label="Membership Profile Status"
        name="membership_profile_status"
        options={defaultOptions}
        value={filters.membership_profile_status}
        onChange={(val) => handleChange("membership_profile_status", val)}
      />
      <DropDown
        placeholder="NRI Status"
        sendLabel={false}
        searchable={false}
        label="NRI Status"
        name="nri_status"
        options={yesNoArr}
        value={filters.nri_status}
        onChange={(val) => handleChange("nri_status", val)}
      />
      <DropDown
        placeholder="Astrologically"
        sendLabel={false}
        searchable={false}
        label="Astrologically"
        name="astrologically"
        options={astrologicalOptions}
        value={filters.astrologically}
        onChange={(val) => handleChange("astrologically", val)}
      />

      {/* Row 6 */}
      <DropDown
        placeholder="Eating Habits"
        sendLabel={false}
        searchable={false}
        label="Eating Habits"
        name="eating_habits"
        options={eatingHabitOptions}
        value={filters.eating_habits}
        onChange={(val) => handleChange("eating_habits", val)}
      />
      <DropDown
        placeholder="Smoking Habits"
        sendLabel={false}
        searchable={false}
        label="Smoking Habits"
        name="smoking_habits"
        options={smokingHabitsOptions}
        value={filters.smoking_habits}
        onChange={(val) => handleChange("smoking_habits", val)}
      />
      <DropDown
        placeholder="Personality"
        sendLabel={false}
        searchable={false}
        label="Personality"
        name="personality"
        options={defaultOptions}
        value={filters.personality}
        onChange={(val) => handleChange("personality", val)}
      />
      <DropDown
        placeholder="Complexion"
        sendLabel={false}
        searchable={false}
        label="Complexion"
        name="complexion"
        options={complexionOptions}
        value={filters.complexion}
        onChange={(val) => handleChange("complexion", val)}
      />

      {/* Row 7 */}
      <DropDown
        placeholder="Willing to go Abroad"
        sendLabel={false}
        searchable={false}
        label="Willing to go Abroad"
        name="willing_to_go_abroad"
        options={yesNoArr}
        value={filters.willing_to_go_abroad}
        onChange={(val) => handleChange("willing_to_go_abroad", val)}
      />
      <DropDown
        placeholder="Premium College"
        sendLabel={false}
        searchable={false}
        label="Premium College"
        name="premium_college"
        options={defaultOptions}
        value={filters.premium_college}
        onChange={(val) => handleChange("premium_college", val)}
      />
      <DropDown
        placeholder="Height From"
        sendLabel={false}
        searchable={false}
        label="Height From"
        name="height_from"
        options={heightOptions}
        value={filters.height_from}
        onChange={(val) => handleChange("height_from", val)}
      />
      <DropDown
        placeholder="Height To"
        sendLabel={false}
        searchable={false}
        label="Height To"
        name="height_to"
        options={heightOptions}
        value={filters.height_to}
        onChange={(val) => handleChange("height_to", val)}
      />

      {/* Row 8 */}
      <DateTimePicker
        showLabel={false}
        // sendLabel={false}
        // searchable={false}
        label="From Birth Year"
        required={false}
        dateFormat=""
        showYear={true}
        // name="from_birth_year"
        // options={defaultOptions}
        value={filters.from_birth_year}
        onChange={(val) => handleChange("from_birth_year", val)}
      />
      <DateTimePicker
        showLabel={false}
        label="To Birth Year"
        required={false}
        dateFormat=""
        showYear={true}
        value={filters.to_birth_year}
        onChange={(val) => handleChange("to_birth_year", val)}
      />
      <DropDown
        placeholder="Personal Income From"
        sendLabel={false}
        searchable={false}
        label="Personal Income From"
        name="personal_income_from"
        options={incomeOptions}
        value={filters.personal_income_from}
        onChange={(val) => handleChange("personal_income_from", val)}
      />
      <DropDown
        placeholder="Annual Family Income"
        sendLabel={false}
        searchable={false}
        label="Annual Family Income"
        name="annual_family_income"
        options={incomeOptions}
        value={filters.annual_family_income}
        onChange={(val) => handleChange("annual_family_income", val)}
      />

      {/* Row 9 */}
      <DropDown
        placeholder="From Marriage Budget"
        sendLabel={false}
        searchable={false}
        label="From Marriage Budget"
        name="from_marriage_budget"
        options={incomeOptions}
        value={filters.from_marriage_budget}
        onChange={(val) => handleChange("from_marriage_budget", val)}
      />
      <DropDown
        placeholder="To Marriage Budget"
        sendLabel={false}
        searchable={false}
        label="To Marriage Budget"
        name="to_marriage_budget"
        options={incomeOptions}
        value={filters.to_marriage_budget}
        onChange={(val) => handleChange("to_marriage_budget", val)}
      />
      <DropDown
        placeholder="Profile Handled"
        sendLabel={false}
        searchable={false}
        label="Profile Handled"
        name="profile_handled"
        options={defaultOptions}
        value={filters.profile_handled}
        onChange={(val) => handleChange("profile_handled", val)}
      />
      <DropDown
        placeholder="Profile Created"
        sendLabel={false}
        searchable={false}
        label="Profile Created"
        name="profile_created"
        options={defaultOptions}
        value={filters.profile_created}
        onChange={(val) => handleChange("profile_created", val)}
      />

      {/* Row 10 - Date Range */}
      <DateTimePicker
        showLabel={false}
        onChange={(e) => handleChange("from_registration_date", e)}
        label="From Registration Date"
        required={false}
        value={filters.from_registration_date}
      />

      <DateTimePicker
        showLabel={false}
        label="To Registration Date"
        required={false}
        value={filters.to_registration_date}
        onChange={(e) => handleChange("to_registration_date", e.target.value)}
      />
      <DropDown
        placeholder=""
        sendLabel={false}
        searchable={false}
        label="Active"
        name="active"
        options={statusOptionsCap}
        value={filters.active}
        onChange={(val) => handleChange("active", val)}
      />
      <DropDown
        placeholder="Client Type"
        sendLabel={false}
        searchable={false}
        label="Client Type"
        name="client_type"
        options={defaultOptions}
        value={filters.client_type}
        onChange={(val) => handleChange("client_type", val)}
      />

      {/* Row 11 */}
      <DropDown
        placeholder="Disability"
        sendLabel={false}
        searchable={false}
        label="Disability"
        name="disability"
        options={yesNoArr}
        value={filters.disability}
        onChange={(val) => handleChange("disability", val)}
      />

      {/* Buttons */}
      <div className="flex items-end gap-3 ">
        <Button text="Submit" type="button" onClick={() => onSubmit()} />
        <Button text="reset" type="reset" onClick={() => onReset()} />
      </div>
    </form>
  );
};
