import '../../contents/css/service/ServiceIndex.css';

const ServiceIndex = () => {
    return (
        <main id="service" className="index">
            <header>
                <h1>서비스 이용현황</h1>
            </header>
            <section>
                <div>
                    <div className="count">
                        <h3>94,239</h3>
                        <p>회</p>
                    </div>
                    <h4>사이즈 비교</h4>
                </div>
                <div>
                    <div className="count">
                        <h3>32,117</h3>
                        <p>회</p>
                    </div>
                    <h4>정보 제공</h4>
                </div>
            </section>
        </main>
    )
}
export default ServiceIndex;