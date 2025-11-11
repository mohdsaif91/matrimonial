import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import Button from "../../component/form/Button";
import ModalPopup from "../../component/ModalPopup";
import ResponseRemarkTable from "./ClientResponse/AddClientResponse";
import TaskAdd from "../ManageTask/TaskAdd";

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
      case "attachProfile":
        <></>;
      default:
        return <></>;
    }
  };

  const handledShortProfile = data ? data.shared_profiles : [];
  console.log(data, " <>? PP");

  // const userId=ro
  return (
    <div className="flex flex-wrap flex-row gap-4">
      {handledShortProfile.map((item) => (
        <div className="flex flex-col items-center bg-green-100 p-4 rounded-2xl shadow-md border border-green-200 w-[220px]">
          {/* Image */}
          <img
            src={
              item.documents.find((f) => f.file_type === "main_photo")
                .file_path || image
            }
            alt={name}
            className="rounded-xl w-[150px] h-[150px] object-cover mb-2"
          />

          {/* Name & Details */}
          <h3 className="text-gray-800 font-semibold text-lg">
            {item?.items?.client_name?.value || ""}
          </h3>
          <p className="text-gray-600 text-sm">{age}</p>
          <p className="text-gray-500 text-sm">{dateTime}</p>

          {/* Plus Icon */}
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

          {/* Buttons */}
          <Button
            text="Attach Profile"
            className="bg-[#161D27] text-white w-full mb-2"
            onClick={() =>
              setOpenModal({
                flag: true,
                data,
                component: "attachProfile",
                title: "Attach Profile",
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

          <div className="mt-3 text-blue-600">
            <Check size={20} className="mx-auto" />
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
