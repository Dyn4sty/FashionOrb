import React from 'react';
// import './collection-preview.styles.scss'
import CollectionItem from '../collection-item/collection-item'
import { CollectionPreviewContainer, PreviewContainer, TitleContainer} from './collection-preview.styles'
const CollectionPreview = ({title, items}) => (
    <CollectionPreviewContainer>
        <TitleContainer>{title.toUpperCase()}</TitleContainer>
        <PreviewContainer>
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