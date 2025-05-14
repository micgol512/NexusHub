"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Product } from "@/generated/prisma";

export const PathShow = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const [dynamicName, setDynamicName] = useState<string | null>(null);

  useEffect(() => {
    const fetchDynamicName = async () => {
      if (pathSegments[0] === "product" && pathSegments[1]) {
        try {
          const res = await fetch(`/api/product/${pathSegments[1]}`);
          const data: Product = await res.json();
          setDynamicName(data.name);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          setDynamicName(`Produkt #${pathSegments[1]}`);
        }
      }
    };

    fetchDynamicName();
  }, [pathname, pathSegments]);

  const formatSegment = (segment: string) =>
    segment.charAt(0).toUpperCase() + segment.slice(1);

  const buildPath = (index: number) => {
    return "/" + pathSegments.slice(0, index + 1).join("/");
  };

  return (
    <Breadcrumb className="mb-4 text-sm">
      <BreadcrumbList>
        {pathSegments.length !== 0 && (
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          if (pathSegments[0] === "product" && pathSegments[1])
            console.log("trururur");
          // pathSegments[1] = dynamicName || "Product ID";

          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbSeparator />
              {isLast ? (
                <span>{`${formatSegment(segment)}`}</span>
              ) : (
                <BreadcrumbLink href={buildPath(index)}>
                  {dynamicName ? dynamicName : `${formatSegment(segment)}`}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PathShow;
