import { PATH } from "@/constant/path";
import { lazy } from "react";

const Ticket = lazy(() => import("@/pages/ticket"));

export const ticketRoutes = [
  {
    path: PATH.ticket.index,
    element: <Ticket />,
  },
];

