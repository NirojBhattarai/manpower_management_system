import Table from "@/components/Table";
import CompanyColumns from "./company-columns";
import TableWrapper from "@/components/TableWrapper";
import useCompanyList from "../hooks/use-get-industry";

const ComapnyTable = () => {
  const { companyListResponse, isLoading, rowSelection, setRowSelection } =
    useCompanyList();

  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={companyListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={CompanyColumns()}
        data={companyListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={companyListResponse?.data?.totalRecords}
        totalPages={companyListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default ComapnyTable;
