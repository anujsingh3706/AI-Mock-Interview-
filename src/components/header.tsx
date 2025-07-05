import { cn } from "@/lib/utils";
import { Container } from "./container";
import { LogoContainer } from "./logo-container";
import { NavigationRoutes } from "./navigation-routes";
import { ProfileContainer } from "./profile-container";
import { ToggleContainer } from "./toggle-container";

const Header = () => {
  return (
    <header className={cn("w-full border-b duration-150 transition-all ease-in-out")}> 
      <Container>
        <div className="flex items-center w-full">
          <div className="flex-1" />
          <nav className="flex items-center justify-center gap-8">
            <NavigationRoutes />
          </nav>
          <div className="flex-1 flex justify-end">
            <ProfileContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
