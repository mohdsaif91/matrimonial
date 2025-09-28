import ButtonLoader from "../../pages/Loading/ButtonLoader";
import { ButtonProps } from "../../types/form";

const Button = ({
  text,
  onClick,
  type = "submit",
  className = "",
  loading = false,
}: ButtonProps) => {
  let style = "";
  if (type === "submit") {
    style = `bg-[#161D27]  text-white px-6 py-2 rounded-lg hover:bg-[#3249c6] disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  } else if (type === "reset") {
    style = `cursor-pointer bg-[#465dff]  text-white px-6 py-2 rounded-lg hover:bg-[#3249c6] disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  } else if (type === "clientFormBtn") {
    style = `cursor-pointer text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  } else if (type === "none") {
    style = className;
  }
  return (
    <button className={`rounded-sm cursor-pointer ${style}`} onClick={onClick}>
      {loading ? <ButtonLoader /> : text}
    </button>
  );
};

export default Button;
