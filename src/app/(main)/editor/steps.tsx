import { EditorFormProps } from "@/src/components/Shared/type";
import GeneralInfoForms from "./forms/generalInfoForms";
import PersonalInfoForm from "./forms/personalInfoForm";

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
];
