"use client";
import PerspectiveCarousel from "./perspective-carousel";

const PerspectiveCarouselDemo = () => {
  const images = [
    {
      src: "/carousel/swipe-card-1.jpeg",
      alt: "Carousel image 1",
    },
    {
      src: "/carousel/swipe-card-2.jpeg",
      alt: "Carousel image 2",
    },
    {
      src: "/carousel/swipe-card-3.jpeg",
      alt: "Carousel image 3",
    },
    {
      src: "/carousel/swipe-card-4.jpeg",
      alt: "Carousel image 4",
    },
    {
      src: "/carousel/swipe-card-5.jpg",
      alt: "Carousel image 5",
    },
    {
      src: "/carousel/swipe-card-6.jpg",
      alt: "Carousel image 6",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <PerspectiveCarousel className="" images={images} showPagination loop />
    </div>
  );
};

export default PerspectiveCarouselDemo;
