<script lang="ts">
  interface Props {
    summary: string;
  }

  let { summary }: Props = $props();
</script>

<section class="mb-10">
  <p class="text-lg text-gray-700 leading-relaxed">{summary}</p>
</section>
