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

export const parseTimeStringToDate = (timeStr?: string): Date | null => {
  if (!timeStr) return null;

  const match = timeStr.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (!match) return null;

  let [_, hoursStr, minutesStr, period] = match;
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period.toUpperCase() === "PM" && hours < 12) hours += 12;
  if (period.toUpperCase() === "AM" && hours === 12) hours = 0;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};
