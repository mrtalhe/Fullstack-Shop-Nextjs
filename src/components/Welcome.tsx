'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

function Welcome() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  const images = ['/mock/1.jpg', '/mock/2.jpg', '/mock/3.jpg', '/mock/4.jpg'];

  return (
    <div>
      <div className="w-full mx-auto">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="relative"
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-0">
                      <Image
                        src={src}
                        alt={`Slide ${index}`}
                        width={6000}
                        height={4000}
                        className="w-full h-[40vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] object-cover rounded-md"
                        priority
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="flex !left-2 sm:!left-4 hover:bg-primary/10 p-5" />
          <CarouselNext className="flex !right-2 sm:!right-4 hover:bg-primary/10 p-5" />
        </Carousel>
      </div>
    </div>
  );
}

export default Welcome;
