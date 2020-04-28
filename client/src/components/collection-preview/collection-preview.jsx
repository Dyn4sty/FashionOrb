import React from "react";
import CollectionItem from "../collection-item/collection-item";
import {
  CollectionPreviewContainer,
  PreviewContainer,
} from "./collection-preview.styles";
const CollectionPreview = ({ items, id }) => {
  return (
    <CollectionPreviewContainer>
      <PreviewContainer>
        {items
          .filter((item, idx) => idx < 4) // only showing 4 items
          .map((item) => (
            <CollectionItem key={id} collectionId={id} item={item} />
          ))}
      </PreviewContainer>
    </CollectionPreviewContainer>
  );
};

export default React.memo(CollectionPreview);
