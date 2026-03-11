import { PATH } from "@/constant/path";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Account = lazy(() => import("@/pages/account"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const MyMembership = lazy(() => import("@/pages/my-membership"));
const MySubscription = lazy(() => import("@/pages/my-subscription"));
const Permission = lazy(() => import("@/pages/role-permission/permission"));
const Role = lazy(() => import("@/pages/role-permission/role"));
const User = lazy(() => import("@/pages/user"));

export const dashboardRoutes = [
  {
    index: true,
    element: <Navigate to={PATH.dashboard.dashboard} replace />,
  },
  {
    path: PATH.dashboard.dashboard,
    element: <Dashboard />,
  },
  //
  {
    path: PATH.user.index,
    element: <User />,
  },
  // Role, Permission and Module Management
  {
    path: PATH.roleAndPermission.role,
    element: <Role />,
  },
  {
    path: PATH.roleAndPermission.permission,
    element: <Permission />,
  },
  {
    path: PATH.mySubscription.index,
    element: <MySubscription />,
  },
  {
    path: PATH.myMembership.index,
    element: <MyMembership />,
  },
  {
    path: PATH.account.index,
    element: <Account />,
  },
];
