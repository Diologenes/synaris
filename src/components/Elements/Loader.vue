<template>
	<div class="c-loader" v-if="active">
		<div class="c-loader__wrap">
			<b-spinner variant="primary"></b-spinner>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		active: {
			type: Boolean,
			default: false
		}
	}
}
</script>
