import { useState } from "react";
import { Button, IconButton, Input } from "minerva-design";
import { IoSearch } from "react-icons/io5";

export default function SearchDemo() {
  const [loading, setLoading] = useState(false);

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <form
      onSubmit={search}
      style={{ display: "flex", gap: 8, alignItems: "center" }}
    >
      <Input aria-label="Query" placeholder="Search books" clearable />
      <IconButton
        type="submit"
        icon={<IoSearch />}
        label="Search"
        color="primary"
        variant="solid"
        loading={loading}
      />
      <Button type="submit" color="neutral" variant="outline" loading={loading}>
        Search
      </Button>
    </form>
  );
}
