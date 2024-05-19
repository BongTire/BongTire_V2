<template>
  <!-- The AG Grid component -->
 <ag-grid-vue
   :rowData="rowData"
   :columnDefs="colDefs"
   style="height: 500px"
   class="ag-theme-quartz"
 >
 </ag-grid-vue>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component

const rowData = ref([
   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
   { make: "Ford", model: "F-Series", price: 33850, electric: false },
   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
 ]);

const UserCol = ref([
  { field: "사용자명" },
  { field: "사용자 전화번호" },
  { field: "가입경로" },
  { field: "블랙 여부" },
  { field: "등급" },
  { field: "주소지" },
  { field: "가입날짜" }
])

const TireCol = ref([
  { field: "브랜드" },
  { field: "상품 명" },
  { field: "타이어 사이즈" },
  { field: "가격" },
  { field: "재고" },
  { field: "공장가" },
  { field: "할인율" },
  { field: "할인가" },
  { field: "판매 여부" },
  { field: "중고 여부" },
])

const WheelCol = ref([
  { field: "브랜드" },
  { field: "상품 명" },
  { field: "휠 사이즈" },
  { field: "휠 프론트 옵셋" },
  { field: "휠 리어 옵셋" },
  { field: "PCD" },
  { field: "홀 갯수" },
  { field: "가격" },
  { field: "재고" },
  { field: "공장가" },
  { field: "할인율" },
  { field: "할인가" },
  { field: "판매 여부" },
  { field: "중고 여부" },
])


 // Column Definitions: Defines the columns to be displayed.
 const colDefs = ref([
   { field: "make" },
   { field: "model" },
   { field: "price" },
   { field: "electric" }
 ]);

</script>

<style>

</style>