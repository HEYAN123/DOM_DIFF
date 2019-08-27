import { createElement, render, renderDom } from './element';
import diff from './diff';
import patch from './patch';

let virtualDOM1 = createElement(
    'ul',
    {
        class: "list"
    },
    [
        createElement('li', { class: 'item'}, ['a']),
        createElement('li', { class: 'item'}, ['b']),
        createElement('li', { class: 'item'}, ['c'])
    ]
);

let virtualDOM2 = createElement(
    'ul',
    {
        class: "list-group"
    },
    [
        createElement('li', { class: 'item'}, ['1']),
        createElement('div', { class: 'item'}, ['b'])
    ]
);

let realDOM = render(virtualDOM1);
renderDom(realDOM, window.root);

// diff比较得出补丁
let patches = diff(virtualDOM1, virtualDOM2);
// 给DOM树打补丁
patch(realDOM, patches);