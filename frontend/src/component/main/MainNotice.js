import { useCallback, useEffect, useMemo, useState } from 'react';
import NoticeModule from '../../contents/js/main/Notice';
import { transformDate } from '../../contents/js/DateFormat';

// CSS
import '../../contents/css/main/MainNotice.css';

const MainNotice = ({server}) => {
    // State
    const [important, setImportant] = useState(undefined);
    const [notices, setNotices] = useState(undefined);

    // Memo
    const noticeModule = useMemo(() => {
        return new NoticeModule(server);
    }, [server])

    // Callback
    const getList = useCallback(async (count) => {
        const response = await noticeModule.getList(count);
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
            <article className="notice-list">
                <h2>새소식</h2>
                <ul>
                    {
                        important?.map((element, index) => (
                            <li key={index} className="important">
                                <p></p>
                                <h3>{element.title}</h3>
                            </li>
                        ))
                    }
                    {
                        notices?.map((element, index) => (
                            <li>
                                <p>{index+1}</p>
                                <h3>{element.title}</h3>
                                <h4>{transformDate(element.reg_date)}</h4>
                            </li>
                        ))
                    }
                </ul>
            </article>
        )
    }
    
}

export default MainNotice;