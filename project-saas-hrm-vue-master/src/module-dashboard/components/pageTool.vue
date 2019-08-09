<template>
  <div class="pages">
      <el-pagination background 
      @size-change="onPageSizeChange" 
      @current-change="onPageChange" 
      :current-page="Number(paginationPage)" 
      :total="Number(total)" 
      :page-size="Number(paginationPagesize)" 
      :page-sizes="[10,20,30, 50]" 
      layout="sizes, prev, pager, next, jumper" 
      >
      </el-pagination>
  </div>
</template>
<script>
</script>
<style>
.blue{color: #409EFF;}
</style>
