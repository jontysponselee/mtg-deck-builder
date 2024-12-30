import type { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import { config } from "../config.ts";
import { ModalContainer } from "../islands/ActionModal.tsx";

/** @todo
 * - Create stack for closeable items when pressing "Escape" (document.activeElement is not always representable of the active screen)
 */

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{config.appName}</title>

        <link rel="preload" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css" as="style" />
        <link rel="preload" href={asset("/styles.css")} as="style" />
        <link rel="preload" href={"https://kit.fontawesome.com/a9ed7151df.js"} as="script" />


        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"
        />
        <link rel="stylesheet" href={asset("/styles.css")} />
        <script
          defer
          src="https://kit.fontawesome.com/a9ed7151df.js"
          crossorigin="anonymous"
        >
        </script>
      </head>
      <body f-client-nav>
        <Component />
        <ModalContainer />
      </body>
    </html>
  );
}
