import ImageSlider from "../../components/ImageSlider/ImageSlider";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const sliderData = [
    {
      name: "Man",
      image:
        "https://app.greenrope.com/users/myteam46998/Media404.jpg?202108130749",
    },
    {
      name: "Man2",
      image:
        "https://app.greenrope.com/users/myteam46998/Media412.png?202108131224",
    },
  ];

  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.slider_wrapper}>
        <ImageSlider data={sliderData}></ImageSlider>
      </div>
    </div>
  );
}
