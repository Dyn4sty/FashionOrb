import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'

import { TabDivContainer, StyledLink } from './tab-div.styles'

const TabDiv = ({match, history, collections}) => {
    return (
        <TabDivContainer>
            <StyledLink to={`/shop`} activetab={match.path === '/shop' ? 'active-tab' : ''}>Featured</StyledLink>
            {
            collections.map(({title, id}) => {
                    return (
                        <StyledLink to={`/shop/${title.toLowerCase()}`} activetab={match.params.collectionId === title.toLowerCase() ? 'active-tab' : ''} key={id}>{title}</StyledLink>
                    )
                }) 
            }
        </TabDivContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})
export default connect(mapStateToProps, null)(withRouter(React.memo(TabDiv)))