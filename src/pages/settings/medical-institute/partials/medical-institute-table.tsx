import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useMedicalInstituteList from "../hooks/use-medical-institute-list";
import MedicalInstituteColumns from "./medical-institute-columns";

export default function MedicalInstituteTable() {
  const {
    medicalInstituteListResponse,
    isLoading,
    rowSelection,
    setRowSelection,
  } = useMedicalInstituteList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={medicalInstituteListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={MedicalInstituteColumns()}
        data={medicalInstituteListResponse?.data?.records || []}
        getRowId={(row) => row.id}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={medicalInstituteListResponse?.data?.totalRecords}
        totalPages={medicalInstituteListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
}
