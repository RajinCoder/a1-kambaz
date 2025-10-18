"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name?: string } | undefined;
}) {
  const pathname = usePathname();
  const segment = pathname?.split("/").pop();
  return (
    <span>
      Course {course?.name} &gt; {segment}
    </span>
  );
}
