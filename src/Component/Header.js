import Button from "./Button";
import { useLocation } from "react-router-dom";
const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();
  return (
    <header
      className="header"
      style={{ color: "white", backgroundColor: "blue", padding: 20 }}
    >
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "yellow" : "red"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};
Header.defaultProps = {
  title: "Task Tracker"
};
export default Header;
