
// CSS
import { useState } from 'react';
import '../../contents/css/ad/ADBidPreview.css';

const ADBidPreview = ({maxBidPrice=0}) => {
    const [_maxBidPrice, _setMaxBidPrice] = useState(Number(maxBidPrice));
    return (
        <article className="bid-preview">
            <div>
                <h2>현재 입찰 최고가.</h2>
                <p>CPM (1,000회) 노출 기준</p>
                <div>
                    <h3>{_maxBidPrice.toLocaleString()}</h3>
                    <p>원</p>
                </div>
            </div>
        </article>
    )
}
export default ADBidPreview;