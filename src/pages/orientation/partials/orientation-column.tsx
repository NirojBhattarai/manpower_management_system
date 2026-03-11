import TableAction from "@/components/TableAction";
import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import { Checkbox } from "@/components/ui/checkbox";
import { IOrientationListItem } from "../interface/orientation-interface";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import {
  getFlagStatusColor,
  getOrientationStatusColor,
} from "@/utils/useStatusColor";

const OrientationColumns = (): ColumnDef<IOrientationListItem>[] => {
  const deleteOrientation = useDelete({
    endpoints: endpoints.orientation.list,
    invalidates: [apiTags.orientation.list],
  });
  const updateOrientation = useQueryParamState(
    QUERY_PARAMS.visa.updateVisa.key,
  );

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
      header: "Company",
      cell: ({ row }) => row?.original?.company?.companyName,
      size: 200,
    },
    {
      header: "Orientation Institute",
      cell: ({ row }) => row?.original?.instituteName?.name,
      size: 200,
    },
    {
      header: "Orientation Date",
      cell: ({ row }) => row?.original?.orientationDate,
      size: 200,
    },
    {
      header: "Orientation Expiry Date",
      accessorKey: "orientationExpireDate",
      cell: ({ row }) => row?.original?.orientationExpireDate || "N/A",
      size: 200,
    },
    {
      header: "Orientation Status",
      cell: ({ row }) => {
        const status = row.original.orientationStatus;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getOrientationStatusColor(
              status,
            )}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Moved to Insurance",
      cell: ({ row }) => {
        const status = row.original.isMovedToInsurance ? "moved" : "not moved";
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
      accessorKey: "action",
      cell: ({ row }) => (
        <TableAction
          edit={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              updateOrientation.setValue(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteOrientation.handleOpenModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};

export default OrientationColumns;
