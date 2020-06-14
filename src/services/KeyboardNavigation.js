const KeyboardNavigation = {
	render() {
		return false
	},
	methods: {
		routeKeySwitch(route) {
			if (this.$route.name !== route) this.$router.push({ name: route })
		}
	},
	mounted() {
		this._keyListener = function(e) {
			if (e.key === '1' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault()
				this.routeKeySwitch('categoryList')
			}
			if (e.key === '2' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault()
				this.routeKeySwitch('search')
			}
			if (e.key === '3' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault()
				this.$root.$emit('bv::show::modal', 'modal-global-settings')
			}
		}
		document.addEventListener('keydown', this._keyListener.bind(this))
	},
	beforeDestroy() {
		document.removeEventListener('keydown', this._keyListener)
	}
}

export default KeyboardNavigation
