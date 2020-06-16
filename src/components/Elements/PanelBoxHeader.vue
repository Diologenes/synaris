<template>
	<div class="c-layermenu__group c-txt c-txt-title-base">{{ title }}</div>
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