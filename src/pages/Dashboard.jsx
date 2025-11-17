import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { TodaysBirthday } from "./TodaysBirthday";
import { TodaysAnniversaries } from "./TodaysAnniversaries";
import { AbsentToday } from "./AbsentToday";
import { UserActivity } from "./UserActivity";
import { useQuery } from "@tanstack/react-query";
import { fetchCRMSetting } from "../service/crmSetting";
import LoadingPage from "./Loading/Loading";

const crmSessionData = JSON.parse(sessionStorage.getItem("CRM"));

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const {
    data: crmData,
    isLoading: crmLoading,
    isSuccess: crmDataSuccess,
  } = useQuery({
    queryKey: ["crm-setting-list"],
    queryFn: fetchCRMSetting,
  });

  const navigate = useNavigate();

  if (crmLoading) {
    return <LoadingPage />;
  }

  if (crmDataSuccess && !crmSessionData) {
    sessionStorage.setItem("CRM", JSON.stringify(crmData.data));
  }

  return (
    <div className="bg-white rounded-md">
      {/* <Header /> */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-6">Today's Task</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">Task</div>
              <div className="text-2xl font-bold text-gray-800">0</div>
              <div className="text-xs text-green-500 font-bold">↑+10%</div>
              <div className="text-xs text-gray-400">Than Last Year</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Task Follow Up
              </div>
              <div className="text-2xl font-bold text-gray-800">0</div>
              <div className="text-xs text-green-500 font-bold">↑+2.15%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Leads Follow Up
              </div>
              <div className="text-2xl font-bold text-gray-800">0</div>
              <div className="text-xs text-green-500 font-bold">↑+5.15%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Compleat Project
              </div>
              <div className="text-2xl font-bold text-gray-800">150</div>
              <div className="text-xs text-red-500 font-bold">↓-5.5%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
        </div>
        {/* Second Row */}
        <h3 className="text-2xl font-bold mb-6">Client Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Total Client
              </div>
              <div className="text-2xl font-bold text-gray-800">151</div>
              <div className="text-xs text-green-500 font-bold">↑+2.15%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Total Revenue
              </div>
              <div className="text-2xl font-bold text-gray-800">$55</div>
              <div className="text-xs text-green-500 font-bold">↑+2.15%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Total Jobs
              </div>
              <div className="text-2xl font-bold text-gray-800">55</div>
              <div className="text-xs text-green-500 font-bold">↑+2.15%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Total Ticket
              </div>
              <div className="text-2xl font-bold text-gray-800">55</div>
              <div className="text-xs text-green-500 font-bold">↑+2.15%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Total Client
              </div>
              <div className="text-2xl font-bold text-gray-800">151</div>
              <div className="text-xs text-green-500 font-bold">↑+2.15%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Total Revenue
              </div>
              <div className="text-2xl font-bold text-gray-800">$55</div>
              <div className="text-xs text-green-500 font-bold">↑+2.15%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Total Jobs
              </div>
              <div className="text-2xl font-bold text-gray-800">55</div>
              <div className="text-xs text-green-500 font-bold">↑+2.15%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
            <span className="bg-indigo-50 text-indigo-600 p-3 rounded-full text-3xl">
              <FaRegUserCircle />
            </span>
            <div>
              <div className="text-gray-500 text-sm font-semibold">
                Total Ticket
              </div>
              <div className="text-2xl font-bold text-gray-800">55</div>
              <div className="text-xs text-green-500 font-bold">↑+2.15%</div>
              <div className="text-xs text-gray-400">Than Last Month</div>
            </div>
          </div>
        </div>
        <TodaysBirthday />
        <TodaysAnniversaries />
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-6">
          <div className="md:col-span-4">
            <AbsentToday />
          </div>
          <div className="md:col-span-6">
            <UserActivity />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
