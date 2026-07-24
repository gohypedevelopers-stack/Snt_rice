import Image from "next/image";
import type { GalleryImage } from "@/lib/site-data";

type ImageGalleryProps = {
  images: GalleryImage[];
};

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <figure className="image-gallery__item" key={image.src}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={index === 0 ? "(max-width: 900px) 100vw, 56vw" : "(max-width: 900px) 100vw, 24vw"}
            className="image-gallery__image"
          />
          <figcaption className="image-gallery__caption">{image.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}
