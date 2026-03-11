import TableWrapper from "@/components/TableWrapper";
import Table from "@/components/Table";
import useShramList from "../hooks/use-shram-list";
import ShramColumns from "./shram-column";
import { IShramListItem } from "../interface/shram-interface";

interface ShramTableProps {
  selectedCandidates: IShramListItem[];
  setSelectedCandidates: React.Dispatch<React.SetStateAction<IShramListItem[]>>;
}
const ShramTable = ({ setSelectedCandidates }: ShramTableProps) => {
  const { shramListResponse, isLoading, rowSelection, setRowSelection } =
    useShramList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={shramListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={ShramColumns()}
        data={shramListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={shramListResponse?.data?.totalRecords}
        totalPages={shramListResponse?.data?.totalPages}
        getRowId={(row) => row.id}
        onSelectedRowsChange={setSelectedCandidates}
      />
    </TableWrapper>
  );
};

export default ShramTable;
