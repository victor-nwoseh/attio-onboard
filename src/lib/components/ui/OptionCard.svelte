<script lang="ts">
  interface Props {
    label: string;
    description?: string;
    selected: boolean;
    multiSelect?: boolean;
    onclick: () => void;
  }

  let { label, description, selected, multiSelect = false, onclick }: Props = $props();
</script>

<button
  type="button"
  class="w-full text-left rounded-lg border-2 p-4 transition-all duration-150
    {selected
      ? 'border-indigo-600 bg-indigo-50'
      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  aria-pressed={multiSelect ? selected : undefined}
  {onclick}
>
  <div class="flex items-start gap-3">
    {#if multiSelect}
      <div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors
        {selected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}">
        {#if selected}
          <svg class="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        {/if}
      </div>
    {/if}
    <div class="flex-1">
      <span class="block text-sm font-medium text-gray-900">{label}</span>
      {#if description}
        <span class="mt-1 block text-sm text-gray-500">{description}</span>
      {/if}
    </div>
  </div>
</button>
