<script setup lang="ts">
import { ref } from 'vue'
import { api, apiEmployee, apiEmployeeSearch, apiToServer } from '@/utils/api'
import EmployeeAddModal from './modal/EmployeeAddModal.vue'
import EmployeeUpdateModal from './modal/EmployeeUpdateModal.vue'
import EmployeeDetailModal from './modal/EmployeeDetailModal.vue'

let employees = ref<any>(null)
let employee = ref<any>(null)

async function getAllEmployees() {
  let apiObj = `${api}${apiEmployee}`
  employees.value = await apiToServer(apiObj, 'GET')
}

async function getEmployee(idEmployee: number) {
  let apiObj = `${api}${apiEmployee}/${idEmployee}`
  employee.value = await apiToServer(apiObj, 'GET')
}

getAllEmployees()

const isShowModal = ref(false)
const isShowModalUpdate = ref(false)
const isShowModalAdd = ref(false)

function closeModal() {
  isShowModal.value = false
}

function closeModalUpdate() {
  isShowModalUpdate.value = false
}

function closeModalAdd() {
  isShowModalAdd.value = false
}

async function showModal(id: number) {
  await getEmployee(id)
  isShowModal.value = true
  isShowModalUpdate.value = false
  isShowModalAdd.value = false
}

async function showModalUpdate(id: number) {
  await getEmployee(id)
  isShowModalUpdate.value = true
  isShowModal.value = false
  isShowModalAdd.value = false
}

function showModalAdd() {
  isShowModalAdd.value = true
  isShowModal.value = false
  isShowModalUpdate.value = false
}

async function updateInfo(id: number) {
  const apiObj = `${api}${apiEmployee}/${id}`
  const updatedEmployee = {
    name: employee.value.name,
    birthday: employee.value.birthday,
    gender: employee.value.gender,
    phone: employee.value.phone,
    salary: employee.value.salary,
  }

  const result = await apiToServer(apiObj, 'PUT', updatedEmployee)

  if (result) {
    alert('Cập nhật thông tin thành công!')
    closeModalUpdate()
    await getAllEmployees()
  } else {
    alert('Cập nhật thông tin thất bại!')
  }
}

async function deleteEmployee(idEmployee: number) {
  let apiObj = `${api}${apiEmployee}/${idEmployee}`
  await apiToServer(apiObj, 'DELETE')
  await getAllEmployees()
  closeModal()
  closeModalAdd()
  closeModalUpdate()
}

async function addEmployee(newEmployee: any) {
  const apiObj = `${api}${apiEmployee}`
  const result = await apiToServer(apiObj, 'POST', newEmployee)

  if (result) {
    alert('Thêm employee thành công!')
    closeModalAdd()
    await getAllEmployees()
  } else {
    alert('Thêm employee thất bại!')
  }
}

// ----------------------------------------------------SEARCH------------------------------------------------------------
const name = ref("");
const dobFrom = ref("");
const dobTo = ref("");
const gender = ref("Tất cả");
const salaryRange = ref("Tất cả");
const phone = ref("");
const departmentId = ref("Tất cả");

async function resetForm() {
  name.value = "";
  dobFrom.value = "";
  dobTo.value = "";
  gender.value = "Tất cả";
  salaryRange.value = "Tất cả";
  phone.value = "";
  departmentId.value = "Tất cả";
  await getAllEmployees();
}

async function search() {
  const queryParams = {
    name: name.value || null,
    dobFrom: dobFrom.value || null,
    dobTo: dobTo.value || null,
    gender: gender.value === "Tất cả" ? null : gender.value,
    salaryRange: salaryRange.value === "Tất cả" ? null : salaryRange.value,
    phone: phone.value || null,
    departmentId: departmentId.value === "Tất cả" ? null : departmentId.value,
  };

  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== null && value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join("&");

  const apiUrl = `${api}${apiEmployeeSearch}?${queryString}`;
  console.log(apiUrl)

  try {
    const result = await apiToServer(apiUrl, "GET", null);
    employees.value = result;
  } catch (error) {
    console.error("Error fetching employees:", error);
    employees.value = [];
  }
}

