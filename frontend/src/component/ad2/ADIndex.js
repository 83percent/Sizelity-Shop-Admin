// CSS
import '../../contents/css/ad2/ADIndex.css';
import ADEvent from './ADEvent';
import ADIntro from './ADIntro';

const ADIndex = () => {
    return (
        <main id="ad-center" className="index">
            <header>
                <h1>광고센터</h1>
            </header>
            <ADEvent />
            <ADIntro />
        </main>
    )
}
export default ADIndex;