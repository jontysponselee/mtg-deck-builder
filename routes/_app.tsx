import { type PageProps } from "$fresh/server.ts";
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"
        />
        <link rel="stylesheet" href="/styles.css" />
        <script
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
