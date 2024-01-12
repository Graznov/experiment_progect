import './Calc.scss'
import {useReducer} from "react"
import classNames from "classnames";

let oper = { //
    numbA : '', // число А
    numbB : '', // число Б
    numbC : undefined, // результат вычисления
    vall : '', // знак выполняемого вычисления (+-/*)
    bool : false, // обозн нажатия знака вычисления (+-/*) Когда нажато - true
    point : false, // обозн нажатия точки. Когда нажато - true
    plusMinus : true // обозн нажатия +/-. Когда нажато - true
}

document.title = 'react_calc'
function Calc(){


    //выключение кнопок после вычисления:
    const btnTopClass = classNames('btnOperatorTop', {
        'deactive' : oper.numbC
    })

    const btnNumberClass = classNames('buttonNumb', {
        'deactive' : oper.numbC
    })

    const btnZeroClass = classNames('buttonNumb', 'zero', {
        'deactive' : oper.numbC
    })

    const btnOperatorClass = classNames('btnOperator', {
        'deactive' : oper.numbC
    })
    //...выключение кнопок после вычисления

        function reduser(state, action){

        // console.log(`action:`, action)
        // console.log('state:', state)

        switch (action.type){

            case('number'):{ //нажатие кнопки с цифрами

                    if(oper.bool){ //набор числа Б
                        return {
                            operator: oper.vall,
                            topArea: oper.numbA,
                            battlefield : state.battlefield + action.payload
                        }
                    } else if(!oper.bool) { //набор числа А
                        return {
                            operator: oper.vall,
                            topArea: '',
                            battlefield : state.battlefield + action.payload

                        }
                    }

            }

            case ('operator'):{ //нажатие кнопки оператора вычисления (+-/*)

                oper.numbA = +state.battlefield
                oper.bool = true
                oper.vall = action.payload
                oper.point = false

                return {
                    topArea: oper.numbA,
                    battlefield: '',
                    operator: oper.vall,
                }
            }

            case ('result'): { //кнопка =

                oper.numbB = +state.battlefield

                if (oper.vall==='+'){
                    oper.numbC = +oper.numbA+oper.numbB
                } else if (oper.vall==='-'){
                    oper.numbC = +oper.numbA-oper.numbB
                } else if (oper.vall==='x'){
                    oper.numbC = +oper.numbA*oper.numbB
                } else if (oper.vall==='/'){
                    oper.numbC = +oper.numbA/oper.numbB
                }

                oper.numbC = +oper.numbC.toFixed(3)
                return {
                    topArea: `${oper.numbA} ${oper.vall} ${oper.numbB}`,
                    battlefield: oper.numbC,
                    operator: '=',
                }
            }

            case ('clean'): { //кнопка сброса АС
                oper.vall = ''
                oper.bool = false
                oper.numbA = ''
                oper.numbB = ''
                oper.numbC = 0
                oper.point = false
                return {
                    topArea: '',
                    battlefield: '',
                    operator: '',
                }
            }

            case ('point'): {//кнопка .
                 return {
                        topArea: oper.numbA,
                        operator: oper.vall,
                        battlefield : state.battlefield + action.payload
                    }
            }

            case ('plusMinus'): { //переключатель +/-

                let numb

                if(!oper.plusMinus){
                    numb =  +state.battlefield * -1
                } else {
                    numb = +state.battlefield * -1
                }

                return {
                    topArea: oper.numbA,
                    operator: oper.vall,
                    battlefield : numb
                }
            }
        }

    }

    const [ state, dispatch ] = useReducer(reduser, {
        topArea : '',  // верхнее поле. Число А после нажатия оператора, оба числа с оператором после нажатия =
        battlefield : '', // вводимое число
        operator : oper.vall // оператор вычисления
    })

    function clickNumber(item){
        if(state.battlefield.length<11){ // 11 число знаков вмещаемых полем
            dispatch({
                type : 'number',
                payload : item.target.innerHTML
            })
        }

    }

    function clickOper(e){

        dispatch({
            type : 'operator',
            payload : e.target.innerHTML
        })
    }

    function clickResult(){
        dispatch({
            type : 'result'
        })
    }

    function clickPoint(e){
        if(!oper.point){
            dispatch({
                type : 'point',
                payload : e.target.innerHTML
            })
        }
        oper.point = true
    }
    function clean(){
        dispatch({
            type : 'clean'
        })
    }
    
    function plusMinus(){

        (oper.plusMinus) ? oper.plusMinus=false : oper.plusMinus=true

         dispatch({
             type : 'plusMinus',
             payload : '-'
         })

    }

    return (
        <div className={'container'}>
            <div className={'inpArea'}>
                <div className={'topArea'}>{state.topArea}</div>
                <div className={'operator'}>{state.operator}</div>
                <div className={'battlefield'}>{state.battlefield}</div>
            </div>

            {/*14 знак*/}
            <div className={'btnArea'}>
                <div className={'btnAreaLevel btnAreaTOP'}>
                    <button onClick={clean} className={'btnOperatorTop'}>AC</button>
                    <button onClick={plusMinus} className={btnTopClass}>+/-</button>
                    <button className={btnTopClass}>%</button>
                    <button onClick={clickOper} className={btnTopClass}>/</button>
                </div>
                <div className={'btnAreaLevel btnArea789X'}>
                    <button onClick={clickNumber} className={btnNumberClass}>7</button>
                    <button onClick={clickNumber} className={btnNumberClass}>8</button>
                    <button onClick={clickNumber} className={btnNumberClass}>9</button>
                    <button onClick={clickOper} className={btnOperatorClass}>x</button>
                </div>
                <div className={'btnAreaLevel btnArea456-'}>
                    <button onClick={clickNumber} className={btnNumberClass}>4</button>
                    <button onClick={clickNumber} className={btnNumberClass}>5</button>
                    <button onClick={clickNumber} className={btnNumberClass}>6</button>
                    <button onClick={clickOper} className={btnOperatorClass}>-</button>
                </div>
                <div className={'btnAreaLevel btnArea123+'}>
                    <button onClick={clickNumber} className={btnNumberClass}>1</button>
                    <button onClick={clickNumber} className={btnNumberClass}>2</button>
                    <button onClick={clickNumber} className={btnNumberClass}>3</button>
                    <button onClick={clickOper} className={btnOperatorClass}>+</button>
                </div>
                <div className={'btnAreaLevel btnAreaBOTT'}>
                    <button onClick={clickNumber} className={btnZeroClass}>0</button>
                    <button onClick={clickPoint} className={btnNumberClass}>.</button>
                    <button onClick={clickResult} className={btnOperatorClass}>=</button>
                </div>
            </div>
        </div>
    )
}

export default Calc