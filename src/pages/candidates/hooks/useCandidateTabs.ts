import { useSearchParams } from "react-router-dom";
import { CANDIDATE_TABS, CandidateTab } from "../constants/constants";

export const useCandidateTab = () => {
  const [params, setParams] = useSearchParams();

  const tab = (params.get("tab") as CandidateTab) ?? "personal-details";

  const setTab = (nextTab: CandidateTab) => {
    setParams({ tab: nextTab }, { replace: true });
  };

  const getNextTab = (current: CandidateTab): CandidateTab | null => {
    const idx = CANDIDATE_TABS.indexOf(current);
    return CANDIDATE_TABS[idx + 1] ?? null;
  };

  const getPreviousTab = (current: CandidateTab): CandidateTab | null => {
    const idx = CANDIDATE_TABS.indexOf(current);
    return CANDIDATE_TABS[idx - 1] ?? null;
  };

  return { tab, setTab, getNextTab, getPreviousTab };
};
