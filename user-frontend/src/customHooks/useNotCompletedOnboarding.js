import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getOnboardingRedirectPage } from '../utils/common';

const useNotCompletedOnboarding = (user) => {
  useEffect(() => {
    // If user has not completed onboarding, nudge them.
    if (user && !user.completedOnboarding) {
      const redirectPage = getOnboardingRedirectPage(user);
      toast(
        <div>
          <Link to={redirectPage} className="link link-blue">
            Complete profile to access all features.
          </Link>
        </div>
      );
    }
  }, [user]);
};

export default useNotCompletedOnboarding;
