import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './Filter.module.css';
import { InterestsToIconMapper } from '../../utils/common';

export default function Filter() {
  const [travellingToOpen, setTravellingToOpen] = useState(false);
  const [travelInterestsOpen, setTravelInterestsOpen] = useState(false);

  // state for "Travelling to" filter options
  const [travellingToFilterDisplayName, setTravellingToFilterDisplayName] =
    useState('Travelling to');
  const [africaSelected, setAfricaSelected] = useState(false);
  const [europeSelected, setEuropeSelected] = useState(false);
  const [northAmericaSelected, setNorthAmericaSelected] = useState(false);
  const [southAmericaSelected, setSouthAmericaSelected] = useState(false);
  const [australiaSelected, setAustraliaSelected] = useState(false);
  const [asiaSelected, setAsiaSelected] = useState(false);

  // state for "Travel interests" filter options
  const [
    travelInterestsFilterDisplayName,
    setTravelInterestsFilterDisplayName
  ] = useState('Travel interests');
  const [artAndCulture, setArtAndCulture] = useState(false);
  const [burningMan, setBurningMan] = useState(false);
  const [camping, setCamping] = useState(false);
  const [cruises, setCruises] = useState(false);
  const [luxuryGetAway, setLuxuryGetAway] = useState(false);
  const [musicFestivals, setMusicFestivals] = useState(false);
  const [natureAndOutdoors, setNatureAndOutdoors] = useState(false);
  const [nudistAdventures, setNudistAdventures] = useState(false);
  const [prideEvents, setPrideEvents] = useState(false);
  const [resortVacations, setResortVacations] = useState(false);
  const [volunteeringTrips, setVolunteeringTrips] = useState(false);
  const [wellnessRetreats, setWellnessRetreats] = useState(false);
  const [wildlife, setWildlife] = useState(false);
  const [activeGetAway, setActiveGetAway] = useState(false);

  // In this useEffect we handle the display name for the Travelling to
  // filter.
  useEffect(() => {
    let filterSelected = '';
    let numFiltersSelected = 0;

    if (activeGetAway) {
      filterSelected = 'Active Get-aways';
      numFiltersSelected++;
    }
    if (wildlife) {
      filterSelected = 'Wildlife';
      numFiltersSelected++;
    }
    if (wellnessRetreats) {
      filterSelected = 'Wellness Retreats';
      numFiltersSelected++;
    }
    if (volunteeringTrips) {
      filterSelected = 'Volunteering Trips';
      numFiltersSelected++;
    }
    if (resortVacations) {
      filterSelected = 'Resort Vacations';
      numFiltersSelected++;
    }
    if (prideEvents) {
      filterSelected = 'Pride events';
      numFiltersSelected++;
    }
    if (nudistAdventures) {
      filterSelected = 'Nudist Adventures';
      numFiltersSelected++;
    }
    if (natureAndOutdoors) {
      filterSelected = 'Nature & Outdoors';
      numFiltersSelected++;
    }
    if (musicFestivals) {
      filterSelected = 'Music Festivals';
      numFiltersSelected++;
    }
    if (luxuryGetAway) {
      filterSelected = 'Luxury Get-aways';
      numFiltersSelected++;
    }
    if (cruises) {
      filterSelected = 'Cruises';
      numFiltersSelected++;
    }
    if (camping) {
      filterSelected = 'Camping';
      numFiltersSelected++;
    }
    if (burningMan) {
      filterSelected = 'Burning Man';
      numFiltersSelected++;
    }
    if (artAndCulture) {
      filterSelected = 'Arts & Culture';
      numFiltersSelected++;
    }

    if (filterSelected && numFiltersSelected) {
      setTravelInterestsFilterDisplayName(
        `${filterSelected}${
          numFiltersSelected > 1 ? ` +${numFiltersSelected - 1}` : ''
        }`
      );
    } else {
      setTravelInterestsFilterDisplayName('Travel interests');
    }
  }, [
    artAndCulture,
    burningMan,
    camping,
    cruises,
    luxuryGetAway,
    musicFestivals,
    natureAndOutdoors,
    nudistAdventures,
    prideEvents,
    resortVacations,
    volunteeringTrips,
    wellnessRetreats,
    wildlife,
    activeGetAway
  ]);

  // In this useEffect we handle the display name for the Travel
  // interestes to filter.
  useEffect(() => {
    let filterSelected = '';
    let numFiltersSelected = 0;

    if (asiaSelected) {
      filterSelected = 'Afria';
    }
    if (australiaSelected) {
      filterSelected = 'Australia';
      numFiltersSelected++;
    }
    if (southAmericaSelected) {
      filterSelected = 'South/Central America';
      numFiltersSelected++;
    }
    if (northAmericaSelected) {
      filterSelected = 'North America';
      numFiltersSelected++;
    }
    if (europeSelected) {
      filterSelected = 'Europe';
      numFiltersSelected++;
    }
    if (africaSelected) {
      filterSelected = 'Africa';
      numFiltersSelected++;
    }

    if (filterSelected && numFiltersSelected) {
      setTravellingToFilterDisplayName(
        `${filterSelected}${
          numFiltersSelected > 1 ? ` +${numFiltersSelected - 1}` : ''
        }`
      );
    } else {
      setTravellingToFilterDisplayName('Travelling to');
    }
  }, [
    asiaSelected,
    australiaSelected,
    southAmericaSelected,
    northAmericaSelected,
    europeSelected,
    africaSelected
  ]);

  const handleClearAllTravelToFilters = () => {
    setAfricaSelected(false);
    setEuropeSelected(false);
    setNorthAmericaSelected(false);
    setSouthAmericaSelected(false);
    setAustraliaSelected(false);
    setAsiaSelected(false);
  };

  return (
    <div className={`flex-box space-between`}>
      <p className={styles.filter_text}>Filter by: </p>
      <div>
        <input
          className={`${styles.input} ${styles.name_input}`}
          placeholder="Name..."
        ></input>
      </div>
      <div>
        <button
          className={`btn ${styles.button}`}
          onClick={() => setTravelInterestsOpen(true)}
        >
          {travelInterestsFilterDisplayName}
        </button>
        {travelInterestsOpen && (
          <div className="modal-wrapper">
            <Modal setIsOpen={setTravelInterestsOpen}>
              <div className={styles.modal_children}>
                <h3>Travel Interests:</h3>
                <ul className={styles.list}>
                  <li className={styles.list_item}>
                    <input
                      checked={artAndCulture}
                      onChange={(e) =>
                        setArtAndCulture((artAndCulture) => !artAndCulture)
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Arts & Culure']}
                      alt="icon"
                    />
                    <label>Arts & Culture</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={burningMan}
                      onChange={(e) =>
                        setBurningMan((burningMan) => !burningMan)
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Burning Man']}
                      alt="icon"
                    />
                    <label>Burning Man</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={camping}
                      onChange={(e) => setCamping((camping) => !camping)}
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Camping']}
                      alt="icon"
                    />
                    <label>Camping</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={cruises}
                      onChange={(e) => setCruises((cruises) => !cruises)}
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Cruises']}
                      alt="icon"
                    />
                    <label>Cruises</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={luxuryGetAway}
                      onChange={(e) =>
                        setLuxuryGetAway((luxuryGetAway) => !luxuryGetAway)
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Luxury Get-aways']}
                      alt="icon"
                    />
                    <label>Luxury Get-aways</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={musicFestivals}
                      onChange={(e) =>
                        setMusicFestivals((musicFestivals) => !musicFestivals)
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Music Festivals']}
                      alt="icon"
                    />
                    <label>Music Festivals</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={natureAndOutdoors}
                      onChange={(e) =>
                        setNatureAndOutdoors(
                          (natureAndOutdoors) => !natureAndOutdoors
                        )
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Nature & Outdoors']}
                      alt="icon"
                    />
                    <label>Nature & Outdoors</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={nudistAdventures}
                      onChange={(e) =>
                        setNudistAdventures(
                          (nudistAdventures) => !nudistAdventures
                        )
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Nudist Adventures']}
                      alt="icon"
                    />
                    <label>Nudist Adventures</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={prideEvents}
                      onChange={(e) =>
                        setPrideEvents((prideEvents) => !prideEvents)
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Pride events']}
                      alt="icon"
                    />
                    <label>Pride events</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={resortVacations}
                      onChange={(e) =>
                        setResortVacations(
                          (resortVacations) => !resortVacations
                        )
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Resort Vacations']}
                      alt="icon"
                    />
                    <label>Resort Vacations</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={volunteeringTrips}
                      onChange={(e) =>
                        setVolunteeringTrips(
                          (volunteeringTrips) => !volunteeringTrips
                        )
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Volunteering Trips']}
                      alt="icon"
                    />
                    <label>Volunteering Trips</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={wellnessRetreats}
                      onChange={(e) =>
                        setWellnessRetreats(
                          (wellnessRetreats) => !wellnessRetreats
                        )
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Wellness Retreats']}
                      alt="icon"
                    />
                    <label>Wellness Retreats</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={wildlife}
                      onChange={(e) => setWildlife((wildlife) => !wildlife)}
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Wildlife']}
                      alt="icon"
                    />
                    <label>Wildlife</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={activeGetAway}
                      onChange={(e) =>
                        setActiveGetAway((activeGetAway) => !activeGetAway)
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <img
                      className={styles.interest_image}
                      src={InterestsToIconMapper['Active Get-aways']}
                      alt="icon"
                    />
                    <label>Active Get-aways</label>
                  </li>
                </ul>
                <div className="flex-box space-between">
                  <button
                    className="btn"
                    onClick={handleClearAllTravelToFilters}
                  >
                    Clear All
                  </button>
                  <button
                    className="btn modal-button blue"
                    onClick={() => setTravelInterestsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
      <div>
        <button
          className={`btn ${styles.button}`}
          onClick={() => setTravellingToOpen(true)}
        >
          {travellingToFilterDisplayName}
        </button>
        {travellingToOpen && (
          <div className="modal-wrapper">
            <Modal setIsOpen={setTravellingToOpen}>
              <div className={styles.modal_children}>
                <h3>Travelling to:</h3>
                <ul className={styles.list}>
                  <li className={styles.list_item}>
                    <input
                      checked={africaSelected}
                      onChange={(e) =>
                        setAfricaSelected((africaSelected) => !africaSelected)
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <label>Africa</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={europeSelected}
                      onChange={(e) =>
                        setEuropeSelected((europeSelected) => !europeSelected)
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <label>Europe</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={northAmericaSelected}
                      onChange={(e) =>
                        setNorthAmericaSelected(
                          (northAmericaSelected) => !northAmericaSelected
                        )
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <label>North America</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={southAmericaSelected}
                      onChange={(e) =>
                        setSouthAmericaSelected(
                          (southAmericaSelected) => !southAmericaSelected
                        )
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <label>South/Central America</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={australiaSelected}
                      onChange={(e) =>
                        setAustraliaSelected(
                          (australiaSelected) => !australiaSelected
                        )
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <label>Australia/New Zealand</label>
                  </li>
                  <li className={styles.list_item}>
                    <input
                      checked={asiaSelected}
                      onChange={(e) =>
                        setAsiaSelected((asiaSelected) => !asiaSelected)
                      }
                      className={styles.checkbox}
                      type="checkbox"
                    />
                    <label>Asia</label>
                  </li>
                </ul>
                <div className="flex-box space-between">
                  <button
                    className="btn"
                    onClick={handleClearAllTravelToFilters}
                  >
                    Clear All
                  </button>
                  <button
                    className="btn modal-button blue"
                    onClick={() => setTravellingToOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}
