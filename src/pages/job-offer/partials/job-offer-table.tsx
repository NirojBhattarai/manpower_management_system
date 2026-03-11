import TableWrapper from "@/components/TableWrapper";
import Table from "@/components/Table";
import useJobOfferList from "../hooks/use-job-offer-list";
import JobOfferColumns from "./job-offer-column";
import { IJobOfferListItem } from "../interface/job-offer-interface";

interface JobOfferTableProps {
  selectedCandidates: IJobOfferListItem[];
  setSelectedCandidates: React.Dispatch<
    React.SetStateAction<IJobOfferListItem[]>
  >;
}
const JobOfferTable = ({ setSelectedCandidates }: JobOfferTableProps) => {
  const { jobOfferListResponse, isLoading, rowSelection, setRowSelection } =
    useJobOfferList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={jobOfferListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={JobOfferColumns()}
        data={jobOfferListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={jobOfferListResponse?.data?.totalRecords}
        totalPages={jobOfferListResponse?.data?.totalPages}
        getRowId={(row) => row.id}
        onSelectedRowsChange={setSelectedCandidates}
      />
    </TableWrapper>
  );
};

export default JobOfferTable;
