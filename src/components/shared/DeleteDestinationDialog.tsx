"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { GetTokenFormClient } from "@/lib/gettokenformClient";

export function DeleteDestinationDialog({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const token = await GetTokenFormClient();
    try {
      const res = await fetch(`http://localhost:8000/all-destination/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Destination deleted successfully!");
        router.push("/all-destination");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to delete destination.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error! Please check if backend is running.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="rounded-md border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this travel
            package from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
