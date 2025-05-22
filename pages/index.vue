<script setup lang="ts">
definePageMeta({
  layout: 'clear',
})

const items = [
  'https://picsum.photos/1920/1080?random=1',
  'https://picsum.photos/1920/1080?random=2',
  'https://picsum.photos/1920/1080?random=3',
  'https://picsum.photos/1920/1080?random=4',
  'https://picsum.photos/1920/1080?random=5',
  'https://picsum.photos/1920/1080?random=6',
]
</script>

<template>
  <main>
    <UCarousel
      v-slot="{ item }"
      :items="items"
      class="w-full mb-8"
    >
      <NuxtImg
        :src="item"
        format="webp"
        class="w-full object-cover rounded-2xl"
      />
    </UCarousel>

    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis iste iusto officiis
      perspiciatis quas unde voluptates. Accusamus adipisci aspernatur, assumenda commodi consequatur eius id illo,
      impedit magni mollitia natus necessitatibus non obcaecati quia sit soluta ullam unde ut velit voluptas?
      Debitis fugiat harum nisi nulla perferendis recusandae rerum vel.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis iste iusto officiis
      perspiciatis quas unde voluptates. Accusamus adipisci aspernatur, assumenda commodi consequatur eius id illo,
      impedit magni mollitia natus necessitatibus non obcaecati quia sit soluta ullam unde ut velit voluptas?
      Debitis fugiat harum nisi nulla perferendis recusandae rerum vel.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis iste iusto officiis
      perspiciatis quas unde voluptates. Accusamus adipisci aspernatur, assumenda commodi consequatur eius id illo,
      impedit magni mollitia natus necessitatibus non obcaecati quia sit soluta ullam unde ut velit voluptas?
      Debitis fugiat harum nisi nulla perferendis recusandae rerum vel.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis iste iusto officiis
      perspiciatis quas unde voluptates. Accusamus adipisci aspernatur, assumenda commodi consequatur eius id illo,
      impedit magni mollitia natus necessitatibus non obcaecati quia sit soluta ullam unde ut velit voluptas?
      Debitis fugiat harum nisi nulla perferendis recusandae rerum vel.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis iste iusto officiis
      perspiciatis quas unde voluptates. Accusamus adipisci aspernatur, assumenda commodi consequatur eius id illo,
      impedit magni mollitia natus necessitatibus non obcaecati quia sit soluta ullam unde ut velit voluptas?
      Debitis fugiat harum nisi nulla perferendis recusandae rerum vel.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis iste iusto officiis
      perspiciatis quas unde voluptates. Accusamus adipisci aspernatur, assumenda commodi consequatur eius id illo,
      impedit magni mollitia natus necessitatibus non obcaecati quia sit soluta ullam unde ut velit voluptas?
      Debitis fugiat harum nisi nulla perferendis recusandae rerum vel.
    </div>
  </main>
</template>
