import { FcNext, FcPrevious } from "react-icons/fc";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import styles from "./ImageSlider.module.css";

export default function ImageSlider(props) {
  const prevIcon = () => (
    <FcPrevious
      color="#fff"
      size="2.5rem"
      className={styles.previous}
    ></FcPrevious>
  );

  const nextIcon = () => (
    <FcNext color="#ffffff" size="2.5rem" className={styles.next}></FcNext>
  );

  return (
    <div className={styles.slider_wrapper}>
      <AliceCarousel
        activeIndex={props.activeIndex ? props.activeIndex : 0}
        keyboardNavigation={true}
        animationDuration={800}
        renderNextButton={() => nextIcon()}
        renderPrevButton={() => prevIcon()}
        disableButtonsControls={
          props.disableButtons ? props.disableButtons : false
        }
        disableDotsControls={props.disableDots ? props.disableDots : false}
        infinite={props.infinite ? props.infinite : true}
        items={props.items}
      />
    </div>
  );
}
