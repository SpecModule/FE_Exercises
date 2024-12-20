<script setup lang="ts">
import { ref } from 'vue'
import { api, apiEmployee, apiToServer } from '@/utils/api'
import PremisesAddModal from './modal/PremisesAddModal.vue'

// ----------------------------------------------------SEARCH------------------------------------------------------------
const id = ref("");
const name = ref("");
const address = ref("");
const type = ref("");
const areaFrom = ref();
const areaTo = ref();
const rentPriceRange = ref("");
const fromDate = ref("");
const toDate = ref("");

async function resetForm() {
  id.value = "";
  name.value = "";
  address.value = "";
  type.value = "";
  areaFrom.value = null;
  areaTo.value = null;
  rentPriceRange.value = "";
  toDate.value = "";
  fromDate.value = "";
  await getAll(0);
}
// ---------------------------------------------PAGINATION-----------------------------------------------------

let pageable: { pageNumber: 0, pageSize: 5, totalPages: 0 };
let totalPages: 0;

let premises = ref<any>(null);
let pre = ref<any>(null);

async function getAll(page:number) {
  const queryParams = {
    id: id.value || null,
    name: name.value || null,
    address: address.value || null,
    type: type.value || null,
    areaTo:areaTo.value || null,
    areaFrom:areaFrom.value || null,
    rentPriceRange: rentPriceRange.value === "" ? null : rentPriceRange.value,
    fromDate: fromDate.value || null,
    toDate: toDate.value || null,
    page: page || 0
  };

  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== null && value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join("&");

  const apiUrl = `${api}${apiEmployee}?${queryString}`;

  try {
    const result = await apiToServer(apiUrl, "GET", null);
    premises.value = result.data.content;
    pageable = result.data.pageable;
    totalPages = result.data.totalPages;
  } catch (error) {
    console.error("Error fetching employees:", error);
    premises.value = [];
  }
}

// async function getPre(idPre: string) {
//   let apiObj = `${api}${apiEmployee}/${idEmployee}`
//   const result = await apiToServer(apiObj, 'GET');
//   pre.value = result.data.data;
// }

getAll(0)

//-----------------------------------------------ADD----------------------------------
const isShowModalAdd = ref(false)

function closeModalAdd() {
  isShowModalAdd.value = false
}

function showModalAdd() {
  isShowModalAdd.value = true
}

async function addPre(newPre: any) {
  const apiObj = `${api}${apiEmployee}`
  const result = await apiToServer(apiObj, 'POST', newPre)
  closeModalAdd();
}

</script>

