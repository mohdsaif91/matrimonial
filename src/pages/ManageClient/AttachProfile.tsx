import { useState } from "react";

import { TextField } from "../../component/form/TextField";
import { SendProfileProps } from "../../types/sendProfile";
import Button from "../../component/form/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendProfile } from "../../service/client";
import { toast, ToastContainer } from "react-toastify";
import { getCRMObject } from "../../util/ClientUtils";

const CRMData = getCRMObject();

export default function AttachProfile({ data }: SendProfileProps) {
  const [profileData, setProfileData] = useState({ ...data });
  const [hideContent, setHideContent] = useState({
    whatsApp: ["true", "True"].includes(CRMData["WHATSAPP-ENABLE"].value),
    email: true,
  });
  const [takeContent, setTakeContent] = useState({
    whatsApp: true,
    email: true,
  });

  const queryClient = useQueryClient();

  const senProfileMutation = useMutation({
    mutationFn: sendProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["client-Profile"] });
      toast("Successfully sent profile");
      // setFilterData(data.data);
    },
    onError: (error: any) => {
      toast(error.response?.data?.message || "Failed to sent profile");
    },
  });

  return (
    <div className="flex items-center justify-center bg-black/50 w-[750px]">
      <div className="bg-white max-w-6xl shadow-lg overflow-y-auto">
        <div className="w-full border border-gray-300 rounded-md overflow-hidden">
          {/* ROW 1 */}
          <div className="grid grid-cols-5 border-b border-gray-300">
            <div className="border-r border-gray-300 p-4 font-semibold flex items-center justify-center">
              Send Mail To
            </div>

            <div className="border-r border-gray-300 p-4 flex items-center justify-center">
              {data.sendToName}
            </div>

            <div className="border-r border-gray-300 p-4 flex items-center justify-center">
              {data.sendToMobile}
            </div>

            <div className="border-r border-gray-300 p-4 flex items-center justify-center">
              {data.sendToEmail}
            </div>

            <div className="p-4 flex items-center justify-center">
              <img
                src={data.sendToPhoto}
                className="h-24 w-24 object-cover rounded-md"
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-5">
            <div className="border-r border-gray-300 p-4 font-semibold flex items-center justify-center">
              Attached Profile
            </div>

            <div className="border-r border-gray-300 p-4 flex items-center justify-center">
              {data.attachProfileName}
            </div>

            <div className="border-r border-gray-300 p-4 flex items-center justify-center">
              {data.attachProfileMobile}
            </div>

            <div className="border-r border-gray-300 p-4 flex items-center justify-center">
              {data.attachProfileEmail}
            </div>

            <div className="p-4 flex items-center justify-center">
              <img
                src={data.attachProfilePhoto}
                className="h-24 w-24 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hideContent.whatsApp && (
            <div className="border border-gray-300 rounded-lg p-3">
              <input
                type="checkbox"
                checked={takeContent.whatsApp}
                className="mr-2 cursor-pointer"
                onChange={(e) =>
                  setTakeContent({ ...takeContent, whatsApp: e.target.checked })
                }
                defaultChecked
              />
              <TextField
                label="To :"
                name="mobileTo"
                value={profileData.attachProfileMobile}
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    attachProfileMobile: e?.target.value,
                  });
                }}
              />
              <TextField
                disabled={true}
                label="From :"
                name=""
                value={profileData.attachProfileMobile}
                onChange={(e) => {
                  const obj = {};
                  setProfileData({
                    ...profileData,
                    attachProfileMobile: e?.target.value,
                  });
                }}
              />
            </div>
          )}
          {hideContent.email && (
            <div className="border border-gray-300 rounded-lg p-3">
              <input
                type="checkbox"
                checked={takeContent.email}
                className="mr-2 cursor-pointer"
                defaultChecked
                onChange={(e) =>
                  setTakeContent({ ...takeContent, email: e.target.checked })
                }
              />
              <TextField
                label="To :"
                name="emailTo"
                value={profileData.sendToEmail}
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    sendToEmail: e?.target.value,
                  });
                }}
              />
              <TextField
                label="Subject :"
                name="subject"
                value={profileData.subject}
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    subject: e?.target.value,
                  });
                }}
              />
              <TextField
                label="From :"
                disabled={true}
                name="from"
                value="info@code10.in"
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    attachProfileMobile: e?.target.value,
                  });
                }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <Button
            loading={senProfileMutation.isPending}
            text="Submit"
            className="mr-4"
            type="button"
            onClick={() => {
              const sendProfileObj = {
                from_client_id: data.from_client_id,
                to_client_id: data.to_client_id,
                email: data.sendToEmail,
              };
              senProfileMutation.mutate(sendProfileObj);
            }}
          />
        </div>
      </div>
    </div>
  );
}
