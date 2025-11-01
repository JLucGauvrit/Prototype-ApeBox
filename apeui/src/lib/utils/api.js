import { services } from '$lib/stores/services.js';

const API_BASE = 'http://localhost:8080/api';

export async function fetchServices() {
	try {
		const response = await fetch(`${API_BASE}/services`);
		const data = await response.json();
		services.set(data.services || []);
	} catch (error) {
		console.error('Erreur lors de la récupération des services:', error);
	}
}

export async function startService(name) {
	try {
		await fetch(`${API_BASE}/services/${name}/start`, { method: 'POST' });
		await fetchServices();
	} catch (error) {
		console.error(`Erreur lors du démarrage de ${name}:`, error);
	}
}

export async function stopService(name) {
	try {
		await fetch(`${API_BASE}/services/${name}/stop`, { method: 'POST' });
		await fetchServices();
	} catch (error) {
		console.error(`Erreur lors de l'arrêt de ${name}:`, error);
	}
}
