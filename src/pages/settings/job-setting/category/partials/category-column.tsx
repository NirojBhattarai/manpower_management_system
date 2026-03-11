import TableAction from "@/components/TableAction";
import { ColumnDef } from "@tanstack/react-table";
import { ICategoryListItem } from "../hooks/use-category-list";
import { Checkbox } from "@/components/ui/checkbox";
import { useDelete } from "@/hooks/useDelete";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

const CategoryColumns = (): ColumnDef<ICategoryListItem>[] => {
  const updateCategory = useQueryParamState(
    QUERY_PARAMS.jobsetting.category.updateCategory.key,
  );
  const deleteCategory = useDelete({
    endpoints: endpoints.jobsetting.category.delete,
    invalidates: [apiTags.category.list],
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
      header: "Icon",
      cell: ({ row }) => (
        <img
          src={row?.original?.icon}
          alt="icon"
          className="size-10 object-contain"
          crossOrigin="anonymous"
        />
      ),
      size: 200,
    },
    {
      header: "Category",
      accessorKey: "category",
      size: 300,
    },
    {
      header: "Industry",
      accessorKey: "industry",
      cell: ({ row }) => row?.original?.industry?.industry,
      size: 300,
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <TableAction
          edit={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              updateCategory.setValue(row.original.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteCategory.handleOpenModal(row.original.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};
export default CategoryColumns;
