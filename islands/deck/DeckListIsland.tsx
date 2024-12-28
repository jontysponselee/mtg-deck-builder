import { useSignal } from "@preact/signals";

import DeckRow from "./DeckRow.tsx";
import { DecksRecord } from "../../lib/xata.ts";
import { useEffect } from "preact/hooks";

export interface DeckListProps {
  editedName: string | null;
  decks: Partial<DecksRecord>[];
}

export function DeckListIsland({ decks, editedName }: DeckListProps) {
  const isEditingId = useSignal<string | undefined>(undefined);

  useEffect(() => {
    if (!editedName) return;

    isEditingId.value = undefined;
  }, [editedName]);

  return (
    <table class="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th width="1"></th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {decks.map((deck) => (
          <DeckRow
            isEditingId={isEditingId.value}
            onIsEditing={() => isEditingId.value = deck.id}
            deck={deck}
          />
        ))}
      </tbody>
    </table>
  );
}
