import useQuerryParams from "@/hooks/use-query-params";

const JOB_OFFER_TO_MEDICAL_PARAMS = "move-job-offer-to-medical";
const useJobOfferToMedicalModal = () => {
  const { deleteQueryParams, getQueryParams, updateQueryParams } =
    useQuerryParams();
  const isJobOfferToMedicalOpen = !!getQueryParams(JOB_OFFER_TO_MEDICAL_PARAMS);

  const handleOpenJobOfferToMedical = () => {
    updateQueryParams({ [JOB_OFFER_TO_MEDICAL_PARAMS]: "active" });
  };
  const handleCloseJobOfferToMedical = () => {
    deleteQueryParams([JOB_OFFER_TO_MEDICAL_PARAMS]);
  };
  return {
    isJobOfferToMedicalOpen,
    handleOpenJobOfferToMedical,
    handleCloseJobOfferToMedical,
  };
};

export default useJobOfferToMedicalModal;
