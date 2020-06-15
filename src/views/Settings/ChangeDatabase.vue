<template>
	<div class="c-definition-list">
		<div class="c-definition-list__header">Local database</div>

		<div>Braindump uses an SQLite3 database to store data. You can change your directory here</div>

		<div>DB path: {{ dbPath }}</div>

		<label>
			<div class="c-button c-button--primary">Change database file path</div>
			<input style="display:none;" type="file" accept=".sqlite,.sqlite3,.db" @change="handleFileChange" />
		</label>

		<b-modal
			size="sm"
			id="modal-change-database"
			ref="modalChangeDatabase"
			centered
			title="Change database path"
			@ok="acceptNewDatabase"
			@cancel="cancelChangeDatabase"
		>
			Do you want to <b>switch to new database path</b>? Your current database will not be deleted.
		</b-modal>

		<b-modal
			size="sm"
			id="modal-load-new-database"
			ref="modalLoadNewDatabase"
			centered
			title="Change database"
			:hide-footer="true"
			:hide-header="true"
			:no-close-on-esc="true"
			:no-close-on-backdrop="true"
		>
			<loader :active="true" />
		</b-modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newDbTimer: null,
				newDbPath: ''
			}
		},
		components: {},
		computed: {
			dbPath() {
				return this.$electronFileStorage.get('sqlitePath')
			}
		},
		methods: {
			handleFileChange($event) {
				this.newDbPath = $event.target.files[0].path
				if (this.newDbPath !== null) {
					this.$root.$emit('bv::show::modal', 'modal-change-database')
				}
			},

			acceptNewDatabase() {
				clearTimeout(this.newDbTimer)
				this.$root.$emit('bv::hide::modal', 'modal-change-database')
				this.$root.$emit('bv::show::modal', 'modal-load-new-database')
				this.$electronFileStorage.set('sqlitePath', this.newDbPath)
				this.newDbTimer = setTimeout(() => window.location.reload(), 2000)
			}
		}
	}
</script>
