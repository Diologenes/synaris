<template>
	<div class="row">
		<div class="col-auto">
			<div class="c-icon-pic c-icon-pic--xxl c-icon-pic--base u-icon--storage"></div>
		</div>
		<div class="col">
			<div class="c-txt c-txt-title-base u-m__b--4">Mounted database</div>
			<div class="c-boxed c-txt c-txt-text-tiny-alt u-m__b--4">
				<div class="row">
					<div class="col">{{ dbPath }}</div>
					<div class="col-auto">{{ dbFileSize }}</div>
				</div>
			</div>

			<div class="row">
				<div class="col ">
					<div class="float-right">
						<button class="c-button c-button--secondary" @click="openInFinder">Open File Explorer</button>
						<label>
							<div class="u-m__l--4 c-button c-button--primary">Change database mount</div>
							<input style="display:none;" type="file" accept=".sqlite,.sqlite3,.db" @change="handleFileChange" />
						</label>
					</div>
				</div>
			</div>

			<b-modal
				size="sm"
				id="modal-change-database"
				ref="modalChangeDatabase"
				centered
				title="Change database path"
				@ok="acceptNewDatabase"
				:no-close-on-esc="true"
				:no-close-on-backdrop="true"
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
	</div>
</template>

<script>
	import { getFileSize } from '@/services/FileSystem'
	const { shell } = require('electron')

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
			},
			dbFileSize() {
				return getFileSize(this.dbPath)
			}
		},
		methods: {
			openInFinder() {
				shell.showItemInFolder(this.dbPath)
			},

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
