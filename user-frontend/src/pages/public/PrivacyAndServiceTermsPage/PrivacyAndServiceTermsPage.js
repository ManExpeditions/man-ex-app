import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './PrivacyAndServiceTermsPage.module.css';

export default function PrivacyAndServiceTermsPage(props) {
  const back = props.location.search
    ? props.location.search.split('=')[1]
    : null;

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <div className="bg-white">
      {back ? (
        <Link to={back} className="close-link">
          <AiOutlineClose></AiOutlineClose>
        </Link>
      ) : (
        <Navbar user={user}></Navbar>
      )}
      <main style={{ marginTop: back ? '0' : '' }} class={styles.wrapper}>
        <h1>Privacy Policy</h1>
        <p>
          By visiting or shopping at this web site, you accept the following
          terms and conditions. Please read them carefully.
        </p>
        <h2>What information do we collect</h2>
        <p>
          We collect information when you book an event or trip which may
          include your name, address, gender, birth date, email address,
          telephone number, special occasion dates, event preferences, dietary
          preferences, and passport information as well as emergency contact
          information (the name, address and telephone number of someone not
          traveling with you who we can contact in case of an emergency); with
          your prior explicit consent we may also collect sensitive personal
          information such as health requirements. This information is
          collectively referred to as "Profile Information" in this Privacy
          Notice.
        </p>
        <p>
          Information collected may include Profile Information for yourself and
          those traveling with you. By providing us with the Profile Information
          of any third party, you confirm that you have the authority to do so
          on their behalf and have provided them with the information set out in
          this Privacy Notice.
        </p>
        <p>
          There are several areas on the site(s) where you may provide personal
          information or will be required to register to obtain access to
          certain online services not available to anonymous visitors. This
          includes logging into our site(s), completing a new reservation form
          or completing an online reservation.
        </p>
        <p>
          If you make purchases through our site(s), we will collect your
          contact information including your phone number, email address, credit
          card information (cardholder name, card number and expiration date)
          and information about the person receiving the product or service
          purchased, and we also may keep a record of your purchases.
        </p>
        <h2>How Do We Use the Information We Collect?</h2>
        <p>
          Man Expeditions uses the information we collect primarily for the
          purposes of our legitimate business interests, such as: to provide a
          better customer service to you; to improve and tailor our services to
          you including meeting your needs and preferences, such as if you
          require a wheelchair or dietary preferences; to contact you about
          special promotions and new products, and for other purposes set out in
          this Privacy Notice.
        </p>
        <p>
          We also process your personal information for the purposes of entering
          into and fulfilling our agreement with you, including to provide you
          products, services or membership benefits you request, and to comply
          with applicable legal obligations as detailed in this Privacy Notice
          (for example, providing certain information to governmental and
          recognized law enforcement agencies).
        </p>
        <p>
          We use your credit card information to complete your purchase. We may
          keep your credit card and passport information on file and on our
          servers to enable you to book additional services, make purchases at
          an event or trip more easily and to resolve disputes as may arise
          between us and you.
        </p>
        <p>
          We may use your personal information to communicate with you and
          respond to your queries. With your permission, we may contact you from
          time to time with communications that we feel will be of interest to
          you such as information about our services, news, and updates, and
          promotions; our communication will also include offerings of exclusive
          benefits and privileges and personalized offers and invitations to
          events.
        </p>

        <h2>Information We Collect or Store Automatically</h2>
        <p>
          We automatically collect certain types of usage information when you
          visit the Site(s), receive Man Expeditions emails, or otherwise engage
          with us. For example, we use cookies to better understand our Site
          usage information and to improve our Site and our user experience.
          Some methods we use to collect this usage information are explained
          below.
        </p>
        <p>
          Cookies are small text files containing a string of alphanumeric
          characters placed on your devices that uniquely identify your browser
          and let us help you log in faster and enhance your navigation through
          the Site. A cookie may also convey information to us about how you use
          the Site(s) (e.g., the pages you view, the links you click, how
          frequently you access the Site(s), and other actions you take on the
          Site(s)), and allow us to track your usage of the Site(s) over time.
        </p>
        <p>
          Log file information may include anonymous information such as your
          web request, Internet Protocol (“IP”) address, browser type,
          information about your mobile device, referring / exit pages and URLs,
          number of clicks and how you interact with links on the Site(s),
          domain names, landing pages, pages viewed, and other such information.
        </p>
        <p>
          Embedded scripts are a type of programming code that is designed to
          collect information about your interactions with the Site(s) such as
          the links you click on. The code is temporarily downloaded onto your
          device from our web server or a third-party service provider, is
          active only while you are connected to the Site(s), and is deactivated
          or deleted thereafter.
        </p>

        <p>
          Browser fingerprinting includes collection and analysis of information
          from your device, such as, without limitation, your operating system,
          plug-ins, system fonts and other data, for purposes of identifying
          your browser and device.
        </p>
        <p>
          Entity tags (“ETags”) are a feature of the cache of information from
          device browsers. ETags are an opaque identifier assigned by a web
          server to a specific version of a resource found at a URL. If the
          resource content at that URL ever changes, a new and different ETag is
          assigned. Used in this manner, ETags are a form of Device Identifier.
          ETag tracking may generate unique tracking values even where the
          consumer blocks HTTP, Flash, and/or HTML5 cookies.
        </p>
        <p>
          Recognition technologies apply statistical probability tools to data
          sets in an attempt to recognize or make assumptions about users and
          devices. This information helps us to identify you across multiple
          devices that you may use, analyze and improve the Site(s) and present
          you with information based on these assumptions.
        </p>
        <p>
          When you access the Site(s) by or through a mobile device, we may
          receive or collect and store unique identification numbers associated
          with your device or our mobile application (including, for example, a
          UDID, Unique ID for Advertisers (“IDFA”), Google Ad ID, or Windows
          Advertising ID), mobile carrier, device type, model and manufacturer,
          mobile device operating system brand and model, phone number, and,
          depending on your mobile device settings, your geographical location
          data, including GPS coordinates (e.g. latitude and/or longitude) or
          similar information regarding the location of your mobile device.
        </p>
        <h2>
          How do we use the information we collect or store automatically?
        </h2>
        <p>
          We use or may use the data and any personal information collected
          through the above methods for our legitimate business interests,
          namely to: (a) remember information so that you will not have to
          re-enter it during your session or the next time you visit the
          website(s); (b) provide and serve custom, personalized advertising;
          (c) identify and recognize you across multiple devices; (d) provide
          and monitor the effectiveness of the Site(s); (e) monitor aggregate
          metrics such as total number of visitors, traffic, usage, and
          demographic patterns on our website and the Site(s); (f) diagnose or
          fix technology problems; and (g) otherwise to plan for and enhance our
          services and Site(s). For more information, please see the Online
          Advertising section below.
        </p>
        <p>
          The information generated by the above methods may be transmitted to
          and stored on servers in Canada. Although we do our best to honor the
          privacy preferences of our users, we are unable to respond to Do Not
          Track signals set by your browser at this time.
        </p>
        <p>
          If you would prefer not to accept cookies, most browsers will allow
          you to: (i) change your browser settings to notify you when you
          receive a cookie, which lets you choose whether or not to accept it;
          (ii) disable existing cookies; or (iii) set your browser to
          automatically reject cookies. Please note that doing so may negatively
          impact your experience using the Site(s). Depending on your mobile
          device and operating system, you may not be able to delete or block
          all cookies. Please review the section below titled "Online
          Advertising" for more details. You may also set your e-mail options to
          prevent the automatic downloading of images that may contain
          technologies that would allow us to know whether you have accessed our
          e-mail and performed certain functions with it.
        </p>
        <h2>
          Information We Receive from Social Networking Site(s) or Other Third
          Parties
        </h2>
        <p>
          When you interact with our Site(s) through various social media, such
          as when you login through Facebook, or share our content on Facebook,
          Twitter, Pinterest, Instagram or other site(s), we may receive
          information from the social network including your profile
          information, profile picture, profile name, user ID associated with
          your social media account, country and any other information you
          permit the social network to share with third parties. The data we
          receive is dependent upon your privacy settings with the social
          network, and we will not post information about you on third party
          social media site(s) without your consent. You should always review,
          and if necessary, adjust your privacy settings on third-party
          website(s) and services before linking or connecting them to our
          website or Service.
        </p>

        <p>
          We may also collect information about you that is publicly available.
          This information may be combined with the information we collect from
          you directly as discussed above. We use this information to better
          understand the demographics of our customers, to connect with you on
          social networks, and improve our Site(s), Services and our customer
          experience.
        </p>
        <h2>Marketing Emails</h2>
        <p>
          You may subscribe to our email marketing program by registering on one
          of our Site(s). By registering, you are securing your subscription to
          receive marketing emails. Emails from Man Expeditions may contain
          unique hyperlinks and other methods to track your engagement with the
          emails that we send you. You may unsubscribe or change your email
          address for marketing emails at any time by following the instructions
          mentioned prominently within each email.
        </p>
        <p>
          Please note that if you tell us that you do not wish to receive
          marketing emails, you will still receive service emails which are
          necessary for example to confirm your booking or to update you on the
          status of your travel service. We will use the contact details you
          give us when you book. This is so that we can perform the contract we
          have with you.
        </p>
        <p>
          Please note that if you ask us to stop sending marketing emails, we
          will keep a note of your personal information and your request so that
          we can make sure you are excluded from the emails when they are sent
          out.
        </p>
        <h2>Promotions, Contests, and Sweepstakes</h2>
        <p>
          From time to time we may offer promotions, contests or sweepstakes
          (collectively referred to as a “Promotion”) on our Site(s) or partner
          site(s). If you choose to participate, information including your
          name, address, age, telephone number and email address may be
          collected. We may also request other information some of which may be
          optional. We use the information you provide for the purposes of
          conducting the Promotion and for other purposes described in this
          Privacy Notice. A Promotion may be sponsored by Man Expeditions alone,
          with another sponsor or by a third party. Information you provide may
          be shared with the sponsor or third parties in accordance with this
          Privacy Notice. We may require the sponsor or third party to provide
          us with Promotion entrant information for marketing purposes. You must
          be over the age of 18 to participate in any Promotion or as otherwise
          provided in the official rules or terms and conditions for such
          Promotion. When you participate in a Promotion you are subject to the
          official rules or terms and conditions governing that Promotion which
          may be posted on the Site relevant to the applicable Promotion or in
          other locations as Promotion marketing materials and/or website(s)
          indicate.
        </p>
        <h2>Child Privacy</h2>
        <p>
          The Site(s) are not targeted at, nor do we knowingly collect personal
          information from, children under the age of 18. If we have reason to
          believe that information is being provided by a person under the age
          of 18 we will not collect the information. If you believe that we have
          collected information from a person under 18, please contact us at
          hello@manexpeditions.com
        </p>
        <h2>Enjoyment of Your Vacation or Event</h2>
        <p>
          Please be aware that there are photographers and camera crew at our
          events taking photographs and making films for our own promotional
          use. They are happy to take reasonable steps to avoid filming or
          photographing you where you indicate that this is your preference, but
          you may be included unless you tell us otherwise and we are unable to
          guarantee that you will not be included on an incidental basis.
        </p>
        <p>
          Some products and services, excursions and other activities, are
          provided by other companies. We may share sufficient personal
          information with these partners before, during and after your
          event/trip to provide a seamless service to our guests. These
          companies have their own privacy policies which should be referred to
          if you choose to use their services.
        </p>
        <h2>Queries</h2>
        <p>
          Should you have queries before, during or after your event, then we
          will use information related to your event such as travel details,
          billing, communications and other information we may have on record or
          which you or third parties may provide to us, to resolve your query.
        </p>
        <p>
          Upon completion of your event, we will contact you to seek feedback on
          your experience to understand your satisfaction level so that we can
          improve the quality of services we offer, and to assess the
          performance of our staff and their associated rewards.
        </p>
        <h2>Understanding Your Needs</h2>
        <p>
          The personal information you provide to us or which we obtain through
          your dealings with us may be analyzed for the following purposes to
          tailor our products and services and to improve our products and
          services generally:
        </p>
        <ul>
          <li>
            To personalize our news, offers and services to your interests.
          </li>
          <li>To track the response to our marketing communication.</li>
          <li>
            To review, develop and improve the services we offer (including
            market research).
          </li>
          <li>For statistical analysis.</li>
        </ul>
        <p>
          We also conduct identifiable and anonymous market research to provide
          longer-term insight into the effectiveness of our services and
          marketing, and to support our service planning and delivery.
        </p>
        <h2>Your Access to Your Information</h2>
        <p>
          You are responsible for the accuracy and completeness of all
          information you provide to us. You may, at any time, access and make
          changes or corrections to your Profile Information or preferences
          simply by directing us to change your information by email or
          telephone at the address and number provided below. You can direct us
          to remove your email address from our mailing list simply by following
          the instructions on any email you receive. We will act on your request
          promptly, but making changes may take up to two weeks to become
          effective.
        </p>
        <h2>Disclosing Information to Third Parties</h2>
        <p>
          We may share your information with our affiliated companies and third
          parties to perform certain activities on our behalf. Examples of these
          activities and third parties include:
        </p>
        <ul>
          <li>Processing payments: banks, payment service providers.</li>
          <li>
            Sending postal mail and e-mail communications: postal services,
            couriers, e-mail service providers.
          </li>
          <li>
            Maintaining guest records and analyzing data: customer insight
            agencies, credit agencies.
          </li>
          <li>
            Providing travel services: airlines, coach operators, travel agents.
          </li>
        </ul>
        <p>
          These contractors have access to personal information needed to
          perform their functions, but are not permitted to use it for other
          purposes.
        </p>
        <p>
          If you make a booking we may pass your personal information on to
          other relevant suppliers of your travel arrangements such as airlines,
          hotels, and transport companies. Your personal information may also be
          passed to travel agents, security and credit checking companies,
          credit and charge card companies. We are required to co-operate with
          government and law enforcement agencies and the public authorities of
          any country in your itinerary, including customs and immigration
          authorities.
        </p>
        <p>
          We will disclose Profile Information and other personal information to
          third parties in accordance with applicable law, and generally only
          if: (1) you request or authorize it; (2) the information is provided
          to help complete a transaction for you; (3) the information is
          provided to comply with the law, applicable regulations, governmental
          and quasi-governmental requests, court orders or subpoenas, to enforce
          our Legal Notices or other agreements, or to protect our rights,
          property or safety or the rights, property or safety of our users or
          others (e.g., to a consumer reporting agency for fraud protection
          etc.); (4) the disclosure is done as part of a purchase, transfer or
          sale of services or assets (e.g., in the event that our assets are
          acquired by another party, customer information may be one of the
          transferred assets); (5) the information is provided to our agents,
          outside vendors or service providers to perform functions on our
          behalf (e.g., analyzing data, providing marketing assistance,
          providing customized advertising, providing customer service,
          processing orders, sending emails about our products or services,
          etc.) or with whom we may have cooperative or joint marketing
          arrangements; (6) the information is shared with third parties for
          their marketing use, or (7) the information is revealed to others as
          described in this Privacy Policy. To limit affiliate marketing offers,
          please email: hello@manexpeditions.com. We may also anonymize or
          aggregate data about you and disclose such anonymized or aggregated
          information to third parties for promotional or other purposes.
        </p>
        <p>
          From time to time we may offer promotions or specials on behalf of
          companies with whom we have joint or cooperative marketing
          arrangements. You may take advantage of these promotions or specials
          by clicking on links on our Site(s). You will be transferred to a
          different site which may not be owned or operated by Man Expeditions
          where you may be required to provide personal information in order to
          participate in the promoted products or services. This privacy policy
          does not apply to those site(s); please review the privacy policy
          posted on those site(s). Man Expeditions is not responsible for the
          content on those site(s) and therefore your use of such site(s) is at
          your own risk.
        </p>
        <p>
          Personal information about you may be shared with governmental and
          recognized law enforcement agencies (such as Customs and the US
          Department for Homeland Security) prior to, during, or after the trip,
          for security and immigration purposes. Personal information may also
          be shared with these agencies in order to prevent and detect crime as
          well as to safeguard children and vulnerable adults.
        </p>
        <h2>Online Advertising</h2>
        <p>
          We may share, or we may permit third party advertising networks and
          other third-party partners, to collect information about your use of
          our Site(s), or your engagement with our email communications or other
          marketing initiatives, over time and across devices that you use so
          that they may play or display ads that may be relevant to your
          interests on the Site(s) as well as on other website(s) or apps, or on
          other devices you may use. Typically, though not always, the
          information we share is provided through cookies or similar tracking
          technologies, which are discussed above. We may also share an account
          identifier which Man Expeditions de-identifies prior to sharing with
          third party partners so that the partners cannot reasonably identify
          you from the information, to help us identify you across devices.
        </p>
        <p>
          You may be able to delete and/or disable cookies and other tracking
          technologies by actively managing the settings on your browser or
          mobile device. If you access our Site(s) on your mobile device, you
          may or may not be able to control tracking technologies through your
          device settings. Please note that these tools may not be effective
          with regard to Flash cookies or HTML5 cookies. For information on
          disabling Flash cookies, go to Adobe's web site. Please be aware that
          if you disable or remove cookies, Flash cookies, or HTML5 cookies on
          your Device, some parts of our Site(s) may not function properly, and
          that when you revisit our Site(s) your ability to limit cookies is
          subject to your browser settings and limitations.
        </p>
        <p>
          In the United States and Canada, you can opt-out of many of the
          network advertising programs that deliver interest-based advertising
          content based on your browsing behaviors by visiting the Digital
          Advertising Alliance Consumer Choice page and the Network Advertising
          Initiative Consumer Opt-Out page (United States) or the Digital
          Advertising Alliance of Canada page (Canada). Deleting browser cookies
          can remove your opt-out preferences, so you should use these tools
          periodically to ensure that your preferences are up-to-date.
        </p>
        <h2>Transportation Security Administration Secure Flight Notice</h2>
        <p>
          The Transportation Security Administration (TSA) requires you to
          provide your full name, date of birth and gender for the purpose of
          watch list screening under the authority of 49 U.S.C. section 114, the
          Intelligence Reform and Terrorism Prevention Act of 2004 and 49 C.F.R.
          parts 1540 and 1560 for all commercial air travel within, into or out
          of the United States which is booked on or after August 15, 2009.
        </p>
        <p>
          You may also provide your Redress Number, if available. If you book
          commercial air travel within, into or out of the United States in
          conjunction with your voyage we will request this information from you
          and forward it to the TSA as required by law. Failure to provide your
          full name, date of birth, and gender may result in denial of transport
          or denial of authority to enter the boarding area.
        </p>
        <p>
          TSA may share information you provide with law enforcement,
          intelligence agencies or others under its published system of records
          notice. For more on TSA privacy policies or to review the system of
          records notice and the privacy impact assessment, please see the TSA
          Website Indicates external site which may or may not meet
          accessibility guidelines.
        </p>
        <h2>Security Procedures to Protect Information</h2>
        <p>
          Security of personal information is extremely important to us. Man
          Expeditions employs physical, administrative and technical security
          measures designed to prevent unauthorized access to your personal
          information collected on and used by Man Expeditions at our Site(s)
          and when providing our Services. Our Site(s) uses SSL (Secure Sockets
          Layer) security technology to encrypt information you provide to us
          through the Site, but any information you provide us by email or fax
          is unencrypted. SSL is an industry-standard protocol for encryption
          over the internet. Data transmission over the internet is never 100%
          secure. While we take steps to protect your personal information and
          keep it secure, you also play a role in protecting your information.
          You can help to maintain the security of your online transactions by
          not sharing your login information, booking number or password with
          anyone. We cannot guarantee the security of any information you
          transmit to us or from our Site(s), and therefore you use our Site(s)
          at your own risk.
        </p>
        <p>
          While we take steps to protect your personal information and keep it
          secure, you also play a role in protecting your information. You can
          help to maintain the security of your online transactions by not
          sharing your login information, booking number, or password with
          anyone. We cannot guarantee the security of any information you
          transmit to us or from our Site(s), and therefore you use our Site(s)
          at your own risk.
        </p>
        <h2>Transferring Your Data</h2>
        <p>
          Man Expeditions is headquartered in Canada with operational offices in
          South Africa, and has operations, entities and service providers
          throughout the world. We may need to process your personal information
          worldwide, for example on a travel itinerary that includes multiple
          countries; where a service provided has operations / processing
          facilities in another country; or where we have to provide personal
          information to immigration authorities, port agents or excursion
          operators in destination countries.
        </p>
        <p>
          If you are based in the EU, this may involve sending your personal
          information to countries outside the EU where data protection rules
          may not be as stringent as in the EU. Such transfers are made pursuant
          to appropriate safeguards. In addition, from time to time, personal
          information may need to be shared with other companies outside of the
          EU, or accessed by companies from outside of the EU, in order to
          provide the services you request from us. For these transfers, we use
          'standard contractual clauses' to ensure the adequacy of the transfer.
          If you wish to enquire further about these transfers, please contact
          us using the details set out at the end of the Privacy Notice.
        </p>
        <h2>Your California Privacy Rights</h2>
        <p>
          We may disclose your personal information to our affiliates or other
          third parties for their use in the marketing of their products or
          services (as opposed to Man Expeditions products or services) to you
          unless you tell us not to. In order to opt out of such sharing or for
          further information, please email: hello@manexpeditions.com
        </p>
        <h2>For Customers in the EU</h2>
        <p>
          If you reside in the EU, you are entitled to the following rights in
          respect of personal information that we hold:
        </p>
        <ul>
          <li>
            Right of access: The right to obtain access to your personal
            information.
          </li>
          <li>
            Right to rectification: The right to obtain rectification of your
            personal information without undue delay where that personal
            information is inaccurate or incomplete.
          </li>
          <li>
            Right to erasure: The right to obtain the erasure of your personal
            information without undue delay in certain circumstances, such as
            where the personal information is no longer necessary in relation to
            the purposes for which it was collected or processed.
          </li>
          <li>
            Right to restriction: The right to obtain the restriction of the
            processing undertaken by us on your personal information in certain
            circumstances, such as where the accuracy of the personal
            information is contested by you, for a period enabling us to verify
            the accuracy of that personal information.
          </li>
        </ul>
        <p>
          In some cases, our ability to uphold these rights for you may depend
          upon our obligations to process personal information for security,
          safety, fraud prevention reasons, compliance with regulatory or legal
          requirements, or because processing is necessary to deliver the
          services you have requested. Where this is the case, we will inform
          you of specific details in response to your request. You may contact
          our marketing department to discuss how to exercise those rights by
          sending an email to hello@manexpeditions.com
        </p>
        <p>
          You also have the right to lodge a complaint with the relevant data
          protection regulator.
        </p>
        <h2>
          Inapplicability of Privacy Policies of any Linked Site(s) or Other
          Parties
        </h2>
        <p>
          Man Expeditions' Site(s) may contain links to other site(s) such as
          our affiliates and third parties. This Privacy Notice only addresses
          our use and disclosure of your information collected on Site(s)
          displaying this Privacy Notice. While we try to link only to site(s)
          that share our standards and respect for privacy, we are not
          responsible for the privacy practices of our affiliates or any other
          third parties or the content of linked site(s), although we do
          encourage you to read the applicable privacy policies and terms and
          conditions of such parties or web site(s).
        </p>
        <h2>Changes to this Privacy Policy</h2>
        <p>
          We will occasionally amend this Privacy Notice to reflect company and
          customer feedback and we reserve the right to make changes to this
          Privacy Notice at any time. The use of your information is subject to
          the Privacy Notice and Terms of Use in effect at the time of use. The
          provisions contained in this Privacy Notice supersede all previous
          notices or policies regarding our privacy practices with respect to
          our Site(s). We post the effective date of our Privacy Notice on our
          Site(s). We encourage you to check our Site(s) frequently to see the
          current Privacy Notice to be informed of how we are committed to
          protecting your information and providing you with improved content on
          our website in order to enhance your trip/event planning experience.
          If we make material changes to this Privacy Notice we will post the
          revised Privacy Notice and the revised effective date on our Site(s).
        </p>
        <h2>How to Contact us</h2>
        <p>
          If you have any questions, comments or complaints regarding our
          Privacy Policy, you can contact us via email at
          hello@manexpeditions.com. This site is owned and operated by Man
          Expeditions (M21 Media Inc.) which controls any information submitted
          through this site.
        </p>
        <p>
          Effective Date: 24 May 2018 © M21 Media, Inc. d.b.a Man Expeditions,
          All rights reserved.
        </p>
        <h1 class="uppercase">Terms and conditions</h1>
        <p>
          By visiting or shopping at this web site, you accept the following
          terms and conditions. Please read them carefully.
        </p>
        <h2 class="uppercase">Copyright</h2>
        <p>
          All content included on this site, such as text, graphics, logos,
          button icons, images, audio clips, digital downloads, data
          compilations, and software, is the property of this site's owner or
          its content suppliers and protected by international copyright laws.
          The compilation of all content on this site is the exclusive property
          of this site's owner and protected by international copyright laws.
          All software used on this site is the property of this site's owner or
          its software suppliers and protected by international copyright laws.
        </p>
        <h2 class="uppercase">
          Disclaimer of warranties and limitation of liability
        </h2>
        <p class="uppercase">
          THIS SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. NO
          REPRESENTATIONS OR WARRANTIES OF ANY KIND ARE MADE, EXPRESS OR
          IMPLIED, AS TO THE OPERATION OF THIS SITE OR THE INFORMATION, CONTENT,
          MATERIALS, OR PRODUCTS INCLUDED ON THIS SITE. YOU EXPRESSLY AGREE THAT
          YOUR USE OF THIS SITE IS AT YOUR SOLE RISK.
        </p>
        <p class="upppercase">
          TO THE FULL EXTENT PERMISSIBLE BY APPLICABLE LAW, THIS SITE'S OWNER
          DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT
          LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
          PARTICULAR PURPOSE. THIS SITE'S OWNER DOES NOT WARRANT THAT THIS SITE,
          ITS SERVERS, OR E-MAIL SENT FROM THIS SITE ARE FREE OF VIRUSES OR
          OTHER HARMFUL COMPONENTS. THIS SITE'S OWNER WILL NOT BE LIABLE FOR ANY
          DAMAGES OF ANY KIND ARISING FROM THE USE OF THIS SITE, INCLUDING, BUT
          NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND
          CONSEQUENTIAL DAMAGES.
        </p>
        <p class="uppercase">
          CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR
          THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO
          YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS
          MAY NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.
        </p>
      </main>
    </div>
  );
}
