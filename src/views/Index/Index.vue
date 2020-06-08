<template>
	<div class="c-page c-page__default c-page__view--index">
		<div class="c-panel">
			<div class="c-panel__list">
				<div class="c-panel__gradient"></div>
				<b-link class="c-panel__item" active-class="c-panel__item--is-active" :exact="false" router-tag="a" :to="articleLastRoute">
					<div class="c-panel__box u-icon--bookmark"></div>
				</b-link>
				<b-link class="c-panel__item" active-class="c-panel__item--is-active" :exact="false" router-tag="a" :to="{ name: 'search' }">
					<div class="c-panel__box u-icon--search"></div>
				</b-link>
				<b-link class="c-panel__item" active-class="c-panel__item--is-active" :exact="false" router-tag="a" :to="{ name: 'settings' }">
					<div class="c-panel__box u-icon--settings"></div>
				</b-link>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
import constants from '@/config/constants'

export default {
	computed: {
		articleLastRoute() {
			if (this.$store.getters['article/lastRoute'] !== null && this.$route.meta.belongsTo !== constants.router.belongsTo.library) {
				return this.$store.getters['article/lastRoute'] // takes the "to.fullPath" route
			}
			return { name: 'categoryList' }
		},
	},
}
</script>
