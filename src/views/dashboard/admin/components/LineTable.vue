<template>
<div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
        align="center"
        prop="date"
        label="日期"
        width="180">
        </el-table-column>
        <el-table-column
        align="center"
        prop="name"
        label="姓名"
        width="180">
        </el-table-column>
        <el-table-column
        align="center"
        prop="address"
        label="地址">
        </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[ 5, 10, 15, 20]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
</template>

<script>
import fetchList from "@/api/article";
export default {
  data() {
    return {
      tableKey: 0,
      tableData: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    }
  }
};
</script>