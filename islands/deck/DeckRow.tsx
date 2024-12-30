import { useEffect, useRef } from "preact/hooks";

import { DecksRecord } from "../../src/lib/xata.ts";
import { ActionModal } from "../ActionModal.tsx";

interface DeckRowProps {
  deck: Partial<DecksRecord>;
  isEditingId?: DecksRecord["id"];
  onIsEditing: () => void;
  postDeleteTimestamp: number | null;
}

export default function DeckRow(
  props: DeckRowProps,
) {
  const isEditing = props.isEditingId === props.deck.id;
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) return;

    nameInputRef.current?.focus();
  }, [isEditing, nameInputRef.current]);

  return (
    <tr>
      <td>
        <div class="deck-row-actions">
          <button
            class="deck-row-actions__edit"
            onClick={props.onIsEditing}
            aria-label={`change name of ${props.deck.name}`}
          >
            <span class="icon">
              <i class="fa-solid fa-pen-to-square"></i>
            </span>
          </button>
          <ActionModal
            postDeleteTimestamp={props.postDeleteTimestamp}
            title={`Remove Deck "${props.deck.name}"`}
            submitTitle="Remove deck"
            content="Are you sure that you want to remove the deck? It is not possible to restore it."
            formFields={
              <>
                <input type="hidden" name="postType" value="delete" />
                <input type="hidden" name="id" value={props.deck.id} />
              </>
            }
            trigger={(openModal) => (
              <button class="deck-row-actions__delete" onClick={openModal} aria-label={`remove ${props.deck.name}`}>
                <span class="icon">
                  <i class="fas fa-trash-can"></i>
                </span>
              </button>
            )}
          />
        </div>
      </td>
      <td class="is-hoverable">
        {isEditing
          ? (
            <form method="post">
              <div class="field has-addons">
                <div class="control add-decks-form">
                  <input type="hidden" name="postType" value="update" />
                  <input hidden name="id" value={props.deck.id} />
                  <input
                    ref={nameInputRef}
                    class="input is-small"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={props.deck.name}
                    required
                  />
                </div>
                <div class="control">
                  <button
                    class="button is-primary is-small"
                    type="submit"
                    name="editDeck"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </form>
          )
          : props.deck.name}
      </td>
    </tr>
  );
}
