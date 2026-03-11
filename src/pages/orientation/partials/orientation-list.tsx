import TableWrapper from "@/components/TableWrapper";
import Table from "@/components/Table";
import useOrientationList from "../hooks/use-orientation-list";
import OrientationColumns from "./orientation-column";
import { IOrientationListItem } from "../interface/orientation-interface";

interface OrientationTableProps {
  selectedCandidates: IOrientationListItem[];
  setSelectedCandidates: React.Dispatch<
    React.SetStateAction<IOrientationListItem[]>
  >;
}
const OrientationTable = ({ setSelectedCandidates }: OrientationTableProps) => {
  const { orientationListResponse, isLoading, rowSelection, setRowSelection } =
    useOrientationList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={orientationListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={OrientationColumns()}
        data={orientationListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalPages={orientationListResponse?.data?.totalPages}
        totalItems={orientationListResponse?.data?.totalRecords}
        getRowId={(row) => row.id}
        onSelectedRowsChange={setSelectedCandidates}
      />
    </TableWrapper>
  );
};

export default OrientationTable;
