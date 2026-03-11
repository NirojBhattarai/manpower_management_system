import useQuerryParams from "@/hooks/use-query-params";

const JOB_OFFER_TO_MEDICAL_PARAMS = "move-job-offer-to-medical";

const useMedicalToVisaModal = () => {
  const { deleteQueryParams, getQueryParams, updateQueryParams } =
    useQuerryParams();
  const isMedicalToVisaOpen = !!getQueryParams(JOB_OFFER_TO_MEDICAL_PARAMS);

  const handleOpenMedicalToVisa = () => {
    updateQueryParams({ [JOB_OFFER_TO_MEDICAL_PARAMS]: "active" });
  };
  const handleCloseMedicalToVisa = () => {
    deleteQueryParams([JOB_OFFER_TO_MEDICAL_PARAMS]);
  };

  return {
    isMedicalToVisaOpen,
    handleOpenMedicalToVisa,
    handleCloseMedicalToVisa,
  };
};
export default useMedicalToVisaModal;
