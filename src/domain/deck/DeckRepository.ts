import { DecksRecord, getXataClient } from "../../lib/xata.ts";

export class DeckRepository {
  static async count() {
    return (await getXataClient().db.decks.select(["xata_id"]).getAll()).length;
  }

  static create(name: DecksRecord["name"]) {
    return getXataClient().db.decks.create({ name });
  }

  static getAll() {
    return getXataClient().db.decks.select(["name", "xata_id"]).getAll();
  }

  static update(id: DecksRecord["id"], name: DecksRecord["name"]) {
    return getXataClient().db.decks.update(id, {
      name,
    });
  }

  static delete(id: DecksRecord["id"]) {
    return getXataClient().db.decks.delete(id);
  }
}
