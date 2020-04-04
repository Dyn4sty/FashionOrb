import React from 'react';
// import './collection-preview.styles.scss'
import CollectionItem from '../collection-item/collection-item'
import { CollectionPreviewContainer, PreviewContainer} from './collection-preview.styles'
const CollectionPreview = ({items}) => (
    <CollectionPreviewContainer className="container">
        {/* <TitleContainer to={`shop/${title.toLowerCase()}`}>{title.toUpperCase()}</TitleContainer> */}
        <PreviewContainer >
        {
            items.filter((item,  idx) => idx < 4) // only showing 4 items
            .map( (item) => (
                <CollectionItem key={item.id} item={item} />
            ))
        }

        </PreviewContainer>
    </CollectionPreviewContainer>
)

export default CollectionPreview