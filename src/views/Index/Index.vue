<template>
	<div class="c-page c-page__default c-page__view--index">
		<!-- main navigation -->
		<div class="c-panel">
			<div class="c-panel__list">
				<div class="c-panel__gradient"></div>
				<b-link class="c-panel__item" active-class="c-panel__item--is-active" :exact="false" router-tag="a" :to="articleLastRoute">
					<div class="c-panel__box u-icon--bookmark"></div>
				</b-link>
				<b-link class="c-panel__item" active-class="c-panel__item--is-active" :exact="false" router-tag="a" :to="{ name: 'search' }">
					<div class="c-panel__box u-icon--search"></div>
				</b-link>
				<a href="#" class="c-panel__item" v-b-modal.modal-global-settings>
					<div class="c-panel__box u-icon--settings"></div>
				</a>
			</div>
		</div>
		<!-- main navigation -->

		<!-- router view -->
		<router-view></router-view>
		<!-- router view -->

		<!-- modals -->
		<modal-global-settings />
		<!-- modals -->
	</div>
</template>

<script>
	import constants from '@/config/constants'
	import modalGlobalSettings from '@/components/Modals/GlobalSettings'

	export default {
		components: {
			modalGlobalSettings
		},
		computed: {
			articleLastRoute() {
				// used e.g. for switching between search and article list
				if (this.$store.getters['article/lastRoute'] !== null && this.$route.meta.belongsTo !== constants.router.belongsTo.library) {
					return this.$store.getters['article/lastRoute'] // takes the "to.fullPath" route
				}
				return { name: 'categoryList' }
			}
		}
	}
</script>
