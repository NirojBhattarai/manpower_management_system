import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import UserColumns from "./user-columns";
import useUserList from "../hooks/use-user-list";

export default function UserTable() {
  const { userListResponse, isLoading, rowSelection, setRowSelection } =
    useUserList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={userListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={UserColumns()}
        data={userListResponse?.data?.records || []}
        getRowId={(row) => row?.id}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={userListResponse?.data?.totalRecords}
        totalPages={userListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
}
