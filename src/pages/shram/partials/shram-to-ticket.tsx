import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ModalWrapper from "@/components/shadcn/modal-wrapper";
import useShramToTicket from "../hooks/use-shram-to-ticket";
import useShramToTicketModal from "../hooks/use-shram-to-ticket-modal";
import FormInputText from "@/components/form/FormInputText";
import FormInputDate from "@/components/form/form-input-date";
import { IShramListItem } from "../interface/shram-interface";

interface IShramToTicketProps {
  selectedCandidates: IShramListItem[];
}
const ShramToTicket: React.FC<IShramToTicketProps> = ({
  selectedCandidates,
}) => {
  const { isShramToTicket, handleCloseShramToTicket } = useShramToTicketModal();

  const { formik, isLoading } = useShramToTicket({
    candidates: selectedCandidates,
  });

  return (
    <ModalWrapper
      className="xl:max-w-2xl"
      name="Move shram candidate to ticket"
      description="This will move the selected shram candidate to ticket"
      isOpen={isShramToTicket}
      onOpenChange={handleCloseShramToTicket}
    >
      <ExtendedForm formik={formik} isSubmitting={isLoading}>
        <div className="space-y-2 xl:max-w-2xl">
          <FormInputText label="Airline Name" name="airlineName" />
          <FormInputText label="Flight Number" name="flightNumber" />
          <FormInputDate label="Departure Date" name="departureDate" />
        </div>
      </ExtendedForm>
    </ModalWrapper>
  );
};

export default ShramToTicket;
