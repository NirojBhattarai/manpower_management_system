import TableAction from "@/components/TableAction";
import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { Checkbox } from "@/components/ui/checkbox";
import { ITicketListItem } from "../interface/ticket-interface";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { getFlightStatusColor } from "@/utils/useStatusColor";
import { FileText } from "lucide-react";

const TicketColumns = (): ColumnDef<ITicketListItem>[] => {
  const deleteTicket = useDelete({
    endpoints: endpoints.ticket.delete,
    invalidates: [apiTags.ticket.list],
  });
  const updateTicket = useUpdateModal();
  return [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <div className="">
            <Checkbox
              checked={
                table.getIsAllRowsSelected()
                  ? true
                  : table.getIsSomeRowsSelected()
                    ? "indeterminate"
                    : false
              }
              onCheckedChange={(value) => {
                table.toggleAllRowsSelected(!!value);
              }}
            />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="">
            <Checkbox
              checked={
                row.getIsSelected()
                  ? true
                  : row.getIsSomeSelected()
                    ? "indeterminate"
                    : false
              }
              onCheckedChange={row.getToggleSelectedHandler()}
            />
          </div>
        );
      },
      size: 50,
    },
    {
      header: "S.N.",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;

        return pageIndex * pageSize + row.index + 1;
      },
      size: 50,
    },
    {
      header: "Candidate Name",
      cell: ({ row }) => row?.original?.jobseeker?.fullName,
      size: 200,
    },
    {
      header: "Candidate Job",
      cell: ({ row }) => row?.original?.jobTitle?.jobtitle,
      size: 200,
    },
    {
      header: "Employer Name",
      cell: ({ row }) => row?.original?.company?.companyName,
      size: 200,
    },
    {
      header: "Airline Name",
      cell: ({ row }) => row?.original?.airlineName,
      size: 200,
    },
    {
      header: "Flight Number",
      cell: ({ row }) => row?.original?.flightNumber,
      size: 200,
    },
    {
      header: "Flight Ticket",
      accessorKey: "ticketFile",
      cell: ({ row }) => {
        const fileUrl = row.original?.ticketFile;

        if (!fileUrl) return <span>N/A</span>;

        return (
          <button
            type="button"
            onClick={() => window.open(fileUrl, "_blank")}
            className="flex items-center gap-2 text-primary hover:text-blue-800 hover:underline hover:cursor-pointer"
          >
            <FileText className="w-4 h-4" />
          </button>
        );
      },
      size: 200,
    },
    {
      header: "Departure Date",
      accessorKey: "departureDate",
      cell: ({ row }) => {
        return <span>{row?.original?.departureDate || "N/A"}</span>;
      },
    },
    {
      header: "Flight Status",
      cell: ({ row }) => {
        const status = row.original?.flightStatus;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getFlightStatusColor(
              status,
            )}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <TableAction
          edit={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              updateTicket.handleOpenModal(row.original.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteTicket.handleOpenModal(row.original.id);
            },
          }}
        />
      ),
      size: 200,
      maxSize: 200,
    },
  ];
};

export default TicketColumns;
