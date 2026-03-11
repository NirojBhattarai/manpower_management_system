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

import { useCandidateTab } from "../hooks/useCandidateTabs";
import { CandidateTab } from "../constants/constants";
import { TabFormActions } from "@/components/reusable-component/TabFormActions";
import ExtendedFormWithoutButton from "@/components/extended-components/ExtendedWithoutButton";
import { PATH } from "@/constant/path";
import useCreatePersonalDetails from "./personal-details/hooks/use-create-personal-details";
import useCreateSkills from "./skills/hooks/use-create-skills";
import SkillsTab from "./skills/skills";
import CertificateInfoTab from "./certificates-info/certificates-info";
import useCreateEducation from "./eduaction-info/hooks/use-create-education";
import useCreateExperience from "./experience-info/hooks/use-create-experience";
import useCreateCertificate from "./certificates-info/hooks/use-create-certificate";
import useCreatePersonalDocument from "./personal-document/hooks/use-create-personal-document";
import PersonalDocumentTab from "./personal-document/personal-document";
import useCreateAppliedJob from "./applied-job/hooks/use-create-applied-job";
import AppliedJobTab from "./applied-job/applied-job";
import { clearCandidateDraft } from "../hooks/useCandidateDraftCleaner";

export default function CreateCandidates() {
  const navigate = useNavigate();
  const { tab, setTab, getNextTab, getPreviousTab } = useCandidateTab();

  const personalHook = useCreatePersonalDetails();
  const skillsHook = useCreateSkills();
  const educationHook = useCreateEducation();
  const experienceHook = useCreateExperience();
  const certificateHook = useCreateCertificate();
  const personalDocumentHook = useCreatePersonalDocument();
  const appliedJobHook = useCreateAppliedJob();

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
  const handleNext = async () => {
    const next = getNextTab(tab);
    if (next) setTab(next);
  };

  const handleSaveAndNext = async () => {
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
    if (Object.keys(errors).length > 0) return;

    await currentFormik.submitForm();

    const next = getNextTab(tab);
    if (next) setTab(next);
  };

  const handleSaveAndExit = async () => {
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
    if (Object.keys(errors).length > 0) return;

    await currentFormik.submitForm();

    clearCandidateDraft();
    navigate(PATH.candidate.index);
  };

  const handleExit = () => {
    clearCandidateDraft();
    navigate(PATH.candidate.index);
  };

  const actionsMap: Record<CandidateTab, any[]> = {
    "personal-details": [
      {
        label: "Previous",
        variant: "previous",
        disabled: true,
        onClick: () => {},
      },
      {
        label: "Cancel",
        variant: "cancel",
        onClick: handleExit,
      },
      {
        label: "Save & Exit",
        variant: "button",
        onClick: handleSaveAndExit,
        loading: personalHook.isPersonalDetailsLoading,
        disabled: personalHook.isPersonalDetailsLoading,
      },
      {
        label: "Save & Next",
        variant: "button",
        onClick: handleSaveAndNext,
        loading: personalHook.isPersonalDetailsLoading,
        disabled: personalHook.isPersonalDetailsLoading,
      },
    ],
    "skill-and-languages": [
      {
        label: "Previous",
        variant: "previous",
        onClick: () => {
          const previous = getPreviousTab(tab);
          if (previous) setTab(previous);
        },
      },
      {
        label: "Cancel",
        variant: "cancel",
        onClick: handleExit,
      },
      {
        label: "Save & Exit",
        variant: "button",
        onClick: handleSaveAndExit,
        loading: skillsHook.isSkillsLoading,
        disabled: skillsHook.isSkillsLoading,
      },
      {
        label: "Save & Next",
        variant: "button",
        onClick: handleSaveAndNext,
        loading: skillsHook.isSkillsLoading,
        disbaled: skillsHook.isSkillsLoading,
      },
      {
        label: "Next",
        variant: "button",
        onClick: handleNext,
      },
    ],
    education: [
      {
        label: "Previous",
        variant: "previous",
        onClick: () => {
          const previous = getPreviousTab(tab);
          if (previous) setTab(previous);
        },
      },
      {
        label: "Cancel",
        variant: "cancel",
        onClick: handleExit,
      },
      {
        label: "Next",
        variant: "button",
        onClick: handleNext,
      },
    ],
    experiences: [
      {
        label: "Previous",
        variant: "previous",
        onClick: () => {
          const previous = getPreviousTab(tab);
          if (previous) setTab(previous);
        },
      },
      {
        label: "Cancel",
        variant: "cancel",
        onClick: handleExit,
      },
      {
        label: "Next",
        variant: "button",
        onClick: handleNext,
      },
    ],
    certificates: [
      {
        label: "Previous",
        variant: "previous",
        onClick: () => {
          const previous = getPreviousTab(tab);
          if (previous) setTab(previous);
        },
      },
      {
        label: "Cancel",
        variant: "cancel",
        onClick: handleExit,
      },
      {
        label: "Next",
        variant: "button",
        onClick: handleNext,
      },
    ],
    "personal-document": [
      {
        label: "Previous",
        variant: "previous",
        onClick: () => {
          const previous = getPreviousTab(tab);
          if (previous) setTab(previous);
        },
      },
      {
        label: "Cancel",
        variant: "cancel",
        onClick: handleExit,
      },
      {
        label: "Save & Exit",
        variant: "button",
        onClick: handleSaveAndExit,
        loading: personalDocumentHook.isPersonalDocumentLoading,
        disabled: personalDocumentHook.isPersonalDocumentLoading,
      },
      {
        label: "Save & Next",
        variant: "button",
        onClick: handleSaveAndNext,
        loading: personalDocumentHook.isPersonalDocumentLoading,
        disbaled: personalDocumentHook.isPersonalDocumentLoading,
      },
      {
        label: "Next",
        variant: "button",
        onClick: handleNext,
      },
    ],
    "applied-job": [
      {
        label: "Previous",
        variant: "previous",
        onClick: () => {
          const previous = getPreviousTab(tab);
          if (previous) setTab(previous);
        },
      },
      {
        label: "Exit",
        variant: "cancel",
        onClick: handleExit,
      },
    ],
  };

  return (
    <div className="pr-1 overflow-y-scroll">
      <h1 className="mb-1 font-semibold text-xl">Create Candidate Profile</h1>
      <p className="mb-4 text-muted-foreground text-sm">
        Fill candidate information step by step
      </p>

      <ExtendedFormWithoutButton formik={currentFormik}>
        <Tabs
          value={tab}
          onValueChange={async () => {
            await currentFormik.submitForm();
            if (!currentFormik?.isValid) return;

            const next = getNextTab(tab);
            if (next) setTab(next);
          }}
        >
          <TabsList className="flex justify-between opacity-70 mb-4 border-b w-full pointer-events-none">
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
            <PersonalDetailsTab />
          </TabsContent>
          <TabsContent value="skill-and-languages" className="px-2">
            <SkillsTab />
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
            <PersonalDocumentTab />
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
