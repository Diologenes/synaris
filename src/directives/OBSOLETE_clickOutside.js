import Vue from 'vue'

Vue.directive('click-outside', {
  bind: function (el, binding, vNode) {
    el.event = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        vNode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.event)
  }
})
 