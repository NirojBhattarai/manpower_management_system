import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { IJobvacancyListItem } from "../interface/job-vacancy-interface";

const JobVacancyColumns = (): ColumnDef<IJobvacancyListItem>[] => {
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
      cell: ({ row }) => row?.original?.country?.country || "N/A",
      size: 200,
    },
    {
      header: "Company",
      cell: ({ row }) => row?.original?.company?.companyName || "N/A",
      size: 200,
    },
    {
      header: "Job Title",
      accessorKey: "jobTitle",
      cell: ({ row }) => row?.original?.jobTitle?.jobtitle || "N/A",
      size: 200,
    },
    {
      header: "Male",
      accessorKey: "male",
      size: 100,
    },
    {
      header: "Female",
      accessorKey: "female",
      size: 100,
    },
    {
      header: "Basic Salary NPR",
      accessorKey: "basicSalaryNPR",
      size: 150,
    },
    {
      header: "Basic Salary AED",
      accessorKey: "basicSalaryAED",
      size: 150,
    },
    {
      header: "Working City",
      accessorKey: "workingCity",
      size: 150,
    },
    {
      header: "Working Days",
      accessorKey: "workingDays",
      size: 150,
    },
    {
      header: "Working Hours",
      accessorKey: "workingHours",
      size: 150,
    },
    {
      header: "Contract Period",
      accessorKey: "contractPeriod",
      size: 150,
    },
    {
      header: "Experience Years",
      accessorKey: "years",
      cell: ({ row }) =>
        row?.original?.experience ? row?.original?.years : "N/A",
      size: 150,
    },
    {
      header: "Academic Qualification",
      accessorKey: "academicQualification",
      cell: ({ row }) => {
        return (
          <span className="capitalize">
            {row?.original?.academicQualification
              ? row?.original?.academicQualification
              : "N/A"}
          </span>
        );
      },
      size: 150,
    },
  ];
};

export default JobVacancyColumns;
