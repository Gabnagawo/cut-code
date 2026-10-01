import * as React from "react";

import { cn } from "@/lib/utils";

/** <img> que some se falhar, deixando aparecer o gradiente do container. */
export function SafeImage({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return null;
  return (
    <img
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  );
}
