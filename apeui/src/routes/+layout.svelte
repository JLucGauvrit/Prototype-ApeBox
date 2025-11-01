<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="min-h-screen">
	<Navbar />
	<main class="container mx-auto px-4 py-8">
		<slot />
	</main>
</div>
