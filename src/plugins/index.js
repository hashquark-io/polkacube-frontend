import Vue from 'vue'
import Storage from 'vue-ls'
import {
  Menu,
  MenuItem,
  Popover,
  Table,
  TableColumn,
  Icon,
  Loading,
  Button,
  Input,
  Notification,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Select,
  Option
} from 'element-ui'

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Popover)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)
Vue.use(Loading)
Vue.use(Button)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
const options = {
  namespace: 'hashquark_labs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
}

Vue.use(Storage, options)
