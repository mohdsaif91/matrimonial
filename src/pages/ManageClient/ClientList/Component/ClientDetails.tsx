import React from "react";
import { ClientDetailsprops } from "../../../../types/client";

export default function ClientDetails({ data }: ClientDetailsprops) {
  console.log(data.items, " <>?<>?");

  const mainProfileImage = Array.isArray(data.client_documents)
    ? data.client_documents.find((item) => item.file_type === "main_photo")
    : "";
  return (
    <div>
      <img src={mainProfileImage} />
      <div className="grid grid-cols-4 gap-3 p-6"></div>;
    </div>
  );
}
