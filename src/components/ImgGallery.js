import React from 'react';
import Gallery from 'react-native-image-gallery';
import GalleryImages from '../assets/img/Gallery';

const ImgGallery = () => (
  <Gallery
    images={GalleryImages}
    initialPage={Math.floor(Math.random() * GalleryImages.length)}
  />
);

export default ImgGallery;
