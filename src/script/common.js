/*
* 获取某个元素下标
*       arrays  : 传入的数组
*
*       obj     : 需要获取下标的元素
* */
function arrayIndex(arrays,obj,key) {
    if(key){
        var i = arrays.length-1;
        while (i>=0) {
            if (arrays[i][key.id] == obj) {
                return i;
            }
            i--;
        }
        return false;
    }else{
        var i = arrays.length-1;
        while (i>=0) {
            if (arrays[i] == obj) {
                return i;
            }
            i--;
        }
        return false;
    }
}
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
// 选项添加字母
function lettersMethod(index){
    var letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

    return letters[index]
}

export default {
    arrayIndex:function(arrays, obj,key){
        return arrayIndex(arrays, obj,key);
    },
    convertTree:function(tree,map){
        return convertTree(tree,map);
    },
    lettersMethod:function(index){
        return lettersMethod(index);
    }
}
