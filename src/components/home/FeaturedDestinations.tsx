import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

const destinations = [
  {
    id: "bali",
    location: "Indonesia",
    title: "Bali Paradise",
    price: 2700,
    duration: "7 Days/6 Nights",
    rating: "4.5",
    image: "/destinations/bali.jpg",
  },
  {
    id: "maldives",
    location: "Maldives",
    title: "Ocean Bungalows",
    price: 3200,
    duration: "5 Days/4 Nights",
    rating: "4.8",
    image: "/destinations/maldives.jpg",
  },
  {
    id: "nepal",
    location: "Nepal",
    title: "Himalayan Escape",
    price: 1800,
    duration: "6 Days/5 Nights",
    rating: "4.6",
    image: "/destinations/nepal.jpg",
  },
  {
    id: "santorini",
    location: "Greece",
    title: "Santorini Sunset",
    price: 2500,
    duration: "4 Days/3 Nights",
    rating: "4.9",
    image: "/destinations/santorini.jpg",
  },
  {
    id: "swiss",
    location: "Switzerland",
    title: "Alpine Retreat",
    price: 3000,
    duration: "8 Days/7 Nights",
    rating: "4.7",
    image: "/destinations/swiss.jpg",
  },
];

const FeaturedDestinations = () => {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Featured Destinations
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/destinations" />}
          className="w-fit rounded-sm border-cyan-500/70 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700"
        >
          All Destinations
          <ArrowRight className="size-3.5" />
        </Button>
      </div>

      {/* Carousel */}
      <Carousel opts={{ align: "start" }} className="mt-8">
        <CarouselContent>
          {destinations.map((destination) => (
            <CarouselItem
              key={destination.id}
              className="basis-[85%] sm:basis-1/2 lg:basis-[38%] xl:basis-1/3"
            >
              <Card className="gap-3 overflow-hidden rounded-xl bg-transparent py-0 ring-0">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <Image
                    src={destination.image}
                    alt={destination.title}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 38vw"
                    className="object-cover"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 h-auto gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur"
                  >
                    {destination.rating}
                    <Star className="size-3 fill-current" />
                  </Badge>
                </div>

                <CardContent className="space-y-1.5 px-0">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <MapPin className="size-3.5" strokeWidth={1.8} />
                    {destination.location}
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {destination.title}
                    </h3>
                    <p className="shrink-0 text-right whitespace-nowrap">
                      <span className="text-base font-semibold text-neutral-900">
                        ${destination.price}
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        /Person
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <CalendarDays className="size-3.5" strokeWidth={1.8} />
                    {destination.duration}
                  </div>

                  <Link
                    href="/destinations"
                    className="inline-flex items-center gap-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-600 transition-colors hover:text-cyan-700"
                  >
                    Book Now
                    <ArrowUpRight className="size-3.5" strokeWidth={2} />
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Footer controls */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm text-neutral-600">1/5</span>
          <Separator className="flex-1 bg-neutral-200" />
          <CarouselPrevious className="static my-0 size-9 border-neutral-300 text-neutral-500 hover:bg-neutral-100" />
          <CarouselNext className="static my-0 size-9 border-neutral-300 text-neutral-500 hover:bg-neutral-100" />
        </div>
      </Carousel>
    </section>
  );
};

export default FeaturedDestinations;
