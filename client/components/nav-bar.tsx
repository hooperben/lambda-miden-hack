import ModeToggle from "./ui/dark-mode-button";
import SignIn from "./sign-in";

const NavBar = () => {
  return (
    <nav className="flex justify-between m-2">
      <h2 className="text-lg">Sendooor</h2>
      <div className="flex">
        <ModeToggle />
        <div className="m-1" />
        <SignIn />
      </div>
    </nav>
  );
};

export default NavBar;
