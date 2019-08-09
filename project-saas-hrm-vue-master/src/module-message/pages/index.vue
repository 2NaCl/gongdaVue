<template>
  <div class="dashboard-container">
    <div class="app-container">

      <el-card shadow="never" class="boxMar">
        <el-table :data="dataList" fit style="width: 100%;" border>
          <el-table-column sortable prop="username" label="学生姓名"></el-table-column>
          <el-table-column sortable prop="studentId" label="学生学号"></el-table-column>
          <el-table-column sortable prop="dept" label="申请实验室门牌号"></el-table-column>
          <el-table-column sortable prop="msg" label="申请原因"></el-table-column>
          <el-table-column sortable label="状态">
            <template slot-scope="scope">
              <el-row>
                <el-button type="success" plain @click="agree(scope.row)">同意</el-button>
                <el-button type="danger" plain @click="disagree(scope.row)">不同意</el-button>
              </el-row>

            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <PageTool :paginationPage="requestParameters.page" :paginationPagesize="requestParameters.size"
                    :total="counts" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
          </PageTool>
        </div>
        <!-- end -->
        <!-- 新增学生弹层 -->
        <component v-bind:is="employeesAdd" ref="addUser" @doQuery="doQuery"></component>
        <!--分配角色组件 -->
        <component v-bind:is="addRole" ref="addRole"></component>
      </el-card>
    </div>
  </div>
</template>

<script>
  import constantApi from '@/api/constant/employees'
  import {msg, remove, agree, disagree} from '@/api/base/users'
  import PageTool from './../../components/page/page-tool'
  import employeesAdd from './../components/add'
  import addRole from './../components/addRole'
  import {hasPermissionPoint} from '@/utils/permission'

  export default {
    name: 'employeesList',
    components: {
      PageTool, employeesAdd, addRole
    },
    data() {
      return {
        employeesAdd: 'employeesAdd',
        addRole: 'addRole',
        baseData: constantApi,
        dataList: [],
        counts: '',
        requestParameters: {
          page: 1,
          size: 10,
        }
      }
    },
    methods: {
      show(name) {
        return hasPermissionPoint(name)
      },
      // 业务方法
      doQuery(params) {
        msg(this.requestParameters)
          .then(res => {
            console.log(res)
            this.dataList = res.data.data
            this.counts = res.data.data.length
          })
      },
      // 每页显示信息条数
      handleSizeChange(size) {
        this.requestParameters.size = size
        if (this.requestParameters.page === 1) {
          this.doQuery(this.requestParameters)
        }
      },
      // 进入某一页
      handleCurrentChange(val) {
        this.requestParameters.page = val
        this.doQuery()
      },
      // 添加新学生
      handlAdd() {
        this.$refs.addUser.dialogFormVisible = true
      },
      // 删除
      handleDelete(item) {
        this.$confirm(
          `本次操作将删除${item.username}删除后账号将不可恢复，您确认删除吗？`, {
            type: 'warning'
          }
        ).then(() => {
          remove({id: item.id})
            .then(res => {
              this.$message({message: res.data.message, type: res.data.success ? 'success' : 'error'})
              if (res.data.success) {
                this.doQuery()
              }
            })
        })
      },
      handleRole(item) {
        this.$refs.addRole.toAssignPrem(item.id)
      },
      agree(row) {
        console.log(row)
        agree(row).then(res => {
          console.log(res)
          this.$message({message: res.data.message, type: res.data.success ? 'success' : 'error'})
          if (res.data.success) {
            this.doQuery()
          }
        })
      },
      disagree(row) {
        console.log(row)
        disagree(row).then(res => {
          console.log(res)
          this.$message({message: res.data.message, type: res.data.success ? 'success' : 'error'})
          if (res.data.success) {
            this.doQuery()
          }
        })
      }
    },
    // 创建完毕状态
    created: function () {
      this.doQuery()
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .iconInfo {
    .fa {
      color: #999;
      font-size: 14px;
      cursor: pointer;
    }

    a {
      padding: 0 5px;
    }
  }

  .serachInput {
    .el-input--medium {
      width: 150px;

      .el-input__inner {
      }
    }
  }

  .serachInput .el-input--medium .el-input__inner {
    height: 26px;
    line-height: 26px;
  }
</style>
