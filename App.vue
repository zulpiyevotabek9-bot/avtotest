<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Icon from './components/Icon.vue'
import { account, api } from './services/api.js'

const router = useRouter()
const error = ref('')
const links = [
  ['/tests', 'ClipboardList', 'Testlar'],
  ['/rules', 'BookOpen', 'Qoidalar'],
  ['/signs', 'Signpost', 'Belgilar'],
]
async function logout() {
  error.value = ''
  try {
    await api('/auth/logout', { method: 'POST' })
    account.value = null
    router.push('/')
  } catch (issue) { error.value = issue.message }
}
</script>

<template>
  <a class="skip-link" href="#content">Asosiy mazmunga o‘tish</a>
  <header class="platform-header">
    <div class="platform-nav">
      <RouterLink class="platform-brand" to="/"><span class="brand-mark"><Icon name="Gauge" :size="23" /></span><strong>AVTO<span> TEST</span> 4D</strong></RouterLink>
      <nav aria-label="Asosiy sahifalar">
        <RouterLink v-for="[path, icon, name] in links" :key="path" :to="path"><Icon :name="icon" :size="17" />{{ name }}</RouterLink>
      </nav>
      <div class="platform-user">
        <RouterLink v-if="account?.role === 'admin'" to="/admin" class="icon-button control" aria-label="Admin panel"><Icon name="ShieldCheck" :size="18" /></RouterLink>
        <template v-if="account">
          <span class="user-name">{{ account.name }}</span><button class="icon-button control" aria-label="Chiqish" title="Chiqish" @click="logout"><Icon name="LogOut" :size="18" /></button>
        </template>
        <RouterLink v-else to="/login" class="button secondary"><Icon name="LogIn" :size="16" />Kirish</RouterLink>
      </div>
    </div>
  </header>
  <main id="content" class="platform-main">
    <p v-if="error" class="notice error" role="alert">{{ error }}</p>
    <RouterView />
  </main>
  <footer class="platform-footer"><span>AVTO TEST 4D</span><RouterLink to="/privacy">Maxfiylik</RouterLink></footer>
</template>
