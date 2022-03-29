import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOnboardingRedirectPage } from '../../../utils/common';
import { toast } from 'react-toastify';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';
import Navbar from '../../../components/Navbar/Navbar';
import Toast from '../../../components/Toast/Toast';
import styles from './HomePage.module.css';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { experiencesGet } from '../../../slices/experience/experiencesGetSlice';
import ExperienceBox from '../../../components/ExperienceBox/ExperienceBox';

const images = [
  <div>
    <div className={styles.slider_text_container}>
      <h1 className={styles.slider_text_heading}>We Believe in</h1>
      <h1 className={styles.slider_text_subheading}>Community & Connection</h1>
      <p className={styles.slider_text_info}>
        Get matched with like-minded travel buddies and create extraordinary
        memories.
      </p>
    </div>
    <img
      className={styles.slider_image}
      src="https://app.greenrope.com/users/myteam46998/Media404.jpg?202108130749"
      alt="Men holding Man Expeditions logo in dessert."
    />
    <div className={styles.slider_text_image_caption}>
      <p>Namibia Luxury Adventure</p>
      <p>Sossuvlei, Namibia</p>
    </div>
    <div className={styles.vignette}></div>
  </div>,
  <div>
    <div className={styles.slider_text_container}>
      <h1 className={styles.slider_text_heading}>We craft</h1>
      <h1 className={styles.slider_text_subheading}>
        Experiences with Intention
      </h1>
      <p className={styles.slider_text_info}>
        All experiences support wildlife/conservation efforts. Charitable TAX
        receipts included with every booking.
      </p>
    </div>
    <img
      className={styles.slider_image}
      src="https://app.greenrope.com/users/myteam46998/Media412.png?202108131224"
      alt="Man rescuing a rhino."
    />
    <div className={styles.slider_text_image_caption}>
      <p>Rhino Project Expedition</p>
      <p>South Africa</p>
    </div>
    <div className={styles.vignette}></div>
  </div>,
  <div>
    <div className={styles.slider_text_container}>
      <h1 className={styles.slider_text_heading}>We connect</h1>
      <h1 className={styles.slider_text_subheading}>On-line</h1>
      <p className={styles.slider_text_info}>
        Create new memories with our curated on-line experiences while we
        navigate the Covid-19 pandemic.
      </p>
    </div>
    <img
      className={styles.slider_image}
      src="https://app.greenrope.com/users/myteam46998/Media409.jpg?202108131008"
      alt="Man doing yoga in greenery."
    />
    <div className={styles.slider_text_image_caption}>
      <p>Animal Yoga</p>
      <p>Online & Remote</p>
    </div>
    <div className={styles.vignette}></div>
  </div>,
  <div>
    <div className={styles.slider_text_container}>
      <h1 className={styles.slider_text_heading}>We protect</h1>
      <h1 className={styles.slider_text_subheading}>
        Wildlife & their environment
      </h1>
      <p className={styles.slider_text_info}>
        All trips support the Upmost Foundation 501(c)(3) Nonprofit
      </p>
    </div>
    <img
      className={`${styles.slider_image} ${styles.slider_image_4}`}
      src="https://app.greenrope.com/users/myteam46998/Media407.jpg?202108131003"
      alt="Gorilla kissing man."
    />
    <div className={styles.slider_text_image_caption}>
      <p>East Africa Expedition</p>
      <p>Tanzania</p>
    </div>
    <div className={styles.vignette}></div>
  </div>,
  <div>
    <div className={styles.slider_text_container}>
      <h1 className={styles.slider_text_heading}>We thrive</h1>
      <h1 className={styles.slider_text_subheading}>In Life & Nature</h1>
      <p className={styles.slider_text_info}>
        We bring awareness to great causes and celebrate positive change.
      </p>
    </div>
    <img
      className={styles.slider_image}
      src="https://app.greenrope.com/users/myteam46998/Media410.jpg?202108131115"
      alt="Man with dreadlocks on a summit."
    />
    <div className={styles.slider_text_image_caption}>
      <p>Katahdin Expedition</p>
      <p>USA</p>
    </div>
    <div className={styles.vignette}></div>
  </div>,
  <div>
    <div className={styles.slider_text_container}>
      <h1 className={styles.slider_text_heading}>We Celebrate</h1>
      <h1 className={styles.slider_text_subheading}>
        The World and each Other
      </h1>
      <p className={styles.slider_text_info}>
        We forge meaningful friendships and strive for a diverse community
      </p>
    </div>
    <img
      className={styles.slider_image}
      src="https://app.greenrope.com/users/myteam46998/Media406.jpg?202108130938"
      alt="Group of people watching beautiful scenery."
    />
    <div className={styles.slider_text_image_caption}>
      <p>Azores Expedition</p>
      <p>Portugal</p>
    </div>

    <div className={styles.vignette}></div>
  </div>
];

