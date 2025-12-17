import ButtonLoader from "../../pages/Loading/ButtonLoader";
import { ButtonProps } from "../../types/form";

const Button = ({
  icon = null,
  text,
  onClick,
  type = "button",
  className = "",
  loading = false,
  disabled,
}: ButtonProps) => {
  let style = "";
  if (type === "submit") {
    style = `bg-[#465dff]  text-white px-6 py-2 rounded-lg hover:bg-[#3249c6] disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  } else if (type === "reset") {
    style = `cursor-pointer bg-[#161D27]  text-white px-6 py-2 rounded-lg hover:bg-[#3249c6] disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  } else if (type === "clientFormBtn") {
    style = `cursor-pointer text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  } else if (type === "button") {
    style = `${className} bg-[#161D27]  text-white px-6 py-2 rounded-lg hover:bg-[#3249c6] disabled:opacity-50 disabled:cursor-not-allowed`;
  } else if (type === "expanderBtn") {
    style = `${className} bg-[#161D27]  text-white rounded-lg hover:bg-[#3249c6] disabled:opacity-50 disabled:cursor-not-allowed`;
  }
  return (
    <button
      disabled={disabled}
      type={type}
      className={`rounded-sm cursor-pointer  ${style} ${
        disabled && "cursor-not-allowed"
      }`}
      onClick={onClick}
    >
      {loading ? (
        <ButtonLoader />
      ) : (
        <>
          <>{icon && icon}</> {text}
        </>
      )}
    </button>
  );
};

export default Button;
