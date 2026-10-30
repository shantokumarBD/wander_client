import { BookOpen, Headphones, ShieldCheck } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";

import { Card, CardContent } from "@/components/ui/card";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: BookOpen,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

const WhyChoose = () => {
  return (
    <section className="w-full bg-[#e7f6fb] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`${cormorant.className} text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl`}
          >
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-neutral-500 sm:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="gap-0 rounded-none bg-white py-0 ring-0"
            >
              <CardContent className="p-8">
                <Icon className="size-9 text-cyan-600" strokeWidth={1.6} />
                <h3
                  className={`${cormorant.className} mt-6 text-2xl font-medium text-neutral-900`}
                >
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
