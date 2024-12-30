import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface NotificationProps {
  message?: {
    type: "error" | "warning" | "success";
    content: string;
  };
  postTimestamp: number;
}

const typeToClass: Record<
  Required<NotificationProps>["message"]["type"],
  string
> = {
  error: "is-danger",
  warning: "is-warning",
  success: "is-success",
};

export function Notification({ postTimestamp, message }: NotificationProps) {
  const showNotification = useSignal(false);

  useEffect(() => {
    if (!message) return;

    showNotification.value = true;
  }, [message, postTimestamp]);

  if (!showNotification.value || !message) return;

  return (
    <NotificationContent
      onClose={() => showNotification.value = false}
      message={message}
    />
  );
}

interface NotificationContentProps
  extends Required<Pick<NotificationProps, "message">> {
  onClose: () => void;
}

function NotificationContent(props: NotificationContentProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        props.onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div class={`notification ${typeToClass[props.message.type]}`}>
      <button class="delete" onClick={props.onClose} type="button" />
      {props.message.content}
    </div>
  );
}
