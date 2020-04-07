import styled from 'styled-components';

export const StyledNav = styled.nav`
    margin: 0 auto;
    padding: 0;

    @media (min-width: 768px) {
        max-width: 1366px;
        display: block;
    }

    ol {
        list-style: none;
        height: 50px;
        line-height: 50px;
        padding: 0 16px;
        font-size: 0;
        white-space: nowrap;
        display: flex;
        @media (min-width: 768px)  {
            padding: 0 24px;
        }
        @media (min-width: 1024px) {
            padding: 0 32px;
        }
        
    li {
        font-size: .875rem;
        display: inline-block;
        letter-spacing: .4px;
        a {
            color: #2d2d2d;
            text-decoration: none;
            text-transform: capitalize;
        }
        span {
            display: inline-block;
            padding: 0 11px 0 14px;
        }
    }
    li:last-child {
        text-overflow: ellipsis;
        overflow: hidden;
        color: #999;
    }
}
`