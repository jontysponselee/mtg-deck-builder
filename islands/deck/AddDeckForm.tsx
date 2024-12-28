import { useEffect, useRef } from "preact/hooks";

interface AddDeckFormProps {
  addedName: string | null;
}

export function AddDeckForm({ addedName }: AddDeckFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (addedName && inputRef.current && addedName === inputRef.current.value) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [addedName, inputRef.current]);

  return (
    <form method="post" class="mb-3">
      <div class="field has-addons">
        <div class="control decks__add-decks-form">
          <input type="hidden" name="addDeck" />
          <input
            ref={inputRef}
            class="input"
            type="text"
            placeholder="Name"
            name="name"
            autoFocus
            required
          />
        </div>
        <div class="control">
          <button class="button is-primary" type="submit">
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
