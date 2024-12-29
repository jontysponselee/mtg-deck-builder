import { genericError, ResponseMessage } from "../../utils/ResponseMessage.tsx";
import { DeckRepository } from "./DeckRepository.ts";

export class DeckService {
  static readonly MAX_DECKS = 5;

  static async create(name?: string): Promise<ResponseMessage> {
    if (!name) return genericError;

    const decksCount = await DeckRepository.count();

    if (decksCount >= this.MAX_DECKS) {
      return {
        type: "warning",
        content: `Cannot create more than ${this.MAX_DECKS} decks`,
      };
    }

    await DeckRepository.create(name);

    return {
      type: "success",
      content: "Deck created!",
    };
  }

  static async update(id?: string, name?: string): Promise<ResponseMessage> {
    if (!id || !name) return genericError;

    await DeckRepository.update(id, name);

    return {
      type: "success",
      content: "Deck name changed!",
    };
  }

  static async delete(id?: string): Promise<ResponseMessage> {
    if (!id) return genericError;

    await DeckRepository.delete(id);

    return {
      type: "success",
      content: "Deck deleted!",
    };
  }
}
