<template>
	<div @click="click" class="c-radio">
		<div class="c-radio__pin" :class="{ 'c-radio__pin--is-active': active }"></div>
	</div>
</template>

<script>
	export default {
		props: {
			active: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			click() {
				this.$emit('change', !this.active)
			}
		}
	}
</script>
