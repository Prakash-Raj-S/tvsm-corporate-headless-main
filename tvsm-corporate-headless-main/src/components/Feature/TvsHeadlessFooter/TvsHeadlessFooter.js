import React from 'react';
import './TvsHeadlessFooter.scss';
import { Text, RichText, Image, Link } from '@sitecore-jss/sitecore-jss-react';

const TvsHeadlessFooter = (props) => {
  const renderFirstChildItems = (childItem) => {
    if (childItem.fields.HasFirstChildLevelNav.value === true) {
      return childItem.fields.FirstChildList.map((firstChild, j) => (
        <li key={j}>
          <a href="">
            <Text field={firstChild.fields.Title} />

            <ul>
              {firstChild.fields.HasChildLevelNav.value === true && renderChildItems(firstChild)}
            </ul>
          </a>
        </li>
      ));
    } else {
      // Return a default message or component if the condition is not met
      return <div>No child items found for this category.</div>;
    }
  };

  const renderChildItems = (firstChild) => {
    if (firstChild.fields.HasChildLevelNav.value === true) {
      return firstChild.fields.ChildList.map((child, k) => (
        <li key={k}>
          <a href="">
            <Text field={child.fields.Title} />
          </a>
        </li>
      ));
    } else {
      // Return a default message or component if the condition is not met
      return <div>No child items found for this category.</div>;
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="logo">
          <div className="row">
            <div className="col-md-6">
              <div className="footer-logo">
                <img src="-/media/new-footer/tvs-motor-logo-light.png" />
              </div>
            </div>
            <div className="col-md-6 country-dropdown">
              <div className="country">
                <div id="countryMobile" className="select f16">
                  <a className="flag in">IND</a>
                </div>
                <div id="countryMobile-drop" className="dropdown">
                  <ul className="f16">
                    <li className="active">
                      <a
                        className="flag in"
                        href="http://webdev01.vizualize.com/TVS/corporate-staging/"
                        target="_blank"
                        rel="noreferrer"
                        title="India"
                      >
                        IND
                      </a>
                    </li>
                    <li className="active">
                      <a
                        className="flag in"
                        href="http://webdev01.vizualize.com/TVS/corporate-staging/"
                        target="_blank"
                        rel="noreferrer"
                        title="India"
                      >
                        XYZ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RichText className="text-gray-700 text-base" field={props.fields.body} />

        <div className="all-brand-cta" id="collapse-list-parent">
          <div className="row">
            <div className="col-md-2">
              <ul>
                {props.fields.NavigationCategory.map((childItem, i) => (
                  <li key={i}>
                    <a
                      data-toggle="collapse"
                      href="#motorcycles"
                      aria-expanded="false"
                      aria-controls="motorcycles"
                    >
                      <Text field={childItem.fields.CategoryName} />
                      <div className="collapse" id="motorcycles">
                        <ul>
                          {childItem.fields.HasFirstChildLevelNav.value === true &&
                            renderFirstChildItems(childItem)}
                        </ul>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="reachus">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>{props.fields.ContactHeader.value}</h3>
              <div className="wrap">
                <div className="email">
                  <div className="icon">
                    <Image field={props.fields.EmailIcon.value} />
                  </div>
                  <a href={`mailto:${props.fields.Email.value}`}>{props.fields.Email.value}</a>
                </div>
                <div className="call">
                  <div className="icon">
                    <Image field={props.fields.TelIcon.value} />
                  </div>
                  <a href={`tel:${props.fields.TelNo.value}`}>{props.fields.TelNo.value}</a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <h3>
                <Text field={props.fields.ConnectHeading.value} />
              </h3>
              <div className="download">
                <Link field={props.fields.GoogleStoreLink.value} target="_blank" rel="noreferrer">
                  <Image field={props.fields.GoogleStoreImg.value} />
                </Link>
                <Link field={props.fields.AppStoreLink.value} target="_blank" rel="noreferrer">
                  <Image field={props.fields.AppStoreImg.value} />
                </Link>
              </div>
            </div>
            <div className="col-md-2">
              <h3>{props.fields.SocialHeader.value}</h3>
              <ul>
                {props.fields.IconList.map((childItemss, n) => (
                  <li key={n}>
                    <Link field={childItemss.fields.IconLink}>
                      <Image field={childItemss.fields.IconImg} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM DISCLAIMER */}
      <div className="">
        <div className="container">
          <div className="copyright">
            <p>
              <Text field={props.fields.ReservedTxt.value} />
            </p>
            <ul>
              <li>
                <a href={props.fields.PrivacyLink.value.url}>{props.fields.PrivacyTxt.value}</a>
              </li>
              <li>
                <a href={props.fields.DisclaimerLink.value.url}>
                  {props.fields.DisclaimerTxt.value}
                </a>
              </li>
              <li>
                <a href={props.fields.CookiePolicyLink.value.url}>
                  {props.fields.CookiePolicyTxt.value}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

function saveCookie() {
  // Your code here
}

export default TvsHeadlessFooter;
