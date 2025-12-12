import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchManageUserAPI } from "../../service/manageUser";
import LoadingPage from "../Loading/Loading";
import Table from "../../component/table/Table";
import {
  manageAttendanceLoginColumn,
  manageAttendanceLogoutColumn,
} from "./columnData";
import AttendanceFilter from "./AttendanceFilter";
import { getLabelValue } from "../../util/ClientUtils";
import {
  getLoggedInUser,
  getLoggedOutUser,
} from "../../service/attendencReport";

const initialData = {
  filter: "",
  start_date: "",
  end_date: "",
};

const ManageAttendence = () => {
  const [filter, setFilter] = useState({ ...initialData });
  const [filters, setFilters] = useState();

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["manage-user-list"],
    queryFn: fetchManageUserAPI,
    retry: false,
  });

  const { data: userLoggedInData, isLoading: userLoggedInLoading } = useQuery({
    queryKey: ["manage-user-list"],
    queryFn: getLoggedInUser,
    retry: false,
  });

  const { data: userLoggedOutData, isLoading: userLoggedOutLoading } = useQuery(
    {
      queryKey: ["manage-user-list"],
      queryFn: getLoggedOutUser,
      retry: false,
    }
  );

  if (userLoading) {
    return <LoadingPage />;
  }

  const handledLoginData = userLoggedInData ? userLoggedInData.data : [];
  const handledLogoutData = userLoggedOutData ? userLoggedOutData.data : [];
  const handledUserData = userData ? getLabelValue(userData.data) : [];

  return (
    <div className="p-4 bg-white">
      <div className="flex w-full">
        <AttendanceFilter
          userData={handledUserData}
          filterData={filter}
          setFilter={setFilter}
          onReset={() => {
            setFilter({ ...initialData });
            setFilters(null);
          }}
          callAPI={(f) => {
            setFilters(f);
          }}
        />
      </div>
      <div className="mt-2 mb-2">
        <Table
          borderX
          columns={manageAttendanceLoginColumn}
          data={handledLoginData}
        />
      </div>
      <div className="mt-2 mb-2">
        <Table
          borderX
          columns={manageAttendanceLogoutColumn}
          data={handledLogoutData}
        />
      </div>
    </div>
  );
};

export default ManageAttendence;
