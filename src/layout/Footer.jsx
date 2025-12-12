import { getCRMObject } from "../util/ClientUtils";

const footerText = getCRMObject();

const Footer = () => {
  return (
    <footer className="bg-[#F0F3F8]  border-t border-white/20 text-black text-center py-4 shadow-lg">
      {footerText?.COPY_RIGHT?.value ||
        `© ${new Date().getFullYear()} One Unit Solution`}
    </footer>
  );
};

export default Footer;
