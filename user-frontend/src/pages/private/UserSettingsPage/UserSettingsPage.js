import { useSelector } from "react-redux";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./UserSettingsPage.module.css";
import { Link } from "react-router-dom";

export default function UserSettingsPage() {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <div className={`bg-white ${styles.page_wrapper}`}>
      <Link to="/profile" className={styles.close_link}>
        <AiOutlineClose></AiOutlineClose>
      </Link>
      <h2 className={styles.page_heading}>Settings</h2>
      <section>
        <ul>
          <li className={styles.list_item}>
            <Link to="" className={`link ${styles.link}`}>
              <div>
                <h4>Email address</h4>
                <p>{user.email}</p>
              </div>
              <span className={styles.edit_span}>Edit</span>
            </Link>
          </li>
          <li className={styles.list_item}>
            <Link to="" className={`link ${styles.link}`}>
              <div>
                <h4>Phone number</h4>
                <p>{user.phone}</p>
              </div>
              <span className={styles.edit_span}>Edit</span>
            </Link>
          </li>
          <li className={styles.list_item}>
            <Link to="" className={`link ${styles.link}`}>
              <div>
                <h4>Password</h4>
                <p>******</p>
              </div>
              <span className={styles.edit_span}>Edit</span>
            </Link>
          </li>
          <li className={styles.list_item}>
            <Link to="" className={`link ${styles.link}`}>
              <div>
                <h4>Language preference</h4>
                <p>{user.language}</p>
              </div>
              <span className={styles.edit_span}>Edit</span>
            </Link>
          </li>
          <li className={styles.list_item}>
            <Link className={`link ${styles.link}`}>
              <div>
                <h4>Notifications</h4>
                <p>{user.language}</p>
              </div>
              <BiChevronRight size={24}></BiChevronRight>
            </Link>
          </li>
          <li className={styles.list_item}>
            <Link className={`link ${styles.link} ${styles.no_border}`}>
              <div>
                <h4>Manage account</h4>
                <p>{user.language}</p>
              </div>
              <BiChevronRight size={24}></BiChevronRight>
            </Link>
          </li>
        </ul>
      </section>
      <section>
        <h3 className={styles.section_heading}>Company</h3>
        <ul>
          <li className={styles.list_item}>
            <Link to="/aboutus" className={`link ${styles.link}`}>
              <div>
                <h4>About Man Ex</h4>
                <p>
                  Learn more about our mission and the causes our experiences
                  support.
                </p>
              </div>
              <BiChevronRight size={24}></BiChevronRight>
            </Link>
          </li>
          <li className={styles.list_item}>
            <Link to="/press" className={`link ${styles.link}`}>
              <div>
                <h4>Press</h4>
                <p>
                  Everything you need to know about Man Ex in the latest press.
                </p>
              </div>
              <BiChevronRight size={24}></BiChevronRight>
            </Link>
          </li>
          <li className={styles.list_item}>
            <Link to="/travelsponsorships" className={`link ${styles.link}`}>
              <div>
                <h4>Travel Sponsorships</h4>
                <p>
                  Are you a photographer, personal trainer or influencer? Apply
                  for a travel sponsorhip.
                </p>
              </div>
              <BiChevronRight size={24}></BiChevronRight>
            </Link>
          </li>
          <li className={styles.list_item}>
            <Link className={`link ${styles.link}`}>
              <div>
                <h4>Privacy & Service Terms</h4>
                <p>
                  Everything you need to know about your privary and our terms
                  of service.
                </p>
              </div>
              <BiChevronRight size={24}></BiChevronRight>
            </Link>
          </li>
          <li className={styles.list_item}>
            <a
              href="mailto:hello@manexpeditions.com?subject=Contact Us"
              className={`link ${styles.link} ${styles.no_border}`}
            >
              <div>
                <h4>Contact us</h4>
                <p>Need help with anything. Let us know how we can assist.</p>
              </div>
              <BiChevronRight size={24}></BiChevronRight>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
