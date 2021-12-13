import ProductType from '../../../contents/js/ProductType';
import DataFormat from '../../../contents/js/DateFormat';

const ProductSearchList = ({datas, setShareProduct, remove, setDetail}) => {
    function fncClick(e, type, element) {
        e.stopPropagation()
        switch(type) {
            case 'share' : {
                setShareProduct({
                    shop : element.praw.domain,
                    no : element.praw.code,
                    pname : element.info.pname,
                    sname : element.info.sname
                })
                break;
            }
            default: break;
        }
    }

    if(datas?.length > 0) {
        return (
            <>
            <ul>
                {
                    <>
                    <li>
                        <p>no.</p>
                        <h4>상품명</h4>
                        <p>대분류</p>
                        <p>소분류</p>
                        <p>등록날짜</p>
                        <p>Fnc.</p>
                    </li>
                    {
                        datas.map((data, index) => (
                            <li key={index} onClick={() => setDetail(data)}>
                                <p>{index+1}</p>
                                <h4>{data.info.pname}</h4>
                                <p>{ProductType.getTypeName(data.info.ptype)}</p>
                                <p>{data.info.subtype}</p>
                                <p>{DataFormat.transformDate(data.reg_date)}</p>
                                <div>
                                    <a href={`http://${data.praw.full}`} rel="noreferrer" target="_blank">
                                        <i className="material-icons">open_in_new</i>
                                    </a>
                                    <button onClick={e => fncClick(e, "share", data)}>
                                        <i className="material-icons">share</i>
                                    </button>
                                    <button onClick={e => {e.stopPropagation(); remove(e.target, data._id)}}>
                                        <i className="material-icons">delete</i>
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                    </>
                }
            </ul>
            </>
        )
    } else return null;
    
}

export default ProductSearchList;