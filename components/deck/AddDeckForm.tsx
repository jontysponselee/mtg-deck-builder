export function AddDeckForm() {
  return (
    <form method="post" class="mb-3">
      <div class="field has-addons">
        <div class="control decks__add-decks-form">
          <input
            class="input"
            type="text"
            placeholder="Name"
            name="name"
            autoFocus
            required
          />
        </div>
        <div class="control">
          <button class="button is-primary" type="submit" name="addDeck">
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
