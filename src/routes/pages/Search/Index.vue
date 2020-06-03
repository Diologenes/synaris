<template>
  <div><span @contextmenu.prevent="$refs.test.open($event, 'Payload')" >Search</span>
  
  
  
				<LayerMenu ref="test">
					test222
				</LayerMenu>
  </div>
</template>


<script>
export default {
  components: {}
};
</script>