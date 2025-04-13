"use client";

import { useQuery } from "@tanstack/react-query";
import { getMealsWithDetails } from "@/actions/meals";

export function useMeals() {
  return useQuery({
    queryKey: ["meals"],
    queryFn: getMealsWithDetails,
    staleTime: 1000 * 60 * 5, // dane cache'owane przez 5 minut
  });
}
