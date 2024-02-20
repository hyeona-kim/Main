

export default function Map() {
    
    return (
        <>
        <div className="test">
            <div className="wrap-narrow">
                <div className="about-message">
                    <h2 lang="en" className="about-message__title">오시는 길</h2>
                    <div className="about-message__content">
                        <p>
                        서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ)<br/>
                        * 2호선 : 강남역 10번출구 400m 5분거리<br/>
                        * 9호선 : 신논현역 8번출구 300m 3분거리<br/>
                        * 신분당선 : 신논현역 7번출구 200m 2분거리
                        </p>
                        
                        <div className="about-message__buttons">
                            <a id="about-location-outmap" className="ke-btn__basic ke-btn--case-stroke ke-btn--type-02 ke-btn--size-medium" href="http://kko.to/jwkLDDGew" data-chref="https://map.kakao.com/?urlX=524045&urlY=1084108&name=%EC%B9%B4%EC%B9%B4%EC%98%A4%EC%97%94%ED%84%B0%ED%94%84%EB%9D%BC%EC%9D%B4%EC%A6%88&level=4" target="_blank" rel="noopener"><span>카카오맵으로 보기</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrap">
                <div id="map" className="about-location__map"></div>
            </div>
        </div>
        </>
    );
}