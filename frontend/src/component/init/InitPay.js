const InitPay = ({base, pay, discount, expire}) => {
    return (
        <section className="pay-frame">
            <h2>선 결제</h2>
            <div>
                <div className="pay-price">
                    <h3>{((pay * expire) + Math.floor(((pay * expire) / 100) * 10)).toLocaleString()}원</h3>
                    <p>(월 기본요금 : {base.toLocaleString()}원 - {discount}% = {pay.toLocaleString()}원)</p>
                    <p>{expire}개월 : + {(pay * expire).toLocaleString()}원</p>
                    <p>VAT 10% : + {Math.floor(((pay * expire) / 100) * 10).toLocaleString()}원</p>
                </div>
                <div className="pay-help">
                    <p>결제 방법과 내용은 설정한 전화번호를 통해 전달됩니다.</p>
                    <p>등록일 기준 1개월 이내에 결제 및 변경, 취소가 가능합니다.</p>
                    <p>결제 확인 이후, 요금이 적용됩니다. 무료 제공 기간이 존재할 경우 무료 제공 기간이 종료된 뒤 요금이 적용됩니다.</p>
                    <p>결제 내용은 기본요금의 선결제이며, 기본 제공되는 무료 제공량 소진 이후 발생하는 비용에 대한 부과는 별도입니다.(월 단위)</p>
                    <p>사용 예약 기간 소진 이전 해지의 경우, 기본요금 환불은 불가합니다.</p>
                </div>
            </div>
        </section>
    )
}

export default InitPay;