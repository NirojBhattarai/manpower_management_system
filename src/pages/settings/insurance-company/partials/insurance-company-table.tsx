import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useInsuranceCompanyList from "../hooks/use-insurance-company-list";
import InsuranceCompanyColumns from "./insurance-company-columns";

export default function InsuranceCompanyTable() {
  const {
    insuranceCompanyListResponse,
    isLoading,
    rowSelection,
    setRowSelection,
  } = useInsuranceCompanyList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={insuranceCompanyListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={InsuranceCompanyColumns()}
        data={insuranceCompanyListResponse?.data?.records || []}
        getRowId={(row) => row.id}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={insuranceCompanyListResponse?.data?.totalRecords}
        totalPages={insuranceCompanyListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
}
