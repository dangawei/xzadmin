/*
    *tree数据转化
    *param {Array} tree 待转化的数据tree
    * @param  {Object} map  键值对映射
    *return {Array} 转化后的tree
*/
function treeConversion(tree,map){
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
            const title = item[ map.title ]
            const id = item[ map.id ]
            let expand = true
            let children = item[ map.children ] || [];

            // 如果有子节点，递归
            if (children) {
                children = treeConversion(children, map)
            }

            result.push({
                id,
                title,
                expand,
                children
            })
        })
        return result;
        // resolve(result);
    // })
}

export default {
    treeConversion:function(tree,map){
        return treeConversion(tree,map);
    }
}
