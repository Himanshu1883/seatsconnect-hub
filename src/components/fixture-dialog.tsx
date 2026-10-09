"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  fixtureTitle,
  formatPrice,
  packagesFor,
  type Currency,
  type Fixture,
} from "@/lib/catalog";
import { cn } from "cn";

export function FixtureDialog({
  fixture,
  currency,
  onClose,
}: {
  fixture: Fixture | null;
  currency: Currency;
  onClose: () => void;
}) {
  const [packageId, setPackageId] = useState("hospitality");
  const [quantity, setQuantity] = useState(2);
  const [sent, setSent] = useState(false);

  const packages = fixture ? packagesFor(fixture) : [];
  const selected = packages.find((item) => item.id === packageId) ?? packages[0];

  return (
    <Dialog
      open={fixture != null}
      onOpenChange={(open) => {
        if (!open) {
          setSent(false);
          setPackageId("hospitality");
          setQuantity(2);
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[min(90vh,820px)] overflow-y-auto sm:max-w-2xl">
        {fixture ? (
          <>
            <div className="relative h-40 w-full overflow-hidden rounded-xl sm:h-48">
              <Image src={fixture.image} alt="" fill sizes="640px" className="object-cover" />
            </div>
            <DialogHeader>
              <DialogTitle className="font-tech text-2xl font-bold text-brand-dark">
                {fixtureTitle(fixture)}
              </DialogTitle>
              <DialogDescription>
                {fixture.dateLabel} · {fixture.venue}, {fixture.city} · {fixture.competition}
              </DialogDescription>
            </DialogHeader>

            {sent && selected ? (
              <div className="rounded-2xl border border-brand-cta/15 bg-cream p-4">
                <p className="font-tech text-lg font-bold text-brand-dark">Request received.</p>
                <p className="mt-2 text-sm leading-6 text-brand-gray">
                  {quantity} × {selected.name} for {fixtureTitle(fixture)}. A specialist will
                  confirm availability
                  {fixture.soldOut ? " or the next release" : ""} before anything is charged.
                  Total held for review: {formatPrice(selected.priceUsd * quantity, currency)}.
                </p>
              </div>
            ) : (
              <form
                className="grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <fieldset className="grid gap-2">
                  <legend className="font-tech text-sm font-bold text-brand-dark">Package</legend>
                  {packages.map((item) => (
                    <label
                      key={item.id}
                      className={cn(
                        "flex cursor-pointer items-start justify-between gap-3 rounded-2xl border px-4 py-3",
                        packageId === item.id
                          ? "border-brand-cta bg-cream"
                          : "border-brand-cta/15 bg-white",
                      )}
                    >
                      <span>
                        <input
                          type="radio"
                          name="package"
                          className="sr-only"
                          checked={packageId === item.id}
                          onChange={() => setPackageId(item.id)}
                        />
                        <span className="block font-tech text-sm font-bold text-brand-dark">
                          {item.name}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-brand-gray">
                          {item.detail}
                        </span>
                      </span>
                      <span className="shrink-0 font-tech text-sm font-bold text-brand-cta">
                        {formatPrice(item.priceUsd, currency)}
                      </span>
                    </label>
                  ))}
                </fieldset>

                <label className="grid gap-1 text-sm font-medium text-brand-dark">
                  Guests
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={quantity}
                    onChange={(event) => setQuantity(Number(event.target.value) || 1)}
                    className="h-11 rounded-xl"
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input required placeholder="Name" aria-label="Name" className="h-11 rounded-xl" />
                  <Input
                    required
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-tech text-lg font-bold text-brand-dark">
                    {selected ? formatPrice(selected.priceUsd * quantity, currency) : ""}
                  </p>
                  <Button type="submit" className="h-auto rounded-full px-5 py-2.5 font-tech">
                    {fixture.soldOut ? "Join the waitlist" : "Request this package"}
                  </Button>
                </div>
              </form>
            )}
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export function LoginDialog({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}) {
  const [error, setError] = useState("");

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-tech text-xl font-bold">Login</DialogTitle>
          <DialogDescription>
            Sign in to keep package requests with your email on this page.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const email = String(data.get("email") || "");
            const password = String(data.get("password") || "");
            if (password.length < 6) {
              setError("Use at least 6 characters.");
              return;
            }
            setError("");
            onSuccess(email);
          }}
        >
          <Input required type="email" name="email" placeholder="Email" aria-label="Email" className="h-11 rounded-xl" />
          <Input
            required
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            className="h-11 rounded-xl"
          />
          {error ? <p className="text-sm text-[#9a3412]">{error}</p> : null}
          <Button type="submit" className="h-auto rounded-full font-tech">
            Sign in
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
