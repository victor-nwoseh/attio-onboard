<script lang="ts">
  import type { PipelineRecommendation } from '$lib/utils/types';

  interface Props {
    pipelines: PipelineRecommendation[];
  }

  let { pipelines }: Props = $props();
</script>

<section class="mb-10">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Pipelines</h3>

  <div class="space-y-6">
    {#each pipelines as pipeline}
      <div class="rounded-lg border border-gray-200 p-5">
        <h4 class="font-medium text-gray-900 mb-1">{pipeline.name}</h4>
        <p class="text-sm text-gray-500 mb-1">On: {pipeline.object}</p>
        <p class="text-sm text-gray-500 italic mb-4">{pipeline.reasoning}</p>

        <div class="mb-4">
          <h5 class="text-sm font-medium text-gray-700 mb-2">Stages</h5>
          <div class="flex flex-wrap items-center gap-1">
            {#each pipeline.stages as stage, i}
              <div class="group relative rounded-md bg-indigo-50 border border-indigo-200 px-3 py-1.5">
                <span class="text-sm font-medium text-indigo-700">{stage.name}</span>
                <div class="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded bg-gray-900 px-3 py-2 text-xs text-white z-10">
                  {stage.purpose}
                  <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              {#if i < pipeline.stages.length - 1}
                <svg class="h-4 w-4 text-gray-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              {/if}
            {/each}
          </div>
        </div>

        <div>
          <h5 class="text-sm font-medium text-gray-700 mb-2">Setup steps</h5>
          <ol class="list-decimal list-inside space-y-1">
            {#each pipeline.setup_steps as step}
              <li class="text-sm text-gray-600">{step}</li>
            {/each}
          </ol>
        </div>
      </div>
    {/each}
  </div>
</section>
