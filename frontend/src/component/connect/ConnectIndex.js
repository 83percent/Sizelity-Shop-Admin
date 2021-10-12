
// Component
import ConnectTest from './ConnectTest';

// CSS
import '../../contents/css/connect/ConnectIndex.css';

const ConnectIndex = ({history}) => {
    return (
        <main id="connect" className="index">
            <ConnectTest history={history}/>
        </main>
    )
}
export default ConnectIndex;