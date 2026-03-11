import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/TableAction";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IPersonalDetailsListItem } from "./personal-details/interface/personal-details-interface";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constant/path";

const CandidateColumns = (): ColumnDef<IPersonalDetailsListItem>[] => {
  const navigate = useNavigate();

  const { handleOpenModal: handleOpenDeleteModal } = useDelete({
    endpoints: endpoints.candidates.personalDetails.delete,
    invalidates: [apiTags.candidates.personalDetails.list],
  });
  const handleUpdateClick = (id: string) => {
    navigate(PATH.candidate.update.replace(":id", id));
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
      header: "Name",
      accessorKey: "fullName",
      size: 150,
    },
    {
      header: "Email",
      accessorKey: "email",
      size: 150,
    },
    {
      header: "Phone Number",
      accessorKey: "phone",
      size: 150,
    },
    {
      header: "Passport Number",
      accessorKey: "passportNumber",
      size: 150,
    },
    {
      header: "District",
      accessorKey: "district",
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

export default CandidateColumns;
