<template>
	<div class="c-panel-section">
		<div class="c-panel-section__title c-txt c-txt-head-base">
			<transition name="transition-title">
				<div :key="category.title" class="u-hash" v-if="category">{{ category.title }}</div>
			</transition>
		</div>
		<div class="c-panel-section__options">
			<panel-box :clickable="true" icon="filter">
				<panel-box-header title="Order by" />
				<panel-box-radio @select="updateParent" value="title" title="Title" icon="move" :group="filterOptionsOrderBy" dispatchToStore="settings/filterOrderBy" />
				<panel-box-radio
					@select="updateParent"
					value="updatedAt"
					title="Recently modified"
					icon="move"
					:group="filterOptionsOrderBy"
					dispatchToStore="settings/filterOrderBy"
				/>
				<panel-box-radio
					@select="updateParent"
					value="visitedAt"
					title="Recently viewed"
					icon="move"
					:group="filterOptionsOrderBy"
					dispatchToStore="settings/filterOrderBy"
				/>
				<panel-box-divider />
				<panel-box-toggle @select="updateParent" title="Reverse order" icon="change" :active="filterOptionsReverseOrder" dispatchToStore="settings/filterReverseOrder" />
				<panel-box-divider />
				<panel-box-header title="Show extra fields" />
				<panel-box-toggle title="Show date" icon="calendar" :active="filterOptionsShowDate" dispatchToStore="settings/filterShowDate" />
				<panel-box-toggle title="Show description" icon="text" :active="filterOptionsShowDescription" dispatchToStore="settings/filterShowDescription" />
				<panel-box-toggle title="Show tags" icon="label" :active="filterOptionsShowTags" dispatchToStore="settings/filterShowTags" />
			</panel-box>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		},
		props: {
			category: Object,
			filterOptionsOrderBy: String,
			filterOptionsReverseOrder: Boolean,
			filterOptionsShowDate: Boolean,
			filterOptionsShowDescription: Boolean,
			filterOptionsShowTags: Boolean
		},
		methods: {
			updateParent() {
				this.$emit('change')
			}
		}
	}
</script>

<style scoped>
	.transition-title-enter-active,
	.transition-title-leave-active {
		transition: opacity 100ms ease-in-out, transform 100ms ease;
	}

	.transition-title-enter-active {
		transition-delay: 100ms;
	}

	.transition-title-enter {
		opacity: 0;
		transform: translateY(-10px);
	}

	.transition-title-enter-to {
		opacity: 1;
		transform: translateY(0px);
	}

	.transition-title-leave {
		opacity: 1;
		transform: translateY(0px);
		position: absolute;
	}

	.transition-title-leave-to {
		opacity: 0;
		transform: translateY(10px);
		position: absolute;
	}
</style>
