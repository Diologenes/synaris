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
						<button class="u-m__l--4 c-button c-button--icon-before c-button--secondary u-icon--more" @click="createDatabase">Create database</button>
						<button class="u-m__l--4 c-button c-button--icon-before c-button--secondary u-icon--win-window" @click="openInFinder">Open File Explorer</button>
						<button class="u-m__l--4 c-button c-button--icon-before c-button--secondary u-icon--download" @click="exportDatabase">Export database</button>
						<label>
							<div class="u-m__l--4 c-button c-button--icon-before c-button--secondary u-icon--refresh">Change mount</div>
							<input style="display:none;" type="file" accept=".sqlite" @change="handleFileChange" />
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
				id="modal-loading-database"
				ref="modalLoadingDatabase"
				centered
				:hide-footer="true"
				:hide-header="true"
				:no-close-on-esc="true"
				:no-close-on-backdrop="true"
			>
				<loader :active="true" />
			</b-modal>

			<b-modal size="sm" id="modal-database-exported" ref="modalDatabaseExported" title="Database export" centered :ok-only="true">
				Database successfully exported.
			</b-modal>
		</div>
	</div>
</template>

<script>
	import { getFileSize } from '@/services/FileSystem'
	const { shell } = require('electron')
	const app = require('electron').remote
	const dialog = app.dialog
	const fs = require('fs')

	export default {
		data() {
			return {
				newDbTimer: null,
				newDbPath: '',
				sqliteFilter: {
					filters: [
						{
							name: 'sqlite',
							extensions: ['sqlite']
						}
					]
				}
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
				this.$root.$emit('bv::show::modal', 'modal-loading-database')
				this.$electronFileStorage.set('sqlitePath', this.newDbPath)
				this.newDbTimer = setTimeout(() => window.location.reload(), 2000)
			},

			exportDatabase() {
				dialog.showSaveDialog(this.sqliteFilter, fileName => {
					if (fileName === undefined || fileName === '') {
						return
					}
					fs.readFile(this.dbPath, (err, fileContent) => {
						if (err) {
							return
						}
						this.$root.$emit('bv::show::modal', 'modal-loading-database')
						fs.writeFile(fileName, fileContent, err => {
							this.$root.$emit('bv::hide::modal', 'modal-loading-database')
							if (err) {
								return
							}
							this.$root.$emit('bv::show::modal', 'modal-database-exported')
						})
					})
				})
			},

			createDatabase() {
				dialog.showSaveDialog(this.sqliteFilter, fileName => {
					if (fileName === undefined || fileName === '') {
						return
					}
					this.$root.$emit('bv::show::modal', 'modal-loading-database')
					fs.writeFile(fileName, '', err => {
						if (err) {
							return
						}
						this.$electronFileStorage.set('sqlitePath', fileName)
						this.newDbTimer = setTimeout(() => window.location.reload(), 2000)
					})
				})
			}
		}
	}
</script>
