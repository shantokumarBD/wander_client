"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Eye, Loader2, MapPin, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { BookingType } from "@/types";
import { Button } from "@/components/ui/button";

export const MyBookingCard = ({ booking }: { booking: BookingType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/my-bookings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Booking cancelled successfully!");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to cancel booking.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error! Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200/90 bg-white p-4 transition-shadow hover:shadow-sm sm:flex-row sm:items-center sm:gap-6 sm:p-5">
      {/* Thumbnail Image */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:h-36 sm:w-56">
        <Image
          src={booking.imageUrl || "/destinations/bali.jpg"}
          alt={booking.destinationName}
          fill
          sizes="(max-width: 640px) 100vw, 224px"
          className="object-cover"
        />
      </div>

      {/* Booking Details */}
      <div className="flex flex-1 flex-col justify-between self-stretch">
        <div>
          {/* Status Badge */}
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {booking.status || "Confirmed"}
          </span>

          {/* Title */}
          <h3 className="mt-1.5 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            {booking.destinationName}
          </h3>

          {/* Departure & Booking ID */}
          <div className="mt-2 space-y-1 text-xs text-neutral-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-neutral-400" />
              <span>Departure: {booking.departureDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-neutral-400" />
              <span>Booking ID: {booking._id}</span>
            </div>
          </div>
        </div>

        {/* Bottom row: Price & Actions */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2 sm:mt-2">
          {/* Price */}
          <p className="text-2xl font-bold text-cyan-600">
            ${booking.price}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Button
              onClick={() => handleDelete(booking._id)}
              disabled={loading}
              type="button"
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 rounded-md border-red-200 bg-white px-3 text-xs font-medium text-red-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
              {loading ? "Cancelling..." : "Cancel"}
            </Button>

            <Link href={`/all-destination/${booking.destinationId}`}>
              <Button
                size="sm"
                className="h-8 gap-1.5 rounded-md bg-cyan-600 px-3.5 text-xs font-medium text-white hover:bg-cyan-700"
              >
                <Eye className="size-3.5" />
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;
