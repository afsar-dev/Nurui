"use client";
import CardSwipeCarousel from "./card-swipe-carousel";

const CardSwipeCarouselDemo = () => {
  const images = [
    {
      src: "/carousel/swipe-card-4.jpeg",
      alt: "Some illustrations by my fav AarzooAly",
    },
    {
      src: "/carousel/swipe-card-2.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/carousel/swipe-card-3.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/carousel/swipe-card-5.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/carousel/swipe-card-2.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/carousel/swipe-card-4.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/carousel/swipe-card-2.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/carousel/swipe-card-3.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/carousel/swipe-card-5.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/carousel/swipe-card-6.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden ">
      <CardSwipeCarousel className="" images={images} loop />
    </div>
  );
};

export default CardSwipeCarouselDemo;
