import { ColumnDef } from "@tanstack/react-table";
import { IInsuranceCompanyListItem } from "../hooks/use-insurance-company-list";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/TableAction";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

export default function InsuranceCompanyColumns(): ColumnDef<IInsuranceCompanyListItem>[] {
  const updateInsuranceCompany = useQueryParamState(
    QUERY_PARAMS.setting.insuranceComapany.updateInsuranceComapany.key,
  );
  const deleteInsuranceCompany = useDelete({
    endpoints: endpoints.insuranceCompany.delete,
    invalidates: [apiTags.insuranceCompany.list],
  });
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
      header: "Name",
      accessorKey: "name",
      size: 150,
    },
    {
      header: "Address",
      accessorKey: "address",
      size: 150,
    },
    {
      header: "Email",
      accessorKey: "email",
      size: 150,
    },
    {
      header: "Phone No.",
      accessorKey: "phone",
      size: 150,
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
}
