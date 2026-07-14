import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { listOrders } from "@/lib/orders";
import { AdminOrdersList } from "@/components/AdminOrdersList";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
  if (!isAuthed) redirect("/admin/login");

  const orders = await listOrders();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-camp-forest-900">ניהול הזמנות</h1>
        <AdminLogoutButton />
      </div>
      <AdminOrdersList orders={orders} />
    </div>
  );
}
