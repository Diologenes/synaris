<template>
	<div @click="click" class="c-toggle">
		<div class="c-toggle__pin" :class="{ 'c-toggle__pin--is-active': active }"></div>
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
