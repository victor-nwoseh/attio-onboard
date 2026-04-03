<script lang="ts">
  import type { ObjectRecommendation } from '$lib/utils/types';

  interface Props {
    objects: ObjectRecommendation[];
  }

  let { objects }: Props = $props();
</script>

<section class="mb-10">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Objects</h3>

  <div class="space-y-6">
    {#each objects as obj}
      <div class="rounded-lg border border-gray-200 p-5">
        <div class="flex items-center gap-2 mb-2">
          <h4 class="font-medium text-gray-900">{obj.name}</h4>
          <span class="rounded-full px-2 py-0.5 text-xs font-medium
            {obj.type === 'standard' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}">
            {obj.type === 'standard' ? 'Standard' : 'Custom'}
          </span>
        </div>

        <p class="text-sm text-gray-500 italic mb-4">{obj.reasoning}</p>

        {#if obj.attributes.length > 0}
          <div class="mb-4">
            <h5 class="text-sm font-medium text-gray-700 mb-2">Attributes</h5>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {#each obj.attributes as attr}
                <div class="rounded bg-gray-50 px-3 py-2">
                  <span class="text-sm font-medium text-gray-800">{attr.name}</span>
                  <span class="text-xs text-gray-500 ml-1">({attr.type})</span>
                  <p class="text-xs text-gray-500 mt-0.5">{attr.purpose}</p>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <div>
          <h5 class="text-sm font-medium text-gray-700 mb-2">Setup steps</h5>
          <ol class="list-decimal list-inside space-y-1">
            {#each obj.setup_steps as step}
              <li class="text-sm text-gray-600">{step}</li>
            {/each}
          </ol>
        </div>
      </div>
    {/each}
  </div>
</section>
