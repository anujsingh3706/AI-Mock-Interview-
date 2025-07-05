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
        "flex items-center gap-6",
        isMobile && "items-start flex-col gap-8"
      )}
    >
      {MainRoutes.map((route) => (
        <NavLink
          key={route.href}
          to={route.href}
          className={({ isActive }) =>
            cn(
              route.label === 'Take An Interview' ? 'nav-btn-orange' : 'nav-gradient-btn',
              isActive ? 'scale-105 shadow-3d' : 'opacity-90 hover:scale-105 hover:shadow-3d'
            )
          }
        >
          {route.label}
        </NavLink>
      ))}
    </ul>
  );
};
