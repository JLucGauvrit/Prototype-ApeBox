<script>
  import '../app.css';
</script>

<div class="flex min-h-screen">
  <aside class="w-64 bg-white border-r">
    <div class="px-8 py-6 flex items-center space-x-4">
      <span class="text-2xl">🦍</span>
      <span class="text-xl font-bold">ApeBox</span>
    </div>
    <nav class="space-y-1 px-8">
      <a href="/" class="flex items-center py-2 font-semibold text-blue-700">
        <svg width="18" height="18" class="mr-2"><rect width="18" height="18" fill="#374151" /></svg>
        Dashboard
      </a>
      <a href="/services" class="flex items-center py-2 text-gray-700 hover:text-blue-700">
        <svg width="18" height="18" class="mr-2"><circle cx="9" cy="9" r="8" fill="#374151" /></svg>
        Services
      </a>
      <a href="/settings" class="flex items-center py-2 text-gray-700 hover:text-blue-700">
        <svg width="18" height="18" class="mr-2"><polygon points="9,2 15,16 3,16" fill="#374151" /></svg>
        Settings
      </a>
    </nav>
  </aside>
  <div class="flex-1 flex flex-col">
    <header class="flex items-center justify-between px-8 py-6 border-b bg-white">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <button class="text-gray-700 font-semibold">Log out</button>
    </header>
    <main class="flex-1 px-8 py-10">
      <slot />
    </main>
  </div>
</div>
