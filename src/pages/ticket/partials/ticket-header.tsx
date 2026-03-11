import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";

const TicketHeader = () => {
  return (
    <div>
      {" "}
      <PageHeader title="Ticket" />
      <SearchFilter dateFilter={false} />
    </div>
  );
};

export default TicketHeader;
