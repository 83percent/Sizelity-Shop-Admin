import { useContext, useEffect } from 'react';

// Component
import InputPassword from '../component/login/InputPassWord';
import InputID from '../component/login/InputID';

// CSS
import '../contents/css/login/LoginRouter.css';

// Context
import { UserContext } from '../App';
const LoginRouter = ({history, match}) => {

    // Context
    const { setUser } = useContext(UserContext);

    // Field
    const id = match.params?.id;

    useEffect(() => {
        const article = document.querySelector('article');
        setTimeout(() => {
            if(article) {
                article.classList.add("on");
                setTimeout(() => {
                    article.classList.add("move");
                }, 1000);
            }
        }, 1000);
    });

    useEffect(() => {
        setUser(null);
    }, []);
    return (
        <main id="login">
            <article>
                <i className="material-icons">sell</i>
                <h1>반가워요!</h1>
            </article>
            <section>
                {
                    id ? (
                        <InputPassword history={history} id={id}/>
                    ) : (
                        <InputID history={history}/>
                    )
                }
            </section>
        </main>
    )
}
export default LoginRouter;