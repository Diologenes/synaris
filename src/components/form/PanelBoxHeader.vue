<template>
	<div class="c-layermenu__group">{{ title }}</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	}
}
</script>