export default function HomePage() {
  const [seeMore, setSeeMore] = useState(false);
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const experiencesGetSlice = useSelector((state) => state.experiencesGetSlice);
  const { experiences } = experiencesGetSlice;

  useEffect(() => {
    // If user has not completed onboarding, nudge them.
    if (user && !user.completedOnboarding) {
      const redirectPage = getOnboardingRedirectPage(user);
      toast(
        <div>
          <Link to={redirectPage} className="link link-blue">
            Complete your profile.
          </Link>
        </div>
      );
    }
  }, [user]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!experiences) {
      dispatch(
        experiencesGet({
          isActive: true,
          isFeatured: true
        })
      );
    }
  }, [dispatch, experiences]);

  return (
    <div className="page home-page">
      <Navbar user={user}></Navbar>
      <Toast></Toast>
      {!user && (
        <div className={styles.slider_wrapper}>
          <ImageSlider items={images}></ImageSlider>
          <Link to="/register" className="btn btn-primary btn-abs-tr">
            Register for Free
          </Link>
        </div>
      )}
      <main className={`bg-black ${styles.main}`}>
        <div className={styles.container}>
          {user && (
            <div className={styles.hero_wrapper}>
              {user && user.firstName && (
                <p className={styles.hero_text_info}>Hello {user.firstName}</p>
              )}
              <h1 className={styles.hero_text_heading}>Welcome to</h1>
              <h1 className={styles.hero_text_subheading}>ManEx</h1>
              <p className={styles.hero_text_info}>
                Get matched with like-minded travel buddies, and create
                extraordinary memories.
              </p>
            </div>
          )}

          <Link to={user ? '/members' : '/register'}>
            <img
              className={styles.thumbnails_image}
              src="https://app.greenrope.com/users/myteam46998/Media411.jpg?202108131124"
              alt=""
            />
          </Link>
          <Link
            to={user ? '/experiences' : '/register'}
            className="link link-long"
          >
            {user ? 'Explore the community' : 'Join the community'}
          </Link>
          {!user && (
            <>
              <h1 className={styles.main_title}>
                Welcome to <br /> ManEx
              </h1>
              <p className={styles.main_paragraph}>
                Finding the perfect group of travel buddies to go on an
                adventure with has never been easier. Join a travel group or
                create your own to go on adventures with like-minded men you
                identify with the most. We host adventures designed for all
                fitness levels.
                <br />
                <br />
                Our community has grown to make real hands on change in the
                world through our affiliated wildlife and environmental
                conservation projects. We are proud that we can assist and bring
                awareness to these much needed causes and celebrate our
                brotherhood of positive change.
              </p>
              <Link to="/aboutus" className="link link-long">
                Learn more
              </Link>
            </>
          )}
        </div>
      </main>
      {!user && (
        <section className="bg-white">
          <div className={`${styles.how_section} ${styles.container}`}>
            <h1 className={styles.how_section_title}>
              Imagine finding the perfect trip and the perfect travel buds to
              enjoy it with?!
            </h1>
            <div className={styles.how_section_container}>
              <img
                className={styles.how_section_image}
                src="https://app.greenrope.com/users/myteam46998/Media243.jpg?202106241029"
                alt="Men holding man expeditions symbol."
              />
              <div>
                <p>
                  For us, choosing a trip to book is equally as important as
                  choosing the perfect people to enjoy it with. What if we told
                  you that we are the matchmaker for trips and like-minded
                  people? Well that's exactly what we are. After you register we
                  will able to match you with like-minded men with similar
                  travel interests.
                </p>
                <button
                  className="btn link link-blue"
                  onClick={() => setSeeMore(() => !seeMore)}
                >
                  {seeMore ? 'Hide' : 'See more'}
                </button>
                {seeMore && (
                  <>
                    <h2 className={styles.see_more_title}>How it works</h2>
                    <ul>
                      <li className={styles.see_more_list_item}>
                        <b>Step 1:</b> Register & verify your profile
                      </li>
                      <li className={styles.see_more_list_item}>
                        <b>Step 2:</b> When a member who matches your interests
                        invites you to join their trip, we will notify you...OR
                        create your own travel group, select your prefered
                        travel dates and then invite members of the Man Ex
                        community who share the same travel interests as you.
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="bg-black">
        <div className={styles.container}>
          {user ? (
            <>
              <div className={styles.global_exp}>
                <h1 className={styles.global_exp_heading}>Explore</h1>
                <h1 className={styles.global_exp_subheading}>
                  Global Experiences
                </h1>
              </div>
            </>
          ) : (
            <>
              <h1 className={styles.exp_section_heading}>
                Popular Experiences
              </h1>
              {/* <div className={styles.exp_section_videos_container}>
                <div className={styles.video_container}>
                  <VideoPlayer src="https://res.cloudinary.com/man-expeditions/video/upload/v1640362481/Man_Ex_Cold_Shower_Challenge_-_720WebShareName_nsry8e.mov"></VideoPlayer>
                  <Link
                    to="/register"
                    className={`link btn-primary ${styles.btn_video_info}`}
                  >
                    Learn more
                  </Link>
                </div>
                <div className={styles.video_container}>
                  <VideoPlayer src="https://res.cloudinary.com/man-expeditions/video/upload/v1640362481/Man_Ex_Cold_Shower_Challenge_-_720WebShareName_nsry8e.mov"></VideoPlayer>
                  <Link
                    to="/register"
                    className={`link btn-primary ${styles.btn_video_info}`}
                  >
                    Learn more
                  </Link>
                </div>
              </div> */}
            </>
          )}
          <div className={styles.global_exp_section_videos_container}>
            {experiences &&
              experiences.map((experience) => (
                <ExperienceBox
                  key={experience._id}
                  experience={experience}
                  user={user}
                />
              ))}
          </div>

          <Link to="/experiences" className="link link-long">
            See more experiences
          </Link>
        </div>
      </section>
      {!user && (
        <>
          <section className={styles.survey_section}>
            <img
              className={styles.survey_section_image}
              src="https://app.greenrope.com/users/myteam46998/Media240.jpg?202106240524"
              alt="Men standing during a sunset."
            />
            <div className={styles.survey_section_text}>
              <h2 className={styles.survey_section_title}>
                Connect with like-minded Traveller's
              </h2>
              <Link to="/register" className="link btn btn-primary text-center">
                Register for free
              </Link>
            </div>
          </section>
          <section className={`${styles.impact_section} bg-white`}>
            <div>
              <h2 className={styles.impact_section_heading}>7 years</h2>
              <h3 className={styles.impact_section_subheading}>
                Of leaving our world a better place through travel
              </h3>
              <div className={styles.impact_section_blobs_container}>
                <div className={styles.impact_section_blob}>
                  <img
                    className={styles.impact_section_blob_img}
                    src="https://app.greenrope.com/users/myteam46998/Media380.png?202107300909"
                    alt="Turtle."
                  />
                  <h4 className={styles.impact_section_blob_title}>
                    46,000 Turtles
                  </h4>
                  <p className={styles.impact_section_blob_text}>
                    AVERAGE HATCHED ON BEACHS THAT THE PROCEEDS FROM OUR TRIPS
                    HELP KEEP CLEAN AND SAFE
                  </p>
                </div>
                <div className={styles.impact_section_blob}>
                  <img
                    className={styles.impact_section_blob_img}
                    src="https://app.greenrope.com/users/myteam46998/Media378.png?202107300909"
                    alt="Cycle of plant, animals, and water."
                  />
                  <h4 className={styles.impact_section_blob_title}>
                    1.1 Million Hectares
                  </h4>
                  <p className={styles.impact_section_blob_text}>
                    OF CONSERVATION LAND SUPPORTED FROM THE PROCEEDS OF OUR
                    TRIPS
                  </p>
                </div>
                <div className={styles.impact_section_blob}>
                  <img
                    className={styles.impact_section_blob_img}
                    src="https://app.greenrope.com/users/myteam46998/Media377.png?202107300909"
                    alt="Rhino."
                  />
                  <h4 className={styles.impact_section_blob_title}>
                    23 Rhinos
                  </h4>
                  <p className={styles.impact_section_blob_text}>
                    HAVE BEEN RESCUED FROM THE PROCEEDS OF OUR TRIPS
                  </p>
                </div>
                <div className={styles.impact_section_blob}>
                  <img
                    className={styles.impact_section_blob_img}
                    src="https://app.greenrope.com/users/myteam46998/Media379.png?202107300909"
                    alt="Whale."
                  />
                  <h4 className={styles.impact_section_blob_title}>
                    2 Thousand Miles
                  </h4>
                  <p className={styles.impact_section_blob_text}>
                    OF COASTLINE SUPPORTED BY OUR TRIPS
                  </p>
                </div>
              </div>

              <div className={styles.container}>
                <h2 className={styles.impact_section_heading}>
                  Our world doesn't have time for average.
                </h2>
                <br />
                <h4>
                  That's why we need traveller's like you, who seek to go beyond
                  average travel - to travel experiences that leave our world a
                  better place.
                </h4>
                <br />
                <p>
                  For 7 years, Man Expeditions has been building a vision that,
                  through the support of our travel community, allows us to run
                  group trips and experiences that all help fund important
                  wildlife and environmental conservation efforts. We'd like to
                  take you to three continents to discover extraordinary
                  landscapes in a travel dream that goes beyond the expected
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      <BottomNav user={user}></BottomNav>
    </div>
  );
}
