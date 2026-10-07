// The close button fires a cancelable `minerva-close`; unless prevented, the
// alert moves focus out and sets its `hidden` attribute.
export function setup(root: HTMLElement) {
  const cookies = root.querySelector<HTMLElement>("#cookies")!;
  const sticky = root.querySelector<HTMLElement>("#sticky")!;
  const accept = root.querySelector<HTMLElement>("#accept")!;
  const keep = root.querySelector<HTMLInputElement>("#keep")!;
  const show = root.querySelector<HTMLElement>("#show")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const onStickyClose = (event: Event) => {
    if (keep.checked) {
      event.preventDefault();
      log.value = "Close prevented";
    }
  };
  const onAccept = () => {
    log.value = "Cookies accepted";
    show.focus();
    cookies.hidden = true;
  };
  const onShow = () => {
    cookies.hidden = false;
    sticky.hidden = false;
    log.value = "";
  };
  sticky.addEventListener("minerva-close", onStickyClose);
  accept.addEventListener("click", onAccept);
  show.addEventListener("click", onShow);
  return () => {
    sticky.removeEventListener("minerva-close", onStickyClose);
    accept.removeEventListener("click", onAccept);
    show.removeEventListener("click", onShow);
  };
}
