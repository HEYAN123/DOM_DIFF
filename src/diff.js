const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
// dom树上的每个节点按深度遍历编号
let Index = 0;

function diff(oldTree, newTree) {
    let patches = {};
    // 递归树,把比较某结点后得到的结果放到补丁包中
    walk(oldTree, newTree, Index, patches);
    return patches;
}

function diffChildren(oldChildren, newChildren, patches) {
    oldChildren.forEach((child, idx) => {
        console.log(oldChildren, newChildren, Index);
        walk(child, newChildren[idx], ++Index, patches);
    });
}

function walk(oldTree, newTree, index, patches) {
    let changes = [];
    // 删除节点
    if(!newTree) {
        console.log(oldTree, index)
        changes.push({
            type: REMOVE,
            index
        });
    }
    // 文本节点
    else if(isText(oldTree) && isText(newTree)) {
        if(oldTree !== newTree) {
            changes.push({
                type: TEXT,
                text: newTree
            })
        }
    }
    else if(oldTree.type === newTree.type) {
        // 比较属性是否有更改
        let attrs = diffAttr(oldTree.props, newTree.props);
        if(Object.keys(attrs).length > 0) {
            changes.push({type: ATTRS, attrs});
        }
        // 如果有儿子结点,那就进行下一步的深度遍历
        diffChildren(oldTree.children, newTree.children, patches);
    }
    // type不同节点替换
    else {
        changes.push({type: REPLACE, newTree});
    }
    if(changes.length > 0) patches[index] = changes;
    console.log(patches);
}



function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    for(let key in oldAttrs) {
        if(oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key];
        }
    }
    for(let key in newAttrs) {
        // 新增属性
        if(!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}

function isText(node) {
    return Object.prototype.toString.call(node) === '[object String]';
}



export default diff;