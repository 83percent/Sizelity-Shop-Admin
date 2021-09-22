import { ADUserContext } from './ADMain';
import { useContext } from 'react';
 
// CSS
import '../../contents/css/ad/ADMaxCountPreview.css';

const ADMaxCountPreview = ({plan=0, bid=0}) => {

    // Context
    const { ADUser } = useContext(ADUserContext);

    function getMaxCount(plan, mbid) {
        try {
            const result = Math.floor(Number(plan) / Number(mbid));
            return isFinite(result) ? result : 0;
        } catch {
            return 0;
        }
    }

    if(ADUser) {
        return (
            <section className="ad-maxcount-component">
                <div>
                    <ul className="result-frame">
                        <h2>입찰 시 일일 최대 광고 노출 수</h2>
                        <li>
                            <div>
                                <p>책정 된 예산</p>
                                <h3>{plan.toLocaleString()}</h3>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>입찰 희망 가(VAT 포함)</p>
                                <h3>{(bid + (bid / 10)).toLocaleString()}</h3>
                            </div>
                            <div>
                                <p>1회 노출 당(VAT 포함)</p>
                                <h3>{((bid + (bid / 10))/1000).toLocaleString()}</h3>
                            </div>
                        </li>
                        <div></div>
                        <li>
                            <div>
                                <p>최대 노출 수</p>
                                <h3>{getMaxCount(plan, ((bid + (bid / 10))/1000))}</h3>
                            </div>
                        </li>
                    </ul>
                </div>
                <article>
                    <ul>
                        <li>
                            <h3><span className="dot"></span>최대 노출 수</h3>
                            <p>'최대 노출 수'는 낙찰된 광고의 하루 동안 노출 할 최대 횟수 입니다.</p>
                            <p>(책정 된 예산 / 1회 노출 당 가격 = 최대 노출 수)</p>
                            <p>최대 노출 수를 초과하여 노출 하지 않습니다.</p>
                            <p>입찰되어 진행 중인 광고의 최대 노출 횟수 수정은 불가능합니다.</p>
                        </li>
                    </ul>
                </article>
            </section>
        )
    } else return null;
}

export default ADMaxCountPreview;