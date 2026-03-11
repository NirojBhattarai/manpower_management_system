import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import TableAction from "@/components/TableAction";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IEducationsListItem } from "./interface/education-info-interface";

const EducationColumns = (): ColumnDef<IEducationsListItem>[] => {
  const updatePermission = useQueryParamState(
    QUERY_PARAMS.education.updateEducation.key,
  );
  const deletePermission = useDelete({
    endpoints: endpoints.candidates.education.delete,
    invalidates: [apiTags.candidates.education.list],
  });
  return [
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
      header: "Level",
      accessorKey: "level",
      size: 150,
    },
    {
      header: "Institute Name",
      accessorKey: "instituteName",
      size: 150,
    },
    {
      header: "Faculty Name",
      accessorKey: "faculty",
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
              updatePermission.setValue(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deletePermission.handleOpenModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};

export default EducationColumns;
