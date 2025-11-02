<script>
  let openaiKey = '';
  let geminiKey = '';
  let perplexityKey = '';

  function saveSettings() {
    alert('Settings saved! (brancher stockage sécurisé, callback backend)');
  }
</script>

<h2 class="text-2xl font-bold mb-4">Paramètres</h2>
<div class="max-w-lg bg-white p-6 rounded shadow border">
  <div class="mb-4">
    <label class="font-semibold block mb-1">Clé OpenAI</label>
    <input class="border rounded w-full p-2" bind:value={openaiKey} placeholder="sk-..." />
  </div>
  <div class="mb-4">
    <label class="font-semibold block mb-1">Clé Gemini</label>
    <input class="border rounded w-full p-2" bind:value={geminiKey} placeholder="gem-..." />
  </div>
  <div class="mb-4">
    <label class="font-semibold block mb-1">Clé Perplexity</label>
    <input class="border rounded w-full p-2" bind:value={perplexityKey} placeholder="pplx-..." />
  </div>
  <button class="bg-blue-600 text-white font-semibold px-6 py-2 rounded" on:click={saveSettings}>Sauvegarder</button>
</div>
