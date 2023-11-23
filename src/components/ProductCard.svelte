<script lang="ts">
    import { Card, Button, Toggle } from 'flowbite-svelte';
    import ArrowRightOutline from 'flowbite-svelte-icons/ArrowRightOutline.svelte';
	import type { Product } from '../interfaces/product.dto';
    export let product: Product = {
        id: 1,
        name: 'product.',
        description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
        img: '/images/image-1.webp',
            price: 0,
    category: {
        id: 1,
        name: 'product.',
        state: false,
        img: '/images/image-1.webp',
    },
    stock: 0,
    fav: false,
    hasStock: false
    }; 
  </script>
   
    <Card img={product.img} reverse={false} class="mb-4 min-h-full">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{product.description}</p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">${product.price}</p>
      <Button>
        Read more <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
      </Button>
    </Card>
  