// lib/queryClient.js
"use client";
import { QueryClient } from "@tanstack/react-query";

let client;

export function getQueryClient() {
  if (!client) {
    client = new QueryClient();
  }
  return client;
}
