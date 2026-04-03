<script lang="ts">
  import type { AutomationRecommendation } from '$lib/utils/types';

  interface Props {
    automations: AutomationRecommendation[];
  }

  let { automations }: Props = $props();
</script>

<section class="mb-10">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Automations</h3>

  <div class="space-y-6">
    {#each automations as automation}
      <div class="rounded-lg border border-gray-200 p-5">
        <h4 class="font-medium text-gray-900 mb-2">{automation.name}</h4>
        <p class="text-sm text-gray-500 italic mb-3">{automation.reasoning}</p>

        <div class="mb-3 rounded bg-gray-50 px-4 py-3">
          <div class="mb-2">
            <span class="text-xs font-medium uppercase tracking-wide text-gray-500">Trigger</span>
            <p class="text-sm text-gray-700 mt-0.5">{automation.trigger}</p>
          </div>
          <div>
            <span class="text-xs font-medium uppercase tracking-wide text-gray-500">Actions</span>
            <ul class="mt-0.5 space-y-0.5">
              {#each automation.actions as action}
                <li class="text-sm text-gray-700">{action}</li>
              {/each}
            </ul>
          </div>
        </div>

        <div>
          <h5 class="text-sm font-medium text-gray-700 mb-2">Setup steps</h5>
          <ol class="list-decimal list-inside space-y-1">
            {#each automation.setup_steps as step}
              <li class="text-sm text-gray-600">{step}</li>
            {/each}
          </ol>
        </div>
      </div>
    {/each}
  </div>
</section>
