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
  return redirect;
};

export const setInterestStates = (
  userInterests,
  {
    setArtAndCulture,
    setBurningMan,
    setCamping,
    setCruises,
    setLuxuryGetAway,
    setMusicFestivals,
    setNatureAndOutdoors,
    setNudistAdventures,
    setPrideEvents,
    setResortVacations,
    setVolunteeringTrips,
    setWellnessRetreats,
    setWildlife,
    setActiveGetAway,
  }
) => {
  // If there are no interests, return early
  if (!userInterests) {
    return;
  }

  if (userInterests.includes("Arts & Culture")) {
    setArtAndCulture(true);
  }
  if (userInterests.includes("Burning Man")) {
    setBurningMan(true);
  }
  if (userInterests.includes("Camping")) {
    setCamping(true);
  }
  if (userInterests.includes("Cruises")) {
    setCruises(true);
  }
  if (userInterests.includes("Luxury Get-aways")) {
    setLuxuryGetAway(true);
  }
  if (userInterests.includes("Music Festivals")) {
    setMusicFestivals(true);
  }
  if (userInterests.includes("Nature & Outdoors")) {
    setNatureAndOutdoors(true);
  }
  if (userInterests.includes("Nudist Adventures")) {
    setNudistAdventures(true);
  }
  if (userInterests.includes("Pride Events")) {
    setPrideEvents(true);
  }
  if (userInterests.includes("Resort Vacations")) {
    setResortVacations(true);
  }
  if (userInterests.includes("Volunteering Trips")) {
    setVolunteeringTrips(true);
  }
  if (userInterests.includes("Wellness Retreats")) {
    setWellnessRetreats(true);
  }
  if (userInterests.includes("Wildlife")) {
    setWildlife(true);
  }
  if (userInterests.includes("Active Get-aways")) {
    setActiveGetAway(true);
  }
};
