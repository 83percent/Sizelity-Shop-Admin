import { useEffect, useMemo, useRef, useState } from 'react';
import ProductType from '../../../contents/js/ProductType';

const ProductCreateStep4 = ({product, move, setProductInfo}) => {
    // Memo
    const sizelist = useMemo(() => {
        return ProductType.getSizeRate(product.info.ptype);
    }, [product]);

    // State
    const [inputSizes , setInputSizes] = useState([{}]);

    // Ref
    const inputWrapper = useRef(null);

    const event = {
        add : function() {
            if(inputSizes.length < 10) {
                setInputSizes([...inputSizes, {}]);
            } else {
                return window.alert("사이즈 입력은 10개 까지만 가능합니다.");
            }
        },
        remove : function(index) {
            if(inputSizes.length === 1) return window.alert("1개 이상의 사이즈 정보가 필요합니다.");
            const clone = JSON.parse(JSON.stringify(inputSizes));
            clone.splice(index, 1);
            setInputSizes(clone);
        },
        inputBlur : function(index, name, value) {
            if(name === 'name') {
                value = value.toUpperCase();
            }
            const clone = JSON.parse(JSON.stringify(inputSizes));
            if(clone[index][name] === undefined && value === "") return;
            if(clone[index][name] === value) return;
            if(value === "") delete clone[index][name];
            else clone[index][name] = value;
            
            
            setInputSizes(clone);
        },
        pass : function() {

            if(inputSizes.length <= 0) return window.alert("1개 이상의 사이즈 정보가 필요합니다.");
            try {
                const checkList = Object.entries(inputSizes[0]).reduce((acc,element) => {
                    acc.unshift(element[0]);
                    return acc;
                }, []);
                
                if(!checkList.includes('name')) return window.alert("사이즈 명을 입력해주세요.");
                
                let error = false;
                for(let inputSize of inputSizes) { // 배열 차례로
                        
                    for(let checkElement of checkList) {
                        if(!inputSize[checkElement]) {
                            error = true;
                            if(checkElement !== 'name') {
                                window.alert(`'${inputSize.name}'사이즈의 '${ProductType.getSizeRateName(checkElement)}' 정보를 입력해 주세요.`);
                            } else {
                                window.alert(`사이즈 명을 모두 채워주세요.`);
                            }
                            break;
                        }
                    }
                    if(error) break;
                    if(Object.keys(inputSize).length !== checkList.length) {
                        error = true;
                        for(let key of Object.keys(inputSize)) {
                            if(!checkList.includes(key)) {
                                window.alert(`'${ProductType.getSizeRateName(key)}' 사이즈가 모두 입력되지 않았습니다.`);
                                break;
                            }
                        }
                        break;
                    }
                }
                // 작은 사이즈 앞으로
                if(inputSizes.length > 1) {
                    inputSizes.sort((a,b) => {
                        a = Object.entries(a).reduce((acc, value) => {
                            if(value[0] !== "name") return acc+Number(value[1])
                            else return acc;
                        }, 0);
                        b = Object.entries(b).reduce((acc, value) => {
                            if(value[0] !== "name") return acc+Number(value[1])
                            else return acc;
                        }, 0);
                        return a-b;
                    });
                }

                if(error) return;
                if(!window.confirm("입력한 상품 정보를 저장할까요?")) return;
                setProductInfo('size', inputSizes);
                move();
            } catch(error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        const lis = inputWrapper.current.querySelectorAll('li');
        for(let i=1; i<lis.length; i++) {
            const inputs = lis[i].querySelectorAll('input');
            for(let input of inputs) {
                if(inputSizes[i-1][input.name] !== undefined) {
                    input.value = inputSizes[i-1][input.name]
                } else input.value = ""
            }
        }
    }, [inputSizes]);
    return (
        <section className="step4">
            <h2>사이즈 입력</h2>
            <p>상품의 사이즈 정보를 1개 이상 입력해주세요.</p>
            <div className="input-wrapper">
                <ul ref={inputWrapper}>
                    <li>
                        <div><p>사이즈명</p></div>
                        {
                            sizelist.map((element, index) => (
                                <div key={index}><p>{element[1]}</p></div>
                            ))
                        }
                        <div className="delete"></div>
                    </li>
                    {
                        inputSizes.map((__, i1) => (
                            <li key={i1}>
                                <div>
                                    <input type="text" name="name" autoComplete="off" onBlur={e => event.inputBlur(i1, "name", e.target.value)}/>
                                </div>
                                {
                                    sizelist.map((element, i2) => (
                                        <div key={i2}>
                                            <input type="number" name={element[0]} autoComplete="off" onBlur={e => event.inputBlur(i1, element[0], e.target.value)}/>
                                        </div>
                                    ))
                                }
                                <div className="delete" onClick={() => event.remove(i1)}>
                                    <button>
                                        <i className="material-icons">delete</i>
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                {
                    inputSizes.length < 10 ? (
                        <div className="add-wrapper">
                            <button onClick={() => event.add()}>
                                <i className="material-icons">add</i>
                            </button>
                        </div>
                    ) : null
                }
            </div>
            <div className="save-wrapper">
                <button onClick={() => event.pass()}>
                    <i className="material-icons">save</i>
                </button>
            </div>
            <div className="btn-wrapper">
                <button onClick={() => move(-1)}>
                    <i className="material-icons">chevron_left</i>
                    <p>이전 단계로</p>
                </button>
            </div>
        </section>
    )
}

export default ProductCreateStep4;