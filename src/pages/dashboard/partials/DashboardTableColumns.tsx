import { ColumnDef } from "@tanstack/react-table";
import { IActivitiesListItem } from "../interface/activities-interface";

export const DashboardTableColumns: ColumnDef<IActivitiesListItem>[] = [
  {
    header: "User",
    cell: ({ row }) => row.original.user.name,
  },
  {
    header: "Activity Type",
    accessorKey: "activityType",
  },
  {
    header: "Message",
    accessorKey: "message",
  },
  {
    header: "Date",
    accessorKey: "created_date",
  },
];
