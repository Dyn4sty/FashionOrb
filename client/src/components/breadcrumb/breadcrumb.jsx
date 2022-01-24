import React from "react";
import { NavLink } from "react-router-dom";
import { StyledNav } from "./breadcrumb.styles";

/**
 * BreadCrumb Component, an navigation scheme that reveals the user’s location.
 * @param {{routes: string[]}}  routes url path
 */
const Breadcrumb = ({ routes }) => {
  return (
    <StyledNav aria-label="breadcrumbs" role="region">
      <ol>
        {routes.map((route, idx) => {
          const path = routes.slice(0, idx + 1).join("/");

          return (
            <li key={route}>
              {
                // check whether to add the `›` separator or not.
                !!idx && <span aria-hidden="true">›</span>
              }
              {idx < routes.length - 1 ? (
                <NavLink to={`${path}`}>{route || "Home"}</NavLink>
              ) : (
                // last route is the current page, navigation is not needed.
                <span style={{ textTransform: "capitalize" }}>{route}</span>
              )}
            </li>
          );
        })}
      </ol>
    </StyledNav>
  );
};

export default Breadcrumb;
