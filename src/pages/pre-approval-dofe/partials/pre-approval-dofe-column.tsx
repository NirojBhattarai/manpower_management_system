import TableAction from "@/components/TableAction";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constant/path";
import React from "react";
import { useDelete } from "@/hooks/useDelete";
import { IPreApprovalDofeListItem } from "../interface/preapprovaldofe-interface";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

const PreApprovalDofeColumns = (): ColumnDef<IPreApprovalDofeListItem>[] => {
  const navigate = useNavigate();

  const { handleOpenModal: handleOpenDeleteModal } = useDelete({
    endpoints: endpoints.preApprovalDofe.delete,
    invalidates: [apiTags.preApprovalDofe.list],
  });
  const handleUpdateClick = (id: string) => {
    navigate(PATH.preApprovalDofe.update.replace(":id", id));
  };

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
      header: "Country",
      accessorKey: "country",
      cell: ({ row }) => row?.original?.country?.country,
      size: 150,
    },
    {
      header: "Company",
      accessorKey: "company",
      cell: ({ row }) => row?.original?.company?.companyName,
      size: 150,
    },
    {
      header: "Pre Approval Date",
      accessorKey: "preApprovalDate",
      size: 150,
    },
    {
      header: "LT Number",
      accessorKey: "preltNumber",
      size: 150,
    },
    {
      header: "Chalani Number",
      accessorKey: "chalaniNumber",
      size: 150,
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
              handleUpdateClick(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleOpenDeleteModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};

export default PreApprovalDofeColumns;
