"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrenciesClient } from "@/actions/currenciesClient";

export function useCurrencies() {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrenciesClient,
    staleTime: 1000 * 60 * 5,
  });
}
