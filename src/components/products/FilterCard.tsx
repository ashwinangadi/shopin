import React from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterCardProps = {
  item: string;
  queryName: string;
  description?: string;
  itemType: "text" | "number";
};

const FilterCard = ({
  item,
  queryName,
  description,
  itemType,
}: FilterCardProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const urlParams = new URLSearchParams(searchParams.toString());

  const updateParams = (
    queryName: string,
    paramName: string,
    checked: boolean
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    const currentParams = params.getAll(paramName);

    if (checked) {
      if (!currentParams.includes(queryName)) {
        currentParams.push(queryName);
      }
    } else {
      const index = currentParams.indexOf(queryName);
      if (index > -1) {
        currentParams.splice(index, 1);
      }
    }

    params.delete(paramName);
    currentParams.forEach((b) => params.append(paramName, b));

    const newURL = `${pathname}?${params.toString()}`;
    replace(newURL);
  };

  let itemName = item;
  if (item == undefined) {
    if (queryName === "brand") {
      itemName = "Local Business";
    }
  }

  const param = itemType === "text" ? itemName.split(" ").join("_").toLowerCase() : item;

  return (
    <div key={item} className="flex items-center font-light gap-2 text-sm">
      <Input
        type="checkbox"
        name={queryName + "Checkbox"}
        checked={urlParams.getAll(queryName).includes(param)}
        onChange={(e) => updateParams(param, queryName, e.target.checked)}
        className="w-4 h-4"
      />
      <p>
        {itemName}
        {queryName === "rating" && (
          <span className="text-orange-500"> &#9733;</span>
        )}
        {description}
      </p>
    </div>
  );
};

export default FilterCard;