</script>

<template>
  <div class="p-6 max-w-4xl mx-auto mb-5">
    <h2 class="text-xl font-bold mb-6">Tìm kiếm nhân viên</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tên (Tìm kiếm gần đúng)</label>
        <input
          type="text"
          v-model="name"
          placeholder="Nhập tên"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ngày sinh từ</label>
        <input
          type="date"
          v-model="dobFrom"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ngày sinh đến</label>
        <input
          type="date"
          v-model="dobTo"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
        <select
          v-model="gender"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Tất cả</option>
          <option>Nam</option>
          <option>Nữ</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Mức lương</label>
        <select
          v-model="salaryRange"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Tất cả</option>
          <option value="0-5000">0 - 5000</option>
          <option value="5000-10000">5000 - 10000</option>
          <option value="10000+">10000+</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại (Tìm kiếm gần đúng)</label>
        <input
          type="text"
          v-model="phone"
          placeholder="Nhập số điện thoại"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Bộ phận</label>
        <select
          v-model="departmentId"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" >Tất cả</option>
          <option value="1" >Nhân sự</option>
          <option value="2" >Kỹ thuật</option>
          <option value="3" >Kinh doanh</option>
        </select>
      </div>
    </div>

    <div class="mt-6 flex justify-end gap-4">
      <button
        type="button"
        @click="resetForm"
        class="px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600"
      >
        Đặt lại
      </button>
      <button
        type="button"
        @click="search"
        class="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        Tìm kiếm
      </button>
    </div>
  </div>

  <h1 class="text-5xl text-center mb-5">Danh sách nhân viên</h1>
  <div class="flex justify-end mb-3 me-40">
    <button @click="showModalAdd" class="p-2 rounded-md bg-blue-600 text-white">
      Thêm mới
    </button>
  </div>
  <div class="text-center flex justify-center">
    <table class="table-auto border-collapse border border-slate-400">
      <thead>
        <tr class="bg-emerald-500">
          <th class="border border-slate-300">STT</th>
          <th class="border border-slate-300">Tên</th>
          <th class="border border-slate-300">Ngày sinh</th>
          <th class="border border-slate-300">Giới tính</th>
          <th class="border border-slate-300">Số điện thoại</th>
          <th class="border border-slate-300">Lương</th>
          <th class="border border-slate-300">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="employee.id">
          <td class="border border-slate-300">{{ index + 1 }}</td>
          <td class="border border-slate-300">{{ employee.name }}</td>
          <td class="border border-slate-300">{{ employee.birthday }}</td>
          <td class="border border-slate-300">{{ employee.gender }}</td>
          <td class="border border-slate-300">{{ employee.phone }}</td>
          <td class="border border-slate-300">{{ employee.salary }}</td>
          <td class="border border-slate-300 flex gap-3">
            <button
              @click="showModalUpdate(employee.id)"
              class="ps-4 pe-4 rounded-md bg-blue-600 text-white ms-2"
            >
              Cập nhật
            </button>
            <button
              @click="deleteEmployee(employee.id)"
              class="ps-4 pe-4 rounded-md bg-red-500 text-white"
            >
              Xoá
            </button>
            <button
              @click="showModal(employee.id)"
              class="ps-4 pe-4 rounded-md bg-sky-400 text-white me-2"
            >
              Chi tiết
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="absolute top-20 left-1/3">
    <div class="flex justify-center">
      <EmployeeDetailModal v-if="isShowModal" :employee="employee" @close="closeModal" />

      <EmployeeUpdateModal
        v-if="isShowModalUpdate"
        :employee="employee"
        @close="closeModalUpdate"
        @update="updateInfo"
      />

      <EmployeeAddModal v-if="isShowModalAdd" @close="closeModalAdd" @add="addEmployee" />
    </div>
  </div>
</template>
