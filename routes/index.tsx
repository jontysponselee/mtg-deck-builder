import { Handlers } from "$fresh/server.ts";

import { DecksRecord, getXataClient } from "../lib/xata.ts";
import { AddDeckForm } from "../components/deck/AddDeckForm.tsx";
import { DeckList } from "../islands/deck/DeckList.tsx";
import { Head } from "$fresh/runtime.ts";
import { config } from "../config.ts";

/** @todo
 * - Partials
 * - Skeleton frames
 * - Max entries 50
 *   - API error Toast 
 */

function getDecks() {
  return getXataClient().db.decks.select(["name", "xata_id"]).getAll();
}

function addDeck(name: DecksRecord["name"]) {
  return getXataClient().db.decks.create({ name });
}

function editDeck(id: DecksRecord["id"], name: DecksRecord["name"]) {
  return getXataClient().db.decks.update(id, {
    name,
  });
}

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const name = form.get("name")?.toString();
    const id = form.get("id")?.toString();

    if (!name) return ctx.render();

    if (form.has("addDeck")) {
      await addDeck(name);
    } else if (form.has("editDeck")) {
      if (!id) return ctx.render();

      await editDeck(id, name);
    }

    return ctx.render();
  },
};

export default async function Home() {
  const decks = await getDecks();

  return (
    <>
      <Head>
        <title>{config.appName} - Decks</title>
      </Head>
      <div class="decks container is-fluid mt-5">
        <div>
          <h1 class="title">Welcome to MTG Deck Builder</h1>
          <p class="my-4">
            Manage your decks.
          </p>
          <AddDeckForm />
          <DeckList decks={decks} />
        </div>
      </div>
    </>
  );
}
