<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import DashboardLayout from '../layouts/Dashboard-Layout.svelte';
	import axios from 'axios';
	import Swal from 'sweetalert2';
	import {
		Modal,
		Button,
		Spinner,
		Pagination,
		PaginationItem,
		NavLi,
		MegaMenu,
		Listgroup,
		ListgroupItem,
		Avatar,
		Input,
		Label,

		Select,

		Fileupload


	} from 'flowbite-svelte';
	import ProductCard from '../components/ProductCard.svelte';
	import { ArrowLeftSolid, ArrowRightSolid, ChevronDownOutline } from 'flowbite-svelte-icons';
	import type { ProductAddDto } from '../interfaces/product.add';

	let isLoading = true;
	let isLoadingPagination = false;
	let category = 1;
	let pages = 1;
	let currentPage = 0;
	let clickOutsideCategoriesModal = false;
	let addProductModal = false;
	let newProduct: ProductAddDto = {
		name: '',
		description: '',
        category: 0,
		price: "",
		stock: "",
		img: null ,
        fav: false
	};
	let newProductSubmitSpinner = false;

	let products: any[] = [];
	let searchTerm = '';
	const fetchProducts = () => {
		axios
			.get(`http://localhost:8085/api/v1/products?category=${category}&page=${currentPage}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then((res) => {
				products = res.data.body.products;
				pages = res.data.body.totalPages;
				isLoading = false;
				isLoadingPagination = false;
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
	onMount(fetchProducts);

	const previous = () => {
		isLoadingPagination = true;
		currentPage--;
		fetchProducts();
	};
	const next = () => {
		isLoadingPagination = true;
		currentPage++;
		fetchProducts();
	};

	const handleAddProduct = () => {
        newProductSubmitSpinner = true;
        const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('description', newProduct.description);
            formData.append('category', newProduct.category);
            formData.append('price', newProduct.price);
            formData.append('stock', newProduct.stock);
            formData.append('img', newProduct.img);
            
        axios
			.post(`http://localhost:8085/api/v1/products`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then((res) => {
                fetchProducts();
				newProductSubmitSpinner = false;
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `Product added successfully`
                    })
                })    
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: `${err.message}`
				});
				console.log(err);
			})
            .finally(() => {
                    addProductModal = false;
            });
    };
</script>

<DashboardLayout>
	{#if isLoading}
		<div class="container h-full flex justify-center items-center gap-2">
			<Button >
				<Spinner class="mr-3 text-orange-500" size="8" />
				Loading ...
			</Button>
		</div>
	{:else}
		<div class="flex flex-col gap-2">
			<div class="flex justify-between items-center">
				<Button class="m:ml-11 xl:ml-16 w-32" on:click={() => (addProductModal = true)}
					>Add Product</Button
				>
				<Button class="cursor-pointer" on:click={() => (clickOutsideCategoriesModal = true)}>
					Categories<ChevronDownOutline
						class="pointer-events-none w-3 h-3 ml-2 text-primary-800 dark:text-white inline"
					/>
				</Button>
			</div>
			<div
				class="grid justify-items-center
                grid-cols-1
                md:grid-cols-3
                lg:grid-cols-4
                gap-5"
			>
				{#each products as product}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	{/if}

	<div class="flex justify-center items-center space-x-3 my-10">
		{#if isLoadingPagination}
			<Button color="outline" >
				<Spinner class="mr-3 text-orange-500" size="8" />
				Loading ...
			</Button>
		{:else}
			{#if currentPage > 0}
				<PaginationItem
					normalClass="text-blue-600 border border-gray-300 bg-blue-50 hover:bg-pink-200 hover:text-pink-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
					class="flex items-center p-5"
					on:click={previous}
				>
					<ArrowLeftSolid class="pointer-events-none mr-2 w-3.5 h-3.5 no-d" />
					Previous
				</PaginationItem>
			{/if}

			{#if currentPage < pages}
				<PaginationItem
					normalClass="text-blue-600 border border-gray-300 bg-blue-50 hover:bg-pink-200 hover:text-pink-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
					class="flex items-center p-5"
					on:click={next}
				>
					Next
					<ArrowRightSolid class="pointer-events-none ml-2 w-3.5 h-3.5" />
				</PaginationItem>
			{/if}
		{/if}
	</div>
</DashboardLayout>

<Modal title="Categories" bind:open={clickOutsideCategoriesModal} autoclose outsideclose>
	<Listgroup class={`w-full grid grid-cols-3`}>
		{#each $categoriesStore as c}
			<div
				role="button"
				tabindex="0"
				on:click={() => {
					clickOutsideCategoriesModal = false;
					category = c.id;
					fetchProducts();
				}}
				on:keydown={(event) => {
					if (event.key === 'Enter' || event.key === 'Space') {
						() => {
							clickOutsideCategoriesModal = false;
							category = c.id;
							fetchProducts();
						};
					}
				}}
			>
				<ListgroupItem class="text-base font-semibold gap-2 cursor-pointer">
					<Avatar src={c.img} size="xs" />{c.name}
				</ListgroupItem>
			</div>
		{/each}
	</Listgroup>
	<svelte:fragment slot="footer">
		<Button>Confirm</Button>
		<Button color="alternative">Decline</Button>
	</svelte:fragment>
</Modal>

<Modal title="New Product" bind:open={addProductModal}>
    {#if !newProductSubmitSpinner}
	<form class="flex flex-col gap-2" on:submit|preventDefault={() => handleAddProduct()}>
		<div>
			<Label for="email" class="mb-2 text-lg">Name</Label>
			<Input
				bind:value={newProduct.name}
				type="text"
				id="email"
				placeholder="Your Product Name"
				required
			/>
		</div>
		<div>
			<Label for="description" class="mb-2 text-lg">Description</Label>
			<Input
				bind:value={newProduct.description}
				type="text"
				id="description"
				placeholder="Your Description"
				required
			/>
		</div>
		<div>
			<Label for="category" class="mb-2 text-lg">Select a Category</Label>
			<Select
				class="mt-2"
				items={$categoriesStore.map((c) => ({ name: c.name, value: c.id }))}
				bind:value={newProduct.category}
			/>
		</div>
		<div>
			<Label for="price" class="mb-2 text-lg">Price</Label>
			<Input bind:value={newProduct.price} type="text" id="price" placeholder="Your Price" required />
		</div>

        
		<div>
			<Label for="stock" class="mb-2 text-lg">Stock</Label>
			<Input bind:value={newProduct.stock} type="text" id="stock" placeholder="Your Stock" required />
		</div>

        <div>
			<Label for="img" class="mb-2 text-lg">Image</Label>
            <Fileupload  on:change={(e)=>{newProduct.img = e.target.files[0]}} />
		</div>



		{#if newProductSubmitSpinner}
			<Button>
				<Spinner class="mr-3" size="4" color="white" />
				Loading ...
			</Button>
		{:else}
			<Button type="submit">Add</Button>
		{/if}
	</form>
    {:else}
    <div class="flex justify-center items-center space-x-3 my-10">
        <Button color="outline" >
            <Spinner class="mr-3 text-orange-500" size="8" />
            Loading ...
        </Button>
    </div>
    {/if}
</Modal>
 -->