import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdatePermission from "../hooks/use-update-permission";
import PermissionForm from "./permission-form";

export default function UpdatePermission() {
  const { formik, isLoading, isInitialLoading, roles } = useUpdatePermission();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? (
        <LoadingScreen message="Loading permission details..." />
      ) : (
        <PermissionForm roles={roles} />
      )}
    </ExtendedForm>
  );
}
