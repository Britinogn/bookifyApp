<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <NuxtPageEvents/>
  </div>
</template> -->

<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>

</template>
