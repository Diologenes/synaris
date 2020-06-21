<template>
	<div class="c-tabs__item" v-show="isActive">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isActive: true
			}
		}
	}
</script>
