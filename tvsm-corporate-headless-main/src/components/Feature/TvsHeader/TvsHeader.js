import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Text, RichText, Image, Link } from '@sitecore-jss/sitecore-jss-react';
import './tvsHeader.scss';

function TvsHeader({ fields }) {
  const isLogoRequired = fields.ShowLogo;
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="header roboto-medium" fixed="top">
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {fields.ShowLogo.value === true && (
            <Navbar.Brand href={fields.LogoUrl.value.url} target={fields.LogoUrl.value.target}>
              <Image field={fields.LogoImage} />
            </Navbar.Brand>
          )}
          <div className="menu-wrapper">
            <Nav className="d-none d-sm-flex language-wrap">
              {fields.StickyMenuList.map(
                (childItem, i) =>
                  childItem?.fields?.ShowOnDesktop?.value === true && (
                    <Nav.Link
                      href={childItem?.fields?.NavigationLink?.value?.url}
                      target={childItem?.fields?.NavigationLink?.value?.target}
                      key={i}
                    >
                      <span
                        className={childItem?.fields?.NavigationClassName?.value + ' me-2'}
                      ></span>
                      {childItem?.fields?.NavigationTitle?.value}
                    </Nav.Link>
                  )
              )}
            </Nav>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                {fields.MenuItems.map((item, index) => {
                  if (item?.fields?.HasChildLevelNavigation?.value === true) {
                    return (
                      <NavDropdown
                        title={item?.fields?.NavigationTitle?.value}
                        id="collapsible-nav-dropdown"
                        key={index}
                      >
                        {item?.fields?.ChildMenu.map((dropdownItem, idx) => (
                          <NavDropdown.Item
                            href={dropdownItem?.fields?.NavigationLink?.value?.url}
                            target={dropdownItem?.fields?.NavigationLink?.value?.target}
                            className="roboto-regular"
                            key={idx}
                          >
                            {dropdownItem.fields.NavigationTitle.value}
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    );
                  } else {
                    return (
                      <Nav.Link
                        href={item?.fields?.NavigationLink?.value?.url}
                        target={item?.fields?.NavigationLink?.value?.target}
                        key={index}
                      >
                        {item?.fields?.ShowNavigationImageInsteadOfName?.value === true ? (
                          <Image field={item?.fields?.NavigationImage} />
                        ) : (
                          item?.fields?.NavigationTitle?.value
                        )}
                      </Nav.Link>
                    );
                  }
                })}
                {/* Add more Nav.Link items if needed */}
              </Nav>
              {/* Add more Nav components if needed */}
              <Nav className="cart-nav d-none d-sm-flex">
                <Nav.Link href="#">
                  <span className="icon-tvs-connect"></span>
                </Nav.Link>
                <Nav.Link href="javascript:void(0);">
                  <span className="icon-cart"></span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      <Nav
        defaultActiveKey="/home"
        as="ul"
        className="d-sm-none secondaryMenu d-flex justify-content-around"
      >
        {fields.StickyMenuList.map(
          (mobileItem, i) =>
            mobileItem?.fields?.ShowOnMobile?.value === true && (
              <Nav.Item as="li" key={i}>
                <Nav.Link
                  href={mobileItem?.fields?.NavigationLink?.value?.url}
                  target={mobileItem?.fields?.NavigationLink?.value?.target}
                  className="roboto-regular text-center"
                >
                  <span className={mobileItem?.fields?.NavigationClassName?.value}></span>
                  {mobileItem?.fields?.NavigationTitle?.value}
                </Nav.Link>
              </Nav.Item>
            )
        )}
      </Nav>
    </>
  );
}
export default TvsHeader;
