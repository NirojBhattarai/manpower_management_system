import PageHeader from "@/common/PageHeader";
import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useUpdateQuickPayment from "./hooks/use-update-quick-payment";
import QuickPaymentForm from "../../partials/quick-payment-form";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const UpdateQuickPayment = () => {
  const quickPayment = useUpdateQuickPayment();
  return (
    <div className="u-flex-child">
      <PageHeader title="Update Quick Payment" />
      <ExtendedForm
        formik={quickPayment.formik}
        isSubmitting={quickPayment.isLoading}
        className="mt-4"
      >
        {quickPayment.isInitialLoading ? (
          <LoadingScreen />
        ) : (
          <QuickPaymentForm />
        )}
      </ExtendedForm>
    </div>
  );
};

export default UpdateQuickPayment;
