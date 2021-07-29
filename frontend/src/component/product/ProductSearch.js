
import { useRef } from 'react';
import '../../contents/css/product/ProductSearch.css';

const ProductSearch = () => {
    const SearchData = useRef({
        value : undefined,
        cate : undefined
    })
    const event = {
        search : async function(value) {
            console.log(value);
        }
    }
    return (
        <article className="search">
            <div className="search-wrapper">
                <div className="search-input-frame">
                    <div>
                        <i className="material-icons">search</i>
                        <input
                            type="text" 
                            onKeyUp={(e) => {if(e.key === "Enter") event.search(SearchData.current)}}
                            onChange={(e) => SearchData.current.value = e.target.value}
                            />
                    </div>
                    <button onClick={() => event.search(SearchData.current)}>검색</button>
                </div>
                <ul>
                    <li>
                        <p>검색 조건 :</p>
                        <select>
                            <option value="">상품명</option>
                            <option value="">상품 주소</option>
                        </select>
                    </li>
                    <li>
                        <p>상품 종류 :</p>
                        <select>
                            <option value="">전체</option>
                            <option value="">아우터</option>
                            <option value="">상의</option>
                            <option value="">하의</option>
                            <option value="">치마</option>
                            <option value="">원피스</option>
                            <option value=""></option>
                            <option value="">신발</option>
                            <option value="">세트</option>
                        </select>
                    </li>
                    <li>
                        <p>등록 날짜 :</p>
                        <select>
                            <option value="">전체기간</option>
                            <option value="">오늘</option>
                            <option value="">이번 주</option>
                            <option value="">이번 달</option>
                            <option value="">올해</option>
                        </select>
                    </li>
                </ul>
            </div>
        </article>
    )
}
export default ProductSearch;