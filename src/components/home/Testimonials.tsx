import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const testimonials = [
  {
    name: "Michael Chen",
    location: "Singapore",
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    image: "/testimonials/michael.jpg",
  },
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    image: "/testimonials/sarah.jpg",
  },
  {
    name: "James Carter",
    location: "London, UK",
    quote:
      "From The First Call To The Final Sunset, Everything Felt Effortless. The Santorini Escape Was The Most Relaxing Trip We Have Ever Taken Together.",
    image: "/testimonials/james.jpg",
  },
  {
    name: "Emma Wilson",
    location: "Sydney, Australia",
    quote:
      "The Maldives Getaway Was Pure Paradise. Crystal Clear Water, Warm Hospitality And A Team That Handled Every Little Detail For Us.",
    image: "/testimonials/emma.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Carousel opts={{ align: "start" }}>
          {/* Header */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                className={`${cormorant.className} text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl`}
              >
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm text-neutral-500 sm:text-base">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <CarouselPrevious className="static my-0 size-10 border-neutral-300 text-neutral-500 hover:bg-neutral-100" />
              <CarouselNext className="static my-0 size-10 border-neutral-300 text-neutral-500 hover:bg-neutral-100" />
            </div>
          </div>

          {/* Cards */}
          <CarouselContent className="mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="lg:basis-1/2">
                <Card className="grid gap-0 overflow-hidden rounded-none border border-neutral-200 bg-white p-0 ring-0 lg:grid-cols-[1.5fr_1fr]">
                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <blockquote
                      className={`${cormorant.className} text-lg leading-relaxed font-medium text-neutral-800 sm:text-xl`}
                    >
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    <div className="mt-8">
                      <div className="flex items-center gap-2">
                        <span className="h-px w-7 bg-cyan-500" />
                        <span className="text-sm font-medium text-cyan-600">
                          {testimonial.name}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-neutral-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="relative min-h-[240px] lg:min-h-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
