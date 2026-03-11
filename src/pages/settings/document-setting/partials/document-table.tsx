import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import DocumentColumns from "./document-column";
import useDocumentList from "../hooks/use-document-list";

const DocumentTable = () => {
  const { documentListResponse, isLoading, rowSelection, setRowSelection } =
    useDocumentList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={documentListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={DocumentColumns()}
        data={documentListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={documentListResponse?.data?.totalRecords}
        totalPages={documentListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default DocumentTable;
