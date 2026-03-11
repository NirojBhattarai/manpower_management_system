import TableWrapper from "@/components/TableWrapper";
import Table from "@/components/Table";
import useTicketList from "../hooks/use-ticket-list";
import TicketColumns from "./ticket-column";

const TicketTable = () => {
  const { ticketListResponse, isLoading, rowSelection, setRowSelection } =
    useTicketList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={ticketListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={TicketColumns()}
        data={ticketListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={ticketListResponse?.data?.totalRecords}
        totalPages={ticketListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default TicketTable;
