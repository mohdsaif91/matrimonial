import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string; // optional custom width like 'max-w-lg'
}

const ModalPopup: React.FC<ModalPopupProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-lg",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl w-full ${width} p-6 relative`}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold">{title || "Modal Title"}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[70vh]">{children}</div>
      </div>
    </div>
  );
};

export default ModalPopup;
