/** 联合类型 */
/** 声明变量的时候可以使用 */
let phoneNum:number | string = '010-xxxx-xxx';

/** 声明函数的时候 也可以使用  */
const fn = (something:number | boolean):boolean => {
    return !!something;
    // !! 是强制性转换
}

/** 交叉类型 */
interface People {
    name:string,
    skill:string
}
interface Man {
    sex:number
}
const tuzi = (man: People & Man) => {
    // man 具有 People 里定义的类型 和 Man 里 定义的类型 相当于 继承组合
    console.log(man.sex);
    console.log(man.name);
    console.log(man.skill);
}
console.log(tuzi({name: 'tuzi',skill:'你好',sex:'不知道'}));
