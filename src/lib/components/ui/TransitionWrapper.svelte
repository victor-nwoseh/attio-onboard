<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { Snippet } from 'svelte';

  interface Props {
    key: string;
    children: Snippet;
  }

  let { key, children }: Props = $props();
</script>

{#key key}
  <div
    in:fly={{ y: 20, duration: 250, delay: 100 }}
    out:fly={{ y: -20, duration: 200 }}
  >
    {@render children()}
  </div>
{/key}
