import React, { useState } from "react";

import { AdvanceSearchProps, CommonFilterProps } from "../../types/client";
import { TextField } from "../../component/form/TextField";
import { DropDown } from "../../component/form/SearchableDropdown";
import TextArea from "../../component/form/TextArea";
import { DateTimePicker } from "../../component/form/DateField";
import { ImageField } from "../../component/form/ImageField";
import CustomEditor from "../../component/form/RichText";
import TimePickerExample from "../../component/form/TimePicker";
import { ClientForm } from "../../types/module";
import Button from "../../component/form/Button";
import { getLabelValue } from "../../util/ClientUtils";
import {
  addClientFormClientType,
  astrologicalOptions,
  clientVerificationOptions,
  complexionOptions,
  deadAliveOptions,
  drinkingHabitOptions,
  eatingHabitOptions,
  eyeSightOptions,
  familyTypeOptions,
  genderOptions,
  heightOptions,
  houseTypeOptions,
  maritialStatusOptions,
  membershipProfileStatus,
  packageTypeOptions,
  personalIncomeOptions,
  personalityOptions,
  smokingHabitsOptions,
  statusOption,
  yesNoOptions,
} from "../../data/ClientForm";
import { useQuery } from "@tanstack/react-query";
import { fetchCountry } from "../../service/country";
import { fetchOccupationAPI } from "../../service/occupation";
import { fetchQualificationAPI } from "../../service/qualification";
import { fetchPremiumCollege } from "../../service/premiumCollege";
import { fetchVisaAPI } from "../../service/visa";
import { fetchReligion } from "../../service/religion";
import { fetchCity } from "../../service/city";
import { fetchState } from "../../service/state";
import { fetchSubCasteAPI } from "../../service/subCaste";
import { fetchCasteAPI } from "../../service/caste";
import { fetchManageUserAPI } from "../../service/manageUser";
import { fetchSourcedFrom } from "../../service/client";

const MemoizedTextField = React.memo(TextField);
const MemoizedDropDown = React.memo(DropDown);
const MemoizedTextArea = React.memo(TextArea);
const MemoizedDateField = React.memo(DateTimePicker);
const MemoizedImageField = React.memo(ImageField);
const MemoizedRichText = React.memo(CustomEditor);
const MemoizedTimePicker = React.memo(TimePickerExample);

