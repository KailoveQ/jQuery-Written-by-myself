window.jQuery = function (selectorOrArray) { 
    let elements  //适配一下
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }

// window.jQuery = function (selector) {
//     const elements = document.querySelectorAll(selector)
    return {
                //******* 增加 ************
        oldApi:selectorOrArray.oldApi,

        find(selector) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                 const elements2 = Array.from(elements[i].querySelectorAll(selector))
                // const elements2 = elements[i].querySelectorAll(selector)
                console.log(elements2)
                array = array.concat(elements2)
            }
            array.oldApi = this //把旧的API挂到返回的数组上去
            console.log(array)    
            const newApi = jQuery(array)  //新的API
            return newApi
        },

        end() {
            console.log(this)
            return this.oldApi   //现在就是新的API
        },
        each(fn) {
            for (let i = 0; i < elements.length; i++){
                fn.call(null,elements[i],i)
            }
            return this
        },
        parent(elements) {
            const array=[]
            this.each((node) => {//indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode)
                }
                console.log(array.indexOf(node.parentNode))
            })
            return jQuery(array)
        },
        print() {
          console.log(elements)  
        },
        children() {
            const array = []
            this.each((node) => {//indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
                if (array.indexOf(node.children) === -1) {
                    array.push(...node.children) //展开操作符
                }
            })
            return jQuery(array)
        },
        // 闭包：函数访问外部的变量
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this
        },

    }
}
