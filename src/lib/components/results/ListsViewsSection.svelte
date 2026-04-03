<script lang="ts">
  import type { ListViewRecommendation } from '$lib/utils/types';

  interface Props {
    listsAndViews: ListViewRecommendation[];
  }

  let { listsAndViews }: Props = $props();

  function formatType(type: string): string {
    const map: Record<string, string> = {
      list: 'List',
      table_view: 'Table View',
      kanban_view: 'Kanban View'
    };
    return map[type] || type;
  }
</script>

<section class="mb-10">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Lists and Views</h3>

  <div class="space-y-6">
    {#each listsAndViews as item}
      <div class="rounded-lg border border-gray-200 p-5">
        <div class="flex items-center gap-2 mb-2">
          <h4 class="font-medium text-gray-900">{item.name}</h4>
          <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {formatType(item.type)}
          </span>
        </div>
        <p class="text-sm text-gray-500 mb-1">Object: {item.object}</p>
        <p class="text-sm text-gray-500 italic mb-3">{item.purpose}</p>

        <div>
          <h5 class="text-sm font-medium text-gray-700 mb-2">Setup steps</h5>
          <ol class="list-decimal list-inside space-y-1">
            {#each item.setup_steps as step}
              <li class="text-sm text-gray-600">{step}</li>
            {/each}
          </ol>
        </div>
      </div>
    {/each}
  </div>
</section>
