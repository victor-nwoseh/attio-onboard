<script lang="ts">
  import QuestionFlow from '$lib/components/questionnaire/QuestionFlow.svelte';
  import type { AttioConfiguration } from '$lib/utils/types';

  let appView: 'intro' | 'questionnaire' | 'loading' | 'results' | 'error' = $state('intro');
  let configuration: AttioConfiguration | null = $state(null);
  let errorMessage = $state('');

  function startQuestionnaire() {
    appView = 'questionnaire';
  }

  function handleComplete(config: AttioConfiguration) {
    configuration = config;
    appView = 'results';
  }

  function handleLoading(loading: boolean) {
    if (loading) {
      appView = 'loading';
    }
  }

  function handleError(message: string) {
    errorMessage = message;
    appView = 'error';
  }

  function retry() {
    appView = 'questionnaire';
  }

  function startOver() {
    configuration = null;
    errorMessage = '';
    appView = 'intro';
  }
</script>

<div class="flex min-h-screen flex-col items-center justify-center px-4">
  {#if appView === 'intro'}
    <div class="mx-auto max-w-lg text-center">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Configure your Attio workspace in minutes
      </h1>
      <p class="mt-4 text-lg text-gray-600">
        Answer a few questions about your business and get a tailored CRM setup guide with recommendations, reasoning, and step-by-step instructions.
      </p>
      <button
        type="button"
        class="mt-8 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-medium text-white
          hover:bg-indigo-700 transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onclick={startQuestionnaire}
      >
        Get started
      </button>
    </div>

  {:else if appView === 'questionnaire'}
    <div class="w-full py-12">
      <QuestionFlow
        onComplete={handleComplete}
        onLoading={handleLoading}
        onError={handleError}
      />
    </div>

  {:else if appView === 'loading'}
    <div class="mx-auto max-w-md text-center">
      <div class="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
      <h2 class="text-xl font-semibold text-gray-900">Building your Attio configuration...</h2>
      <p class="mt-2 text-sm text-gray-500">This may take a moment. We're generating recommendations tailored to your business.</p>
    </div>

  {:else if appView === 'results' && configuration}
    <div class="w-full py-12">
      <div class="mx-auto max-w-3xl px-4 text-center">
        <h2 class="text-2xl font-bold text-gray-900">Your configuration is ready</h2>
        <p class="mt-2 text-gray-600">{configuration.summary}</p>
        <p class="mt-6 text-sm text-gray-400">Results display coming in Phase 6</p>
        <button
          type="button"
          class="mt-8 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
          onclick={startOver}
        >
          Start over
        </button>
      </div>
    </div>

  {:else if appView === 'error'}
    <div class="mx-auto max-w-md text-center">
      <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <svg class="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-gray-900">Something went wrong</h2>
      <p class="mt-2 text-sm text-gray-500">{errorMessage}</p>
      <button
        type="button"
        class="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white
          hover:bg-indigo-700 transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onclick={retry}
      >
        Try again
      </button>
    </div>
  {/if}
</div>
