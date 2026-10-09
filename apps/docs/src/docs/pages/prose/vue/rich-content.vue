<script setup lang="ts">
import { Prose } from "minerva-design/vue";
</script>
<template>
  <Prose
    ><h2>Publishing checklist</h2>
    <ul>
      <li>Review content</li>
      <li>Check keyboard navigation</li>
    </ul>
    <blockquote>Good writing starts with clarity.</blockquote>
    <pre><code>npm install minerva-design</code></pre>
    <table>
      <thead>
        <tr>
          <th>Stage</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Review</td>
          <td>Ready</td>
        </tr>
      </tbody>
    </table></Prose
  >
</template>
