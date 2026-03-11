import TableWrapper from "@/components/TableWrapper";
import useInvoiceList from "../hooks/use-invoice-list";
import Table from "@/components/Table";
import InvoiceColumns from "./invoice-columns";
import { IInvoiceListItem } from "../interface/invoice-interfaces";

const InvoiceTable = () => {
  const { invoiceListResponse, isLoading, rowSelection, setRowSelection } =
    useInvoiceList();

  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={invoiceListResponse?.data?.records?.length > 0}
    >
      <Table<IInvoiceListItem>
        columns={InvoiceColumns()}
        data={invoiceListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={invoiceListResponse?.data?.totalRecords}
        totalPages={invoiceListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default InvoiceTable;
