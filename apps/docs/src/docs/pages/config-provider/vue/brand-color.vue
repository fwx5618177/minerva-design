<script setup lang="ts">
import {
  ConfigProvider,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  HStack,
  ResponsiveGrid,
} from "minerva-design/vue";

const scopes = [
  { title: 'primaryColor="#4f46e5"', primaryColor: "#4f46e5" },
  {
    title: "Indigo + dark (#7b85f2)",
    primaryColor: "#4f46e5",
    theme: "dark" as const,
  },
  {
    title: "{ light, dark } pair",
    primaryColor: { light: "#4f46e5", dark: "#a5b4fc" },
  },
  {
    title: 'Teal over palette="editorial"',
    primaryColor: "#0d9488",
    palette: "editorial" as const,
  },
];
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, sm: 2 }" :gap="3">
    <ConfigProvider
      v-for="scope in scopes"
      :key="scope.title"
      :primary-color="scope.primaryColor"
      :theme="scope.theme"
      :palette="scope.palette"
      ><Card variant="outline" padding="medium"
        ><CardHeader
          ><CardTitle>{{ scope.title }}</CardTitle></CardHeader
        ><CardContent
          ><HStack :gap="2"
            ><Button>Primary</Button
            ><Button variant="outline">Outline</Button></HStack
          ></CardContent
        ></Card
      ></ConfigProvider
    >
  </ResponsiveGrid>
</template>
