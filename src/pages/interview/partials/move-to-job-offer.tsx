import ModalWrapper from "@/components/shadcn/modal-wrapper";
import useMoveToJobOfferModal from "../hooks/use-move-to-job-offer-modal";
import ExtendedForm from "@/components/extended-components/ExtendedForm";
import FormInputDate from "@/components/form/form-input-date";
import useMoveToJobOffer from "../hooks/use-move-to-job-offer";
import { IInterviewScheduleListItem } from "../interface/interview-schedule-interface";

interface IMoveToJobOfferProps {
  selectedCandidates: IInterviewScheduleListItem[];
}
const MoveToJobOffer: React.FC<IMoveToJobOfferProps> = ({
  selectedCandidates,
}) => {
  const { isMoveToJobOfferOpen, handleCloseMoveToJobOffer } =
    useMoveToJobOfferModal();
  const { formik, isLoading } = useMoveToJobOffer({
    candidates: selectedCandidates,
  });
  return (
    <ModalWrapper
      name="Move interview candidate to job offer"
      description="This action will move the selected interview candidate to job offer"
      isOpen={isMoveToJobOfferOpen}
      onOpenChange={handleCloseMoveToJobOffer}
    >
      <ExtendedForm formik={formik} isSubmitting={isLoading}>
        <div className="gap-4 grid grid-cols-1">
          <FormInputDate label="Offer Date" name="offerDate" />
          <FormInputDate label="Joining Date" name="joiningDate" />
        </div>
      </ExtendedForm>
    </ModalWrapper>
  );
};
export default MoveToJobOffer;
