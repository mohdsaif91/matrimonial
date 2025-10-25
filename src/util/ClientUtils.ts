import { ClientModuleField } from "../types/clientModule";

export const getLabelValue = (arr: any[] = [], label = false) => {
  return arr.map((s: any) => ({
    label: s.name,
    value: label ? s.name : s.id,
  }));
};

export const yesNoArr = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const generateFormItem = (item: ClientModuleField) => {};

export const getFeildname = (feildName: string) => {
  if (feildName === "main_profile_photo") {
    return "main_photo";
  } else if (feildName === "additional_profile_photo") {
    return "profile_photo";
  } else {
    return "bio_data";
  }
};
