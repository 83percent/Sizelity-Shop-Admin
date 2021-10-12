import { useCallback, useEffect, useMemo, useState } from 'react';
import ADModule from '../../contents/js/ad/AD';

// CSS
import '../../contents/css/main/MainAD.css';

const MainAD = ({server}) => {
    // State
    const [ad, setAD] = useState(undefined);
    const [activeIndex, setActiveIndex] = useState(0);

    // Memo
    const adModule = useMemo(() => {
        return new ADModule(server);
    }, [server]);

    const getAD = useCallback(async () => {
        if(ad === undefined) {
            const response = await adModule.getList();
            if(response.type === "success") {
                if(response.data?.length < 0) setAD(null);
                else {
                    setAD(response.data);
                }
            }
        }
    }, [adModule, ad]);

    const slider = useMemo(() => {
        return {
            length : ad?.length,
            next : function() {
                if(activeIndex+1 === this.length) {
                    setActiveIndex(0)
                } else {
                    setActiveIndex(activeIndex+1)
                }
            },
            move : function(index) {
                setActiveIndex(index);
            }
        }
    }, [activeIndex, ad]);

    useEffect(() => {
        getAD();
    }, [getAD]);
    useEffect(() => {
        let timer = setTimeout(() => slider.next(), 4000);
        return () => {
            clearTimeout(timer)
        }
    }, [activeIndex, slider]);
    if(ad) {
        return (
            <article className="ad-panel">
                <div className="slide-container">
                    {
                        ad.map((element, index) => (
                            <span
                                key={index}
                                className={activeIndex === index ? "active" : ""}
                                onClick={() => window.open(element.url)}>
                                <img src={element.image} alt="AD"/>
                            </span>
                        ))
                    }
                </div>
                <div className="dot-frame">
                    {
                        ad.map((element, index) => (
                            <span
                                key={index}
                                onClick={() => slider.move(index)} 
                                className={activeIndex === index ? "active" : ""}/>
                        ))
                    }
                </div>
            </article>
        )
    } else return null;
    
}

export default MainAD;