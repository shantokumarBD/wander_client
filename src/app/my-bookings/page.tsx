import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { BookingType } from "@/types";
import MyBookingCard from "@/components/shared/MyBookingCard";
import { Button } from "@/components/ui/button";
import { getTokenFormServer } from "@/lib/gettokenformServer";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const token = getTokenFormServer()

  const res = await fetch(`http://localhost:8000/my-bookings/${user.email}`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
  });

  const data = await res.json();
  const bookings: BookingType[] = data?.data || [];

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Page Heading */}
      <div className="mb-8">
        <h1
          className={` text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl`}
        >
          My Bookings
        </h1>
        <p className="mt-2 text-sm text-neutral-500 sm:text-[15px]">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="space-y-4 sm:space-y-5">
          {bookings.map((booking) => (
            <MyBookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-16 text-center">
          <p className="text-lg font-medium text-neutral-800">
            No bookings found yet
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            You haven&apos;t booked any travel packages yet. Explore our destinations and plan your next journey!
          </p>
          <Link href="/all-destination" className="mt-5">
            <Button className="bg-cyan-600 text-white hover:bg-cyan-700">
              Explore Destinations
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default MyBookingPage;
