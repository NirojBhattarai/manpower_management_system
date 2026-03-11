import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import CategoryColumns from "./category-column";
import useCategoryList from "../hooks/use-category-list";

const CategoryTable = () => {
  const { categoryListResponse, isLoading, rowSelection, setRowSelection } =
    useCategoryList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={categoryListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={CategoryColumns()}
        data={categoryListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={categoryListResponse?.data?.totalRecords}
        totalPages={categoryListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default CategoryTable;
