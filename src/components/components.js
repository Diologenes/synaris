import Vue from 'vue'

import PanelBox from './../components/form/PanelBox'
import PanelBoxToggle from './../components/form/PanelBoxToggle'
import PanelBoxRadio from './../components/form/PanelBoxRadio'
import PanelBoxHeader from './../components/form/PanelBoxHeader'
import PanelBoxDivider from './../components/form/PanelBoxDivider'
import SelectBox from './../components/form/SelectBox'
import Loader from './../components/elements/Loader'
import LayerMenu from './../components/elements/LayerMenu'
import SectionResizer from './../components/elements/SectionResizer'

// forms
Vue.component('PanelBox', PanelBox)
Vue.component('PanelBoxToggle', PanelBoxToggle)
Vue.component('PanelBoxRadio', PanelBoxRadio)
Vue.component('PanelBoxHeader', PanelBoxHeader)
Vue.component('PanelBoxDivider', PanelBoxDivider)
Vue.component('FormSelectBox', SelectBox)
Vue.component('Loader', Loader)
Vue.component('LayerMenu', LayerMenu)
Vue.component('SectionResizer', SectionResizer)
