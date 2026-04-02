<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-white font-sans antialiased text-gray-900">
	{@render children()}
</div>
