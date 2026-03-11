import TableAction from "@/components/TableAction";
import { ColumnDef } from "@tanstack/react-table";
import { ISubCategoryListItem } from "../hooks/use-sub-category-list";
import { useDelete } from "@/hooks/useDelete";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

const SubCategoryColumns = (): ColumnDef<ISubCategoryListItem>[] => {
  const updateCategory = useQueryParamState(
    QUERY_PARAMS.jobsetting.subCategory.updateSubCategory.key,
  );
  const deleteCategory = useDelete({
    endpoints: endpoints.jobsetting.subCategory.delete,
    invalidates: [apiTags.subCategory.list],
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
          alt=""
          className="size-10 object-contain"
        />
      ),
      size: 50,
    },
    {
      header: "Sub Category",
      accessorKey: "subcategory",
      size: 150,
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => row?.original?.category?.category,
      size: 150,
    },

    {
      header: "Industry",
      accessorKey: "industry",
      cell: ({ row }) => row?.original?.industry?.industry,
      size: 200,
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
export default SubCategoryColumns;
