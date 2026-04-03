<script lang="ts">
  interface Props {
    steps: string[];
  }

  let { steps }: Props = $props();
</script>

<section class="mb-10">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>

  <div class="rounded-lg border border-gray-200 p-5">
    <ol class="space-y-3">
      {#each steps as step, i}
        <li class="flex gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-700">
            {i + 1}
          </span>
          <span class="text-sm text-gray-700">{step}</span>
        </li>
      {/each}
    </ol>
  </div>
</section>
