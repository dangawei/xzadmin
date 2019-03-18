<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
    div.ivu-select-dropdown{
        z-index: 1000;
    }
    div.ivu-table-cell{
        padding-left:6px;
        padding-right:6px;
    }
    table{
        border-collapse: collapse;
    }

    .ivu-menu-vertical .ivu-menu-item-group-title{
        height: 0px !important;
        line-height: 0px !important;
        padding-left: 0px !important;
    }
</style>
