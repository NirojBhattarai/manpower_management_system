import useQuerryParams from "@/hooks/use-query-params";

const ORIENTATION_TO_INSURANCE_PARAMS = "orientation-to-insurance";
const useOrientationToInsuranceModal = () => {
  const { updateQueryParams, deleteQueryParams, getQueryParams } =
    useQuerryParams();
  const isOrientationToInsurance = !!getQueryParams(
    ORIENTATION_TO_INSURANCE_PARAMS,
  );
  const handleOpenOrientationToInsurance = () => {
    updateQueryParams({ [ORIENTATION_TO_INSURANCE_PARAMS]: "active" });
  };
  const handleCloseOrientationToInsurance = () => {
    deleteQueryParams([ORIENTATION_TO_INSURANCE_PARAMS]);
  };
  return {
    isOrientationToInsurance,
    handleOpenOrientationToInsurance,
    handleCloseOrientationToInsurance,
  };
};
export default useOrientationToInsuranceModal;
