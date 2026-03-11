import { useState } from "react";

export interface IChequeRegisterListItem {
  id: string;
  date: string;
  cheque_no: string;
  account: string;
  bank: string;
  amount: string;
}

export default function useChequeRegisterList() {
  const [rowSelection, setRowSelection] = useState({});
  return { rowSelection, setRowSelection };
}
