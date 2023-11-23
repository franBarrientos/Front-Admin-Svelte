<script lang="ts">
	import { onMount } from 'svelte';
	import DashboardLayout from '../layouts/Dashboard-Layout.svelte';
	import Swal from 'sweetalert2';
	import { Button, Input, Label, Modal, Spinner } from 'flowbite-svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import { ArrowRightOutline, PenOutline } from 'flowbite-svelte-icons';
	import { axiosClient } from './../client/axiosClient';
	import { type EmployeeDto } from '../interfaces/employee.dto';
	import { type EmployeeAddDto } from '../interfaces/employeeAdd.dto';
	import { formatDate } from './../utils/dates';
	let isLoading = true;
	let employees: EmployeeDto[] = [];
	let employeesToShow: EmployeeDto[] = [];
	let searchTerm = '';
	let modalAddEmployee = false;
	let bodyAddEmployee: EmployeeAddDto = {} as EmployeeAddDto;
	let modalEditEmployee = false;
	let bodyEditEmployee: EmployeeAddDto = {} as EmployeeAddDto;

	const fetchEmployees = () => {
		axiosClient
			.get('/employees')
			.then((res) => {
				employees = res.data.content as EmployeeDto[];
				employeesToShow = res.data.content as EmployeeDto[];
				isLoading = false;
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: `${err.message}`
				});
				console.log(err);
			});
	};

	onMount(fetchEmployees);

	const handleAddEmployee = () => {
		axiosClient
			.post('/employees', bodyAddEmployee)
			.then((res) => {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: `Employee ${
						bodyAddEmployee.firstName + ' ' + bodyAddEmployee.lastName
					} added successfully`,
					timer: 1500,
					showConfirmButton: false
				}).then(() => {
					fetchEmployees();
					modalAddEmployee = false;
				});
				bodyAddEmployee = {} as EmployeeAddDto;
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: `${err.message}`
				});
				console.log(err);
			});
	};

	const handleEditEmployee = () => {
		axiosClient
			.put(`/employees/${bodyEditEmployee.id}`, bodyEditEmployee)
			.then((res) => {
				const idToUpdate = employees.findIndex((e) => e.id === bodyEditEmployee.id);
				employees[idToUpdate] = res.data as EmployeeDto;
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: `Employee ${
						res.data.user.firstName + ' ' + res.data.user.lastName
					} updated successfully`,
					timer: 1500,
					showConfirmButton: false
				}).then(() => {
					fetchEmployees();
					modalAddEmployee = false;
				});
				bodyEditEmployee = {} as EmployeeAddDto;
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: `${err.message}`
				});
				console.log(err);
			});
	};

	$: {
		employeesToShow = employees.filter((e) =>
			searchTerm == '' ? true : e.user.dni.includes(searchTerm)
		);
	}
</script>

<DashboardLayout>
	{#if isLoading}
		<Button>
			<Spinner class="mr-3" size="4" color="white" />
			Loading ...
		</Button>
	{:else}
		<Button class={'ml-4 py-1'} on:click={() => (modalAddEmployee = true)}>
			Add Employee <ArrowRightOutline class="w-3.5 h-3.5 ml-2" />
		</Button>
		<TableSearch
			placeholder="Search by DNI's employee"
			hoverable={true}
			bind:inputValue={searchTerm}
		>
			<TableHead>
				<TableHeadCell>ID</TableHeadCell>
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>LastName</TableHeadCell>
				<TableHeadCell>Dni</TableHeadCell>
				<TableHeadCell>Address</TableHeadCell>
				<TableHeadCell>Job Title</TableHeadCell>
				<TableHeadCell>Start Date</TableHeadCell>
				<TableHeadCell>salary</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each employeesToShow as employee}
					<TableBodyRow>
						<TableBodyCell>{employee.id}</TableBodyCell>
						<TableBodyCell>{employee.user.firstName}</TableBodyCell>
						<TableBodyCell>{employee.user.lastName}</TableBodyCell>
						<TableBodyCell>{employee.user.dni}</TableBodyCell>
						<TableBodyCell>{employee.user.address}</TableBodyCell>
						<TableBodyCell>{employee.jobTitle}</TableBodyCell>
						<TableBodyCell>{formatDate(employee.startDate)}</TableBodyCell>
						<TableBodyCell>{employee.salary}</TableBodyCell>
						<button
							on:click={() => {
								const { id, startDate, salary, jobTitle, user } = employee;
								bodyEditEmployee = {
									id,
									startDate,
									salary,
									jobTitle,
									...user
								};
								modalEditEmployee = true;
							}}
							class="flex flex-col items-center justify-center hover:text-purple-600"
						>
							<PenOutline class={'mt-2 focus-within:outline-none cursor-pointer'} />
						</button>
					</TableBodyRow>
				{/each}
			</TableBody>
		</TableSearch>
	{/if}
