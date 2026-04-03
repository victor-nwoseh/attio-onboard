<script lang="ts">
  interface Props {
    current: number;
    total: number;
  }

  let { current, total }: Props = $props();
  let percentage = $derived(Math.round((current / total) * 100));
</script>

<div class="w-full" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label="Question {current} of {total}">
  <div class="mb-2 flex items-center justify-between text-sm text-gray-500">
    <span>Question {current} of {total}</span>
    <span>{percentage}%</span>
  </div>
  <div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
    <div
      class="h-full rounded-full bg-indigo-600 transition-all duration-300 ease-out"
      style="width: {percentage}%"
    ></div>
  </div>
</div>
