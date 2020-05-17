<template>
	<div class="layout__page">
		<div class="c-panel">
			<div class="c-panel__list">
				<div class="c-panel__gradient"></div>
				<div class="c-panel__item">
					<div class="c-panel__box">
						<b-link active-class="active" router-tag="a" :to="{ name: 'library' }">
							L
						</b-link>
					</div>
				</div>
				<div class="c-panel__item">
					<div class="c-panel__box">
						<b-link active-class="active" router-tag="a" :to="{ name: 'search' }">
							Sea
						</b-link>
					</div>
				</div>
				<div class="c-panel__item">
					<div class="c-panel__box">
						<b-link active-class="active" router-tag="a" :to="{ name: 'settings' }">
							Set
						</b-link>
					</div>
				</div>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
export default {
	components: {},
};
</script>
