import TableWrapper from "@/components/TableWrapper";
import useRoleList from "../hooks/use-role-list";
import Table from "@/components/Table";
import RoleColumns from "./role-column";

export default function RoleTable() {
  const {
    roleListResponse: roleData,
    rowSelection,
    setRowSelection,
    isLoading,
  } = useRoleList();
  return (
    <TableWrapper
      isLoading={isLoading}
      wrapperClassName="mt-4"
      isDataAvailable={roleData?.data?.records?.length > 0}
    >
      <Table
        columns={RoleColumns()}
        data={roleData?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={roleData?.data?.totalRecords}
        totalPages={roleData?.data?.totalPages}
      />
    </TableWrapper>
  );
}
