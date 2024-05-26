<template>
  <!-- The AG Grid component -->
  <div>
    <div class="relative flex items-center w-128 mb-5">
      <input type="text" name="search" id="search"
             class="block pl-2 w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             placeholder="타이어 검색"
             v-model="searchText"
             @input="onFilterTextBoxChanged"
      />
      <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
      </div>
    </div>
  </div>
 <ag-grid-vue
   :rowData="props.conf"
   :columnDefs="cols"
   style="height: 800px"
   @cellDoubleClicked="onCellDoubleClicked"
   @grid-ready="onGridReady"
   class="ag-theme-quartz"
 >
 </ag-grid-vue>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component
import { IProduct } from '@type/product';

const props = defineProps({
  conf:{
    type: Array as PropType<IProduct>
  },
  state:{
    type: String
  }
})

const emits = defineEmits(['editData'])
const gridApi = ref(null);

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
  { field: "brandName", headerName: "브랜드 명", width: 150},
  { field: "productName", headerName: "상품 명", width:250},
  { field: "tireSize", headerName: "타이어 사이즈", width: 150},
  { field: "amount", headerName: "재고", width:80},
  { field: "price", headerName: "공장가", width: 150},
  { field: "discountRate", headerName: "할인율", width: 100},
  { field: "discountPrice", headerName: "할인가", width: 150},
  { field: "isActive", headerName: "판매 여부" ,width: 100,
    cellRenderer: (params:any) => (params.value === 1 ? '판매 중' : '판매 중지'),
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [1, 0],
      formatValue: (value:number) => (value === 1 ? 'true' : 'false'),
    },
  },
  { field: "isSecond", headerName: "중고 여부",editable: true, width: 100,
    cellRenderer: (params:any) => (params.value === 1 ? '중고 제품' : '새상품'),
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [1, 0],
      formatValue: (value:number) => (value === 1 ? 'true' : 'false'),
    },
  },
])

const WheelCol = ref([
  { field: "brandName", headerName: "브랜드" , width: 150},
  { field: "productName", headerName: "상품 명" , width: 250},
  { field: "wheelSize", headerName: "휠 사이즈" , width: 150},
  { field: "frontOffset", headerName: "휠 프론트 옵셋" , width: 150},
  { field: "rearOffset", headerName: "휠 리어 옵셋" , width: 150},
  { field: "PCD", headerName: "PCD" , width: 150},
  { field: "hole", headerName: "홀 갯수" , width: 100},
  { field: "amount", headerName: "재고" , width: 100},
  { field: "price", headerName: "공장가" , width: 150},
  { field: "discountRate", headerName: "할인율" , width: 150},
  { field: "discountPrice", headerName: "할인가" , width: 150},
  { field: "isActive", headerName: "판매 여부" , width: 100,
    cellRenderer: (params:any) => (params.value === 1 ? '판매 중' : '판매 중지'),
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [1, 0],
      formatValue: (value:number) => (value === 1 ? 'true' : 'false'),
    },
  },
  { field: "isSecond", headerName: "중고 여부" , width: 100,
    cellRenderer: (params:any) => (params.value === 1 ? '중고 제품' : '새상품'),
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [1, 0],
      formatValue: (value:number) => (value === 1 ? 'true' : 'false'),
    },},
])


 // Column Definitions: Defines the columns to be displayed.
 const colDefs = ref([
   { field: "make" },
   { field: "model" },
   { field: "price" },
   { field: "electric" }
 ]);


const cols = computed(()=>{
  if(props?.state === 'tire') return TireCol.value
  else if(props?.state==='wheel') return WheelCol.value
  else if(props?.state === 'user') return UserCol.value
})

const selectedRowData = ref({});

const onCellDoubleClicked = (params:any) => {
  if(!params.colDef.editable) {
    selectedRowData.value = params.data;
    emits('editData', params.data)
  }
};

//Grid Search
const searchText = ref('')

const onFilterTextBoxChanged = () => {
  gridApi.value.setQuickFilter(searchText.value);
};
const onGridReady = (params) => {
  gridApi.value = params.api;
};

</script>

<style>

</style>