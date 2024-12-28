import { useEffect, useRef } from "preact/hooks";

import { DecksRecord } from "../../lib/xata.ts";

interface DeckRowProps {
  deck: Partial<DecksRecord>;
  isEditingId?: DecksRecord["id"];
  onIsEditing: () => void;
}

export default function DeckRow(
  { deck, isEditingId, onIsEditing }: DeckRowProps,
) {
  const isEditing = isEditingId === deck.id;
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) return;
    
    nameInputRef.current?.focus()
  }, [isEditing, nameInputRef.current]);

  return (
    <tr>
      <td>
        <button
          class="decks__deck-list-actions"
          onClick={onIsEditing}
        >
          <span class="icon">
            <i class="fa-solid fa-pen-to-square"></i>
          </span>
        </button>
      </td>
      <td class="is-hoverable">
        {isEditing
          ? (
            <form method="post">
              <div class="field has-addons">
                <div class="control add-decks-form">
                  <input type="hidden" name="editDeck" />
                  <input hidden name="id" value={deck.id} />
                  <input
                    ref={nameInputRef}
                    class="input is-small"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={deck.name}
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
          : deck.name}
      </td>
    </tr>
  );
}
