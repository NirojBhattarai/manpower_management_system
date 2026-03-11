import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateUser from "../hooks/use-update-user";
import UserForm from "./user-form";

export default function UpdateUser() {
  const { formik, isLoading, isInitialLoading, roles } = useUpdateUser();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? (
        <LoadingScreen message="Loading user details..." />
      ) : (
        <UserForm roles={roles} />
      )}
    </ExtendedForm>
  );
}
