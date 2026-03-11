import TableWrapper from "@/components/TableWrapper";
import useCountryList from "../hooks/use-country-list";
import Table from "@/components/Table";
import CountryColumns from "./country-column";

const CountryTable = () => {
  const { countryListResponse, isLoading, rowSelection, setRowSelection } =
    useCountryList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={countryListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={CountryColumns()}
        data={countryListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={countryListResponse?.data?.totalRecords}
        totalPages={countryListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default CountryTable;
