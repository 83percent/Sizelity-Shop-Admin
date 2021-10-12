import { useContext } from 'react';

//Context
import { ServerContext } from '../../App';

// CSS
import '../../contents/css/main/MainIndex.css';

// Component
import MainAD from './MainAD';
import MainADEvent from './MainADEvent';
import MainAutoHelp from './MainAutoHelp';
import MainNotice from './MainNotice';



const MainIndex = () => {

    // Context
    const server = useContext(ServerContext);

    
    return (
        <main id="main" className="index">
            <div className="logo-frame">
                <div className="logo">
                    <i className="material-icons">sell</i>
                </div>
            </div>

            <MainAD server={server}/>

            <div className="row">
                <MainAutoHelp />
                <MainADEvent />
            </div>
            <MainNotice server={server}/>
        </main>
    )
}
export default MainIndex;