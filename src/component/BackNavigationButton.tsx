import { useNavigate } from "react-router-dom";
import Button from "./form/Button";

export const BackNavigationButton = ({ className }: { className: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      className={`${className} bg-[#161D27]`}
      type="button"
      text="Back"
      onClick={() => navigate(-1)}
    />
  );
};
