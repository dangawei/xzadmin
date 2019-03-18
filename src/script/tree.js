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
            // 读取 map 的键值映射
            const title = item[ map.title ]
            const id = item[ map.id ]
            // let expand = false
            let children = item[ map.children ] || [];
            let pid = item[ map.pid ] || 0;

            // 如果有子节点，递归
            if (children) {
                children = treeConversion(children, map)
            }

            result.push({
                id,
                pid,
                title,
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
