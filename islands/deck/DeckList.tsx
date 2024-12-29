import { useSignal } from "@preact/signals";

import DeckRow from "./DeckRow.tsx";
import { DecksRecord } from "../../src/lib/xata.ts";
import { useEffect } from "preact/hooks";

export interface DeckListProps {
  postTimestamp: number | null;
  decks: Partial<DecksRecord>[];
  postType: "update" | "delete";
}

export function DeckList(props: DeckListProps) {
  const isEditingId = useSignal<string | undefined>(undefined);

  useEffect(() => {
    if (props.postType !== "update") return;

    isEditingId.value = undefined;
  }, [props.postTimestamp]);

  return (
    <table class="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th width="1"></th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {props.decks.length === 0 && (
          <tr>
            <td colSpan={2}>
              <p>No decks yet, create one.</p>
            </td>
          </tr>
        )}
        {props.decks.map((deck) => (
          <DeckRow
            postDeleteTimestamp={props.postType === "delete"
              ? props.postTimestamp
              : null}
            isEditingId={isEditingId.value}
            onIsEditing={() => isEditingId.value = deck.id}
            deck={deck}
          />
        ))}
      </tbody>
    </table>
  );
}
