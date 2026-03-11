export const getApprovalStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "applied":
      return "bg-yellow-100 text-yellow-700";
    case "shortlisted":
      return "bg-green-100 text-green-700";
    default:
      return "bg-red-100 text-red-700";
  }
};

export const getInterviewStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "scheduled":
      return "bg-yellow-100 text-yellow-700";
    case "completed":
      return "bg-green-100 text-green-700";
    case "not scheduled":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-red-100 text-red-700";
  }
};

export const getInterviewResultColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "selected":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const getJobOfferStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "received":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const getMedicalStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "accepted":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const getOrientationStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "scheduled":
      return "bg-blue-100 text-blue-700";
    case "attended":
      return "bg-green-100 text-green-700";
    case "not-attended":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const getInsuranceStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "active":
      return "bg-green-100 text-green-700";
    case "inactive":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const getShramStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "approved":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const getFlightStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};
export const getFlagStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "moved":
      return "bg-green-100 text-green-700";
    case "not moved":
      return "bg-yellow-100 text-yellow-700";
  }
};

export const getChequeStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "deposited":
      return "bg-blue-100 text-blue-700";
    case "bounced":
      return "bg-rose-100 text-rose-700";
    case "cleared":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};
