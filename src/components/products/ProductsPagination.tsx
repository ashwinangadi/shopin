import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LIMIT } from "@/utils/api/api";

const ProductsPagination = ({ totalProduct }: { totalProduct: number }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const limit = LIMIT;

  // Use useState instead of useRef
  const [skip, setSkip] = useState<number>(
    Number(searchParams.get("skip")) || 0
  );

  const totalPages = Math.ceil(totalProduct / limit);
  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const updateURL = (newSkip: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("skip", newSkip.toString());
    params.set("limit", limit.toString());
    const newURL = `${pathname}?${params.toString()}`;
    replace(newURL);
  };

  const handleNextPage = () => {
    if (skip + limit < totalProduct) {
      const newSkip = skip + limit;
      setSkip(newSkip);
      updateURL(newSkip);
    }
  };

  const handlePreviousPage = () => {
    if (skip >= limit) {
      const newSkip = skip - limit;
      setSkip(newSkip);
      updateURL(newSkip);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    const newSkip = (pageNumber - 1) * limit;
    setSkip(newSkip);
    updateURL(newSkip);
  };

  return (
    <Pagination className=" mt-10 mb-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`#`}
            onClick={(e) => {
              e.preventDefault();
              handlePreviousPage();
            }}
          />
        </PaginationItem>
        <Select
          value={(skip / limit + 1).toString()}
          onValueChange={(value) => handlePageClick(Number(value))}
        >
          <SelectTrigger className="w-[70px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {totalPagesArray.map((pageNumber) => (
              <SelectItem key={pageNumber} value={pageNumber.toString()}>
                {pageNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <PaginationItem>
          <PaginationNext
            href={`#`}
            onClick={(e) => {
              e.preventDefault();
              handleNextPage();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductsPagination;
