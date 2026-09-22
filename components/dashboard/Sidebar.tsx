"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  Tags,
  Settings,
  Wallet,
  X,
  SavePlusIcon,
  ReceiptCentIcon,
  BanknoteArrowUp,
  BanknoteArrowDown,
  TrendingUpIcon,
  Pen,
  Notebook,
  NotebookPen,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Income",
    href: "/add_income",
    icon: BanknoteArrowUp,
  },
  {
    name: "Add Expenses",
    href: "/add_expense",
    icon: BanknoteArrowDown,
  },
   {
    name: "All Transaction",
    href: "/transaction",
    icon: NotebookPen,
  },
  // {
  //   name: "Add Savings",
  //   href: "/saving",
  //   icon: SavePlusIcon,
  // },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
        {/* Logo */}
        

        <div className="">
          <div className="flex h-16 w-50 items-center border-b px-5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
              <Wallet className="h-5 w-5" />
            </div>

            <span className="font-bold">Expense</span>
          </Link>
        </div>
        <nav className="space-y-1 p-4 w-50 ">
          <p className="mb-3 px-3 text-xs font-semibold uppercase text-gray-400">
            Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition
                ${
                  active
                    ? "bg-black text-gray-50"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <Icon className="h-5 w-5" />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 w-50 border-t p-4">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-semibold">Expense</p>
            <p className="mt-1 text-xs text-gray-500">Track your money easily.</p>
          </div>
        </div>
      </div>
    </>
  );
}