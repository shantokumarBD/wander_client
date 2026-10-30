"use client";

import { Package, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const AddDestinationForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const res = await fetch("http://localhost:8000/add-destination", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json()
    console.log(result)

    form.reset();
  };

  return (
    <Card className="mx-auto mt-8 w-full max-w-[480px] gap-0 rounded-lg bg-white p-6 ring-1 ring-neutral-200 sm:p-8">
      <form
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        onSubmit={handleSubmit}
        method="POST"
      >
        {/* Destination Name */}
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="name">Destination Name</Label>
          <Input id="name" name="name" placeholder="Bali Paradise" required />
        </div>

        {/* Country */}
        <div className="space-y-1.5">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" placeholder="Indonesia" required />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <NativeSelect
            id="category"
            name="category"
            defaultValue="Beach"
            className="w-full"
          >
            {categories.map((cat) => (
              <NativeSelectOption key={cat} value={cat}>
                {cat}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="e.g., 1299"
            required
          />
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            placeholder="e.g., 7 Days/6 Nights"
            required
          />
        </div>

        {/* Departure Date */}
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input id="departureDate" name="departureDate" type="date" required />
        </div>

        {/* Image URL */}
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the travel experience..."
            rows={4}
            className="min-h-[120px]"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:col-span-2 sm:flex-row sm:justify-end">
          <Button
            type="reset"
            variant="outline"
            className="gap-2 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="size-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            className="gap-2 bg-cyan-600 text-white hover:bg-cyan-700"
          >
            <Package className="size-4" />
            Add Travel Package
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddDestinationForm;
