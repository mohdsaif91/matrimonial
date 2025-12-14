import React, { useState } from "react";
import { Plus, Check, X, Paperclip } from "lucide-react";
import Button from "../../component/form/Button";
import ModalPopup from "../../component/ModalPopup";
import ResponseRemarkTable from "./ClientResponse/AddClientResponse";
import TaskAdd from "../ManageTask/TaskAdd";
import AttachProfile from "./AttachProfile";
import { getAuthUserPermission } from "../../util/ClientUtils";

interface ProfileCardExpandedRowProps {
  image: string;
  name: string;
  age: number | string;
  dateTime: string;
  data: any;
}

const initialModalData = {
  flag: false,
  data: null,
  component: "",
  title: "",
};

const ProfileCardExpandedRow: React.FC<ProfileCardExpandedRowProps> = ({
  image,
  name,
  dateTime,
  data,
}) => {
  const [openModal, setOpenModal] = useState(initialModalData);

  console.log(data, " <>?");

  const getComponent = (type: string) => {
    switch (type) {
      case "addResponse":
        return <ResponseRemarkTable data={openModal.data} />;
      case "addTask":
        return <TaskAdd />;
      case "sendProfile":
        return (
          <AttachProfile
            data={openModal.data && openModal.data}
            onClose={() => setOpenModal(initialModalData)}
          />
        );
      default:
        return <></>;
    }
  };

  const handledShortProfile = data ? data.shared_profiles : [];
  return (
    <div className="flex flex-wrap flex-row gap-4">
      {handledShortProfile.map((item, index: number) => (
        <div
          className={`flex flex-col items-center ${
            item.is_shared && "bg-green-100"
          } p-2 rounded-2xl shadow-md border border-green-200 w-[220px]`}
        >
          <img
            src={
              item.documents.find((f) => f.file_type === "main_photo")
                .file_path || image
            }
            alt={name}
            className="rounded-xl w-[150px] h-[150px] object-cover mb-2"
          />
          <h3 className="text-gray-800 font-semibold text-lg  capitalize">
            {item?.shared_profile_name || ""}
          </h3>
          <p className="text-gray-600 text-sm">
            {item?.shared_profile_age || "-"}
          </p>
          <p className="text-gray-500 text-sm">{dateTime}</p>
          <div className="mb-[4px]">{item.shared_at}</div>
          <div className="my-2 text-gray-700">
            <Plus
              size={20}
              onClick={() =>
                setOpenModal({
                  flag: true,
                  data,
                  component: "addTask",
                  title: "Attach Profile",
                })
              }
              className="mx-auto cursor-pointer"
            />
          </div>
          <div className="flex justify-between w-full">
            {getAuthUserPermission().includes(
              "manage_send_profiles.view_profile_sent"
            ) && (
              <Button
                type="expanderBtn"
                icon={<Paperclip size={16} className="mr-1" />}
                text={`Profile`}
                className="bg-[#161D27] text-white w-full px-1 py-2 text-[12px] flex items-center justify-center mr-1"
                onClick={() => {
                  const {
                    items,
                    client_documents,
                    shared_profiles,
                    id: sendToId,
                  } = data;
                  const sendObjs = {
                    sendToName: items.client_name.value,
                    sendToMobile: items.client_mobile.value,
                    sendTPohoto: client_documents.find(
                      (f) => f.file_type === "main_photo"
                    ).file_path,
                    sendToEmail: items.client_email.value,
                    attachProfileName:
                      shared_profiles[index].shared_profile_name,
                    attachProfileMobile: shared_profiles[index].client_mobile,
                    attachProfilePhoto: shared_profiles[index].documents.find(
                      (f) => f.file_type === "main_photo"
                    ).file_path,
                    attachProfileEmail:
                      shared_profiles[index].shared_profile_email,
                    subject: `Matrimonial Profile of ${items.client_name.value} for ${shared_profiles[index].shared_profile_name}`,
                    from_client_id: sendToId,
                    to_client_id: shared_profiles[index].shared_profile_id,
                  };

                  setOpenModal({
                    flag: true,
                    data: sendObjs,
                    component: "sendProfile",
                    title: "Send Profile",
                  });
                }}
              />
            )}
            <Button
              type="expanderBtn"
              icon={<Plus size={16} className="mr-1" />}
              text="Response"
              className="bg-[#C22B36] text-white w-full px-1 py-2 text-[12px] flex items-center justify-center"
              onClick={() =>
                setOpenModal({
                  flag: true,
                  data: item,
                  component: "addResponse",
                  title: "Add Response",
                })
              }
            />
          </div>
          <div className="flex">
            {Array.isArray(item.responses) &&
              item.responses.map((resItem) => (
                <div
                  className={`mt-3 p-1 rounded-[50%] mr-1 ${
                    resItem.color === "blue" ? "bg-blue-500" : "bg-red-500"
                  }`}
                >
                  {resItem.status === "Approved" ? (
                    <Check color="white" size={20} className="mx-auto" />
                  ) : resItem.status === "Rejected" ? (
                    <X color="white" size={20} className="mx-auto" />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
          </div>
          <ModalPopup
            data={openModal.data}
            title={openModal.title}
            isOpen={openModal.flag}
            children={getComponent(openModal.component)}
            onClose={() => setOpenModal({ ...initialModalData })}
            width="520px"
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileCardExpandedRow;
