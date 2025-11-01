<script>
	import { onMount } from 'svelte';
	import ServiceGrid from '$lib/components/ServiceGrid.svelte';
	import { services } from '$lib/stores/services.js';
	import { fetchServices } from '$lib/utils/api.js';

	onMount(async () => {
		await fetchServices();
	});
</script>

<svelte:head>
	<title>ApeBox - Marketplace IA Locale</title>
</svelte:head>

<div class="space-y-6">
	<header class="text-center">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">🦍 ApeBox Marketplace</h1>
		<p class="text-gray-600">Lancez et gérez vos outils IA locaux en un clic</p>
	</header>

	<ServiceGrid />
</div>
