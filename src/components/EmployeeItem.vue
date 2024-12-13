<script setup lang="ts">
import { api, apiEmployee, apiToServer } from '@/utils/api'
import { ref } from 'vue'

let employees = ref<any>(null)
let employee = ref<any>(null)

async function getAllEmployees() {
  let apiObj = `${api}${apiEmployee}`
  employees.value = await apiToServer(apiObj, "GET")
}

async function getEmployee(idEmployee: number) {
  let apiObj = `${api}${apiEmployee}/${idEmployee}`
  employee.value = await apiToServer(apiObj, "GET")
}

async function updateEmployee(idEmployee: number, data:any) {
  let apiObj = `${api}${apiEmployee}/${idEmployee}`
  employee.value = await apiToServer(apiObj, "PATCH", )
}

getAllEmployees()

// import { ref } from 'vue'
import { FwbButton, FwbModal } from 'flowbite-vue'

const isShowModal = ref(false)
const isShowModalUpdate = ref(false)

function closeModal() {
  isShowModal.value = false
}

function closeModalUpdate() {
  isShowModalUpdate.value = false
}

function showModal(id:number) {
  isShowModal.value = true
  getEmployee(id);
}

function showModalUpdate(id:number) {
  isShowModalUpdate.value = true
  getEmployee(id);
}

async function updateInfo(id: number) {
  const apiObj = `${api}${apiEmployee}/${id}`;
  const updatedEmployee = {
    name: employee.value.name,
    birthday: employee.value.birthday,
    gender: employee.value.gender,
    salary: employee.value.salary,
  };

  const result = await apiToServer(apiObj, 'PUT', updatedEmployee);

  if (result) {
    alert('Cập nhật thông tin thành công!');
    closeModal();
    await getAllEmployees();
  } else {
    alert('Cập nhật thông tin thất bại!');
  }
}

async function deleteEmployee(idEmployee: number) {
  let apiObj = `${api}${apiEmployee}/${idEmployee}`
  employee.value = await apiToServer(apiObj, "DELETE")
}
</script>

<template>
  <h1 class="text-5xl text-center mb-5">Danh sách nhân viên</h1>
  <div class="text-center flex justify-center">
    <table class="table-auto border-collapse border border-slate-400">
      <thead>
        <tr class="bg-emerald-500">
          <th class="border border-slate-300">STT</th>
          <th class="border border-slate-300">Tên</th>
          <th class="border border-slate-300">Ngày sinh</th>
          <th class="border border-slate-300">Giới tính</th>
          <th class="border border-slate-300">Lương</th>
          <th class="border border-slate-300">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees">
          <td class="border border-slate-300">{{ employee.id }}</td>
          <td class="border border-slate-300">{{ employee.name }}</td>
          <td class="border border-slate-300">{{ employee.birthday }}</td>
          <td class="border border-slate-300">{{ employee.gender }}</td>
          <td class="border border-slate-300">{{ employee.salary }}</td>
          <td class="border border-slate-300 flex gap-3">
            <button
              @click="showModalUpdate(employee.id)"
              class="ps-4 pe-4 rounded-md bg-blue-600 text-white ms-2"
            >
              Cập nhật
            </button>
            <button @click="deleteEmployee(employee.id)" class="ps-4 pe-4 rounded-md bg-red-500 text-white">
              Xoá
            </button>
            <button @click="showModal(employee.id)" class="ps-4 pe-4 rounded-md bg-sky-400 text-white me-2">
              Chi tiết
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="View">
    <fwb-modal v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">Chi tiết thông tin</div>
      </template>
      <template #body>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Tên</p>
        <input type="text" v-model="employee.name" >
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Ngày sinh</p>
        <input type="text" v-model="employee.birthday">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Giới tính</p>
        <input type="text" v-model="employee.gender">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Lương</p>
        <input type="text" v-model="employee.salary">
      </template>
      <template #footer>
        <div class="flex justify-between">
          <fwb-button @click="closeModal" color="alternative">Close</fwb-button>
          <!-- <fwb-button @click="closeModal" color="green"> Submit</fwb-button> -->
        </div>
      </template>
    </fwb-modal>
  </div>

  <div id="Update">
    <fwb-modal v-if="isShowModalUpdate" @close="closeModalUpdate">
      <template #header>
        <div class="flex items-center text-lg">Chi tiết thông tin</div>
      </template>
      <template #body>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Tên</p>
        <input type="text" v-model="employee.name" >
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Ngày sinh</p>
        <input type="text" v-model="employee.birthday">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Giới tính</p>
        <input type="text" v-model="employee.gender">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Lương</p>
        <input type="text" v-model="employee.salary">
      </template>
      <template #footer>
        <div class="flex justify-between">
          <fwb-button @click="closeModalUpdate" color="alternative">Close</fwb-button>
          <fwb-button @click="updateInfo(employee.id)" color="green">Update</fwb-button>
        </div>
      </template>
    </fwb-modal>
  </div>
</template>
