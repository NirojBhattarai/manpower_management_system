import TableAction from "@/components/TableAction";
import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IInsuranceListItem } from "../interface/insurance-interface";
import {
  getFlagStatusColor,
  getInsuranceStatusColor,
} from "@/utils/useStatusColor";

const InsuranceColumns = (): ColumnDef<IInsuranceListItem>[] => {
  const deleteInsurance = useDelete({
    endpoints: endpoints.insurance.delete,
    invalidates: [apiTags.insurance.list],
  });
  const updateInsurance = useUpdateModal();

  return [
    {
      id: "select",
      header: ({ table }) => (
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
      ),
      cell: ({ row }) => (
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
      ),
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
      header: "Company",
      cell: ({ row }) => row?.original?.company?.companyName,
      size: 200,
    },
    {
      header: "Insurance Company",
      accessorKey: "insuranceCompany",
      cell: ({ row }) => row?.original?.insuranceCompany?.name || "N/A",
      size: 200,
    },
    {
      header: "Policy Number",
      accessorKey: "policyNumber",
      cell: ({ row }) => row?.original?.policyNumber || "N/A",
      size: 200,
    },
    {
      header: "Valid From",
      accessorKey: "validFrom",
      cell: ({ row }) => row?.original?.validFrom || "N/A",
      size: 200,
    },
    {
      header: "Valid To",
      accessorKey: "validTo",
      cell: ({ row }) => row?.original?.validTo || "N/A",
      size: 200,
    },
    {
      header: "Insurance Document",
      accessorKey: "insuranceDocument",
      cell: ({ row }) => {
        const fileUrl = row.original?.insuranceDocument;

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
      header: "Insurance Status",
      cell: ({ row }) => {
        const status = row.original.insuranceStatus;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getInsuranceStatusColor(
              status,
            )}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Moved to Orientation",
      cell: ({ row }) => {
        const status = row.original.isMovedToShram ? "moved" : "not moved";
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getFlagStatusColor(
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
              updateInsurance.handleOpenModal(row.original.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteInsurance.handleOpenModal(row.original.id);
            },
          }}
        />
      ),
      size: 200,
      maxSize: 200,
    },
  ];
};

export default InsuranceColumns;
