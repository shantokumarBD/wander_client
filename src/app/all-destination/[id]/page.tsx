import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DestinationType } from "@/types";
import { EditDestination } from "@/components/EditDestination/EditDestination";
import { DeleteDestinationDialog } from "@/components/shared/DeleteDestinationDialog";
import BookingCard from "@/components/shared/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFormServer } from "@/lib/gettokenformServer";
import { API_URL } from "@/lib/api";

const highlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const token = await getTokenFormServer();

  const res = await fetch(`${API_URL}/all-destination/${id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  });
  const result = await res.json();

  if (!result.success || !result.data) {
    notFound();
  }

  const destination: DestinationType = result.data;
  const image = destination.imageUrl?.includes("example.com")
    ? "/destinations/bali.jpg"
    : destination.imageUrl;

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/all-destination"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-2">
          <EditDestination destination={destination} />

          <DeleteDestinationDialog
            id={destination._id}
          ></DeleteDestinationDialog>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-6 aspect-[21/9] w-full overflow-hidden bg-neutral-100">
        <Image
          src={image}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
        {/* Left column */}
        <div>
          <div className="flex items-center gap-1.5 text-sm text-neutral-500">
            <MapPin className="size-4" strokeWidth={1.8} />
            {destination.country}
          </div>

          <h1
            className={`mt-2 text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl`}
          >
            {destination.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="size-4 fill-emerald-600 text-emerald-600" />
              <span className="font-semibold text-emerald-600">
                {destination.rating ?? "4.5"}
              </span>
              <span className="text-neutral-500">(234 reviews)</span>
            </div>

            <span className="text-neutral-300">|</span>

            <div className="flex items-center gap-1.5 text-neutral-600">
              <CalendarDays className="size-4" strokeWidth={1.8} />
              {destination.duration}
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-medium text-neutral-900">
            Overview
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            {destination.description}
          </p>

          <h2 className="mt-8 text-2xl font-medium text-neutral-900">
            Highlights
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            {destination.description}
          </p>

          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2 text-sm text-neutral-600"
              >
                <Check className="size-4 shrink-0 text-emerald-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Booking card */}
        <BookingCard destination={destination}></BookingCard>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
