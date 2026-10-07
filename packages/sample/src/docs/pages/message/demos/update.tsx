import { Button, message } from "@minerva/lib-core";

export default function UpdateDemo() {
  const save = () => {
    const id = message.loading({ content: "Saving…", duration: 0 });
    setTimeout(() => {
      message.update(id, {
        type: "success",
        content: "Saved!",
        duration: 2000,
      });
    }, 1500);
  };

  return <Button onClick={save}>Save</Button>;
}
