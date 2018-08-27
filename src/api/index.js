import * as staffList from './list/staff'
import * as taskList from './list/task'
import * as medicalList from './list/medical'
import * as customerList from './list/customer'
import * as user from './list/user'

export default {
  ...staffList,
  ...taskList,
  ...medicalList,
  ...customerList,
  ...user
}
