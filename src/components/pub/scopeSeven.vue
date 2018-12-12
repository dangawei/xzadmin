<template lang="html">
    <div class="">
        <!-- 七选五 -->
        <div class="" v-if="formitem.scope==7 && formitem.childSubjects!=undefined">
            <div>
                <h3>全部选项</h3>
            </div>
            <div v-for="(value, index) in formitem.childSubjects" :key="index" v-if="qiwuShow">
                <Row style="margin-bottom:15px;">
                    <Col :xs="24" :sm="24" :md="1" :lg="1">
                        <span>({{index+1}})</span>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num" style="margin-bottom:15px;">
                        <p class="text-indent">
                            <span>{{key}}.</span>
                            <Input :value="item" style="width:80%;" @input="changeItem(value.id,key,value.selection)"></Input>
                        </p>
                    </Col>
                    <Col :xs="1" :sm="1" :md="1" :lg="1">
                        <Button type="primary" size="small" @click="sureContent(value.id,value.content,value.selection)">确认修改</Button>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
