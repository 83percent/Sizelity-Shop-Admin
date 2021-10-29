import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import NoticeModule from '../../contents/js/main/Notice';
import { transformDate } from '../../contents/js/DateFormat';

// CSS
import '../../contents/css/main/MainNotice.css';

const MainNotice = ({server}) => {
    // State
    const [important, setImportant] = useState(undefined);
    const [notices, setNotices] = useState(undefined);
    const [viewData, setViewData] = useState(null);

    // Memo
    const noticeModule = useMemo(() => {
        return new NoticeModule(server);
    }, [server])

    // Ref
    const noticeViewer = useRef(null);

    // Callback
    const getList = useCallback(async (count) => {
        const response = await noticeModule.getList(count);
        console.log(response);
        switch(response.type) {
            case 'success' : {
                if(count === 0 && response.data?.important?.length > 0 ) {
                    setImportant(response.data.important);
                }
                if(response.data?.normal?.length > 0) {
                    if(notices?.length > 0) {
                        setNotices([...notices, ...response.data.normal]);
                    } else {
                        setNotices(response.data.normal || []);
                    }
                } else {
                    setNotices([]);
                }
                break;
            }
            default : {
                return window.alert(response?.msg || "문제가 발생했습니다.");
            }
        }
    }, []);

    function noticeOnClick(data) {
        setViewData(data);
    }

    useEffect(() => {
        if(notices === undefined) getList(0);
    }, [notices, getList])

    if(notices === undefined) {
        return (
            <article className="notice-list">
                <h2>새소식</h2>
                <div className="loader-frame">
                    <div className="loader"></div>
                </div>
            </article>
        )
    } else {
        return (
            <>
                <article className="notice-list">
                    <h2>새소식</h2>
                    <ul>
                        {
                            important?.map((element, index) => (
                                <li key={index} className="important" onClick={() => noticeOnClick(element)}>
                                    <p></p>
                                    <h3>{element.title}</h3>
                                </li>
                            ))
                        }
                        {
                            notices?.map((element, index) => (
                                <li onClick={() => noticeOnClick(element)}>
                                    <p>{index+1}</p>
                                    <h3>{element.title}</h3>
                                    <h4>{transformDate(element.reg_date)}</h4>
                                </li>
                            ))
                        }
                    </ul>
                </article>
                {
                    viewData ? (
                        <article className="notice-viewer" ref={noticeViewer}>
                            <div className="notice-viewer-frame">
                                <i className="material-icons" onClick={() => noticeOnClick(null)}>close</i>
                                <div className="logo">
                                    <i className="material-icons">sell</i>
                                </div>
                                <div className="title">
                                    <h1>{viewData?.title}</h1>
                                </div>
                                <main>
                                    {
                                        viewData.text.split("\n").map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))
                                    }
                                </main>
                                <div className="reg-frame">
                                    <p>{transformDate(viewData?.reg_date)}</p>

                                </div>
                            </div>
                        </article>
                    ) : null
                }
             </>
        )
    }
    
}

export default MainNotice;