<template>
  <article-detail :is-edit='false' :title='title'></article-detail>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'
export default {
  name: 'createForm',
  components: { ArticleDetail },
  data() {
    return {
      title: this.$route.query.id
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getQuery'
  }
}
</script>

