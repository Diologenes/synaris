<template>
	<div class="c-tabs">
		<ul class="c-tabs__header">
			<li
				v-for="(tab, index) in tabs"
				:key="tab.title"
				@click="selectTab(index)"
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
			selectTab(i) {
				this.selectedIndex = i
				this.tabs.forEach((tab, index) => {
					tab.isActive = index === i
				})
			}
		}
	}
</script>
