<script>
  let services = [
    { name: 'Chatbot', description: "Chat with the AI", status: 'Running', logs: "Dernier log: OK" },
    { name: 'n8n', description: "Automation workflows", status: 'Stopped', logs: "Dernier log: Arrêté" },
    { name: 'Nextcloud', description: "File storage", status: 'Running', logs: "Dernier log: Synchro OK" }
  ];

  function startService(name) {
    alert(`Démarrage du service ${name} (brancher MCP/démarrage réel Docker ici)`);
  }

  function stopService(name) {
    alert(`Arrêt du service ${name} (brancher MCP/arrêt réel Docker ici)`);
  }
</script>

<h2 class="text-2xl font-bold mb-6">Gérer les Services</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {#each services as service}
    <div class="p-6 bg-white rounded shadow border">
      <div class="flex items-center space-x-2 mb-1">
        <span class="text-2xl">{service.name === "Chatbot" ? "💬" : service.name === "n8n" ? "⚡" : "☁️"}</span>
        <span class="font-semibold">{service.name}</span>
      </div>
      <div class="text-sm text-gray-600 mb-2">{service.description}</div>
      <div class="my-2 text-sm font-bold">{service.status === "Running"
        ? <span class="text-green-600">● Running</span>
        : <span class="text-gray-500">● Stopped</span>}</div>
      <div class="mb-2 text-xs bg-gray-50 rounded p-2">{service.logs}</div>
      <div class="flex space-x-2">
        <button class="px-4 py-1 bg-green-500 text-white rounded" on:click={() => startService(service.name)}>Start</button>
        <button class="px-4 py-1 bg-red-500 text-white rounded" on:click={() => stopService(service.name)}>Stop</button>
      </div>
    </div>
  {/each}
</div>
