import { useState, useEffect } from "react";
import SCappDownload from 'svg/ico-app-download.svg';
import * as P from "style/components/pwa/Pwa.style";

//https://kagrin97-blog.vercel.app/react/pwa-beforeInstallPrompt
export default function Pwa ({ type }) {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleBeforeInstallPrompt = (event) => {
        event.preventDefault();
        setDeferredPrompt(event);
    };

    const installApp = () => {
        if (!deferredPrompt) {
            alert('이미 앱을 설치했거나 지원하지 않는 브라우저입니다.');
            return;
        }

        if (deferredPrompt) {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("사용자가 설치 프롬프트에 동의했습니다.");
                } else {
                    console.log("사용자가 설치 프롬프트를 무시했습니다.");
                }

                setDeferredPrompt(null);
            });
        }
    };

    const renderButton = (type) => {
        if (type === 'button') {
            return <P.PWAButton type="button" onClick={installApp}>앱 설치하기</P.PWAButton>
        } 
        
        if (type === 'icon') {
            return (
                <P.PWAButton className='transparent' type="button" onClick={installApp}>
                    <SCappDownload width="22px" height="22px" fill="transparent"/>
                    <span className='hidden'>앱 설치하기</span>
                </P.PWAButton>
            );
        }
    }

    return (
        <>
           {renderButton(type)}
        </>
    )
}