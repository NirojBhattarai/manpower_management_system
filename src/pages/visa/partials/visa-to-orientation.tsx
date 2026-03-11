import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ModalWrapper from "@/components/shadcn/modal-wrapper";
import useVisaToOrientationModal from "../hooks/use-visa-to-orientation-modal";
import useVisaToOrientation from "../hooks/use-visa-to-orientation";
import FormInputDate from "@/components/form/form-input-date";
import { IVisaListItem } from "../interface/visa-interface";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import { endpoints } from "@/api/endpoints";

interface IVistaToOrientationProps {
  selectedCandidates: IVisaListItem[];
}
const VisaToOrientation: React.FC<IVistaToOrientationProps> = ({
  selectedCandidates,
}) => {
  const { isVisaToOrientation, handleCloseVisaToOrientation } =
    useVisaToOrientationModal();
  const { formik, isLoading } = useVisaToOrientation({
    candidates: selectedCandidates,
  });
  console.log(formik.errors, "Formik errors");
  return (
    <ModalWrapper
      className="xl:max-w-2xl"
      name="Move visa candidate to orientation"
      description="This will move the selected visa candidate to orientation"
      isOpen={isVisaToOrientation}
      onOpenChange={handleCloseVisaToOrientation}
    >
      <ExtendedForm formik={formik} isSubmitting={isLoading}>
        <div className="gap-4 grid grid-cols-1 xl:max-w-2xl">
          <FormAsyncInputSelect
            fetchUrl={endpoints.orientationInstitute.list}
            label="Orientation Institute"
            name="instituteName"
            labelKey="name"
            valueKey="id"
          />
          <FormInputDate label="Orientation Date" name="orientationDate" />
        </div>
      </ExtendedForm>
    </ModalWrapper>
  );
};

export default VisaToOrientation;
