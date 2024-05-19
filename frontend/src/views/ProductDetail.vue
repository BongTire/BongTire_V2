<template>
    <div class="bg-white">
  
      <main class="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">
          <!-- Product -->
          <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <!-- Image gallery -->
            <TabGroup as="div" class="flex flex-col-reverse">
              <!-- Image selector -->
              <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList class="grid grid-cols-4 gap-6">
                  <Tab v-for="image in product.images" :key="image.id" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" v-slot="{ selected }">
                    <span class="sr-only">{{ image.name }}</span>
                    <span class="absolute inset-0 overflow-hidden rounded-md">
                      <img :src="image.src" alt="" class="h-full w-full object-cover object-center" />
                    </span>
                    <span :class="[selected ? 'ring-orange-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
                  </Tab>
                </TabList>
              </div>
  
              <TabPanels class="aspect-h-1 aspect-w-1 w-full">
                <TabPanel v-for="image in product.images" :key="image.id">
                  <img :src="image.src" :alt="image.alt" class="h-full w-full object-cover object-center sm:rounded-lg" />
                </TabPanel>
              </TabPanels>
            </TabGroup>
  
            <!-- Product info -->
            <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>
  
              <div class="mt-3">
                <h2 class="sr-only">Product information</h2>
                <p class="text-3xl tracking-tight text-gray-900">{{ product.price }}</p>
              </div>
  
              <!-- Reviews -->
              <div class="mt-3">
                <h3 class="sr-only">Reviews</h3>
                <div class="flex items-center">
                  <div class="flex items-center">
                    <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[product.rating > rating ? 'text-orange-500' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                  </div>
                  <p class="sr-only">{{ product.rating }} out of 5 stars</p>
                </div>
              </div>
  
              <div class="mt-6">
                <h3 class="sr-only">특징</h3>
  
                <div class="space-y-6 text-base text-gray-700" v-html="product.description" />
              </div>
  
              <form class="mt-6">
  
                <div class="mt-10 flex">
                  <button type="submit" class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">얘약하기</button>
  
                  <button type="button" class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span class="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>
  
              <section aria-labelledby="details-heading" class="mt-12">
                <h2 id="details-heading" class="sr-only">Additional details</h2>
                    
                <div class="divide divide-gray-200 border-t">
                    <h2 class="text-xl mt-5">차량 수리 위치</h2>
                    <div class="w-72 relative">
                        <button class="bg-orange-600 w-36 h-20 absolute rounded-tl-lg opacity-50 "></button>
                        <button class="bg-orange-600 w-36 h-20 absolute rounded-tr-lg opacity-50  right-0"></button>
                        <button class="bg-orange-600 w-36 h-20 absolute rounded-bl-lg opacity-50 top-20"></button>
                        <button class="bg-orange-600 w-36 h-20 absolute rounded-br-lg opacity-50 top-20 right-0"></button>
                        <img src="@image/systemIcon/Car/top-car-view.png" class="w-72">
                        
                    </div>
                    

                </div>
              </section>
            </div>
          </div>
  
          <section aria-labelledby="related-heading" class="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
            <h2 id="related-heading" class="text-xl font-bold text-gray-900">Customers also bought</h2>
  
            <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              <div v-for="product in relatedProducts" :key="product.id">
                <div class="relative">
                  <div class="relative h-72 w-full overflow-hidden rounded-lg">
                    <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center" />
                  </div>
                  <div class="relative mt-4">
                    <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
                    <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                  </div>
                  <div class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                    <p class="relative text-lg font-semibold text-white">{{ product.price }}</p>
                  </div>
                </div>
                <div class="mt-6">
                  <a :href="product.href" class="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                    >Add to bag<span class="sr-only">, {{ product.name }}</span></a
                  >
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
  
      
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import {
    Bars3Icon,
    HeartIcon,
    MagnifyingGlassIcon,
    MinusIcon,
    PlusIcon,
    ShoppingBagIcon,
    UserIcon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'
  import { StarIcon } from '@heroicons/vue/20/solid'
  

  const product = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    images: [
      {
        id: 1,
        name: 'Angled view',
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
        alt: 'Angled front view with bag zipped and handles upright.',
      },
      // More images...
    ],
    colors: [
      { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
      { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
      { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],
    description: `
      <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    `
  }
  const relatedProducts = [
    {
      id: 1,
      name: 'Zip Tote Basket',
      color: 'White and black',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
      imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
      price: '$140',
    },
    // More products...
  ]
  
  const selectedColor = ref(product.colors[0])
  </script>