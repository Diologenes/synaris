import Vue from 'vue'

Vue.filter('textCrop', function(value, length, clamp = '...') {
    return value.length > length ? value.slice(0, length) + ' ' + clamp : value;
})