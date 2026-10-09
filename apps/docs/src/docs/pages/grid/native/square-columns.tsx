import { Image, Text, View } from "react-native";
import { Grid, GridItem, useTheme } from "minerva-design/native";

const PHOTOS = [10, 11, 12, 13, 14, 15];

export default function SquareColumns() {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 16 }}>
      <Grid columnNum={3} square gutter={8}>
        {PHOTOS.map((id) => (
          <GridItem key={id} style={{ padding: 0, overflow: "hidden" }}>
            <Image
              source={{ uri: `https://picsum.photos/id/${id}/300/300` }}
              style={{ width: "100%", height: "100%" }}
              accessibilityLabel={`Trip photo ${id}`}
            />
          </GridItem>
        ))}
      </Grid>
      <Grid columnNum={5} square center>
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
          <GridItem key={day}>
            <Text style={{ color: colors["text-muted-color"], fontSize: 12 }}>
              {day}
            </Text>
            <Text style={{ color: colors["text-color"], fontWeight: "600" }}>
              {12 + i}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </View>
  );
}
