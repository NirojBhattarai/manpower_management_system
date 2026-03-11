import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import useMedicalToVisaModal from "../hooks/use-medical-to-visa-modal";

const MedicalHeader = () => {
  const { handleOpenMedicalToVisa } = useMedicalToVisaModal();
  return (
    <div>
      <PageHeader title="Medical" />
      <SearchFilter
        dateFilter={false}
        selectFilter={[
          {
            placeholder: "Select Visa Stage",
            option: [
              { label: "Moved to Visa", value: "true" },
              { label: "Still in Medical", value: "false" },
            ],
            paramsKey: "moved-to-visa-filter",
          },
        ]}
        moveToModule={{
          moduleName: "visa",
          handleClick: handleOpenMedicalToVisa,
        }}
      />
    </div>
  );
};

export default MedicalHeader;
