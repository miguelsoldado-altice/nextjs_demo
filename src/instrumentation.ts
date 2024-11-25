import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({ serviceName: "next-app" });
}

// export const onRequestError: Instrumentation.onRequestError = async () => {}
export async function onRequestError(
  error: { digest: string } & Error,
  request: {
    path: string; // resource path, e.g. /blog?name=foo
    method: string; // request method. e.g. GET, POST, etc
    headers: { [key: string]: string };
  },
  context: {
    routerKind: "Pages Router" | "App Router"; // the router type
    routePath: string; // the route file path, e.g. /app/blog/[dynamic]
    routeType: "render" | "route" | "action" | "middleware"; // the context in which the error occurred
    renderSource: "react-server-components" | "react-server-components-payload" | "server-rendering";
    revalidateReason: "on-demand" | "stale" | undefined; // undefined is a normal request without revalidation
    renderType: "dynamic" | "dynamic-resume"; // 'dynamic-resume' for PPR
  },
) {
  console.log("Instrumentation Error:", error);
}

// https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
// https://nextjs.org/docs/app/building-your-application/optimizing/open-telemetry
