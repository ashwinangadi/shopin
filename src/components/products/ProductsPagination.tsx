import React, { useRef, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { urlParam } from "@/hooks/URL_Param";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductsPagination = ({ totalProduct }: { totalProduct: number }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const limit = 10;
  const skip = useRef(0);
  const totalPages = Math.ceil(totalProduct / limit);

  const updateURL = (newSkip: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("skip", newSkip.toString());
    params.set("limit", limit.toString());
    const newURL = `${pathname}?${params.toString()}`;
    replace(newURL);
  };

  const handleNextPage = () => {
    if (skip.current + limit < totalProduct) {
      skip.current = skip.current + limit;
      updateURL(skip.current);
    }
  };

  const handlePreviousPage = () => {
    if (skip.current >= limit) {
      skip.current = skip.current - limit;
      updateURL(skip.current);
    }
  };

  //   const handlePageClick = (pageNumber) => {
  //     setPage(pageNumber);
  //   };
  console.log("skip123", skip.current);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              handlePreviousPage();
            }}
            href={`#`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              handleNextPage();
            }}
            href={`#`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductsPagination;
