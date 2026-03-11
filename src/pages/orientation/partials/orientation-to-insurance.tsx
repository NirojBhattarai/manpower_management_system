import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ModalWrapper from "@/components/shadcn/modal-wrapper";
import useOrientationToInsurance from "../hooks/use-orientation-to-insurance";
import useOrientationToShramModal from "../hooks/use-orientation-to-insurance-modal";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import { endpoints } from "@/api/endpoints";
import { IOrientationListItem } from "../interface/orientation-interface";

interface IOrientationToInsuranceProps {
  selectedCandidates: IOrientationListItem[];
}
const OrientationToInsurance: React.FC<IOrientationToInsuranceProps> = ({
  selectedCandidates,
}) => {
  const { isOrientationToInsurance, handleCloseOrientationToInsurance } =
    useOrientationToShramModal();
  const { formik, isLoading } = useOrientationToInsurance({
    candidates: selectedCandidates,
  });
  return (
    <ModalWrapper
      className="xl:max-w-2xl"
      name="Move orientation candidate to insurance"
      description="This will move the selected orientation candidate to insurance"
      isOpen={isOrientationToInsurance}
      onOpenChange={handleCloseOrientationToInsurance}
    >
      <ExtendedForm formik={formik} isSubmitting={isLoading}>
        <div className="xl:max-w-2xl">
          <FormAsyncInputSelect
            fetchUrl={endpoints.insuranceCompany.list}
            label="Insurance Institute"
            name="insuranceCompany"
            labelKey="name"
            valueKey="id"
          />
        </div>
      </ExtendedForm>
    </ModalWrapper>
  );
};

export default OrientationToInsurance;
