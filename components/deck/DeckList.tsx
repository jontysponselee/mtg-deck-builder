import { DecksRecord } from "../../lib/xata.ts";

interface DeckListProps {
  decks: Partial<DecksRecord>[]
}

export function DeckList({decks}: DeckListProps) {
  return (
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {decks.map(({ name }) => (
          <tr>
            <td>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
