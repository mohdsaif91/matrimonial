import { CRMSettingsProps } from "../types/crmSettings.js";
import api from "./axios.js";
import { ROUTE } from "./route.js";

export async function addCRMSetting(data: CRMSettingsProps) {
  const response = await api.post(ROUTE.CRM_SETTING.ADD, { ...data });
  return response.data;
}

export async function addCRMSettingAsImage(data: any) {
  const response = await api.post(ROUTE.CRM_SETTING.ADD, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function updateCRMSettingAsImage(data: any) {
  const { id, actualFormData } = data;
  console.log(actualFormData, id);

  const response = await api.post(
    `${ROUTE.CRM_SETTING.UPDATE}/${id}`,
    actualFormData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
}

export async function fetchCRMSetting() {
  const response = await api.get(ROUTE.CRM_SETTING.GET);
  return response.data;
}

export async function updateCRMSetting(data: CRMSettingsProps) {
  const { name, slug_key, status, type, value, id } = data;
  const response = await api.put(`${ROUTE.CRM_SETTING.UPDATE}/${id}`, {
    name,
    slug_key,
    status,
    type,
    value,
  });
  return response.data;
}

export async function deleteCRMSetting(id: number) {
  const response = await api.delete(`${ROUTE.CRM_SETTING.DELETE}/${id}`);
  return response.data;
}
