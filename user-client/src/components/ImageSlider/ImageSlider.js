import { useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import styles from "./ImageSlider.module.css";

export default function ImageSlider({ data }) {
  const [current, setCurrent] = useState(0);
  const length = data.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const previousSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.next} onClick={nextSlide}>
        <FcNext color="#ffffff" size="2.5rem"></FcNext>
      </div>
      <FcPrevious
        color="#fff"
        size="2.5rem"
        className={styles.previous}
        onClick={previousSlide}
      ></FcPrevious>
      <img
        src={data[current].image}
        alt={data[current].name}
        className={styles.image}
      />
    </div>
  );
}
