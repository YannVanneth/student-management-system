"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const image_url: string =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjZob2dobW5ubmEyeHZqYjU1NnA1YmE1eGt5NTQ0cW0yYmhwN3phMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1ken0zzzL79NPy3QZj/giphy.gif";

export default function UpComingFeatures({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>So sorry!</DialogTitle>
          <DialogDescription>
            This feature is coming soon. Please check back later.
          </DialogDescription>
        </DialogHeader>
        <img src={image_url} alt="coming soon" className="rounded-lg" />
      </DialogContent>
    </Dialog>
  );
}
