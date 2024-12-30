import { useEffect, useRef } from "preact/hooks";

interface AddDeckFormProps {
  postTimestamp: number | null;
}

export function AddDeckForm({ postTimestamp }: AddDeckFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputRef.current && postTimestamp) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [postTimestamp, inputRef.current]);

  return (
    <form method="post" class="mb-3">
      <div class="field has-addons">
        <div class="control decks__add-decks-form">
          <input type="hidden" name="postType" value="create" />
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
