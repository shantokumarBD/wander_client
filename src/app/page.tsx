import Hero from "@/components/home/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import StartJourney from "@/components/home/StartJourney";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedDestinations />
      <WhyChoose />
      <Testimonials />
      <StartJourney />
    </main>
  );
};

export default HomePage;
