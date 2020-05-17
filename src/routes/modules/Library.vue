<template>
	<div class="c-page c-page__default">
		<div class="c-library">
			<!-- library content -->
			<div class="c-library__content">
				<!-- library list -->
				<div class="c-library__list">
					<div class="c-library__list-title">Libraries</div>
					<div class="c-library__list-indicator">
						<div class="c-panelbox">
							<form-panel-box :clickable="true" :primary="true" icon="more" @submit="createChannel()" />
						</div>
					</div>
				</div>

		
		
			</div>
		</div>

		<router-view />
	</div>
</template>

<script>
export default {
	components: {}
}
</script>
