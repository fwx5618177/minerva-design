import { View } from "react-native";
import { Skeleton, SkeletonText } from "minerva-design/native";
export default function Basic() {
  return (
    <View style={{ gap: 12 }}>
      <Skeleton width={80} height={80} />
      <SkeletonText lines={3} />
    </View>
  );
}