export default function CommonFilters({
  onSubmit,
  onReset,
  handleChangeMethod,
  filters,
  formValues = [],
  loading = false,
}: AdvanceSearchProps) {
  const {
    data: sourcedData,
    error: sourcedError,
    isLoading: sourcedLoading,
    refetch: refetchSource,
  } = useQuery({
    queryKey: ["sourced_from"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: profileHandledData,
    error: profileHandledError,
    isLoading: profileHandledLoading,
    refetch: profileHandledRefetch,
  } = useQuery({
    queryKey: ["manage-user-list"], // unique cache key
    queryFn: fetchManageUserAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: casteData,
    error: casteError,
    isLoading: casteLoading,
    refetch: casteRefetch,
  } = useQuery({
    queryKey: ["caste-list"], // unique cache key
    queryFn: fetchCasteAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: subCasteData,
    error: subCasteError,
    isLoading: subCasteLoading,
    refetch: subCasteRefetch,
  } = useQuery({
    queryKey: ["sub-caste-list"], // unique cache key
    queryFn: fetchSubCasteAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: stateData,
    error: stateError,
    isLoading: stateLoading,
    refetch: stateRefetch,
  } = useQuery({
    queryKey: ["state-list"], // unique cache key
    queryFn: fetchState,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: CityData,
    error: CityError,
    isLoading: CityLoading,
    refetch: CityRefetch,
  } = useQuery({
    queryKey: ["City-list"], // unique cache key
    queryFn: fetchCity,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: religionData,
    error: religionError,
    isLoading: religionLoading,
    refetch: religionRefetch,
  } = useQuery({
    queryKey: ["religion-list"], // unique cache key
    queryFn: fetchReligion,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: visaData,
    error: visaError,
    isLoading: visaLoading,
    refetch: visaRefetch,
  } = useQuery({
    queryKey: ["visa-list"], // unique cache key
    queryFn: fetchVisaAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: premiumCollegeData,
    error: premiumCollegeError,
    isLoading: premiumCollegeLoading,
    refetch: premiumCollegeRefetch,
  } = useQuery({
    queryKey: ["premiumCollege-list"], // unique cache key
    queryFn: fetchPremiumCollege,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });
  // highest_qualification

  const {
    data: qualificationData,
    error: qualificationError,
    isLoading: qualificationLoading,
    refetch: qualificationRefetch,
  } = useQuery({
    queryKey: ["qualification-list"],
    queryFn: fetchQualificationAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: occupationData,
    error: occupationError,
    isLoading: occupationLoading,
    refetch: occupationRefetch,
  } = useQuery({
    queryKey: ["occupation-list"],
    queryFn: fetchOccupationAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: countryData,
    error: countryError,
    isLoading: countryLoading,
    refetch: countryRefetch,
  } = useQuery({
    queryKey: ["country-list"],
    queryFn: fetchCountry,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const handleChange = (id: string, value: string | number) => {
    handleChangeMethod({ ...filters, [id]: { field_id: id, value } });
  };

  const getOptions = (fieldName: string) => {
    let arr: { label: string; value: string | number }[] = [];
    switch (fieldName) {
      case "sourced_from":
        arr = getLabelValue(sourcedData ? sourcedData.data : [], true);
        break;
      case "profile_handled":
        arr = getLabelValue(
          profileHandledData ? profileHandledData.data : [],
          true
        );
        break;
      case "profile_created":
        arr = getLabelValue(
          profileHandledData ? profileHandledData.data : [],
          true
        );
        break;
      case "profile_visited":
        arr = getLabelValue(
          profileHandledData ? profileHandledData.data : [],
          true
        );
        break;
      case "client_type":
        arr = addClientFormClientType;
        break;
      case "client_verification":
        arr = clientVerificationOptions;
        break;
      case "caste":
        arr = getLabelValue(casteData ? casteData.data : [], true);
        break;
      case "sub_caste":
        arr = getLabelValue(subCasteData ? subCasteData.data : [], true);
        break;
      case "complexion":
        arr = complexionOptions;
        break;
      case "personality":
        arr = personalityOptions;
        break;
      case "gender":
        arr = genderOptions;
        break;
      case "marital_status":
        arr = maritialStatusOptions;
        break;
      case "astrologically":
        arr = astrologicalOptions;
        break;
      case "height":
        arr = heightOptions;
        break;
      case "drinking_habits":
        arr = drinkingHabitOptions;
        break;
      case "eating_habits":
        arr = eatingHabitOptions;
        break;
      case "smoking_habits":
        arr = smokingHabitsOptions;
        break;
      case "open_for_other_caste":
      case "open_for_divorcee":
      case "health_screening_consent":
      case "believes_in_patri":
      case "willing_to_go-abroad":
      case "open_for_other_state":
      case "nri_status":
      case "disability":
      case "do_you_have_any_siblings":
        arr = yesNoOptions;
        break;
      case "eye_sight":
        arr = eyeSightOptions;
        break;
      case "native_state":
      case "residential_state":
        arr = getLabelValue(stateData ? stateData.data : [], true);
        break;
      case "native_town":
      case "residential_city":
        arr = getLabelValue(CityData ? CityData.data : [], true);
        break;
      case "visa":
        arr = getLabelValue(visaData ? visaData.data : [], true);
        break;
      case "religion":
        arr = getLabelValue(religionData ? religionData.data : [], true);
        break;
      case "premium_college":
        arr = getLabelValue(
          premiumCollegeData ? premiumCollegeData.data : [],
          true
        );
        break;
      case "fathers_qualification":
      case "highest_qualification":
      case "mothers_qualification":
        arr = getLabelValue(
          qualificationData ? qualificationData.data : [],
          true
        );
        break;
      case "personal_income":
        arr = personalIncomeOptions;
        break;
      case "occupation":
      case "fathers_occupation":
      case "mothers_occupation":
        arr = getLabelValue(occupationData ? occupationData.data : [], true);
        break;
      case "family_type":
        arr = familyTypeOptions;
        break;
      case "annual_family_income":
      case "from_marriage_budget":
      case "to_marriage_budget":
        arr = personalIncomeOptions;
        break;
      case "father_is_alive":
      case "mother_is_alive":
        arr = deadAliveOptions;
        break;
      case "house_status":
        arr = houseTypeOptions;
        break;
      case "residing_country":
        arr = getLabelValue(countryData ? countryData.data : [], true);
        break;
      case "package_type":
        arr = packageTypeOptions;
        break;
      case "membership_profile_status":
        arr = membershipProfileStatus;
        break;
      case "member_status":
        arr = statusOption;
        break;

      default:
        arr = [];
    }
    return arr;
  };

  const getLoading = (fieldName: string) => {
    switch (fieldName) {
      case "sourced_from":
        return sourcedLoading;
      case "profile_handled":
        return profileHandledLoading;
      case "profile_created":
        return profileHandledLoading;
      case "profile_visited":
        return profileHandledLoading;
      case "caste":
        return casteLoading;
      case "sub_caste":
        return subCasteLoading;
      case "native_state":
      case "residential_state":
        return stateLoading;
      case "visa":
        return visaLoading;
      case "native_town":
      case "residential_city":
        return CityLoading;
      case "religion":
        return religionLoading;
      case "premium_college":
        return premiumCollegeLoading;
      case "highest_qualification":
      case "fathers_qualification":
      case "mothers_qualification":
        return qualificationLoading;
      case "occupation":
      case "fathers_occupation":
      case "mothers_occupation":
        return occupationLoading;
      case "residing_country":
        return countryLoading;
      default:
        return false;
    }
  };

  const fetchData = (fieldName: string) => {
    switch (fieldName) {
      case "sourced_from":
        refetchSource();
        break;
      case "profile_handled":
        profileHandledRefetch();
        break;
      case "profile_created":
        refetchSource();
        break;
      case "profile_visited":
        refetchSource();
        break;
      case "caste":
        casteRefetch();
        break;
      case "sub_caste":
        subCasteRefetch();
        break;
      case "native_state":
      case "residential_state":
        stateRefetch();
        break;
      case "native_town":
      case "residential_city":
        CityRefetch();
        break;
      case "visa":
        visaRefetch();
        break;
      case "religion":
        religionRefetch();
        break;
      case "premium_college":
        premiumCollegeRefetch();
        break;
      case "highest_qualification":
      case "fathers_qualification":
      case "mothers_qualification":
        qualificationRefetch();
        break;
      case "occupation":
      case "fathers_occupation":
      case "mothers_occupation":
        occupationRefetch();
        break;
      case "residing_country":
        countryRefetch();
        break;
      default:
        return false;
    }
  };

  const getFormItems = (item: ClientForm, index: number) => {
    switch (item.field_type) {
      case "text":
        if (item.field_name === "time_of_birth") {
          return (
            <MemoizedTimePicker
              showLabel={false}
              key={item.field_name}
              label={item.display_name}
              name={item.field_name}
              required={item.required === 1}
              value={(filters[item.id] && filters[item.id].value) || ""}
              onChange={(e) => handleChange(item.id, e)}
            />
          );
        } else {
          return (
            <MemoizedTextField
              showLabel={false}
              key={item.field_name}
              placeholder={item.display_name}
              name={item.field_name}
              required={item.required === 1}
              value={(filters[item.id] && filters[item.id].value) || ""}
              onChange={(e) => handleChange(item.id, e.target.value)}
            />
          );
        }
      case "dropdown":
        return (
          <MemoizedDropDown
            showLabel={false}
            sendLabel={true}
            key={item.field_name}
            onClick={() => {
              fetchData(item.field_name);
            }}
            loading={getLoading(item.field_name)}
            searchable
            label={item.display_name}
            name={item.field_name}
            required={item.required === 1}
            options={getOptions(item.field_name)}
            value={(filters[item.id] && filters[item.id].value) || ""}
            onChange={(val) => handleChange(item.id, val)}
          />
        );
      case "textArea":
        return (
          <div key={item.field_name} className="col-span-4">
            <MemoizedTextArea
              showLabel={false}
              label={item.display_name}
              name={item.field_name}
              required={item.required === 1}
              value={(filters[item.id] && filters[item.id].value) || ""}
              onChange={(val) => handleChange(item.id, val)}
            />
          </div>
        );
      case "datepicker":
        return (
          <MemoizedDateField
            showLabel={false}
            key={item.field_name}
            label={item.display_name}
            value={(filters[item.id] && filters[item.id].value) || ""}
            onChange={(val) => handleChange(item.id, val)}
            required={item.required === 1}
          />
        );
      case "image":
        <MemoizedImageField
          showLabel={false}
          label={item.display_name}
          onChange={(val) => handleChange(item.id, val)}
          name={item.field_name}
          required={item.required === 1}
        />;
      case "richText":
        return (
          <MemoizedRichText
            showLabel={false}
            label={item.display_name}
            onChange={(str) => handleChange(item.id, str)}
            required={item.required === 1}
            value={(filters[item.id] && filters[item.id].value) || ""}
          />
        );
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-white rounded-2xl">
      {formValues.map((filterItem, index) => {
        return getFormItems(filterItem, index);
      })}
      <div className="flex items-end gap-3 ">
        <Button
          loading={loading}
          text="Submit"
          type="submit"
          onClick={() => {
            const finalObj: any[] = [];
            Object.keys(filters).forEach((key) => {
              if (filters[key].value !== "") {
                finalObj.push(filters[key]);
              }
            });
            onSubmit(finalObj);
          }}
        />
        <Button text="reset" type="reset" onClick={() => onReset()} />
      </div>
    </div>
  );
}
