import Vue from 'vue'

Vue.filter('textCrop', function(value, length, clamp = '...') {
    if (value === null || value === '') return ''
    return value.length > length ? value.slice(0, length) + ' ' + clamp : value;
})