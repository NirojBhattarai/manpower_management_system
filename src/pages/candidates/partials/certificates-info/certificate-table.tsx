import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useCertificateList from "./hooks/use-certificate-list";
import CertificateColumns from "./certificate-column";

const CertificateTable = () => {
  const { certificateListResponse, isLoading, rowSelection, setRowSelection } =
    useCertificateList();

  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={certificateListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={CertificateColumns()}
        data={certificateListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={certificateListResponse?.data?.totalRecords}
        totalPages={certificateListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default CertificateTable;
