<template>
	<div class="layout__index">
		<div class="c-panel">
			<div class="c-panel__list">
				<div class="c-panel__gradient"></div>
				<div class="c-panel__item">
					<div class="c-panel__box">
						1
					</div>
				</div>
				<div class="c-panel__item">
					<div class="c-panel__box">
						1
					</div>
				</div>
			</div>
		</div>

		<div class="c-channel">
			<div class="c-channel__content">
				<div class="c-channel__items">
					test
				</div>
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
};
</script>
