import { useSignal } from "@preact/signals";

import DeckRow from "./DeckRow.tsx";
import { DecksRecord } from "../../lib/xata.ts";

export interface DeckListProps {
  decks: Partial<DecksRecord>[];
}

export function DeckList({ decks }: DeckListProps) {
  const isEditingId = useSignal<string | undefined>(undefined);

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
