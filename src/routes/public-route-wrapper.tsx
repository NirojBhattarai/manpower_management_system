import { Outlet } from "react-router-dom";

/**
 * A wrapper component for public routes (like login, signup pages)..
 */

const PublicRouteWrapper = () => {
  return <Outlet />;
};

export default PublicRouteWrapper;
