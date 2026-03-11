import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import { PATH } from "@/constant/path";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ExpenseHeader() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <PageHeader title="Expense" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={() => {
          navigate(PATH.accounting.purchase.expense.create);
        }}
      />
    </React.Fragment>
  );
}
