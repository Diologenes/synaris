<template>
	<div class="c-selectbox" v-click-outside="close" :class="{ 'c-selectbox--is-active': isFoldout }">
		<div class="c-selectbox__field" @click="open" @keypress.space="open" tabindex="0">
			<span class="c-selectbox__selected-value">{{ selectedValue }}</span>
			<span class="c-selectbox__arrow"><span class="u-icon--arrow-left"></span></span>
		</div>

		<div class="c-selectbox__container c-layermenu" :class="{ 'c-layermenu--is-active c-layermenu--is-foldout': isFoldout }">
			<perfect-scrollbar class="c-layermenu__scrollbar">
				<div class="c-layermenu__wrap">
					<div class="c-layermenu__item" v-if="options.length === 0">
						<div class="c-layermenu__no-items c-txt c-txt-text-tiny">No items to select!</div>
					</div>
					<div class="c-layermenu__item" v-for="(option, optionKey) in options" :key="optionKey">
						<div class="c-layermenu__link c-txt c-txt-text-tiny" @click="selectItem(option, $event)" @keypress.space="selectItem(option, $event)" tabindex="0">
							<div class="c-layermenu__text">{{ option.label }}</div>
						</div>
					</div>
				</div>
			</perfect-scrollbar>
		</div>
	</div>
</template>

<script>
	import ClickOutside from 'vue-click-outside'

	export default {
		props: {
			options: {
				type: Array,
				default: function () { return [] }
			}
		},
		directives: {
			ClickOutside
		},
		data() {
			return {
				isFoldout: false,
				selectedValue: 'Select ...'
			}
		},

		watch: {},

		computed: {},

		mounted() {},

		methods: {
			open() {
				this.isFoldout = !this.isFoldout
			},

			close() {
				this.isFoldout = false
			},

			selectItem(option, $event) {
				this.close()
				this.selectedValue = option.label
				this.$emit('change', option, $event)
			}
		}
	}
</script>
