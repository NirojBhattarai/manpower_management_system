import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ModalWrapper from "@/components/shadcn/modal-wrapper";
import useMedicalToVisaModal from "../hooks/use-medical-to-visa-modal";
import useMedicalToVisa from "../hooks/use-medical-to-visa";
import FormInputDate from "@/components/form/form-input-date";
import { IMedicalListItem } from "../interface/medical-interface";

interface IMedicalToVisaProps {
  selectedCandidates: IMedicalListItem[];
}
const MedicalToVisa: React.FC<IMedicalToVisaProps> = ({
  selectedCandidates,
}) => {
  const { handleCloseMedicalToVisa, isMedicalToVisaOpen } =
    useMedicalToVisaModal();
  const { formik, isLoading } = useMedicalToVisa({
    candidates: selectedCandidates,
  });
  return (
    <ModalWrapper
      className="xl:max-w-2xl"
      name="Move medical candidate to visa"
      description="This will move the selected medical candidate to visa"
      isOpen={isMedicalToVisaOpen}
      onOpenChange={handleCloseMedicalToVisa}
    >
      <ExtendedForm formik={formik} isSubmitting={isLoading}>
        <div className="gap-4 grid grid-cols-1">
          <FormInputDate label="Application Date" name="applicationDate" />
        </div>
      </ExtendedForm>
    </ModalWrapper>
  );
};

export default MedicalToVisa;
