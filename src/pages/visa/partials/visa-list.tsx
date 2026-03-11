import TableWrapper from "@/components/TableWrapper";
import Table from "@/components/Table";
import VisaColumns from "./visa-column";
import useVisaList from "../hooks/use-visa-list";
import { IVisaListItem } from "../interface/visa-interface";

interface VisaTableProps {
  selectedCandidates: IVisaListItem[];
  setSelectedCandidates: React.Dispatch<React.SetStateAction<IVisaListItem[]>>;
}
const VisaTable = ({ setSelectedCandidates }: VisaTableProps) => {
  const { visaListResponse, isLoading, rowSelection, setRowSelection } =
    useVisaList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={visaListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={VisaColumns()}
        data={visaListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={visaListResponse?.data?.totalRecords}
        totalPages={visaListResponse?.data?.totalPages}
        getRowId={(row) => row.id}
        onSelectedRowsChange={setSelectedCandidates}
      />
    </TableWrapper>
  );
};

export default VisaTable;
