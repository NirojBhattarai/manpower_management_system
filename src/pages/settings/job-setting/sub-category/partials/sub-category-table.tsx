import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import SubCategoryColumns from "./sub-category-column";
import useSubCategoryList from "../hooks/use-sub-category-list";

const SubCategoryTable = () => {
  const { subCategoryListResponse, isLoading, rowSelection, setRowSelection } =
    useSubCategoryList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={subCategoryListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={SubCategoryColumns()}
        data={subCategoryListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={subCategoryListResponse?.data?.totalRecords}
        totalPages={subCategoryListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default SubCategoryTable;
