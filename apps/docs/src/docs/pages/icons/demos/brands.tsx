import { HStack, VStack, Box } from "minerva-design";
import {
  BrandGithubIcon,
  BrandReactIcon,
  BrandVueIcon,
  BrandAngularIcon,
  BrandWechatIcon,
  BrandSvelteIcon,
  BrandSolidIcon,
  BrandHtml5Icon,
  BrandAppleIcon,
  BrandAndroidIcon,
  BrandLinuxIcon,
  BrandWindowsIcon,
} from "minerva-design/icons";

const brands = [
  { name: "GitHub", Icon: BrandGithubIcon, color: "currentColor" },
  { name: "React", Icon: BrandReactIcon, color: "#0898bb" },
  { name: "Vue", Icon: BrandVueIcon, color: "#269b70" },
  { name: "Angular", Icon: BrandAngularIcon, color: "#ed426b" },
  { name: "WeChat", Icon: BrandWechatIcon, color: "#18ad63" },
  { name: "Svelte", Icon: BrandSvelteIcon, color: "#ef653d" },
  { name: "Solid", Icon: BrandSolidIcon, color: "#589bd1" },
  { name: "HTML5", Icon: BrandHtml5Icon, color: "#e87737" },
  { name: "Apple", Icon: BrandAppleIcon, color: "currentColor" },
  { name: "Android", Icon: BrandAndroidIcon, color: "#269b70" },
  { name: "Linux", Icon: BrandLinuxIcon, color: "currentColor" },
  { name: "Windows", Icon: BrandWindowsIcon, color: "#0078d4" },
];
export default function BrandsDemo() {
  return (
    <HStack wrap gap={6} align="center">
      {brands.map(({ name, Icon, color }) => (
        <VStack key={name} gap={2} align="center" style={{ minWidth: 80 }}>
          <Icon size={32} color={color} />
          <Box as="span">{name}</Box>
        </VStack>
      ))}
    </HStack>
  );
}
