import '../../contents/css/init/Welcome.css';

const InitWelcome = ({next}) => {
    return (
        <main id="init" className="welcome">
            <h1>환영합니다.</h1>
            <p>사이즈리티 시작을 위해, 몇 가지 내용을 설정할게요.</p>
            <button onClick={() => next()}>
                <i className="material-icons">check</i>
            </button>
        </main>
    )
}

export default InitWelcome;