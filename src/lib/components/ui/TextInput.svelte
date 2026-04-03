<script lang="ts">
  interface Props {
    value: string;
    placeholder?: string;
    onchange: (value: string) => void;
    labelledBy?: string;
  }

  let { value, placeholder = '', onchange, labelledBy }: Props = $props();
</script>

<textarea
  class="w-full rounded-lg border-2 border-gray-200 bg-white p-4 text-sm text-gray-900
    placeholder:text-gray-400 transition-colors duration-150
    hover:border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-2
    focus:ring-indigo-500 focus:ring-offset-2 resize-none"
  rows="4"
  {placeholder}
  {value}
  aria-labelledby={labelledBy}
  oninput={(e) => onchange(e.currentTarget.value)}
></textarea>
