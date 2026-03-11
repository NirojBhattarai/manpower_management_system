import TableWrapper from "@/components/TableWrapper";
import Table from "@/components/Table";
import useMedicalList from "../hooks/use-medical-list";
import MedicalColumns from "./medical-column";
import { IMedicalListItem } from "../interface/medical-interface";

interface MedicalTableProps {
  selectedCandidates: IMedicalListItem[];
  setSelectedCandidates: React.Dispatch<
    React.SetStateAction<IMedicalListItem[]>
  >;
}

const MedicalTable = ({ setSelectedCandidates }: MedicalTableProps) => {
  const { medicalListResponse, isLoading, rowSelection, setRowSelection } =
    useMedicalList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={medicalListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={MedicalColumns()}
        data={medicalListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={medicalListResponse?.data?.totalRecords}
        totalPages={medicalListResponse?.data?.totalPages}
        getRowId={(row) => row.id}
        onSelectedRowsChange={setSelectedCandidates}
      />
    </TableWrapper>
  );
};

export default MedicalTable;
