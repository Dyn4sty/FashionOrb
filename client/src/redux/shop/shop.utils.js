export const addCommentToProduct = (collections, collectionKey) => {
  collections[collectionKey.id.toLowerCase()] = collectionKey;
  return { ...collections };
};
