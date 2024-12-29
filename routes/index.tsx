import { defineRoute, Handlers } from "$fresh/server.ts";
import { Head, Partial } from "$fresh/runtime.ts";

import { AddDeckForm } from "../islands/deck/AddDeckForm.tsx";
import { DeckList } from "../islands/deck/DeckList.tsx";
import { Notification } from "../islands/Notification.tsx";
import { DeckRepository } from "../src/domain/deck/DeckRepository.ts";
import { genericError, ResponseMessage } from "../src/utils/ResponseMessage.tsx";
import { DeckService } from "../src/domain/deck/DeckService.ts";

interface ContextData {
  postType?: "create" | "update" | "delete";
  postTimestamp?: number;
  message: ResponseMessage;
}

export const handler: Handlers<ContextData> = {
  async POST(req, ctx) {
    const form = await req.formData();

    const name = form.get("name")?.toString();
    const id = form.get("id")?.toString();
    const postType = form.get("postType")
      ?.toString() as ContextData["postType"];

    let message: ResponseMessage;
    switch (postType) {
      case "create":
        message = await DeckService.create(name);
        break;
      case "update":
        message = await DeckService.update(id, name);
        break;
      case "delete":
        message = await DeckService.delete(id);
        break;
      default:
        message = genericError;
    }

    return ctx.render({ message, postType, postTimestamp: Date.now() });
  },
};

export default defineRoute<ContextData>(async (_, ctx) => {
  const decks = await DeckRepository.getAll();

  return (
    <>
      <Head>
        <title>Decks</title>
      </Head>
      <Partial name="notification">
        <Notification
          message={ctx.data?.message}
          postTimestamp={ctx.data?.postTimestamp}
        />
      </Partial>
      <div class="decks container is-fluid mt-5" f-client-nav>
        <div>
          <h1 class="title">Welcome to MTG Deck Builder</h1>
          <p class="my-4">
            Manage your decks.
          </p>
          <Partial name="addDeck">
            <AddDeckForm
              postTimestamp={["create", "delete"].includes(ctx.data?.postType)
                ? ctx.data?.postTimestamp
                : null}
            />
          </Partial>
          <Partial name="deckList">
            <DeckList
              postType={ctx.data?.postType}
              postTimestamp={ctx.data?.postTimestamp}
              decks={decks}
            />
          </Partial>
        </div>
      </div>
    </>
  );
});
