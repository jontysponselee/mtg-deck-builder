import { useRef } from "preact/hooks";

export function Notification({ content }: { content: string | false }) {
    const notificationRef = useRef<HTMLDivElement>(null);
  
    function removeNotification(){
        if(!notificationRef.current) return;

        notificationRef.current.parentNode?.removeChild(notificationRef.current)
    }

    return content &&
    (
      <div class="notification is-warning" ref={notificationRef}>
        <button class="delete" onClick={removeNotification} />
        {content}
      </div>
    );
}
