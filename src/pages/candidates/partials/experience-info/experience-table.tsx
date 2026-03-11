import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useExperienceList from "./hooks/use-experience-list";
import ExperienceColumns from "./experience-column";

const ExperienceTable = () => {
  const { experienceListResponse, isLoading, rowSelection, setRowSelection } =
    useExperienceList();

  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={experienceListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={ExperienceColumns()}
        data={experienceListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={experienceListResponse?.data?.totalRecords}
        totalPages={experienceListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default ExperienceTable;
