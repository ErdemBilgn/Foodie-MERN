import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div>
      <nav>Nav Bar</nav>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}

export default Main;
