export const CANDIDATE_TABS = [
  "personal-details",
  "skill-and-languages",
  "education",
  "experiences",
  "certificates",
  "personal-document",
  "applied-job",
] as const;

export type CandidateTab = (typeof CANDIDATE_TABS)[number];
