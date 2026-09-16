import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      {/* Header, nav, etc. ici si besoin */}
      <Outlet />
    </div>
  );
}
export default Root;