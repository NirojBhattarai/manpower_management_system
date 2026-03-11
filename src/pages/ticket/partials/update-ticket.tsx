import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateTicket from "../hooks/use-update-ticket";
import TicketForm from "./ticket-form";

const UpdateTicket = () => {
  const { formik, isInitialLoading, isLoading } = useUpdateTicket();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <TicketForm />}
    </ExtendedForm>
  );
};

export default UpdateTicket;
