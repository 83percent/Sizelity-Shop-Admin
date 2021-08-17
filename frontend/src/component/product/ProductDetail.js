import '../../contents/css/product/ProductDetail.css';

import { getTypeName, getSizeRate } from '../../contents/js/ProductType';
import { transformDate } from '../../contents/js/DateFormat';
const ProductDetail = ({detail, setDetail}) => {
    
    // Field
    const rateNameArray = getSizeRate(detail?.info?.ptype)

    return (
        <nav className={`detail-wrapper ${detail ? "on" : ""}`}>
            <div>
                <button onClick={() => setDetail(null)}>
                    <i className="material-icons">close</i>
                </button>
                <div className="title">
                    <h2>{detail?.info?.pname}</h2>
                    <p>{detail?.info?.ptype ? getTypeName(detail.info.ptype) : null} / {detail?.info?.subtype}</p>
                </div>
                {
                    detail?.info?.ptype && detail?.size?.length > 0 ? (
                        <div className="size-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>사이즈 명</th>
                                        {
                                            rateNameArray.map((rateName, index) => (
                                                <th key={index}>{rateName[1]}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        detail.size.map((element, index) => (
                                            <tr key={index}>
                                                <td>{element.name}</td>
                                                {
                                                    rateNameArray.map((rate,index2) => (
                                                        <td className={index2}>{element[rate[0]]}</td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : null
                }
                <div className="time">
                    <p>{detail?.reg_date ? transformDate(detail.reg_date) : null}</p>
                </div>
            </div>
        </nav>
    )
}

export default ProductDetail;
