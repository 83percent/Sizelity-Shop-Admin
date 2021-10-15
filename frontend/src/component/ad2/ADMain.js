import ADEvent from './ADEvent';
import ADIntro from './ADIntro';

const ADMain = ({history}) => {
    return (
        <>
            <ADEvent />
            <ADIntro history={history}/>
        </>
    )
}

export default ADMain;