<script lang="ts">
  import { questions } from '$lib/data/questions';
  import type { Question, QuestionOption, UserAnswers, AttioConfiguration } from '$lib/utils/types';
  import OptionCard from '$lib/components/ui/OptionCard.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';
  import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
  import TransitionWrapper from '$lib/components/ui/TransitionWrapper.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  interface Props {
    onComplete: (config: AttioConfiguration) => void;
    onLoading: (loading: boolean) => void;
    onError: (error: string) => void;
  }

  let { onComplete, onLoading, onError }: Props = $props();

  let answers = $state<Partial<UserAnswers>>({});
  let currentIndex = $state(0);

  // Filter questions based on current answers
  let visibleQuestions = $derived(
    questions.filter(q => !q.condition || q.condition(answers))
  );

  let currentQuestion = $derived(visibleQuestions[currentIndex]);
  let totalQuestions = $derived(visibleQuestions.length);
  let isLastQuestion = $derived(currentIndex === totalQuestions - 1);

  // Resolve dynamic text
  function getQuestionText(q: Question): string {
    return typeof q.text === 'function' ? q.text(answers) : q.text;
  }

  // Resolve dynamic options
  function getQuestionOptions(q: Question): QuestionOption[] {
    if (!q.options) return [];
    return typeof q.options === 'function' ? q.options(answers) : q.options;
  }

  // Clear stale conditional answers when business model changes
  function clearStaleAnswers() {
    const conditionalKeys: (keyof UserAnswers)[] = [
      'sales_cycle', 'fund_stage', 'portfolio_size', 'client_engagement_model'
    ];
    const visibleKeys = new Set(visibleQuestions.map(q => q.answerKey));
    for (const key of conditionalKeys) {
      if (!visibleKeys.has(key)) {
        delete answers[key];
      }
    }
  }

  function handleSingleSelect(value: string) {
    const key = currentQuestion.answerKey;
    (answers as Record<string, unknown>)[key] = value;

    // If business model changed, clear stale answers
    if (key === 'business_model') {
      clearStaleAnswers();
    }

    // Auto-advance after brief delay
    setTimeout(() => {
      if (isLastQuestion) {
        submitAnswers();
      } else {
        currentIndex++;
      }
    }, 300);
  }

  function handleMultiSelect(value: string) {
    const key = currentQuestion.answerKey;
    const current = (answers[key] as string[] | undefined) || [];
    if (current.includes(value)) {
      (answers as Record<string, unknown>)[key] = current.filter(v => v !== value);
    } else {
      (answers as Record<string, unknown>)[key] = [...current, value];
    }
  }

  function handleTextChange(value: string) {
    const key = currentQuestion.answerKey;
    (answers as Record<string, unknown>)[key] = value;
  }

  function handleContinue() {
    if (isLastQuestion) {
      submitAnswers();
    } else {
      currentIndex++;
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      currentIndex--;
    }
  }

  function canContinue(): boolean {
    if (!currentQuestion) return false;
    const value = answers[currentQuestion.answerKey];
    if (currentQuestion.type === 'multi_select') {
      return Array.isArray(value) && value.length > 0;
    }
    if (currentQuestion.type === 'text') {
      return typeof value === 'string' && value.trim().length > 0;
    }
    return false;
  }

  async function submitAnswers() {
    onLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate configuration');
      }

      const config: AttioConfiguration = await response.json();
      onComplete(config);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      onError(message);
    } finally {
      onLoading(false);
    }
  }
</script>

<div class="mx-auto w-full max-w-2xl px-4">
  <ProgressBar current={currentIndex + 1} total={totalQuestions} />

  <div class="mt-8">
    {#if currentIndex > 0}
      <button
        type="button"
        class="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        onclick={handleBack}
      >
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
        </svg>
        Back
      </button>
    {/if}

    {#if currentQuestion}
      <TransitionWrapper key={currentQuestion.id}>
        <h2 class="text-xl font-semibold text-gray-900">
          {getQuestionText(currentQuestion)}
        </h2>

        {#if currentQuestion.subtext}
          <p class="mt-2 text-sm text-gray-500">{currentQuestion.subtext}</p>
        {/if}

        <div class="mt-6 space-y-3">
          {#if currentQuestion.type === 'single_select'}
            {#each getQuestionOptions(currentQuestion) as option}
              <OptionCard
                label={option.label}
                description={option.description}
                selected={answers[currentQuestion.answerKey] === option.value}
                onclick={() => handleSingleSelect(option.value)}
              />
            {/each}

          {:else if currentQuestion.type === 'multi_select'}
            {#each getQuestionOptions(currentQuestion) as option}
              <OptionCard
                label={option.label}
                description={option.description}
                selected={(answers[currentQuestion.answerKey] as string[] || []).includes(option.value)}
                multiSelect={true}
                onclick={() => handleMultiSelect(option.value)}
              />
            {/each}

            <div class="mt-6">
              <Button onclick={handleContinue} disabled={!canContinue()}>
                {isLastQuestion ? 'Generate my configuration' : 'Continue'}
              </Button>
            </div>

          {:else if currentQuestion.type === 'text'}
            <TextInput
              value={(answers[currentQuestion.answerKey] as string) || ''}
              placeholder={currentQuestion.placeholder}
              onchange={handleTextChange}
            />

            <div class="mt-6">
              <Button onclick={handleContinue} disabled={!canContinue()}>
                {isLastQuestion ? 'Generate my configuration' : 'Continue'}
              </Button>
            </div>
          {/if}
        </div>
      </TransitionWrapper>
    {/if}
  </div>
</div>
