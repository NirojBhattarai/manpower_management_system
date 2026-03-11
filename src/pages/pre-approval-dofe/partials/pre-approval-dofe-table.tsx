import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import PreApprovalDofeColumns from "./pre-approval-dofe-column";
import usePreApprovalDofeList from "../hooks/use-pre-approval-dofe-list";

const PreApprovalDofeTable = () => {
  const {
    preApprovalDofeListResponse,
    isLoading,
    rowSelection,
    setRowSelection,
  } = usePreApprovalDofeList();

  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={preApprovalDofeListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={PreApprovalDofeColumns()}
        data={preApprovalDofeListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={preApprovalDofeListResponse?.data?.totalRecords}
        totalPages={preApprovalDofeListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default PreApprovalDofeTable;
