import { useEffect, useRef, useState } from "preact/hooks";
import { ComponentChild, ComponentChildren } from "preact";
import { createPortal } from "preact/compat";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface ActionModalProps {
  content: ComponentChild;
  trigger: (openModal: () => void) => ComponentChild;
  formFields: ComponentChildren;
  title: string;
  submitTitle: string;
  postDeleteTimestamp: number | null;
}

export function ActionModal({ trigger, ...props }: ActionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!props.postDeleteTimestamp) return;

    setIsOpen(false);
  }, [props.postDeleteTimestamp]);

  let modalRoot;
  if (IS_BROWSER) {
    modalRoot = document && document.getElementById("modal-container");
  }

  if (!modalRoot) return null;

  return (
    <>
      {isOpen && (
        <ActionModalContent
          modalRoot={modalRoot}
          closeModal={() => setIsOpen(false)}
          {...props}
        />
      )}
      {trigger(() => setIsOpen(true))}
    </>
  );
}

interface ActionModalContentProps extends Omit<ActionModalProps, "trigger"> {
  closeModal: () => void;
  modalRoot: HTMLElement;
}

function ActionModalContent(props: ActionModalContentProps) {
  const modalBackgroundRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        props.closeModal();
      }

      if (event.key === "Enter") {
        submitButtonRef.current?.click();
      }
    }

    function onClick(event: MouseEvent) {
      if (modalBackgroundRef.current !== event.target) return;

      props.closeModal();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return createPortal(
    <div class="modal is-active">
      <div class="modal-background" ref={modalBackgroundRef} />
      <div class="modal-card">
        <form method="post">
          {props.formFields}
          <header class="modal-card-head">
            <p class="modal-card-title">{props.title}</p>
            <button
              class="delete"
              aria-label="close"
              type="button"
              onClick={props.closeModal}
            />
          </header>
          <section class="modal-card-body">
            {props.content}
          </section>
          <footer class="modal-card-foot is-justify-content-flex-end">
            <div class="buttons">
              <button
                class="button is-danger"
                type="submit"
                ref={submitButtonRef}
              >
                {props.submitTitle}
              </button>
              <button class="button" type="button" onClick={props.closeModal}>
                Cancel
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>,
    props.modalRoot,
  );
}

export function ModalContainer() {
  return <div id="modal-container" />;
}
