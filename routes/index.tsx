import { Handlers } from "$fresh/server.ts";

import { getXataClient } from "../lib/xata.ts";
import { AddDeckForm } from "../components/deck/AddDeckForm.tsx";
import { DeckList } from "../components/deck/DeckList.tsx";

async function getDecks() {
  const xata = getXataClient();

  return await xata.db.decks.select(["name", "xata_id"]).getAll();
}

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const name = form.get("name")?.toString();

    if (!name) return ctx.render();

    await getXataClient().db.decks.create({ name });

    return ctx.render();
  },
};

export default async function Home() {
  const decks = await getDecks();

  return (
    <div class="container is-fluid mt-5">
      <div>
        <h1 class="title">Welcome to MTG Deck Builder</h1>
        <p class="my-4">
          Manage your decks.
        </p>
        <AddDeckForm />
        <DeckList decks={decks} />
      </div>
    </div>
  );
}
