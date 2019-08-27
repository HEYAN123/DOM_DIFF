import { render, Element, setAttr } from "./element";

let allPatches;
let index = 0;
function patch(tree, patches) {
    allPatches = patches;


    walk(tree);

};

function walk(node) {
    // 后序
    let curPatch = allPatches[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => {
        walk(child);
    });
    if(curPatch) {
        doPatch(node, curPatch);
    }
}

function doPatch(node, patches) {
    patches.forEach(patch=>{
        switch(patch.type) {
            case 'ATTRS':
                for(let key in patch.attrs) {
                    if(patch.attrs[key]) setAttr(node, key, patch.attrs[key]);
                    else node.removeAttribute(key);
                }
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = patch.newTree instanceof Element? render(patch.newTree): document.createTextNode(patch.newTree);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE':
                node.remove();
                break;
            default:
                break;
        }
    })
}

export default patch;