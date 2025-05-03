"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

const PaginationPage = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div>
      <Pagination className="w-full flex flex-row  justify-between">
        <PaginationContent className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={isActive}
                  className={`${
                    isActive
                      ? "border-none bg-(--primary) text-(--background)"
                      : ""
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </PaginationContent>
        <PaginationContent className="flex flex-row gap-8">
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage > 1 ? currentPage - 1 : 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={createPageURL(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationPage;
