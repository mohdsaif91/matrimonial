import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import Button from "../../component/form/Button";
import ModalPopup from "../../component/ModalPopup";
import ResponseRemarkTable from "./ClientResponse/AddClientResponse";
import TaskAdd from "../ManageTask/TaskAdd";
import AttachProfile from "./AttachProfile";

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
  age,
  dateTime,
  data,
}) => {
  const [openModal, setOpenModal] = useState(initialModalData);

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
      {handledShortProfile.map((item) => (
        <div
          className={`flex flex-col items-center ${
            item.is_shared && "bg-green-100"
          } p-4 rounded-2xl shadow-md border border-green-200 w-[220px]`}
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
          <Button
            text="Attach Profile"
            className="bg-[#161D27] text-white w-full mb-2"
            onClick={() =>
              setOpenModal({
                flag: true,
                data,
                component: "sendProfile",
                title: "Send Profile",
              })
            }
          />
          <Button
            text="Add Response"
            className="bg-[#C22B36] text-white w-full"
            onClick={() =>
              setOpenModal({
                flag: true,
                data: item,
                component: "addResponse",
                title: "Add Response",
              })
            }
          />
          <div className="flex">
            {Array.isArray(item.responses) &&
              item.responses.map((resItem) => (
                <div
                  className={`mt-3 ${
                    resItem.color === "blue" ? "text-blue-600" : "text-red-600"
                  } `}
                >
                  <Check size={20} className="mx-auto" />
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
