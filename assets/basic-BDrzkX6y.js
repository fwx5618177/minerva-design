import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { Text, View } from "react-native";
import {
  BellRingIcon,
  CalendarCheckIcon,
  DynamicIcon,
  Icon,
  ListTodoIcon,
  NotebookPenIcon,
  SearchIcon,
  paletteIcon,
} from "minerva-design/native/icons";

const tabs = ["home", "repeat", "notebook-pen", "library", "user-round"];

export default function Basic() {
  return (
    <View style={{ gap: 20 }}>
      {/* 24dp, stroked with the theme's text color */}
      <View style={{ flexDirection: "row", gap: 16 }}>
        <SearchIcon />
        <CalendarCheckIcon />
        <ListTodoIcon />
        <NotebookPenIcon />
        <BellRingIcon />
      </View>
      {/* size, color, stroke width and an accessible name */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <SearchIcon size={16} />
        <SearchIcon size={32} color="#2563eb" title="Search" />
        <Icon icon={paletteIcon} size={40} strokeWidth={1.5} color="#db2777" />
      </View>
      {/* icons chosen by name (bundles the whole set) */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {tabs.map((name, i) => {
          const color = i === 0 ? "#4f46e5" : "#737373";
          return (
            <View key={name} style={{ alignItems: "center", gap: 4 }}>
              <DynamicIcon name={name} size={22} color={color} />
              <Text style={{ fontSize: 11, color }}>{name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
`})))()}n();export{t as default};