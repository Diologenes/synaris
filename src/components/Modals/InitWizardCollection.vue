<template>
	<b-modal
		id="modal-init-wizard-collection"
		ref="modalInitWizardCollection"
		centered
		:hide-footer="true"
		:hide-header="true"
		:no-close-on-esc="true"
		:no-close-on-backdrop="true"
		body-class="modal-body--no-frame"
		size="lg"
		:ok-disabled="isPending"
		@shown="resetModal"
	>
		<div class="container-fluid">
			<div class="row">
				<div class="col-6 mdl-initwizardcollection__key-collection">
					<div class="container">
						<div class="row">
							<div class="col">
								<img src="images/themes/start.png" />
							</div>
						</div>
					</div>
				</div>
				<div class="col-6">
					<div class="container">
						<div class="row">
							<div class="col">
								<div v-if="step == 1">
									<p class="u-m__t--5 c-txt-title-base u-m__b--2">Step 1 of 2</p>
									<div class=" u-m__b--4 c-txt-head-base">Create your first collection</div>
									<p class="c-txt-title-base u-m__b--5">A collection acts as a folder to organise your work.</p>
									<b-form-group label="Enter a collection name">
										<b-form-input v-model.trim="collectionTitle" placeholder="e.g. Meetings, Snippets, ..." autofocus></b-form-input>
									</b-form-group>
									<div>
										<button class="c-button c-button--primary" @click="finishStep(1)">Next step</button>
									</div>
								</div>
								<div v-if="step == 2">
									<p class="u-m__t--5 c-txt-title-base u-m__b--2">Step 2 of 2</p>
									<div class="u-m__b--4 c-txt-head-base">Create your first category</div>
									<p class="c-txt-title-base u-m__b--5">A category contains your articles and belongs to a collection.</p>
									<b-form-group label="Enter a category name">
										<b-form-input
											ref="modalInitWizardCollectionCategoryTitle"
											v-model.trim="categoryTitle"
											placeholder="e.g. Meetings, Snippets, ..."
										></b-form-input>
									</b-form-group>
									<div>
										<button class="c-button c-button--primary" @click="finishStep(2)">Complete setup</button>
									</div>
								</div>
								<div v-if="step == 3">
									<p class="u-m__t--5 c-txt-title-base u-m__b--2">You're done</p>
									<div class="u-m__b--4 c-txt-head-base">First steps completed</div>
									<p class="c-txt-title-base u-m__b--5">Well done! You have created your first collection and category. <br><br>Feel free to add more categories or start creating your articles.</p>
									<div>
										<button class="c-button c-button--primary" @click="finishStep(3)">Close wizard</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</b-modal>
</template>

<script>
	export default {
		data() {
			return {
				collectionTitle: '',
				categoryTitle: '',
				isPending: false,
				step: 1
			}
		},
		methods: {
			finishStep(step) {
				switch (step) {
					case 1: {
						if (this.collectionTitle !== '') {
							this.step = 2
						}
						break
					}
					case 2: {
						if (this.categoryTitle !== '') {
							this.createRecords()
						}
						break
					}
					case 3: {
						this.finishWizard()
						break
					}
				}
			},

			resetModal() {
				this.collectionTitle = ''
				this.categoryTitle = ''
				this.step = 1
			},

			async createRecords() {
				let newCollection = await this.$store.dispatch('collection/addCollectionByTitle', this.collectionTitle)
				await this.$store.dispatch('collection/addCategoryByTitle', { title: this.categoryTitle, collectionId: newCollection.id })
				await this.$store.dispatch('collection/getAll')
				this.step = 3
			},

			finishWizard() {
				this.handleClose()
			},

			// handle close
			handleClose() {
				this.$nextTick(() => {
					this.$bvModal.hide('modal-init-wizard-collection')
				})
			}
		}
	}
</script>
