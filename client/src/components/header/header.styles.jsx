import styled, { css } from "styled-components";

const HeaderContainerFixed = css`
  position: sticky;
    z-index: 500;
    background: #000000de;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.09);
    top: 0;
  }

`;
export const HeaderContainer = styled.span`
     z-index: 500;
    .dropdown-toggle::before { 
        margin: 0;
        border: none;
    }
  nav {
    @media (max-width: 991px) {
        .name {
            display: none;
        }

    }
    div[aria-labelledby="user-dropdown"] {
        @media (max-width: 569px) {
            right: auto;
            position: relative;
        }
        @media (min-width: 570px) {
        will-change: transform;
        top: 0px;
        transform: translate3d(-23px, 42px, 0px);
        right: -52px    ;
        bottom: auto;
        }
        border-radius: .75rem;
        position: absolute;

    }
    transition: all .1s ease .1s;
    z-index: 1000; 
    background: #fff !important;
    ${({ fixed }) => (fixed === "fixed" ? HeaderContainerFixed : "")}
    position: sticky;
    margin-bottom: 7px;
    #profile-img {
        border-radius: 30px;
        width: 20px;}
    }
    .navbar-toggler {
      color: rgba(0, 0, 0, 0.5);
      border-color: rgba(255, 255, 255, 0.1) !important;
      img
    }

  }
  .is-active {
    color: #00afaf !important;
    font-weight: 600;
    border-bottom: 2px solid #00afaf;
  }
  #Layer_1 {
    width: 4vw;
    height: auto;
    min-width: 70px;
    min-height: 35px;
    margin-right: auto;
  }
  #Capa_1 {
      height: 40px;
  }
  @media (max-width: 585px) {
    .navbar-brand {
      svg {
        ${"" /* left: -4rem !important; */}
      }
    }
  }
  @media (max-width: 989px) {
    /* CSS FOR TABLETS */
    .navbar-brand {
      svg {
        left: -4rem !important;
      }
    }
  }
  @media (max-width: 220px) {
    .navbar-brand {
      svg {
        position: absolute;
        left: -4rem !important;
      }
    }
  }
  }
`;
