<script>
	import { Play, Square, ExternalLink } from 'lucide-svelte';
	import { startService, stopService } from '$lib/utils/api.js';

	export let service;

	const icons = {
		vllm: '🤖',
		n8n: '⚡',
		nextcloud: '☁️',
		mcp: '🔌',
		postgres: '🐘',
		qdrant: '🔍'
	};

	const getStatusColor = (status) => {
		return status === 'running' ? 'bg-green-500' : 'bg-gray-400';
	};

	async function handleStart() {
		await startService(service.name);
	}

	async function handleStop() {
		await stopService(service.name);
	}

	function openService() {
		if (service.url) {
			window.open(service.url, '_blank');
		}
	}
</script>

<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
	<div class="flex items-start justify-between mb-4">
		<div class="flex items-center space-x-3">
			<span class="text-3xl">{icons[service.name] || '📦'}</span>
			<div>
				<h3 class="text-lg font-semibold text-gray-900">{service.displayName || service.name}</h3>
				<p class="text-sm text-gray-500">{service.description}</p>
			</div>
		</div>
		<div class="flex items-center space-x-2">
			<div class="w-3 h-3 rounded-full {getStatusColor(service.status)}"></div>
			<span class="text-xs text-gray-600">{service.status}</span>
		</div>
	</div>

	<div class="flex space-x-2">
		{#if service.status === 'running'}
			<button
				on:click={handleStop}
				class="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
			>
				<Square size={16} />
				<span>Arrêter</span>
			</button>
			{#if service.url}
				<button
					on:click={openService}
					class="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
				>
					<ExternalLink size={16} />
					<span>Ouvrir</span>
				</button>
			{/if}
		{:else}
			<button
				on:click={handleStart}
				class="flex items-center space-x-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
			>
				<Play size={16} />
				<span>Démarrer</span>
			</button>
		{/if}
	</div>
</div>
