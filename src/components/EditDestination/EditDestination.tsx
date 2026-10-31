"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Pencil, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { DestinationType } from "@/types";

export function EditDestination({
  destination,
}: {
  destination?: DestinationType;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!destination?._id) {
      toast.error("Destination ID not found.");
      return;
    }

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch(
        `http://localhost:8000/all-destination/${destination._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            price: Number(data.price) || data.price,
          }),
        }
      );

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Travel package updated successfully!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update package.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error! Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="rounded-md border-neutral-300 text-neutral-800"
          >
            <Pencil className="size-3.5" />
            Edit
          </Button>
        }
      />
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto p-0 sm:max-w-[560px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="gap-1.5 px-6 pt-6 pr-12 sm:px-7 sm:pt-7">
            <DialogTitle className="text-lg font-semibold text-neutral-900">
              Update Travel Package
            </DialogTitle>
            <DialogDescription>
              Make changes to the travel package details below
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-2 sm:px-7">
            {/* Destination name */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="edit-name">Destination Name</Label>
              <Input
                id="edit-name"
                name="name"
                defaultValue={destination?.name ?? ""}
                placeholder="Bali Paradise"
                required
              />
            </div>

            {/* Country */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-country">Country</Label>
              <Input
                id="edit-country"
                name="country"
                defaultValue={destination?.country ?? ""}
                placeholder="Indonesia"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-category">Category</Label>
              <NativeSelect
                id="edit-category"
                name="category"
                defaultValue={destination?.category ?? "Beach"}
                className="w-full"
              >
                <NativeSelectOption value="Beach">Beach</NativeSelectOption>
                <NativeSelectOption value="Mountain">Mountain</NativeSelectOption>
                <NativeSelectOption value="City">City</NativeSelectOption>
                <NativeSelectOption value="Adventure">Adventure</NativeSelectOption>
                <NativeSelectOption value="Cultural">Cultural</NativeSelectOption>
              </NativeSelect>
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-price">Price (USD)</Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                defaultValue={destination?.price ?? ""}
                placeholder="e.g., 1299"
                required
              />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-duration">Duration</Label>
              <Input
                id="edit-duration"
                name="duration"
                defaultValue={destination?.duration ?? ""}
                placeholder="e.g., 7 Days/6 Nights"
                required
              />
            </div>

            {/* Departure date */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="edit-departure-date">Departure Date</Label>
              <Input
                id="edit-departure-date"
                name="departureDate"
                type="date"
                defaultValue={destination?.departureDate ?? ""}
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="edit-image-url">Image URL</Label>
              <Input
                id="edit-image-url"
                name="imageUrl"
                type="url"
                defaultValue={destination?.imageUrl ?? ""}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                defaultValue={destination?.description ?? ""}
                placeholder="Describe the travel experience..."
                rows={4}
                className="min-h-[120px]"
              />
            </div>
          </div>

          <DialogFooter className="mx-0 mb-0 gap-3 rounded-b-xl px-6 py-5 sm:px-7">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  className="h-10 w-full gap-2 rounded-md border-red-300 bg-white text-red-500 hover:bg-red-50 hover:text-red-600 sm:w-auto"
                >
                  <Trash2 className="size-4" />
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-10 w-full gap-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
