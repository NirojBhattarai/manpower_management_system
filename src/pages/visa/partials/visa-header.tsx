import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import useVisaToOrientationModal from "../hooks/use-visa-to-orientation-modal";

const VisaHeader = () => {
  const { handleOpenVisaToOrientation } = useVisaToOrientationModal();
  return (
    <div>
      <PageHeader title="Visa" />
      <SearchFilter
        dateFilter={false}
        moveToModule={{
          moduleName: "Orientation",
          handleClick: handleOpenVisaToOrientation,
        }}
      />
    </div>
  );
};

export default VisaHeader;
