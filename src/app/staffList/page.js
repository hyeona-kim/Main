import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function kakao() {
    
    return (
        <>
        <div className="map-info__wrap">
            <div className="about-message"> 
                <h1 className="about-message__title">오시는 길</h1>
                <div className="about-message__content">
                    <article>
                    서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ)<br/>
                    * 2호선 : 강남역 10번출구 400m 5분거리<br/>
                    * 9호선 : 신논현역 8번출구 300m 3분거리<br/>
                    * 신분당선 : 신논현역 7번출구 200m 2분거리
                    </article>

                    <div className="about-message__buttons">
                        <a href="https://kko.to/msPfVXcF63"><span>카카오맵으로 보기</span></a>
                    </div>
                </div>
            </div>
            <div className="map-wrap">
                <div id="map" className="about-location__map">
                    {/* 지도에 보여줄 위치 지정 (위도,경도) */}
                    <Map
                        center={{ lat: 37.501160763186576, lng: 127.02513738450986 }}
                        style={{
                        width: '798px',
                        height: '598px',
                        }}
                    >
                    {/* 핀 찍힐 위치 */}
                        <MapMarker
                        style={{ border: 'tranparent' }}
                        position={{ lat: 37.501160763186576, lng: 127.02513738450986 }}
                        >
                            <div style={{
                                height: '48px',
                            }}>
                                <span style={{
                                    display: 'inline-block',
                                    width: '100%',
                                    fontSize: '13px',
                                    lineHeight: '16px'
                                }}>
                                서울특별시 서초구 <br/> 서초대로77길 41, 4층 (서초동, 대동Ⅱ)
                                </span>
                            </div>
                        </MapMarker>
                    </Map>
                </div>
            </div>
        </div>
        </>
    );
}