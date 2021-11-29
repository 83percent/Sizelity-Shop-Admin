import { useContext, useState } from "react";
import { UserContext } from "../App";

// Component
import InitCheck from "../component/init/InitCheck";
import InitEnd from "../component/init/InitEnd";
import InitInfo from "../component/init/InitInfo";
import InitPassword from "../component/init/InitPassword";
import InitPrice from "../component/init/InitPrice";
import InitWelcome from "../component/init/InitWelcome";

// Context

// CSS
import '../contents/css/init/InitIndex.css';

const InitRouter = ({history}) => {
    // State
    const [step, setStep] = useState(0);
    const [setting, setSetting] = useState({
        password : undefined,
        info: undefined,
        price: undefined
    });

    // Context
    const {user} = useContext(UserContext);

    if(user.status !== 0) {
        history.replace("/wrong");
    }

    const event = {
        setting : JSON.parse(JSON.stringify(setting)),
        priceName : ['basic', 'standard', 'deluxe', 'premium'],
        next : function(pointer) {
            if(pointer > 0) {
                setStep(pointer)
            } else {
                if(pointer < 0) setStep(step-1);
                else setStep(step+1);
            }
            
        },
        setPassword : function(value) {
            event.setting.password = value;
            setSetting(event.setting);
        },
        setInfo : function(values) {
            event.setting.info = values;
            setSetting(event.setting);
        },
        setPrice : function(values) {
            if(!event.priceName.includes(values?.name)) return false;
            event.setting.price = values;
            setSetting(event.setting);
        }
    }

    if(step === 0) {
        return <InitWelcome next={event.next}/>
    } else {
        return (
            <main id="init" className="step-wrapper">
                <nav>
                    <div className={`dot ${step >= 2 ? 'pass' : ''}`}>
                        <i className="material-icons">check</i>
                    </div>
                    <div className={`line ${step >= 3 ? 'pass' : ''}`}></div>
                    <div className={`dot ${step >= 3 ? 'pass' : ''}`}>
                        <i className="material-icons">check</i>
                    </div>
                    <div className={`line ${step >= 4 ? 'pass' : ''}`}></div>
                    <div className={`dot ${step >= 4 ? 'pass' : ''}`}>
                        <i className="material-icons">check</i>
                    </div>
                    <div className={`line ${step >= 5 ? 'pass' : ''}`}></div>
                    <div className={`dot ${step >= 5 ? 'pass' : ''}`}>
                        <i className="material-icons">check</i>
                    </div>
                </nav>
                <section className={`step${step}-wrapper`}>
                    <InitSteps step={step} setting={setting} event={event}/>
                </section>
            </main>
        )
    }
}

const InitSteps = ({step, setting, event}) => {
    switch(step) {
        case 1 : return (<InitPassword next={event.next} passwordSetting={setting.password} setPassword={event.setPassword}/>);
        case 2 : return (<InitInfo next={event.next} infoSetting={setting.info} setInfo={event.setInfo}/>);
        case 3 : return (<InitPrice next={event.next} priceSetting={setting.price} setSetting={event.setPrice}/>);
        case 4 : return (<InitCheck next={event.next} setting={setting} />);
        case 5 : return (<InitEnd setting={setting} />);
        default : return null;
    }
}

export default InitRouter;