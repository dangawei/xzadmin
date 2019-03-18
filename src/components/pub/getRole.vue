<template>
  <div class="">
    <Select v-model="valueId" @on-change="change(valueId)">
        <Option v-for="item in alldata" :value="item.id" :key="item.id">{{item.name}}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  name: '',
  props: ['importData'],
  data () {
    return {
      valueId: "",
      alldata:[]
    }
  },
  created() {
      console.log(this.importData)
    this.valueId=this.importData;
  },
  mounted() {
    this.list()
  },
  methods: {
    list () {
      let _this = this;
      let data = {
          page:1,
          pageSize:100
      }
      this.$api.get('/admin/api/role/list',data,reset => {
          if (reset.code === 200){
              _this.alldata = reset.data
          }
      })
    },
    change(data) {
      this.$emit('exportData',data)
    }
  }
}
</script>

<style scoped lang="less">
</style>
