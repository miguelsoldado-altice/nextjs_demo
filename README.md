- how react came to be
  . in the beggining everything was server side rendered
  . once js was introduced jquery helped people do changes to the DOM using js
  . due to need of better interaction, improved hardware and server costs libs like react became popular
  . most web apps moved to CSR only (React, Angular, Vue...)
  . with the expansion of the web SEO became more relevant
  . some SSR models came up but the big struggle was having both the "+" of having SSR but still keeping a highly interactive apps. (Next.js, Astro, Remix...)
  . the react team proposed the "server components" model and next.js used it to develop the "app router" (previously only the "pages router" existed)
  . do a mock drawing of the markup that was sent to the client with react without SSR and with SSR

- nextjs motivation behind caching everything
  . the company behind nextjs (vercel) is a hosting provider so there was some motivation in reducing server costs for themselves and for the client
  . they took a CDN like cache approach to serving content and proposed 3 different models (SSR, SSG, ISR)
  . https://dev.to/pahanperera/visual-explanation-and-comparison-of-csr-ssr-ssg-and-isr-34ea
- "react server components" paradigm shift

  . https://www.joshwcomeau.com/react/server-components/
  . it's effectively a html template generator (like rails or htmx) with a js react bundle added on top
  . "use server" components will ONLY render in the server
  . "use client" does not mean the component will not run on the server, it only tells react that the component will need event handlers and js interactivity
  . nextjs was the first meta-framework that adopted RSC and joined forces with the react team to change the core react model to it
  . https://www.youtube.com/live/T8TZQ6k4SLE?t=18825s

- demo
  . file routing (layout.tsx, page.tsx, dynamic routes)
  . show caching definitions + typescript version change.
  . show hydration warning and how to get around it.
  . api calls with + without suspense boundaries. (+ explain why we currently aren't using this in any project)
  . passing server components as props to client components.
  . explain how server actions work (POST endpoint is created) and the need of safe keeping endpoints with either validations or the react taint (import "server-only")
  . quick route handlers example.
  . react taint: https://nextjs.org/blog/security-nextjs-server-components-actions