"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="charset" content="utf-8" />
        <title>Something went wrong !</title>
      </head>
      <body>
        <div>
          <p>Something went wrong!</p>
          <button onClick={() => reset()}>Reset error boundary</button>
        </div>
      </body>
    </html>
  );
}
