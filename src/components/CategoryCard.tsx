import { FC } from "react";
import Image from "next/image";

interface CategoryCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

const CategoryCard: FC<CategoryCardProps> = ({ name, image, onClick }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      <div className="relative w-full h-32">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-camel-dark">{name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
