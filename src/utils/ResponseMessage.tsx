export interface ResponseMessage {
  type: "error" | "warning" | "success";
  content: string;
}

export const genericError: ResponseMessage = {
  type: "error",
  content: "Something went wrong!",
};