<script>
  import { onMount } from 'svelte';
  let chatInput = '';
  let chatLog = [];
  let loading = false;

  let services = [
    { name: 'Chatbot', description: "Chat with the AI", status: 'Running' },
    { name: 'n8n', description: "Automation workflows", status: 'Stopped' },
    { name: 'Nextcloud', description: "File storage", status: 'Running' }
  ];

  async function sendChat() {
    loading = true;
    // Ici, tu peux faire un appel MCP : fetch('/api/mcp/chat', {method:"POST", body:chatInput})
    chatLog.push({ role: "user", text: chatInput });
    setTimeout(() => {
      chatLog.push({ role: "bot", text: "Réponse simulée (brancher MCP/LLM ici)" });
      loading = false;
      chatInput = '';
    }, 700);
  }

  function connectENT() {
    // Redirige vers l'auth ENT/Keycloak/SAML
    alert("Connexion ENT entreprise, via SSO, popup, etc.");
  }
</script>

<section class="mb-10">
  <h2 class="text-2xl font-bold mb-4">Chat</h2>
  <div class="mb-4">
    <textarea class="w-full p-4 border rounded mb-2" rows="3" bind:value={chatInput} placeholder="Ask something..."/>
    <button class="px-6 py-2 bg-blue-600 text-white font-semibold rounded" on:click={sendChat} disabled={loading}>
      {loading ? "Sending..." : "Send"}
    </button>
  </div>
  <div class="bg-gray-100 rounded p-4">
    {#each chatLog as msg}
      <div class="my-2">
        <span class="font-semibold">{msg.role === "user" ? "Vous" : "AI"}</span>: {msg.text}
      </div>
    {/each}
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-bold mb-4">Services</h2>
  <div class="flex space-x-6">
    {#each services as service}
      <div class="p-6 rounded-lg bg-white shadow border w-64">
        <div class="flex items-center mb-2">
          <span class="text-2xl mr-2">{service.name === "Chatbot" ? "💬" : service.name === "n8n" ? "⚡" : "☁️"}</span>
          <span class="font-semibold">{service.name}</span>
        </div>
        <div class="text-sm text-gray-600 mb-2">{service.description}</div>
        <div class="text-sm">{service.status === "Running"
          ? <span class="text-green-600 font-bold">● Running</span>
          : <span class="text-gray-500 font-bold">● Stopped</span>}</div>
      </div>
    {/each}
  </div>
  <button class="mt-8 px-8 py-3 bg-blue-600 text-white rounded font-bold text-lg" on:click={connectENT}>
    Connect to ENT
  </button>
</section>
