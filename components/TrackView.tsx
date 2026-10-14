"use client";
// Fires one GA4 ecommerce event when a page mounts (view_item on product pages, view_item_list on the shop),
// completing the funnel: view_item_list → view_item → add_to_cart → begin_checkout → purchase.
import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

export default function TrackView({ event, params }: { event: string; params: Record<string, unknown> }) {
  useEffect(() => { trackEvent(event, params); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
