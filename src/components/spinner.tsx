import * as React from "react";
import { Loader2 } from "lucide-react";

function Spinner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      <Loader2 className="size-12 animate-spin" />
    </div>
  );
}

export { Spinner };
