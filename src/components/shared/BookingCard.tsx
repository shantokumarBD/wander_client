"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { DestinationType } from "@/types";
import { useSession } from "@/lib/auth-client";
import { GetTokenFormClient } from "@/lib/gettokenformClient";
import { API_URL } from "@/lib/api";

const BookingCard = ({ destination }: { destination: DestinationType }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first to book this destination!");
      router.push("/login");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const departureDate = formData.get("departureDate");

    const bookingData = {
      username: user.name,
      email: user.email,
      country: destination.country,
      category: destination.category,
      price: destination.price,
      destinationId: destination._id,
      destinationName: destination.name,
      departureDate: departureDate,
      bookingDate: new Date(),
    };

    setLoading(true);

    try {
      const token = await GetTokenFormClient();

      const res = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        toast.success("Destination booked successfully!");
        router.push("/my-bookings");
      } else {
        toast.error(resData.message || "Failed to book destination.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error! Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <aside className="h-fit rounded-md border border-neutral-200 bg-white p-5">
        <p className="text-xs text-neutral-500">Starting from</p>
        <p className="mt-1 text-2xl font-semibold text-cyan-600">
          ${destination.price}
        </p>
        <p className="text-xs text-neutral-500">per person</p>
        <form onSubmit={handleBooking}>
          <input
            className="mt-5 rounded-sm border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-700 flex justify-between w-full"
            name="departureDate"
            type="date"
            defaultValue={destination.departureDate}
          />

          <Button
            type="submit"
            disabled={loading}
            className="mt-4 h-10 w-full rounded-sm bg-cyan-600 text-white hover:bg-cyan-700"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Booking...
              </>
            ) : (
              <>
                Book Now
                <ArrowRight className="size-4 ml-1" />
              </>
            )}
          </Button>
        </form>

        <ul className="mt-5 space-y-2.5">
          <li className="flex items-center gap-2 text-xs text-neutral-600">
            <Check className="size-3.5 shrink-0 text-emerald-600" />
            Free cancellation up to 7 days
          </li>
          <li className="flex items-center gap-2 text-xs text-neutral-600">
            <Check className="size-3.5 shrink-0 text-emerald-600" />
            Travel Insurance included
          </li>
          <li className="flex items-center gap-2 text-xs text-neutral-600">
            <Check className="size-3.5 shrink-0 text-emerald-600" />
            24/7 customer support
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default BookingCard;
