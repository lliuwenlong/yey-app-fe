<template>
	<div class="home">
		<router-view />
		<Menu></Menu>
	</div>
</template>

<script>
	import Menu from '@/components/Menu.vue'
	export default {
		components: {
			Menu
		},
	}
</script>
<style>

</style>
