import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

const Hero = () => {
  return (
    <section className="relative isolate w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero.jpg"
          alt="Coastal town with turquoise water surrounded by green hills"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/55" />
      </div>

      <div className="flex min-h-[calc(100vh-4rem)] flex-col">
        {/* Centered hero content */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-20 pb-12 text-center sm:px-6 lg:px-8">
          <h1
            className={`${cormorant.className} text-5xl font-light leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[80px]`}
          >
            Discover Your
            <br />
            Next Adventure
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center gap-2 bg-cyan-600 px-9 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-cyan-700"
            >
              Explore Now
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center bg-white/25 px-9 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors hover:bg-white/35"
            >
              View Destination
            </Link>
          </div>
        </div>

        {/* Bottom search bar */}
        <div className="w-full border-t border-white/10 bg-black/35 text-white backdrop-blur-sm">
          <div className="flex flex-col divide-y divide-white/15 lg:flex-row lg:divide-x lg:divide-y-0">
            {searchFields.map((field) => (
              <div key={field.label} className="flex-1 px-5 py-3.5 text-left">
                <p className="text-sm font-semibold leading-tight">
                  {field.label}
                </p>
                <p className="mt-0.5 text-xs text-white/70">{field.value}</p>
              </div>
            ))}
            <button
              type="button"
              className="flex items-center justify-center bg-cyan-600 px-10 py-4 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 lg:px-14"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
