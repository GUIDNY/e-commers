"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function FailureContent() {
  const orderNumber = useSearchParams().get("order");

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-extrabold text-camp-forest-900">התשלום לא הושלם</h1>
      {orderNumber && (
        <p className="mt-3 text-camp-bark-800/80">
          מספר הזמנה: <span className="font-mono font-semibold">{orderNumber}</span>
        </p>
      )}
      <p className="mt-2 text-camp-bark-800/70">
        לא בוצע חיוב. אפשר לנסות שוב, או ליצור קשר אם הבעיה חוזרת.
      </p>

      <Link
        href="/checkout"
        className="mt-8 inline-block rounded-full bg-camp-amber-600 px-6 py-3 text-sm font-bold text-white hover:bg-camp-amber-500"
      >
        לנסות שוב
      </Link>
    </div>
  );
}

export default function CheckoutFailurePage() {
  return (
    <Suspense>
      <FailureContent />
    </Suspense>
  );
}
