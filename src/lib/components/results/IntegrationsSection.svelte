<script lang="ts">
  import type { IntegrationRecommendation } from '$lib/utils/types';

  interface Props {
    integrations: IntegrationRecommendation[];
  }

  let { integrations }: Props = $props();
</script>

<section class="mb-10">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>

  <div class="space-y-6">
    {#each integrations as integration}
      <div class="rounded-lg border border-gray-200 p-5">
        <div class="flex items-center gap-2 mb-2">
          <h4 class="font-medium text-gray-900">{integration.name}</h4>
          <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {integration.category}
          </span>
        </div>
        <p class="text-sm text-gray-500 italic mb-3">{integration.reasoning}</p>

        <div>
          <h5 class="text-sm font-medium text-gray-700 mb-2">Setup steps</h5>
          <ol class="list-decimal list-inside space-y-1">
            {#each integration.setup_steps as step}
              <li class="text-sm text-gray-600">{step}</li>
            {/each}
          </ol>
        </div>
      </div>
    {/each}
  </div>
</section>
