// CSS
import '../../contents/css/ad/ADCreateBtn.css'

const ADCreateBtn = ({saveFunction}) => {
    if(!saveFunction) return null;
    return (
        <section className="create-btn-component">
            <div>
                <p>광고 생성 전 <strong>오른쪽 '주의사항'을 읽어주세요.</strong></p>
                <button onClick={() => saveFunction()}>광고 생성</button>
            </div>
            <article>
                <div className="title">
                    <h2>주의 사항</h2>
                </div>
                <ul>
                    <li>
                        <h3><span className="dot"></span>광고 개제</h3>
                        <p>입찰을 통해 이루어지는 광고는 하루 단위의 광고입니다.</p>
                        <p>즉, 오늘 입찰된 광고의 경우 다음날 입찰이 되지 않는 경우 광고가 개제되지 않습니다.</p>
                        <p>생성된 광고에 입력된 '입찰 희망가'와 '일일 예산'으로 매일 자동으로 입찰에 참여하게 됩니다.</p>
                    </li>
                    <li>
                        <h3><span className="dot"></span>자동 입찰 참여</h3>
                        <p>생성된 광고는 매일 (한국시간) 매일 04시에 자동으로 진행됩니다.</p>
                        <p>자동 입찰을 막기 위해서는 광고 상태를 비활성화하거나, 삭제해야합니다.</p>
                    </li>
                    <li>
                        <h3><span className="dot"></span>수정</h3>
                        <p>입찰된 후 입찰된 광고의 '이미지', '링크'와 '입찰 희망가', '일일 예산' 모두 수정되어도 입찰된 광고에 반영되지 않습니다.</p>
                        <p>입찰 이후 수정된 내용은 다음날 입찰 참여에 반영됩니다.</p>
                    </li>
                    <li>
                        <h3><span className="dot"></span>입찰 포기</h3>
                        <p>입찰 후 진행되고 있는 광고의 중도포기는 특별한 사유가 있지 않는 한 불가합니다.</p>
                    </li>
                </ul>
            </article>
        </section>
    )
}

export default ADCreateBtn;