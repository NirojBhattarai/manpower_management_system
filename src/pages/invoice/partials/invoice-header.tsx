import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import { PATH } from "@/constant/path";
import { useNavigate } from "react-router-dom";

const InvoiceHeader = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Invoice" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={() => {
          navigate(PATH.invoice.create);
        }}
      />
    </div>
  );
};

export default InvoiceHeader;
