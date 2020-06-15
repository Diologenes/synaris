const Notification = {
	render() {
		return false
	},
	mounted() {
        window.EventBus.listen('notification', params => {
            this.$bvToast.toast(params.msg, {
                title: params.title,
                variant: params.variant,
                solid: true,
                appendToast: true,
                noCloseButton: true,
                toaster: 'b-toaster-bottom-right',
                autoHideDelay: 5000
            })
        })
	},
}

export default Notification
