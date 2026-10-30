import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";

import { Button } from "@/components/ui/button";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const StartJourney = () => {
  return (
    <section className="relative isolate w-full overflow-hidden">
      {/* Background image + gradient overlays */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/cta.jpg"
          alt="Aerial view of a tropical island surrounded by turquoise water"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/85 via-[#0a2a31]/65 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <h2
          className={`${cormorant.className} text-4xl font-light tracking-tight text-white sm:text-5xl`}
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Button
          variant="default"
          nativeButton={false}
          render={<Link href="/destinations" />}
          className="mt-8 h-auto gap-2 rounded-none bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-900 hover:bg-neutral-100"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
};

export default StartJourney;
