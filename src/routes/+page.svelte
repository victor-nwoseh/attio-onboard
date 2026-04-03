<script lang="ts">
  import QuestionFlow from '$lib/components/questionnaire/QuestionFlow.svelte';
  import ResultsPage from '$lib/components/results/ResultsPage.svelte';
  import type { AttioConfiguration, BusinessModel, UserAnswers } from '$lib/utils/types';

  let appView: 'intro' | 'questionnaire' | 'loading' | 'results' | 'error' = $state('intro');
  let configuration: AttioConfiguration | null = $state(null);
  let errorMessage = $state('');
  let lastAnswers: Partial<UserAnswers> | null = $state(null);

  function startQuestionnaire() {
    appView = 'questionnaire';
  }

  function handleComplete(config: AttioConfiguration) {
    configuration = config;
    appView = 'results';
  }

  function handleLoading(loading: boolean, answers?: Partial<UserAnswers>) {
    if (loading) {
      if (answers) lastAnswers = answers;
      appView = 'loading';
    }
  }

  function handleError(message: string) {
    errorMessage = message;
    appView = 'error';
  }

  async function retry() {
    if (!lastAnswers) {
      appView = 'questionnaire';
      return;
    }
    appView = 'loading';
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: lastAnswers })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate configuration');
      }
      const config: AttioConfiguration = await response.json();
      handleComplete(config);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      handleError(message);
    }
  }

  function startOver() {
    configuration = null;
    errorMessage = '';
    lastAnswers = null;
    appView = 'intro';
  }
</script>

<div class="flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:py-12">
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
    <div class="mx-auto max-w-md px-4 text-center">
      <div class="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
      <h2 class="text-xl font-semibold text-gray-900">Building your Attio configuration...</h2>
      <p class="mt-2 text-sm text-gray-500">This may take a moment. We're generating recommendations tailored to your business.</p>
    </div>

  {:else if appView === 'results' && configuration}
    <div class="w-full">
      <ResultsPage
        {configuration}
        businessModel={lastAnswers?.business_model as BusinessModel | undefined}
        onStartOver={startOver}
      />
    </div>

  {:else if appView === 'error'}
    <div class="mx-auto max-w-md px-4 text-center">
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
