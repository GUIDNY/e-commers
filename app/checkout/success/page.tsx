"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { ShieldIcon } from "@/components/Icons";

function SuccessContent() {
  const orderNumber = useSearchParams().get("order");
  const { clear } = useCart();

  // Payment is confirmed (PayPlus only redirects here after a completed
  // charge) - safe to empty the cart now, unlike on checkout submit.
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-camp-forest-700/10 text-camp-forest-700">
        <ShieldIcon className="h-7 w-7" />
      </div>
      <h1 className="text-2xl font-extrabold text-camp-forest-900">התשלום התקבל בהצלחה! 🎉</h1>
      {orderNumber && (
        <p className="mt-3 text-camp-bark-800/80">
          מספר הזמנה: <span className="font-mono font-semibold">{orderNumber}</span>
        </p>
      )}
      <p className="mt-2 text-camp-bark-800/70">מייל אישור עם פרטי ההזמנה נשלח אליך. תודה שקנית ב-קמפאיזי!</p>

      <Link
        href="/products"
        className="mt-8 inline-block rounded-full bg-camp-forest-700 px-6 py-3 text-sm font-bold text-white hover:bg-camp-forest-600"
      >
        המשך בקנייה
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
