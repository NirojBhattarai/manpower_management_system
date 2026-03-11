import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  User,
  GraduationCap,
  Languages,
  Briefcase,
  FileChartLine,
  FileImage,
  FolderCheck,
} from "lucide-react";

import PersonalDetailsTab from "./personal-details/personal-details";
import EducationInfoTab from "./eduaction-info/education-info";
import ExperienceInfoTab from "./experience-info/experience-info";
import SkillsTab from "./skills/skills";
import CertificateInfoTab from "./certificates-info/certificates-info";
import PersonalDocumentTab from "./personal-document/personal-document";
import AppliedJobTab from "./applied-job/applied-job";

import { useCandidateTab } from "../hooks/useCandidateTabs";
import { CandidateTab } from "../constants/constants";
import { TabFormActions } from "@/components/reusable-component/TabFormActions";
import ExtendedFormWithoutButton from "@/components/extended-components/ExtendedWithoutButton";
import { PATH } from "@/constant/path";

import { useUpdatePersonalDetails } from "./personal-details/hooks/use-update-personal-details";
import { useUpdateSkills } from "./skills/hooks/use-update-skills";
import useUpdateEducation from "./eduaction-info/hooks/use-update-education";
import useUpdateExperience from "./experience-info/hooks/use-update-experience";
import useUpdateCertificate from "./certificates-info/hooks/use-update-certificate";
import { useUpdatePersonalDocument } from "./personal-document/hooks/use-update-personal-documents";
import useUpdateApppliedJob from "./applied-job/hooks/use-update-applied-job";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

