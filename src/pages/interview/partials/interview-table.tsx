import TableWrapper from "@/components/TableWrapper";
import Table from "@/components/Table";
import useInterviewList from "../hooks/use-interview-list";
import InterviewColumns from "./interview-column";
import { IInterviewScheduleListItem } from "../interface/interview-schedule-interface";

interface InterviewTableProps {
  selectedCandidates: IInterviewScheduleListItem[];
  setSelectedCandidates: React.Dispatch<
    React.SetStateAction<IInterviewScheduleListItem[]>
  >;
}
const InterviewTable = ({ setSelectedCandidates }: InterviewTableProps) => {
  const { interviewListResponse, isLoading, rowSelection, setRowSelection } =
    useInterviewList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={interviewListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={InterviewColumns()}
        data={interviewListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={interviewListResponse?.data?.totalRecords}
        totalPages={interviewListResponse?.data?.totalPages}
        getRowId={(row) => row.id}
        onSelectedRowsChange={setSelectedCandidates}
      />
    </TableWrapper>
  );
};

export default InterviewTable;