</DashboardLayout>

<!-- Modal to Add a new Employee -->
<Modal title="New Employee" bind:open={modalAddEmployee} autoclose outsideclose>
	<div class="mb-6">
		<Label for="firstName" class="block mb-2">Fist Name</Label>
		<Input
			id="firstName"
			bind:value={bodyAddEmployee.firstName}
			size="lg"
			placeholder="Fist Name"
		/>
	</div>

	<div class="mb-6">
		<Label for="lastName" class="block mb-2">Last Name</Label>
		<Input id="lastName" bind:value={bodyAddEmployee.lastName} size="lg" placeholder="Last Name" />
	</div>

	<div class="mb-6">
		<Label for="dni" class="block mb-2">Dni</Label>
		<Input id="dni" bind:value={bodyAddEmployee.dni} size="lg" placeholder="Dni" />
	</div>

	<div class="mb-6">
		<Label for="province" class="block mb-2">Province</Label>
		<Input id="province" bind:value={bodyAddEmployee.province} size="lg" placeholder="Province" />
	</div>

	<div class="mb-6">
		<Label for="address" class="block mb-2">Address</Label>
		<Input id="address" bind:value={bodyAddEmployee.address} size="lg" placeholder="Address" />
	</div>
	<div class="mb-6">
		<Label for="age" class="block mb-2">Age</Label>
		<Input id="age" bind:value={bodyAddEmployee.age} size="lg" placeholder="Age" />
	</div>

	<div class="mb-6">
		<Label for="jobTittle" class="block mb-2">Job Tittle</Label>
		<Input
			id="jobTittle"
			bind:value={bodyAddEmployee.jobTitle}
			size="lg"
			placeholder="Job Tittle"
		/>
	</div>
	<div class="mb-6">
		<Label for="startDate" class="block mb-2">Start Date</Label>
		<Input
			id="startDate"
			type="date"
			bind:value={bodyAddEmployee.startDate}
			size="lg"
			placeholder="Start Date"
		/>
	</div>

	<div class="mb-6">
		<Label for="startDate" class="block mb-2">Salary</Label>
		<Input id="startDate" bind:value={bodyAddEmployee.salary} size="lg" placeholder="Salary" />
	</div>

	<svelte:fragment slot="footer">
		<Button class="bg-purple-700" on:click={handleAddEmployee}>Add</Button>
		<Button color="alternative">Back</Button>
	</svelte:fragment>
</Modal>

<!-- Modal to Update an existing Employee -->
<Modal title="Edit Employee Info" bind:open={modalEditEmployee} autoclose outsideclose>
	<div class="mb-6">
		<Label for="firstName" class="block mb-2">Fist Name</Label>
		<Input
			id="firstName"
			bind:value={bodyEditEmployee.firstName}
			size="lg"
			placeholder="Fist Name"
		/>
	</div>

	<div class="mb-6">
		<Label for="lastName" class="block mb-2">Last Name</Label>
		<Input id="lastName" bind:value={bodyEditEmployee.lastName} size="lg" placeholder="Last Name" />
	</div>

	<div class="mb-6">
		<Label for="dni" class="block mb-2">Dni</Label>
		<Input id="dni" bind:value={bodyEditEmployee.dni} size="lg" placeholder="Dni" />
	</div>

	<div class="mb-6">
		<Label for="province" class="block mb-2">Province</Label>
		<Input id="province" bind:value={bodyEditEmployee.province} size="lg" placeholder="Province" />
	</div>

	<div class="mb-6">
		<Label for="address" class="block mb-2">Address</Label>
		<Input id="address" bind:value={bodyEditEmployee.address} size="lg" placeholder="Address" />
	</div>
	<div class="mb-6">
		<Label for="age" class="block mb-2">Age</Label>
		<Input id="age" bind:value={bodyEditEmployee.age} size="lg" placeholder="Age" />
	</div>

	<div class="mb-6">
		<Label for="jobTittle" class="block mb-2">Job Tittle</Label>
		<Input
			id="jobTittle"
			bind:value={bodyEditEmployee.jobTitle}
			size="lg"
			placeholder="Job Tittle"
		/>
	</div>
	<div class="mb-6">
		<Label for="startDate" class="block mb-2">Start Date</Label>
		<Input
			id="startDate"
			type="date"
			bind:value={bodyEditEmployee.startDate}
			size="lg"
			placeholder="Start Date"
		/>
	</div>

	<div class="mb-6">
		<Label for="startDate" class="block mb-2">Salary</Label>
		<Input id="startDate" bind:value={bodyEditEmployee.salary} size="lg" placeholder="Salary" />
	</div>

	<svelte:fragment slot="footer">
		<Button class="bg-purple-700" on:click={handleEditEmployee}>Add</Button>
		<Button color="alternative">Back</Button>
	</svelte:fragment>
</Modal>
