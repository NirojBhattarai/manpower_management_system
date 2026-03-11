import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import TableAction from "@/components/TableAction";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IExperienceListItem } from "./interface/experience-interface";

const ExperienceColumns = (): ColumnDef<IExperienceListItem>[] => {
  const updateExperience = useQueryParamState(
    QUERY_PARAMS.experience.updateExperience.key,
  );
  const deleteExperience = useDelete({
    endpoints: endpoints.candidates.experience.delete,
    invalidates: [apiTags.candidates.experience.list],
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
      header: "Company Name",
      accessorKey: "companyName",
      size: 150,
    },
    {
      header: "Start Date",
      accessorKey: "startDate",
      size: 150,
    },
    {
      header: "End Date",
      cell: ({ row }) => row.original.endDate || "N/A",
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
              updateExperience.setValue(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteExperience.handleOpenModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};

export default ExperienceColumns;
