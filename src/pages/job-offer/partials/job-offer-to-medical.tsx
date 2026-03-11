import ModalWrapper from "@/components/shadcn/modal-wrapper";
import useJobOfferToMedical from "../hooks/use-job-offer-to-medical";
import useJobOfferToMedicalModal from "../hooks/use-job-offer-to-medical-modal";
import ExtendedForm from "@/components/extended-components/ExtendedForm";
import { IJobOfferListItem } from "../interface/job-offer-interface";
import FormInputDate from "@/components/form/form-input-date";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import { endpoints } from "@/api/endpoints";

interface IJobOfferToMedicalProps {
  selectedCandidates: IJobOfferListItem[];
}
const JobOfferToMedical: React.FC<IJobOfferToMedicalProps> = ({
  selectedCandidates,
}) => {
  const { isJobOfferToMedicalOpen, handleCloseJobOfferToMedical } =
    useJobOfferToMedicalModal();
  const { formik, isLoading } = useJobOfferToMedical({
    candidates: selectedCandidates,
  });

  return (
    <ModalWrapper
      className="xl:max-w-2xl"
      name="Move candidate to medical"
      description="This will move the selected job offered candidate to medical"
      isOpen={isJobOfferToMedicalOpen}
      onOpenChange={handleCloseJobOfferToMedical}
    >
      <ExtendedForm formik={formik} isSubmitting={isLoading}>
        <div className="gap-4 grid grid-cols-1">
          <FormAsyncInputSelect
            fetchUrl={endpoints.medicalInstitute.list}
            label="Medical Institute"
            name="hospital"
            labelKey="name"
            valueKey="id"
          />
          <FormInputDate
            label="Medical Examination Date"
            name="examDate"
            placeholder="Select Medical Examination Date"
          />
        </div>
      </ExtendedForm>
    </ModalWrapper>
  );
};
export default JobOfferToMedical;
