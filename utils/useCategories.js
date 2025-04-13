"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoriesClient } from "@/actions/categoriesClient";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesClient,
  });
}
