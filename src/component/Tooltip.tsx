import { ToolTipProps } from "../types/util";

const Tooltip = ({ children, text }: ToolTipProps) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-full mt-2
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-200
                      bg-gray-900 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap z-50"
      >
        {text}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-2
                        w-0 h-0 border-x-8 border-x-transparent
                        border-b-8 border-b-gray-900"
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
