<template>
  <div>
    <h1>Welcome to the homepage</h1>
      <NuxtLink to="/about">
        About Us
      </NuxtLink>
    <AppAlert>
      This is an auto-imported component
    </AppAlert>
    <div>
      <h1>This is my HTML!</h1>
      <p class="localtxt">{{ localStr }} {{ localnumb }}</p>
      <p class="apitxt">{{ helloMessage }}</p>
     </div>
     <div>
        <p>Count: {{ counter }}</p>
        <button @click="handleClick">
        Increment
        </button>
     </div>
  </div>
</template>
<script setup lang="ts">
    const localStr: string = 'This is from a local string.';
    const localnumb: number = 12;
    const counter = ref(0); // executes in server and client environments
    const { $api } = useNuxtApp();

    
    const { data: helloMessage } = await useAsyncData(async () => {
      const { data, error } = await $api.hello.get()
      if (error) {
        throw new Error('Failed to call API')
      }
      return data.message
    });

    const handleClick = () => {
      counter.value++ // executes only in a client environment
    }
</script>
