import {
  BrandAppleIcon,
  BrandAndroidIcon,
  BrandLinuxIcon,
  BrandWindowsIcon,
} from "minerva-design/icons";
import { AutoComplete } from "minerva-design";

const options = [
  {
    label: "macOS",
    value: "macos",
    icon: <BrandAppleIcon size="1em" />,
    description: "Recommended for this device",
    highlight: true,
  },
  {
    label: "Windows",
    value: "windows",
    icon: <BrandWindowsIcon size="1em" />,
    description: "Windows 10 and later",
  },
  {
    label: "Linux",
    value: "linux",
    icon: <BrandLinuxIcon size="1em" />,
    description: "deb and rpm packages",
  },
  {
    label: "Android",
    value: "android",
    icon: <BrandAndroidIcon size="1em" />,
    description: "Coming soon",
    disabled: true,
  },
];

export default function RichOptionsDemo() {
  return (
    <div style={{ width: 320 }}>
      <AutoComplete name="platform" label="Platform" options={options} />
    </div>
  );
}
