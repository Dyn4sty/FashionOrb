import styled from 'styled-components'

export const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
  max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1200px) {
  max-width: 1140px;
  }
`
export const ItemsContainer = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      grid-template-rows: 1fr;
      grid-column-gap: 12px;
`