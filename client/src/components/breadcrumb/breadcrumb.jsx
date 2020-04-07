import React from 'react';
import { Link } from 'react-router-dom'
import { StyledNav } from './breadcrumb.styles'
const Breadcrumb = ({routes}) => {
    let [mainRoute, secondryRoute, thirdRoute, item] = routes
    return (
        <StyledNav aria-label="breadcrumbs" role="region">
            <ol>
                <li>
                <Link to="/">{mainRoute || 'Home'}</Link>
                </li>
                <li>
                <span aria-hidden="true">›</span>
                <Link to={`/${secondryRoute}`}>{secondryRoute}</Link>
                </li>
                <li>
                <span aria-hidden="true">›</span>
                    <Link to={`/${secondryRoute}/${thirdRoute}`}>{thirdRoute}</Link>
                </li>
                <li>
                <span aria-hidden="true">›</span>
                    {item}
                </li>
            </ol>
        </StyledNav>
    )
}

export default Breadcrumb;