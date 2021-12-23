import { Link } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css";

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
  </div>,
];

export default function HomePage() {
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.slider_wrapper}>
        <ImageSlider items={images}></ImageSlider>
        <Link
          to="/register"
          className={`btn btn-primary ${styles.register_button}`}
        >
          Register for Free
        </Link>
      </div>
    </div>
  );
}
