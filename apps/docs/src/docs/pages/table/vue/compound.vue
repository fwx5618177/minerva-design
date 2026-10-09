<script setup lang="ts">
import {
  TableRoot,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  TableCellContent,
} from "minerva-design/vue";
</script>
<template>
  <TableRoot variant="bordered" aria-label="Release checklist"
    ><TableHead
      ><TableRow
        ><TableHeader scope="col">Package</TableHeader
        ><TableHeader scope="col">Status</TableHeader></TableRow
      ></TableHead
    ><TableBody
      ><TableRow
        ><TableCell
          ><TableCellContent
            primary="Core"
            secondary="Shared contracts and tokens" /></TableCell
        ><TableCell>Ready</TableCell></TableRow
      ><TableRow
        ><TableCell
          ><TableCellContent
            primary="Vue"
            secondary="Accessible browser components" /></TableCell
        ><TableCell>Ready</TableCell></TableRow
      ></TableBody
    ></TableRoot
  >
</template>
