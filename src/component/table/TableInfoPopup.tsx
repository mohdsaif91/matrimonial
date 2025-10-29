import React from "react";

const TableInfoPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-[650px] max-w-full p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Key Notes:</h2>

        {/* Client List Section */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">For the Client List:</h3>
          <ul className="space-y-1 text-gray-800">
            <li>
              <span className="font-semibold text-green-600">
                Green Side Bars:
              </span>{" "}
              Indicates clients with an <b>Active Paid Membership.</b>
            </li>
            <li>
              <span className="font-semibold text-orange-500">
                Orange Side Bars:
              </span>{" "}
              Highlights clients whose membership is{" "}
              <b>about to Expire Soon.</b>
            </li>
            <li>
              <span className="font-semibold text-red-600">Red Side Bars:</span>{" "}
              Highlights clients whose membership has <b>Already Expired.</b>
            </li>
          </ul>
        </div>

        {/* Profile Send Accordion Section */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">
            For the Profile Send Accordion:
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-gray-800">
            <li>
              When a profile is shared between clients, it will appear with a{" "}
              <span className="font-semibold text-green-500">
                “Green Background”.
              </span>
            </li>
            <li>
              <span className="font-semibold text-blue-600">“Blue icons”</span>{" "}
              represent the <b>Boy's Response Type</b>.
            </li>
            <li>
              <span className="font-semibold text-red-600">“Red icons”</span>{" "}
              represent the <b>Girl's Response Type</b>.
            </li>
            <li>
              A <b>“Tick icon”</b> means the profile is{" "}
              <span className="font-semibold text-green-700">“Approved”.</span>
            </li>
            <li>
              A <b>“Cross icon”</b> means the profile is{" "}
              <span className="font-semibold text-red-700">“Rejected”.</span>
            </li>
            <li>
              You can also hover over the icons to see more details or
              instructions.
            </li>
          </ol>
        </div>

        {/* Member Status Section */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Member Status:</h3>
          <ul className="space-y-1 text-gray-800">
            <li>
              <b>Active</b> - means client is actively listed on the platform.
            </li>
            <li>
              <b>Inactive</b> - means the client whose membership has already
              expired.
            </li>
            <li>
              <b>Close</b> - means the client is closed but not from our
              organization.
            </li>
            <li>
              <b>Close by us</b> - means the client is closed by our
              organization.
            </li>
          </ul>
        </div>

        {/* Close Button */}
        <div className="text-right">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableInfoPopup;
