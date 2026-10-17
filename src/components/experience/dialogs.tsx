"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, X } from "lucide-react";
import type { Collection } from "@/lib/experiences";
import { Icon3D } from "./icons-3d";
import { btnBase, btnPrimarySoft } from "./ui";
import { cn } from "cn";

const closeBtn = cn(
  btnBase,
  "rounded-full border border-line-strong bg-white px-6 py-[15px] text-[13px] text-brand-cta hover:bg-[#eef3f5]",
);

function Shell({
  open,
  onClose,
  eyebrow,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => (next ? null : onClose())}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#0e1d30bb] backdrop-blur-sm duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-[30px] bg-paper p-8 text-ink shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 sm:p-10">
          <Dialog.Close
            aria-label="Close"
            className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full bg-sand text-brand-cta transition-colors hover:bg-brand-cta hover:text-white"
          >
            <X className="size-4" />
          </Dialog.Close>
          <span className="over text-gold-deep">{eyebrow}</span>
          <Dialog.Title className="my-4 pr-10 font-tech text-[30px] leading-[1.12] font-bold">{title}</Dialog.Title>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function CollectionDialog({
  item,
  onClose,
  onEnquire,
}: {
  item: Collection | null;
  onClose: () => void;
  onEnquire: (item: Collection) => void;
}) {
  return (
    <Shell open={item != null} onClose={onClose} eyebrow="Explore the collection" title={item?.title ?? ""}>
      <Dialog.Description className="text-[15px] leading-[1.65] text-taupe">{item?.desc}</Dialog.Description>
      <ul className="mt-5 space-y-2.5 text-[15px]">
        {[
          "Official seating options, subject to availability",
          "Hospitality and private box enquiries",
          "Package inclusions and pricing confirmed individually",
        ].map((point) => (
          <li key={point} className="flex items-center gap-3">
            <Icon3D name="check" className="size-6" />
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[13px] text-taupe">Collection preview. No live inventory or checkout is connected.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        {item?.href ? (
          <Link href={item.href} className={btnPrimarySoft} onClick={onClose}>
            View tickets
            <ArrowUpRight className="size-4" />
          </Link>
        ) : (
          <a
            href="#request"
            className={btnPrimarySoft}
            onClick={(event) => {
              event.preventDefault();
              if (item) onEnquire(item);
            }}
          >
            Enquire about this event
            <ArrowUpRight className="size-4" />
          </a>
        )}
        <Dialog.Close className={closeBtn}>Close</Dialog.Close>
      </div>
    </Shell>
  );
}

export function SocialDialog({ caption, onClose }: { caption: string | null; onClose: () => void }) {
  return (
    <Shell open={caption != null} onClose={onClose} eyebrow="Social media preview" title={caption ?? ""}>
      <Dialog.Description className="text-[15px] leading-[1.65] text-taupe">
        This is an illustrative layout slot. Add your approved Instagram post, event photograph or
        video here to enable genuine social content and playback.
      </Dialog.Description>
      <Dialog.Close className={cn(closeBtn, "mt-7")}>Close preview</Dialog.Close>
    </Shell>
  );
}
