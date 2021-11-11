import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
  const nextIcon = (
    <span
      aria-hidden="true"
      className={`carousel-control-next-icon ${styles.next_icon}`}
    />
  );

  const prevIcon = (
    <span
      aria-hidden="true"
      className={`carousel-control-prev-icon ${styles.prev_icon}`}
    />
  );
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.carousel_wrapper}>
        <Carousel
          fade
          indicators={false}
          nextIcon={nextIcon}
          prevIcon={prevIcon}
        >
          <Carousel.Item>
            <img
              className={`d-block w-100 ${styles.carousel_image} ${styles.image_large_screen}`}
              src="https://app.greenrope.com/users/myteam46998/Media404.jpg?202108130749"
              alt="First slide"
            />
            <Carousel.Caption
              className={styles.carousel_caption}
            ></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={`d-block w-100 ${styles.carousel_image} ${styles.image_large_screen}`}
              src="https://app.greenrope.com/users/myteam46998/Media412.png?202108131224"
              alt="Second slide"
            />
            <Carousel.Caption
              className={styles.carousel_caption}
            ></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
