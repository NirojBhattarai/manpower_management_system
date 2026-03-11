import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateMembership from "../hooks/use-update-membership";
import MembershipForm from "./membership-form";

const UpdateMembership = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateMembership();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <MembershipForm />}
    </ExtendedForm>
  );
};

export default UpdateMembership;
