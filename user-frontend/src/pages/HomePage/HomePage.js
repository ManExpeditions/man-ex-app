import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import Navbar from "../../components/Navbar/Navbar";
import Toast from "../../components/Toast/Toast";
import { getOnboardingRedirectPage } from "../../utils/common";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

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
      <Toast></Toast>
      <div className={styles.slider_wrapper}>
        <ImageSlider data={sliderData}></ImageSlider>
      </div>
    </div>
  );
}
