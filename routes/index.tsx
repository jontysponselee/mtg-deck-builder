import { defineRoute, Handlers } from "$fresh/server.ts";

import { DecksRecord, getXataClient } from "../lib/xata.ts";
import { AddDeckForm } from "../islands/deck/AddDeckForm.tsx";
import { Head, Partial } from "$fresh/runtime.ts";
import { DeckListIsland } from "../islands/deck/DeckListIsland.tsx";
import { Notification } from "../islands/Notification.tsx";

/** @todo
 * - Pagination for list
 * - Empty list message
 */

interface Props {
  addDeck?: boolean;
  editDeck?: boolean;
  name?: string;
  message?: string | false;
}

const MAX_DECKS = 50;

async function addDeck(name: DecksRecord["name"]) {
  const recordCount =
    (await getXataClient().db.decks.select(["xata_id"]).getAll()).length;

  if (recordCount >= MAX_DECKS) return false;

  return getXataClient().db.decks.create({ name });
}

function getDecks() {
  return getXataClient().db.decks.select(["name", "xata_id"]).getAll();
}

function editDeck(id: DecksRecord["id"], name: DecksRecord["name"]) {
  return getXataClient().db.decks.update(id, {
    name,
  });
}

export const handler: Handlers<Props> = {
  async POST(req, ctx) {
    const form = await req.formData();
    const name = form.get("name")?.toString();
    const id = form.get("id")?.toString();

    if (!name) return ctx.render();

    if (form.has("addDeck")) {
      const result = await addDeck(name);

      if (!result) {
        return ctx.render({
          message: `Cannot create more than ${MAX_DECKS} decks`,
        });
      }

      return ctx.render({ addDeck: true, name });
    } else if (form.has("editDeck")) {
      if (!id) return ctx.render();

      await editDeck(id, name);

      return ctx.render({ editDeck: true, name });
    }

    return ctx.render();
  },
};

export default defineRoute<Props>(async (_, ctx) => {
  const decks = await getDecks();

  return (
    <>
      <Head>
        <title>Decks</title>
      </Head>
      <Partial name="notification">
        <Notification content={ctx.data?.message} />
      </Partial>
      <div class="decks container is-fluid mt-5" f-client-nav>
        <div>
          <h1 class="title">Welcome to MTG Deck Builder</h1>
          <p class="my-4">
            Manage your decks.
          </p>
          <Partial name="addDeck">
            <AddDeckForm
              addedName={ctx.data?.addDeck ? ctx.data?.name : null}
            />
          </Partial>
          <Partial name="deckList">
            <DeckListIsland
              editedName={ctx.data?.editDeck ? ctx.data?.name : null}
              decks={decks}
            />
          </Partial>
        </div>
      </div>
    </>
  );
});
