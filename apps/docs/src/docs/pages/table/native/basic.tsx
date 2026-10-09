import { useState } from "react";
import { Text, View } from "react-native";
import { DataTable } from "minerva-design/native";
export default function Basic() {
  const [selected, setSelected] = useState<readonly string[]>([]);
  return (
    <View>
      <DataTable
        data={[
          { id: "a", name: "Ada", score: 9 },
          { id: "b", name: "Grace", score: 10 },
        ]}
        rowKey={(row) => row.id}
        columns={[
          { key: "name", header: "Name", sortable: true },
          { key: "score", header: "Score", sortable: true },
        ]}
        rowSelection={{ onChange: (keys) => setSelected(keys.map(String)) }}
        pagination={{ total: 2, pageSize: 2 }}
      />
      <Text>Selected: {selected.join(", ")}</Text>
    </View>
  );
}
