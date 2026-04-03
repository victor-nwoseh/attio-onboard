<script lang="ts">
  import type { AttioConfiguration } from '$lib/utils/types';
  import ResultsSummary from './ResultsSummary.svelte';
  import ObjectsSection from './ObjectsSection.svelte';
  import PipelinesSection from './PipelinesSection.svelte';
  import AutomationsSection from './AutomationsSection.svelte';
  import ListsViewsSection from './ListsViewsSection.svelte';
  import IntegrationsSection from './IntegrationsSection.svelte';
  import NextStepsSection from './NextStepsSection.svelte';

  interface Props {
    configuration: AttioConfiguration;
    businessModel?: string;
    onStartOver: () => void;
  }

  let { configuration, businessModel, onStartOver }: Props = $props();

  const modelLabels: Record<string, string> = {
    saas: 'SaaS / Software',
    vc_pe: 'VC / PE / Investment',
    agency: 'Agency / Services'
  };

  let modelLabel = $derived(businessModel ? modelLabels[businessModel] || businessModel : '');
</script>

<div class="mx-auto w-full max-w-3xl px-4 py-12">
  <div class="mb-8 flex items-center justify-between">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Your Attio Configuration</h2>
      {#if modelLabel}
        <p class="mt-1 text-sm text-gray-500">{modelLabel}</p>
      {/if}
    </div>
    <button
      type="button"
      class="text-sm text-indigo-600 hover:text-indigo-800 transition-colors
        focus:outline-none focus:underline focus:text-indigo-800"
      onclick={onStartOver}
    >
      Start over
    </button>
  </div>

  <ResultsSummary summary={configuration.summary} />
  <ObjectsSection objects={configuration.objects} />
  <PipelinesSection pipelines={configuration.pipelines} />
  <AutomationsSection automations={configuration.automations} />
  <ListsViewsSection listsAndViews={configuration.lists_and_views} />
  <IntegrationsSection integrations={configuration.integrations} />
  <NextStepsSection steps={configuration.next_steps} />

  <div class="mt-8 border-t border-gray-200 pt-8 text-center">
    <button
      type="button"
      class="text-sm text-indigo-600 hover:text-indigo-800 transition-colors
        focus:outline-none focus:underline focus:text-indigo-800"
      onclick={onStartOver}
    >
      Start over
    </button>
  </div>
</div>
