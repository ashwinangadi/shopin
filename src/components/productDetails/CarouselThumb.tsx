import React from "react";
import Image from "next/image";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  image: string;
};

export const CarouselThumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div
      className={"".concat(
        selected ? "border-2 border-primary rounded-md" : "border"
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="flex items-center justify-center rounded-md  min-w-full xl:min-w-[80px] aspect-square "
      >
        <Image
          src={image}
          alt="image"
          width={200}
          height={200}
          className="object-fill"
        />
      </button>
    </div>
  );
};
