<template>
  <div>
    <h3 class="text-base font-semibold leading-6 text-gray-900">지난 30일 동안</h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div v-for="item in stats" :key="item.name" class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">{{ item.name }}</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ item.stat }}</dd>
      </div>
    </dl>
  </div>
  <div class="mt-10">
    <h1 class="text-lg font-semibold">오늘 예약 현황</h1>
    <div>
      <!-- 예약 현황판 컴포넌트 -->
    </div>
  </div>
</template>

<script setup>
const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
]
</script>