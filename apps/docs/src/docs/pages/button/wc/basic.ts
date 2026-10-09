export function setup(root: HTMLElement) {
  const button = root.querySelector("minerva-button")!;
  const output = root.querySelector("output")!;
  let count = 0;
  const click = () => {
    output.textContent = `Clicked ${++count} times`;
  };
  button.addEventListener("click", click);
  return () => button.removeEventListener("click", click);
}
