import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card } from "../ui/card";


function Features(){
  return (
    <div className="bg-white">
      <h2 className="text-black">
        All of the control, with none of the friction

      </h2>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Card>
              Testing
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              Testing
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              Testing
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              Testing
            </Card>
          </CarouselItem>
          <CarouselItem >
            <Card>
              Testing
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  )
};

export default Features;
