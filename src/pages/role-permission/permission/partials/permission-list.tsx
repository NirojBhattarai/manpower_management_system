import TableWrapper from "@/components/TableWrapper";
import Table from "@/components/Table";
import usePermissionList from "../hooks/use-permission-list";
import PermissionColumns from "./permission-column";

export default function PermissionTable() {
  const {
    permissionListResponse: permissionData,
    rowSelection,
    setRowSelection,
    isLoading,
  } = usePermissionList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={permissionData?.data?.records?.length > 0}
    >
      <Table
        columns={PermissionColumns()}
        data={permissionData?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={permissionData?.data?.totalRecords}
        totalPages={permissionData?.data?.totalPages}
      />
    </TableWrapper>
  );
}
