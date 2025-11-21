import RatingIcon from "@/components/nurui/rating-icon";

interface RatingStarsProps {
  size?: string;
  count?: number;
  rating?: number;
}

const RatingStars = ({ count = 5, size, rating = 0 }: RatingStarsProps) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: count }).map((_, i) => (
        <RatingIcon key={i} rate={i < rating} size={size} />
      ))}
    </div>
  );
};

export default RatingStars;
