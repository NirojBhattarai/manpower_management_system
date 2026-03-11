import ExtendedForm from "@/components/extended-components/ExtendedForm";
import UserForm from "./user-form";
import useCreateUser from "../hooks/use-create-user";

export default function CreateUser() {
  const { formik, isLoading, roles } = useCreateUser();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <UserForm roles={roles} />
    </ExtendedForm>
  );
}
