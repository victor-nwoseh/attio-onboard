<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    onclick: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    children: Snippet;
  }

  let { onclick, disabled = false, variant = 'primary', children }: Props = $props();
</script>

<button
  type="button"
  class="rounded-lg px-6 py-3 text-sm font-medium transition-all duration-150
    focus:outline-none focus:ring-2 focus:ring-offset-2
    {variant === 'primary'
      ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-300'
      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500 disabled:text-gray-400'}
    disabled:cursor-not-allowed"
  {disabled}
  {onclick}
>
  {@render children()}
</button>
