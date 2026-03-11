import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useOrientationInstituteList from "../hooks/use-orientation-institute-list";
import OrientationInstituteColumns from "./orientation-columns";

export default function OrientationInstituteTable() {
  const {
    orientationInstituteListResponse,
    isLoading,
    rowSelection,
    setRowSelection,
  } = useOrientationInstituteList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={
        orientationInstituteListResponse?.data?.records?.length > 0
      }
    >
      <Table
        columns={OrientationInstituteColumns()}
        data={orientationInstituteListResponse?.data?.records || []}
        getRowId={(row) => row.id}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={orientationInstituteListResponse?.data?.totalRecords}
        totalPages={orientationInstituteListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
}
