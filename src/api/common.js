/*
    *tree数据转化
    *param {Array} tree 待转化的数据tree
    * @param  {Object} map  键值对映射
    *return {Array} 转化后的tree
*/
function convertTree(tree,map){
    // return new Promise((resolve,reject)=>{
        const result=[]
        // console.log(map);
        // 遍历tree
        tree.forEach((item)=>{
            //解构赋值
            // let {
            //     id:value,
            //     name:label,
            //     chapters:children
            // }=item;
            // 读取 map 的键值映射
            const value = item[ map.value ]
            const label = item[ map.label ]
            let children = item[ map.children ] || [];
            let loading = map.loading?false : 1;

            // 如果有子节点，递归
            if (children) {
                children = convertTree(children, map)
            }

            if(loading===1){
                result.push({
                    value,
                    label,
                    children
                })
            }else{
                result.push({
                    value,
                    label,
                    loading,
                    children
                })
            }

        })
        return result;
        // resolve(result);
    // })
}

export default {
    convertTree:function(tree,map){
        return convertTree(tree,map);
    }
}
