import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateMembership from "../hooks/use-create-membership";
import MembershipForm from "./membership-form";

const CreateMembership = () => {
  const { formik, isLoading } = useCreateMembership();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <MembershipForm />
    </ExtendedForm>
  );
};
export default CreateMembership;
