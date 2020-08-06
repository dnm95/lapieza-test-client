import React from "react";
import { node } from "prop-types";
import Header from "./Header";

function Layout(props) {
  const { children } = props;

  return (
    <div id="page-container">
      <Header />
      {children}
    </div>
  )
}

Layout.defaultProps = {
  children: <></>
};

Layout.propTypes = {
  children: node,
}

export default Layout;
