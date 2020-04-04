import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

const ActiveTabStyles = css`
    border-bottom: 2px solid #00afaf;
    color: #00afaf;
`


export const TabDivContainer = styled.div`
    margin: 0 auto;
    padding: 3rem 0;

    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    &::-webkit-scrollbar {
        display: none;
    }
    a {
    display: block;
    font-weight: 500;
    padding: 6px 1rem;
    color: #6f6f6f;
    display: inline-block;
    vertical-align: middle;
    }
`
export const StyledLink = styled(Link)`

${({activetab}) => activetab === 'active-tab' ? ActiveTabStyles : ''}

`