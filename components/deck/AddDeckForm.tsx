export function AddDeckForm() {
  return (
    <form method="post" class="mb-1">
      <div class="field has-addons">
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Name"
            name="name"
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
