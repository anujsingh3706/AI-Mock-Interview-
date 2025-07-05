import { MainRoutes } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface NavigationRoutesProps {
  isMobile?: boolean;
}

export const NavigationRoutes = ({
  isMobile = false,
}: NavigationRoutesProps) => {
  return (
    <ul
      className={cn(
        "flex items-center gap-8 text-gray-700 text-base font-normal",
        isMobile && "items-start flex-col gap-8"
      )}
    >
      {MainRoutes.map((route) => (
        <NavLink
          key={route.href}
          to={route.href}
          className={() =>
            cn(
              "px-2 transition-colors duration-150 text-gray-700",
              "hover:text-gray-900"
            )
          }
        >
          {route.label}
        </NavLink>
      ))}
    </ul>
  );
};
