import { Cormorant_Garamond } from "next/font/google";

import AddDestinationForm from "@/components/shared/AddDestinationForm";



const AddDestinationPage = () => {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <h1
        className={` text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl`}
      >
        Add New Travel Package
      </h1>
      <AddDestinationForm />
    </main>
  );
};

export default AddDestinationPage;
