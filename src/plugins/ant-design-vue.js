import Vue from 'vue'
import {
  Pagination,
  Button,
  ConfigProvider,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Menu,
  Icon,
  Table,
  FormModel,
  Select,
  Switch,
  Radio,
  Checkbox,
  Row,
  Col,
  Breadcrumb,
  Anchor,
  Popover,
  Tooltip,
  message,
  Drawer,
  Dropdown,
  Badge,
  Timeline,
  Spin,
  notification,
  Card,
  Tree,
  Modal,
  Upload,
  Carousel,
  Tag,
  Alert,
  Progress,
  Divider,
} from 'ant-design-vue'

Vue.prototype.$message = message
Vue.prototype.$notification = notification

Vue.use(Modal)
Vue.use(Dropdown)
Vue.use(Drawer)
Vue.use(FormModel)
Vue.use(Timeline)
Vue.use(Upload)
Vue.use(Input)
Vue.component(Tag.name, Tag)
Vue.component(Spin.name, Spin)
Vue.component(Badge.name, Badge)
Vue.component(ConfigProvider.name, ConfigProvider)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Table.name, Table)
Vue.component(Switch.name, Switch)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Alert.name, Alert)
Vue.use(Anchor)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(FormModel)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Breadcrumb)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Card)
Vue.use(Tree)
Vue.use(Carousel)
Vue.use(Progress)
Vue.use(Divider)
