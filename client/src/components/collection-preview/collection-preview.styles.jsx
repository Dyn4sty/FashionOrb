import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CollectionPreviewContainer = styled.div`
  margin-bottom: 30px;
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
`
export const TitleContainer = styled(Link)`
    font-size: 28px;
    margin-bottom: 25px;
`
export const PreviewContainer = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      grid-template-rows: 1fr;
      grid-column-gap: 12px;
`