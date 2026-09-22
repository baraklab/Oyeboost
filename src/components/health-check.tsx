"use client";

import * as React from "react";

const POLL_INTERVAL_MS = 10 * 60 * 1000;

export function HealthCheck() {
  React.useEffect(() => {
    const ping = () => {
      fetch("/api/health").catch(() => {
        // Best-effort — a failed health ping shouldn't surface to the user.
      });
    };

    ping();
    const interval = setInterval(ping, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return null;
}