<template>
<div>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold text-center mb-6">QUẢN LÝ MẶT BẰNG</h1>
    <form class="grid grid-cols-2 gap-6 lg:grid-cols-4">
      <!-- Mã mặt bằng -->
      <div>
        <label class="block text-sm font-medium text-gray-700" for="ma-mat-bang">Mã mặt bằng</label>
        <input
          type="text"
          id="ma-mat-bang"
          v-model="id"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Nhập mã mặt bằng"
        />
      </div>

      <!-- Tên mặt bằng -->
      <div>
        <label class="block text-sm font-medium text-gray-700" for="ten-mat-bang"
          >Tên mặt bằng (Tìm kiếm gần đúng)</label
        >
        <input
          type="text"
          id="ten-mat-bang"
          v-model="name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Nhập tên mặt bằng"
        />
      </div>

      <!-- Địa chỉ -->
      <div>
        <label class="block text-sm font-medium text-gray-700" for="dia-chi"
          >Địa chỉ (Tìm kiếm gần đúng)</label
        >
        <input
          type="text"
          id="dia-chi"
          v-model="address"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Nhập địa chỉ"
        />
      </div>

      <!-- Loại mặt bằng -->
      <div>
        <label class="block text-sm font-medium text-gray-700" for="loai-mat-bang"
          >Loại mặt bằng</label
        >
        <select
          id="loai-mat-bang"
          v-model="type"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="">Tất cả</option>
          <option value="office">Văn phòng</option>
          <option value="shop">Cửa hàng</option>
          <option value="house">Nhà ở</option>
        </select>
      </div>

      <!-- Diện tích từ -->
      <div>
        <label class="block text-sm font-medium text-gray-700" for="dien-tich-tu"
          >Diện tích từ</label
        >
        <input
          type="number"
          id="dien-tich-tu"
          v-model="areaFrom"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Nhập diện tích từ"
        />
      </div>

      <!-- Diện tích đến -->
      <div>
        <label class="block text-sm font-medium text-gray-700" for="dien-tich-den"
          >Diện tích đến</label
        >
        <input
          type="number"
          id="dien-tich-den"
          v-model="areaTo"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Nhập diện tích đến"
        />
      </div>

      <!-- Giá thuê -->
      <div>
        <label class="block text-sm font-medium text-gray-700" for="gia-thue">Giá thuê</label>
        <select
          id="gia-thue"
          v-model="rentPriceRange"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="">Tất cả</option>
          <option value="UNDER_2M">Dưới 2 triệu</option>
          <option value="2M_TO_5M">Từ 2 triệu đến dưới 5 triệu</option>
          <option value="5M_TO_10M">Từ 5 triệu đến dưới 10 triệu</option>
          <option value="OVER_10M">Trên 10 triệu</option>
        </select>
      </div>

      <!-- Ngày thuê từ -->
      <div>
        <label class="block text-sm font-medium text-gray-700" for="ngay-thue-tu"
          >Ngày thuê từ</label
        >
        <input
          type="date"
          id="ngay-thue-tu"
          v-model="fromDate"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <!-- Ngày thuê đến -->
      <div>
        <label class="block text-sm font-medium text-gray-700" for="ngay-thue-den"
          >Ngày thuê đến</label
        >
        <input
          type="date"
          id="ngay-thue-den"
          v-model="toDate"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
    </form>

    <!-- Buttons -->
    <div class="mt-6 flex justify-end space-x-4">
      <button
        type="button"
        @click="resetForm"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow hover:bg-gray-300"
      >
        Đặt lại
      </button>
      <button
        type="button"
        @click="getAll(0)"
        class="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        Tìm kiếm
      </button>
    </div>
  </div>

  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Danh sách mặt bằng</h1>
      <button
        @click="showModalAdd"
        class="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
      >
        + Thêm mới
      </button>
    </div>
    <table class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Mã Mặt bằng</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tên Mặt bằng</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Địa chỉ</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Diện tích (m2)</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Loại Mặt bằng</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Giá thuê (VNĐ/tháng)</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày bắt đầu cho thuê</th>
          <th class="px-4 py-2 text-center text-sm font-semibold text-gray-700">Chi tiết</th>
          <th class="px-4 py-2 text-center text-sm font-semibold text-gray-700">Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="premise in premises" :key="premises.id" class="hover:bg-gray-50">
          <td class="px-4 py-2 border-t text-sm text-gray-700">{{ premise.id }}</td>
          <td class="px-4 py-2 border-t text-sm text-gray-700">{{ premise.name }}</td>
          <td class="px-4 py-2 border-t text-sm text-gray-700">{{ premise.address }}</td>
          <td class="px-4 py-2 border-t text-sm text-gray-700">{{ premise.area }}</td>
          <td class="px-4 py-2 border-t text-sm text-gray-700">{{ premise.type }}</td>
          <td class="px-4 py-2 border-t text-sm text-gray-700">{{ premise.rentPrice }}</td>
          <td class="px-4 py-2 border-t text-sm text-gray-700">{{ premise.startDate }}</td>
          <td class="px-4 py-2 border-t text-center">
            <button
              @click="viewDetails(premise.id)"
              class="px-2 py-1 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            </button>
          </td>
          <td class="px-4 py-2 border-t text-center">
            <button
              @click="deletePremises(premise.id)"
              class="px-2 py-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div>
    <nav class="flex items-center justify-center mt-6">
      <ul class="inline-flex items-center space-x-2">
        <li>
          <button
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            :disabled="pageable?.pageNumber === 0"
            @click="getAll(pageable?.pageNumber - 1)"
          >
            Previous
          </button>
        </li>
        <li class="text-gray-700">
          Page {{ pageable?.pageNumber + 1 }} of {{ totalPages }}
        </li>
        <li>
          <button
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            :disabled="pageable?.pageNumber + 1 >= totalPages"
            @click="getAll(pageable?.pageNumber + 1)"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</div>

  <div class="absolute top-20 left-1/3">
    <div class="flex justify-center">
      <PremisesAddModal v-if="isShowModalAdd" @close="closeModalAdd" @add="addPre" />
    </div>
  </div>

</template>
