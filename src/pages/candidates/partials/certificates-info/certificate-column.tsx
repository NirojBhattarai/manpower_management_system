import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import TableAction from "@/components/TableAction";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ICertificateListItem } from "./interface/certificate-interface";
import { FileText } from "lucide-react";

const CertificateColumns = (): ColumnDef<ICertificateListItem>[] => {
  const updateCertificate = useQueryParamState(
    QUERY_PARAMS.certificate.updateCertificate.key,
  );
  const deleteCertificate = useDelete({
    endpoints: endpoints.candidates.certificate.delete,
    invalidates: [apiTags.candidates.certificate.list],
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
      header: "Organization Name",
      accessorKey: "organizationName",
      size: 150,
    },
    {
      header: "Certificate File",
      accessorKey: "certificateFile",
      size: 150,
      cell: ({ row }) => {
        const fileUrl = row.original?.certificateFile;

        if (!fileUrl) return <span className="text-muted-foreground">N/A</span>;

        return (
          <button
            type="button"
            onClick={() => window.open(fileUrl, "_blank")}
            className="flex items-center gap-2 text-primary hover:text-blue-800 hover:underline hover:cursor-pointer"
          >
            <FileText className="w-4 h-4" />
          </button>
        );
      },
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
              updateCertificate.setValue(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteCertificate.handleOpenModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};

export default CertificateColumns;
