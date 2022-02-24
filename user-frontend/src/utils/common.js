export const getOnboardingRedirectPage = (user) => {
  let redirect;
  if (!user.emailVerified) {
    redirect = '/onboarding/verify/email';
  } else if (!user.phone) {
    redirect = '/onboarding/enter/phone';
  } else if (!user.phoneVerified) {
    redirect = '/onboarding/verify/phone';
  } else if (!user.firstName) {
    redirect = '/onboarding/aboutyou';
  } else if (!user.interests) {
    redirect = '/onboarding/interests';
  } else if (!user.continents) {
    redirect = '/onboarding/continents';
  } else if (!user.city) {
    redirect = '/onboarding/location';
  } else if (!user.profilepic) {
    redirect = '/onboarding/upload/profilepic';
  } else if (!user.profilepicVerified) {
    redirect = '/onboarding/verify/profilepic/social';
  } else {
    redirect = '/home';
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
    setActiveGetAway
  }
) => {
  // If there are no interests, return early
  if (!userInterests) {
    return;
  }

  if (userInterests.includes('Arts & Culture')) {
    setArtAndCulture(true);
  }
  if (userInterests.includes('Burning Man')) {
    setBurningMan(true);
  }
  if (userInterests.includes('Camping')) {
    setCamping(true);
  }
  if (userInterests.includes('Cruises')) {
    setCruises(true);
  }
  if (userInterests.includes('Luxury Get-aways')) {
    setLuxuryGetAway(true);
  }
  if (userInterests.includes('Music Festivals')) {
    setMusicFestivals(true);
  }
  if (userInterests.includes('Nature & Outdoors')) {
    setNatureAndOutdoors(true);
  }
  if (userInterests.includes('Nudist Adventures')) {
    setNudistAdventures(true);
  }
  if (userInterests.includes('Pride Events')) {
    setPrideEvents(true);
  }
  if (userInterests.includes('Resort Vacations')) {
    setResortVacations(true);
  }
  if (userInterests.includes('Volunteering Trips')) {
    setVolunteeringTrips(true);
  }
  if (userInterests.includes('Wellness Retreats')) {
    setWellnessRetreats(true);
  }
  if (userInterests.includes('Wildlife')) {
    setWildlife(true);
  }
  if (userInterests.includes('Active Get-aways')) {
    setActiveGetAway(true);
  }
};

export const setContinentStates = (
  userContinents,
  { setNorthAmerica, setAfrica, setEurope, setAsia, setSouthCentralAmerica }
) => {
  // If there are no continents, return early
  if (!userContinents) {
    return;
  }

  if (userContinents.includes('North America')) {
    setNorthAmerica(true);
  }
  if (userContinents.includes('Africa')) {
    setAfrica(true);
  }
  if (userContinents.includes('Europe')) {
    setEurope(true);
  }
  if (userContinents.includes('Asia')) {
    setAsia(true);
  }
  if (userContinents.includes('South/Central America')) {
    setSouthCentralAmerica(true);
  }
};

export const setLocationState = (
  userCity,
  userState,
  userCountry,
  { setLocation }
) => {
  // If there are no continents, return early
  if (!userCity || !userState || !userCountry) {
    return;
  }
  setLocation(`${userCity}, ${userState}, ${userCountry}`);
};

export const parseLocationState = (place) => {
  const location = place.split(',');

  let city, state, country;
  if (location.length === 2) {
    // For locations with the format: Nairobi, Kenya
    [city, country] = place.split(',').map((loc) => loc.trim());
  } else if (location.length === 3) {
    // For locations with the format: San Francisco, CA, USA
    [city, state, country] = place.split(',').map((loc) => loc.trim());
  }

  return { city: city, state: state ? state : city, country: country };
};

export const parseInterestState = ({
  activeGetAway,
  artAndCulture,
  burningMan,
  camping,
  cruises,
  discharge,
  luxuryGetAway,
  musicFestivals,
  natureAndOutdoors,
  nudistAdventures,
  prideEvents,
  resortVacations,
  volunteeringTrips,
  wellnessRetreats,
  wildlife
}) => {
  const interests = [
    artAndCulture && 'Arts & Culture',
    burningMan && 'Burning Man',
    camping && 'Camping',
    cruises && 'Cruises',
    luxuryGetAway && 'Luxury Get-aways',
    musicFestivals && 'Music Festivals',
    natureAndOutdoors && 'Nature & Outdoors',
    nudistAdventures && 'Nudist Adventures',
    prideEvents && 'Pride Events',
    resortVacations && 'Resort Vacations',
    volunteeringTrips && 'Volunteering Trips',
    wellnessRetreats && 'Wellness Retreats',
    wildlife && 'Wildlife',
    activeGetAway && 'Active Get-aways'
  ].filter((value) => value !== false);

  return interests;
};
