import React from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  bgColor: string; // accepts Tailwind class or custom color code
  onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  bgColor,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="rounded-xl p-6 text-white cursor-pointer"
      style={{ backgroundColor: bgColor }}
    >
      <p className="font-bold text-[28px] mt-2 text-center">{value}</p>
      <p className="font-bold text-[18px] leading-tight text-center">{label}</p>
    </div>
  );
};

export default StatsCard;
