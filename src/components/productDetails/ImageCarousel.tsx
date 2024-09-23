import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { CarouselThumb } from "./CarouselThumb";
import { Button } from "../ui/button";
import { ShoppingCart, Zap } from "lucide-react";

export function ImageCarousel({ images }: { images: string[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  React.useEffect(() => {
    if (!api) {
      return;
    }

    console.log(api.scrollSnapList().length);
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  console.log(images);

  return (
    // <div className="">
    <div className=" flex mx-auto gap-2 sticky top-20">
      <div className=" overflow-hidden w-[100px] " ref={emblaThumbsRef}>
        <div className="flex flex-col items-center gap-1.5 ">
          {images &&
            images.map((image, index) => (
              <CarouselThumb
                key={index}
                selected={index === current - 1}
                index={index}
                onClick={() => api?.scrollTo(index)}
                image={image}
              />
            ))}
        </div>
      </div>
      <Carousel setApi={setApi} className="w-full ">
        <CarouselContent>
          {images &&
            images.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="rounded-none">
                  <CardContent className="flex min-w-md flex-col aspect-square items-center justify-center p-6 ">
                    {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                    <Image
                      src={image}
                      alt="image"
                      width={400}
                      height={400}
                      className="w-full h-full object-contain"
                    />
                  </CardContent>
                  <p className="text-xs text-center text-muted-foreground">
                    {current} of {count}
                  </p>
                </Card>
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button className="h-12 lg:h-16 text-sm lg:text-lg font-light rounded-none bg-orange-400 gap-3">
            <ShoppingCart className="w-5 h-5 fill-white" />
            <span>Add to Cart</span>
          </Button>
          <Button className="h-12 lg:h-16 text-sm lg:text-lg font-light rounded-none bg-orange-600 gap-3">
            <Zap className="w-5 h-5 fill-white" />
            <span> Buy Now</span>
          </Button>
        </div>
      </Carousel>
    </div>
  );
}
