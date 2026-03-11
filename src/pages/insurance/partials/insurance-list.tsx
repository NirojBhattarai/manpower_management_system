import TableWrapper from "@/components/TableWrapper";
import Table from "@/components/Table";
import useInsuranceList from "../hooks/use-insurance-list";
import InsuranceColumns from "./insurance-column";
import { IInsuranceListItem } from "../interface/insurance-interface";

interface InsuranceTableProps {
  selectedCandidates: IInsuranceListItem[];
  setSelectedCandidates: React.Dispatch<
    React.SetStateAction<IInsuranceListItem[]>
  >;
}
const InsuranceTable = ({ setSelectedCandidates }: InsuranceTableProps) => {
  const { insuranceListResponse, isLoading, rowSelection, setRowSelection } =
    useInsuranceList();

  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={insuranceListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={InsuranceColumns()}
        data={insuranceListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={insuranceListResponse?.data?.totalRecords}
        totalPages={insuranceListResponse?.data?.totalPages}
        getRowId={(row) => row.id}
        onSelectedRowsChange={setSelectedCandidates}
      />
    </TableWrapper>
  );
};

export default InsuranceTable;
