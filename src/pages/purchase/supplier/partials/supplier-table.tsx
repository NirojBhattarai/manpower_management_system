import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import SupplierColumns from "./supplier-columns";
import useSupplierList from "../hooks/use-supplier-list";

export default function SupplierTable() {
  const { supplierListResponse, isLoading, rowSelection, setRowSelection } =
    useSupplierList();
  return (
    <TableWrapper
      isLoading={isLoading}
      isDataAvailable={supplierListResponse?.data?.records?.length > 0}
      wrapperClassName="mt-4"
    >
      <Table
        columns={SupplierColumns()}
        data={supplierListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={supplierListResponse?.data?.totalRecords}
        totalPages={supplierListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
}
