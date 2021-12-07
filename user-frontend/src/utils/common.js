export const getOnboardingRedirectPage = (user) => {
  console.log("this ran");
  let redirect;
  if (!user.emailVerified) {
    redirect = "/onboarding/verify/email";
  } else if (!user.phone) {
    redirect = "/onboarding/enter/phone";
  } else if (!user.phoneVerified) {
    redirect = "/onboarding/verify/phone";
  } else if (!user.firstName) {
    redirect = "/onboarding/aboutyou";
  } else if (!user.interests) {
    redirect = "/onboarding/interests";
  } else if (!user.continents) {
    redirect = "/onboarding/continents";
  } else if (!user.city) {
    redirect = "/onboarding/location";
  } else if (!user.profilepic) {
    redirect = "/onboarding/upload/profilepic";
  } else if (!user.profilepicVerified) {
    redirect = "/onboarding/verify/profilepic/social";
  } else {
    redirect = "/home";
  }
  console.log("redirect value is", redirect);
  return redirect;
};
