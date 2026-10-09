import { useRef, type ReactNode, type Ref } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  View,
  type FlatListProps,
  type GestureResponderEvent,
} from "react-native";
import { useTheme } from "../../theme/MinervaProvider";
export interface VirtualListItem {
  id: string | number;
  metadata?: Record<string, string | number | boolean>;
}
export interface VirtualListProps<
  T extends VirtualListItem = VirtualListItem,
> extends Omit<
  FlatListProps<T>,
  "data" | "renderItem" | "onEndReached" | "getItemLayout" | "ref"
> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  maxHeight: number;
  itemHeight?: number;
  /** @default 8 */
  itemPadding?: number;
  /** @default 5 */
  overscan?: number;
  onLoadMore?: () => Promise<void> | void;
  onLoadError?: (error: unknown) => void;
  /** @default 100 */
  loadMoreThreshold?: number;
  /** @default false */
  loading?: boolean;
  onItemClick?: (item: T, index: number, event: GestureResponderEvent) => void;
  ref?: Ref<FlatList<T>>;
}
/** FlatList supplies native windowing, recycling and scroll-to-index support. */
export function VirtualList<T extends VirtualListItem>({
  items,
  renderItem,
  maxHeight,
  itemHeight,
  itemPadding = 8,
  overscan = 5,
  onLoadMore,
  onLoadError,
  loadMoreThreshold = 100,
  loading = false,
  onItemClick,
  style,
  ref,
  ...props
}: VirtualListProps<T>) {
  const pending = useRef(false);
  const { tokens } = useTheme();
  const height = itemHeight && itemHeight > 0 ? itemHeight : undefined;
  return (
    <FlatList
      {...props}
      ref={ref}
      data={items}
      keyExtractor={(item) => String(item.id)}
      style={[{ height: maxHeight, flexGrow: 0 }, style]}
      initialNumToRender={Math.ceil(maxHeight / (height ?? 44)) + overscan}
      windowSize={Math.max(3, overscan * 2 + 1)}
      getItemLayout={
        height
          ? (_, index) => ({ length: height, offset: height * index, index })
          : undefined
      }
      renderItem={({ item, index }) =>
        onItemClick ? (
          <Pressable
            accessibilityRole="button"
            onPress={(event) => onItemClick(item, index, event)}
            style={{ height, padding: itemPadding }}
          >
            {renderItem(item, index)}
          </Pressable>
        ) : (
          <View style={{ height, padding: itemPadding }}>
            {renderItem(item, index)}
          </View>
        )
      }
      onEndReachedThreshold={loadMoreThreshold / Math.max(1, maxHeight)}
      onEndReached={async () => {
        if (!onLoadMore || loading || pending.current) return;
        pending.current = true;
        try {
          await onLoadMore();
        } catch (error) {
          onLoadError?.(error);
        } finally {
          pending.current = false;
        }
      }}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator color={tokens.colors["primary-color"]} />
        ) : (
          props.ListFooterComponent
        )
      }
    />
  );
}
