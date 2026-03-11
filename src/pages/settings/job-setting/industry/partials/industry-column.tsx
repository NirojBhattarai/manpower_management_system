import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/components/TableAction";
import React from "react";
import { IndustryListItem } from "../hooks/use-get-all-industry";
import { useDelete } from "@/hooks/useDelete";
import { Checkbox } from "@/components/ui/checkbox";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";

const IndustryColumn = (): ColumnDef<IndustryListItem>[] => {
  const updateInsuranceCompany = useQueryParamState(
    QUERY_PARAMS.jobsetting.industry.updateIndustry.key,
  );
  const deleteInsuranceCompany = useDelete({
    endpoints: endpoints.jobsetting.industry.delete,
    invalidates: [apiTags.industry.list],
  });
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
      maxSize: 50,
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
      header: "Industry",
      accessorKey: "industry",
      minSize: 400,
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <TableAction
          edit={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              updateInsuranceCompany.setValue(row.original.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteInsuranceCompany.handleOpenModal(row.original.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};

export default IndustryColumn;