export default function UpdateCandidates() {
  const navigate = useNavigate();
  const { tab, setTab, getNextTab, getPreviousTab } = useCandidateTab();

  // Hooks for each tab
  const personalHook = useUpdatePersonalDetails();
  const skillsHook = useUpdateSkills();
  const educationHook = useUpdateEducation();
  const experienceHook = useUpdateExperience();
  const certificateHook = useUpdateCertificate();
  const personalDocumentHook = useUpdatePersonalDocument();
  const appliedJobHook = useUpdateApppliedJob();

  // Map tab → formik
  const tabFormikMap: Record<CandidateTab, any> = {
    "personal-details": personalHook.formik,
    "skill-and-languages": skillsHook.formik,
    education: educationHook.formik,
    experiences: experienceHook.formik,
    certificates: certificateHook.formik,
    "personal-document": personalDocumentHook.formik,
    "applied-job": appliedJobHook.formik,
  };

  const currentFormik = tabFormikMap[tab];

  const navigateTab = (nextTab: CandidateTab) => {
    if (nextTab === tab) return;
    setTab(nextTab);
  };

  const validateAndSubmitCurrentTab = async () => {
    await currentFormik.setTouched(
      Object.keys(currentFormik.values).reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
    );

    const errors = await currentFormik.validateForm();
    if (Object.keys(errors).length > 0) return false;

    await currentFormik.submitForm();
    return true;
  };

  const handleSaveAndNext = async () => {
    const isValid = await validateAndSubmitCurrentTab();
    if (!isValid) return;

    const next = getNextTab(tab);
    if (next) setTab(next);
  };

  const handleSaveAndExit = async () => {
    const isValid = await validateAndSubmitCurrentTab();
    if (!isValid) return;

    navigate(PATH.candidate.index);
  };

  const handleExit = () => navigate(PATH.candidate.index);

  const handleNext = () => {
    const next = getNextTab(tab);
    if (next) navigateTab(next);
  };

  const handlePrevious = () => {
    const previous = getPreviousTab(tab);
    if (previous) navigateTab(previous);
  };

  const actionsMap: Record<CandidateTab, any[]> = {
    "personal-details": [
      {
        label: "Previous",
        variant: "previous",
        disabled: true,
        onClick: () => {},
      },
      { label: "Cancel", variant: "cancel", onClick: handleExit },
      {
        label: "Save & Exit",
        variant: "button",
        onClick: handleSaveAndExit,
        loading: personalHook.isLoading,
        disabled: personalHook.isLoading,
      },
      {
        label: "Save & Next",
        variant: "button",
        onClick: handleSaveAndNext,
        loading: personalHook.isLoading,
        disabled: personalHook.isLoading,
      },
      { label: "Next", variant: "button", onClick: handleNext },
    ],
    "skill-and-languages": [
      { label: "Previous", variant: "previous", onClick: handlePrevious },
      { label: "Cancel", variant: "cancel", onClick: handleExit },
      {
        label: "Save & Exit",
        variant: "button",
        onClick: handleSaveAndExit,
        loading: skillsHook.isLoading,
        disabled: skillsHook.isLoading,
      },
      {
        label: "Save & Next",
        variant: "button",
        onClick: handleSaveAndNext,
        loading: skillsHook.isLoading,
        disabled: skillsHook.isLoading,
      },
      { label: "Next", variant: "button", onClick: handleNext },
    ],
    education: [
      { label: "Previous", variant: "previous", onClick: handlePrevious },
      { label: "Cancel", variant: "cancel", onClick: handleExit },
      { label: "Next", variant: "button", onClick: handleNext },
    ],
    experiences: [
      { label: "Previous", variant: "previous", onClick: handlePrevious },
      { label: "Cancel", variant: "cancel", onClick: handleExit },
      { label: "Next", variant: "button", onClick: handleNext },
    ],
    certificates: [
      { label: "Previous", variant: "previous", onClick: handlePrevious },
      { label: "Cancel", variant: "cancel", onClick: handleExit },
      { label: "Next", variant: "button", onClick: handleNext },
    ],
    "personal-document": [
      { label: "Previous", variant: "previous", onClick: handlePrevious },
      { label: "Cancel", variant: "cancel", onClick: handleExit },
      {
        label: "Save & Exit",
        variant: "button",
        onClick: handleSaveAndExit,
        loading: personalDocumentHook.isLoading,
        disabled: personalDocumentHook.isLoading,
      },
      {
        label: "Save & Next",
        variant: "button",
        onClick: handleSaveAndNext,
        loading: personalDocumentHook.isLoading,
        disabled: personalDocumentHook.isLoading,
      },
      { label: "Next", variant: "button", onClick: handleNext },
    ],
    "applied-job": [
      { label: "Previous", variant: "previous", onClick: handlePrevious },
      { label: "Exit", variant: "cancel", onClick: handleExit },
    ],
  };

  return (
    <div className="pr-1 overflow-y-scroll">
      <h1 className="mb-1 font-semibold text-xl">Update Candidate Profile</h1>
      <p className="mb-4 text-muted-foreground text-sm">
        Update candidate information step by step
      </p>

      <ExtendedFormWithoutButton formik={currentFormik}>
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as CandidateTab)}
        >
          <TabsList className="flex justify-between opacity-70 mb-4 border-b w-full">
            <TabsTrigger value="personal-details">
              <User className="mr-1 w-4 h-4" /> Personal Details
            </TabsTrigger>
            <TabsTrigger value="skill-and-languages">
              <Languages className="mr-1 w-4 h-4" /> Skills
            </TabsTrigger>
            <TabsTrigger value="education">
              <GraduationCap className="mr-1 w-4 h-4" /> Education
            </TabsTrigger>
            <TabsTrigger value="experiences">
              <Briefcase className="mr-1 w-4 h-4" /> Experience
            </TabsTrigger>
            <TabsTrigger value="certificates">
              <FileChartLine className="mr-1 w-4 h-4" /> Certificates
            </TabsTrigger>
            <TabsTrigger value="personal-document">
              <FileImage className="mr-1 w-4 h-4" /> Personal Documents
            </TabsTrigger>
            <TabsTrigger value="applied-job">
              <FolderCheck className="mr-1 w-4 h-4" /> Applied Job
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal-details" className="px-2">
            {personalHook.isInitialLoading ? (
              <LoadingScreen height="50vh" />
            ) : (
              <PersonalDetailsTab />
            )}
          </TabsContent>
          <TabsContent value="skill-and-languages" className="px-2">
            {skillsHook.isInitialLoading ? (
              <LoadingScreen height="50vh" />
            ) : (
              <SkillsTab />
            )}
          </TabsContent>
          <TabsContent value="education" className="px-2">
            <EducationInfoTab />
          </TabsContent>
          <TabsContent value="experiences" className="px-2">
            <ExperienceInfoTab />
          </TabsContent>
          <TabsContent value="certificates" className="px-2">
            <CertificateInfoTab />
          </TabsContent>
          <TabsContent value="personal-document" className="px-2">
            {personalDocumentHook.isInitialLoading ? (
              <LoadingScreen height="50vh" />
            ) : (
              <PersonalDocumentTab />
            )}
          </TabsContent>
          <TabsContent value="applied-job" className="px-2">
            <AppliedJobTab />
          </TabsContent>
        </Tabs>

        <TabFormActions actions={actionsMap[tab]} />
      </ExtendedFormWithoutButton>
    </div>
  );
}
