import { CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../component/form/Button";

const DataAddedCompleted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-600" size={70} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          Client Added Successfully!
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          The client information has been saved successfully.
        </p>

        {/* Return Button */}
        <Button
          icon={<ArrowLeft size={18} />}
          text="Back to Client Listing"
          onClick={() => navigate("/client-list")}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full transition-all"
        />
      </div>
    </div>
  );
};

export default DataAddedCompleted;
