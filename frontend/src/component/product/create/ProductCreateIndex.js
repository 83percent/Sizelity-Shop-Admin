import { useContext, useMemo, useState } from 'react';
import __ProductModule from '../../../contents/js/product/Product';

// Context
import { ServerContext } from '../../../App';

// Component
import ProductCreateStep1 from './ProductCreateStep1';
import ProductCreateStep2 from './ProductCreateStep2';
import ProductCreateStep3 from './ProductCreateStep3';
import ProductCreateStep4 from './ProductCreateStep4';
import ProductCreateStep5 from './ProductCreateStep5';

// CSS
import '../../../contents/css/product/create/ProductCreate.css';

const ProductCreateIndex = ({history}) => {
    // State
    const [step, setStep] = useState(1);
    const [product, setProduct] = useState(null);
    

    // Context
    const server = useContext(ServerContext);

    // Memo
    const ProductModule = useMemo(() => {
        return new __ProductModule(server);
    }, [server]);
    
    const event = {
        setProductInfo : function(option, objectValue) {
            if(['praw','info','size'].includes(option)) {
                let clone;
                if(product !== null) clone = JSON.parse(JSON.stringify(product));
                else clone = {};
                clone[option] = objectValue;
                setProduct(clone);
            }
        },
        move: function(page) {
            if(page === undefined) {
                setStep(step+1);
            } else if(page < 0) {
                if(step >= 2) setStep(step-1);
            } else {
                setStep(page);
            }
        },
        setProductType : function(ptype) {
            let clone;
            if(product !== null) clone = JSON.parse(JSON.stringify(product));
            else clone = {};
            
            if(clone?.info?.ptype) {
                // 다른 타입을 선택했을 경우 사이즈 정보 초기화
                if(clone.info.ptype === ptype) return;
                else clone.info.ptype = ptype;
            } else clone.info = {ptype};
            setProduct(clone);
        },
        init : function() {
            setProduct(null);
            setStep(1);
        }
    }
    
    function StepViewer(step) {
        switch(step) {
            case 1 : return <ProductCreateStep1 product={product} move={event.move} ProductModule={ProductModule} setProductInfo={event.setProductInfo}/>;
            case 2 : return <ProductCreateStep2 product={product} move={event.move} setProductType={event.setProductType} />
            case 3 : return <ProductCreateStep3 product={product} move={event.move} setProductInfo={event.setProductInfo}/>
            case 4 : return <ProductCreateStep4 product={product} move={event.move} setProductInfo={event.setProductInfo}/>
            case 5 : return <ProductCreateStep5 product={product} history={history} init={event.init}/>
            default: return null;
        }
    }

    return (
        <div id="product" className="create">
            <header>
                <h1>상품 추가</h1>
            </header>
            <nav>
                <p className={step >= 1 ? 'on' : ""}>1</p>
                <div className={step >= 2 ? 'on' : ""}></div>
                <p className={step >= 2 ? 'on' : ""}>2</p>
                <div className={step >= 3 ? 'on' : ""}></div>
                <p className={step >= 3 ? 'on' : ""}>3</p>
                <div className={step >= 4 ? 'on' : ""}></div>
                <p className={step >= 4 ? 'on' : ""}>4</p>
            </nav>
            {StepViewer(step)}
        </div>
    )
}

export default ProductCreateIndex;