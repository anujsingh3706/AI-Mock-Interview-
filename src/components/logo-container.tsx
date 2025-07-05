import { Link } from "react-router-dom";

export const LogoContainer = () => {
  return (
    <Link to={"/"}>
      <img
        src="/assets/img/logo.jpg"
        alt="Logo"
        className="w-12 h-12 min-w-10 min-h-10 object-contain"
      />
    </Link>
  );
};
