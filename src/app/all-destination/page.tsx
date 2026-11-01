import { Cormorant_Garamond } from "next/font/google";

import DestinationCard from "@/components/destination/DestinationCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DestinationType } from "@/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { API_URL } from "@/lib/api";



const filterTriggerClass =
  "h-10 w-full justify-between rounded-none border-0 bg-transparent px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500 shadow-none hover:bg-neutral-50 focus-visible:border-0 focus-visible:ring-0 data-[size=default]:h-10!";

export const dynamic = "force-dynamic";

const getAllDestinations = async (): Promise<DestinationType[]> => {
  try {

    const jwtToken = await auth.api.getToken({
      headers: await headers()
    })

    const token = jwtToken?.token
    
    const res = await fetch(`${API_URL}/all-destination`, {
      cache: "no-store",
      headers:{
        authorization: `bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch destinations: ${res.status}`);
    }

    const result = await res.json();
    return Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const AllDestinationsPage = async () => {
  const destinations = await getAllDestinations();

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div>
        <h1
          className={` text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl`}
        >
          Explore All Destinations
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Find your perfect travel experience from our curated collection
        </p>
      </div>

      {/* Filters (visual only) */}
      <div className="mt-8 grid grid-cols-1 divide-y divide-neutral-200 border border-neutral-200 bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
        <Select>
          <SelectTrigger className={filterTriggerClass}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Categories">All Categories</SelectItem>
            <SelectItem value="Beach">Beach</SelectItem>
            <SelectItem value="Mountain">Mountain</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="City">City</SelectItem>
            <SelectItem value="Cultural">Cultural</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className={filterTriggerClass}>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any Price">Any Price</SelectItem>
            <SelectItem value="Under $1,500">Under $1,500</SelectItem>
            <SelectItem value="$1,500 - $2,500">$1,500 - $2,500</SelectItem>
            <SelectItem value="$2,500 - $3,500">$2,500 - $3,500</SelectItem>
            <SelectItem value="$3,500+">$3,500+</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className={filterTriggerClass}>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Recommended">Recommended</SelectItem>
            <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>
            <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>
            <SelectItem value="Rating: High to Low">Rating: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Result count */}
      <p className="mt-5 text-sm text-neutral-500">
        Showing {destinations.length} destinations
      </p>

      {/* Destination grid */}
      {destinations.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-neutral-300 px-6 py-16 text-center">
          <p className="text-sm text-neutral-500">
            No destinations available right now. Please check back later.
          </p>
        </div>
      )}
    </main>
  );
};

export default AllDestinationsPage;
