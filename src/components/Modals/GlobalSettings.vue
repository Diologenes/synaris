<template>
	<b-modal size="xl" id="modal-global-settings" ref="modalGlobalSettings" centered title="Settings" :hide-footer="true">
		<tab-container>
			<tab-item title="Database">
				<settings-change-database />
			</tab-item>
			<tab-item title="Keyboard Shortcuts">
				<div class="row">
					<div class="col-6">
						<div class="c-definition-list">
							<div class="c-definition-list__item">
								<div class="c-definition-list__label">Switch to library</div>
								<div class="c-definition-list__value">
									<div class="c-definition-list__code"><span>CTRL</span> + <span>1</span></div>
								</div>
							</div>
							<div class="c-definition-list__item">
								<div class="c-definition-list__label">Switch to search</div>
								<div class="c-definition-list__value">
									<div class="c-definition-list__code"><span>CTRL</span> + <span>2</span></div>
								</div>
							</div>
							<div class="c-definition-list__item">
								<div class="c-definition-list__label">Switch to settings</div>
								<div class="c-definition-list__value">
									<div class="c-definition-list__code"><span>CTRL</span> + <span>3</span></div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-6">
						<div class="c-definition-list">
							<div class="c-definition-list__item">
								<div class="c-definition-list__label">Create new category</div>
								<div class="c-definition-list__value">
									<div class="c-definition-list__code"><span>CTRL</span> + <span>G</span></div>
								</div>
							</div>
							<div class="c-definition-list__item">
								<div class="c-definition-list__label">Create new article</div>
								<div class="c-definition-list__value">
									<div class="c-definition-list__code"><span>CTRL</span> + <span>N</span></div>
								</div>
							</div>
							<div class="c-definition-list__item">
								<div class="c-definition-list__label">Delete article</div>
								<div class="c-definition-list__value">
									<div class="c-definition-list__code"><span>CTRL</span> + <span>BACKSPACE</span></div>
								</div>
							</div>
							<div class="c-definition-list__item">
								<div class="c-definition-list__label">Filter article</div>
								<div class="c-definition-list__value">
									<div class="c-definition-list__code"><span>CTRL</span> + <span>F</span></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</tab-item>
			<tab-item title="Reset configuration">TBD</tab-item>
			<tab-item title="About">
				<div class="row">
					<div class="col-6">
						<div class="c-definition-list">
							<div class="c-definition-list__header">Copyright & Author</div>
							<div class="c-definition-list__item">
								<div class="c-definition-list__label">Author</div>
								<div class="c-definition-list__value">
									<div class="c-definition-list__code">Gerald Jelitto (https://github.com/Diologenes)</div>
								</div>
							</div>
							<div class="c-definition-list__item">
								<div class="c-definition-list__label">Github-Repository</div>
								<div class="c-definition-list__value">
									<div class="c-definition-list__code">https://github.com/Diologenes</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="c-definition-list"></div>
			</tab-item>
		</tab-container>
	</b-modal>
</template>

<script>
	import settingsChangeDatabase from '@/views/Settings/ChangeDatabase'

	export default {
		data() {
			return {}
		},
		components: {
			settingsChangeDatabase
		}
	}
</script>
