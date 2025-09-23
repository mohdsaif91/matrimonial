import React, { useState } from "react";
import Button from "../../component/form/Button";
import { useNavigate } from "react-router-dom";
import { clientFormbtn } from "../../data/ClientForm";
import FormTable from "./ClientFormPages/FormTable";

const ClientForm = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex">
        <Button
          text="+ Add Cleint Form"
          onClick={() => navigate("/AddClientFormItem")}
        />
      </div>
      <div className="flex flex-row mt-3">
        {clientFormbtn.map((m) => (
          <Button
            onClick={() => setActiveTab(m.value)}
            type="clientFormBtn"
            className={`px-4 py-2 mr-2 text-sm font-medium text-white ${
              activeTab === m.value ? "bg-[#161D27]" : "bg-[#a71634]"
            } rounded-lg hover:bg-[#EEB15D] focus:outline-none`}
            key={m.value}
            text={m.label}
          />
        ))}
      </div>
      <div className="mt-2">
        <FormTable />
      </div>
    </div>
  );
};

export default ClientForm;
