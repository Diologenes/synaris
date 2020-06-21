<template>
	<div class="c-tabs">
		<ul class="c-tabs__header">
			<li
				v-for="(tab, index) in tabs"
				:key="tab.title"
				@click="selectTab(index, true)"
				class="c-tabs__title c-txt c-txt-title-base"
				:class="{ 'c-tabs__title--is-active': index === selectedIndex }"
			>
				{{ tab.title }}
			</li>
		</ul>
		<div class="c-tabs__container">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selectedIndex: 0,
				tabs: []
			}
		},
		created() {
			this.tabs = this.$children
		},
		mounted() {
			this.selectTab(0)
		},
		methods: {
			selectTab(index, doEmit = false) {
				this.selectedIndex = index
				this.tabs.forEach((tab, tabIndex) => {
					tab.isActive = tabIndex === index
				})
				if (doEmit) {
					this.$emit('change', this.tabs[index])
				}
			},
		}
	}
</script>
