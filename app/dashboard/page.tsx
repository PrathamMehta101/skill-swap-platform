import { getUserDetails, getUserSkills } from "../actions/user.actions";
import OnboardingForm from "./_components/OnboardingForm";

async function page() {
  const existingSkills = await getUserSkills();

  const details = await getUserDetails();

  return (
    <div>
      <OnboardingForm existingSkills={existingSkills} details={details} />
    </div>
  );
}
export default page;
