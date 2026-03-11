import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/components/TableAction";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constant/path";
import { ICompanyListItem } from "../hooks/use-get-industry";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

const CompanyColumns = (): ColumnDef<ICompanyListItem>[] => {
  const navigate = useNavigate();

  const handleUpdateClick = (id: string) => {
    navigate(PATH.company.update.replace(":id", id));
  };
  const { handleOpenModal: handleOpenDeleteModal } = useDelete({
    endpoints: endpoints.country.delete,
    invalidates: [apiTags.country.list],
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
      header: "Recruitment Company",
      accessorKey: "companyName",
      size: 200,
    },
    {
      header: "License Number",
      accessorKey: "liscenseNumber",
      size: 200,
    },
    {
      header: "Country",
      accessorKey: "country",
      cell: ({ row }) => row?.original?.country?.country,
      size: 200,
    },
    {
      header: "Contact Number",
      accessorKey: "contactNumber",
      size: 200,
    },
    {
      header: "Email",
      accessorKey: "email",
      size: 200,
    },
    {
      header: "Office Address",
      accessorKey: "officeAddress",
      size: 200,
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

export default CompanyColumns;
