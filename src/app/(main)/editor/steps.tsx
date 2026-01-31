import { EditorFormProps } from "@/src/components/Shared/type";
import GeneralInfoForms from "./forms/generalInfoForms";
import PersonalInfoForm from "./forms/personalInfoForm";
import EducationForm from "./forms/educationForm";
import WorkExperienceForm from "./forms/workExperienceFrom";
import SkillForm from "./forms/skillForm";
import SummaryForm from "./forms/summaryForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General Info", component: GeneralInfoForms, key: "general-info" },
  {
    title: "Personal Info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Education",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Skill",
    component: SkillForm,
    key: "skill",
  },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
