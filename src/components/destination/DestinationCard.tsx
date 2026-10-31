import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { DestinationType } from "@/types";

const fallbackByCategory: Record<string, string> = {
  Beach: "/destinations/maldives.jpg",
  Island: "/destinations/bali.jpg",
  Mountain: "/destinations/nepal.jpg",
  Nature: "/destinations/swiss.jpg",
  City: "/destinations/santorini.jpg",
};

const DestinationCard = ({ destination }: { destination: DestinationType }) => {
  const fallback =
    fallbackByCategory[destination.category] ?? "/destinations/bali.jpg";

  const image =
    destination.imageUrl && !destination.imageUrl.includes("example.com")
      ? destination.imageUrl
      : fallback;

  return (
    <Card className="gap-3 rounded-none bg-transparent py-0 ring-0">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-neutral-100">
        <Image
          src={image}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />

        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-sm border border-neutral-900/10 bg-white px-2 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
          {destination.rating ?? "4.5"}
          <Star className="size-3 fill-neutral-900 text-neutral-900" />
        </div>
      </div>

      <CardContent className="space-y-1.5 px-0">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <MapPin className="size-3.5" strokeWidth={1.8} />
          {destination.country}
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-neutral-900">
            {destination.name}
          </h3>
          <p className="shrink-0 text-right whitespace-nowrap">
            <span className="text-base font-semibold text-neutral-900">
              ${destination.price}
            </span>
            <span className="text-[11px] text-neutral-500">/Person</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <CalendarDays className="size-3.5" strokeWidth={1.8} />
          {destination.duration}
        </div>

        <Link
          href={`/all-destination/${destination._id}`}
          className="inline-flex items-center gap-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-600 transition-colors hover:text-cyan-700"
        >
          Book Now
          <ArrowUpRight className="size-3.5" strokeWidth={2} />
        </Link>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
