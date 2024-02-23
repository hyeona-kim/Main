import Banner from "@/component/Banner";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'

export default function test(){
    return(
        <>
        <Banner/>
        <section id="main" className="wrapper style1">
            <header className="major">
                <h2>위치별 지도</h2>
            </header>
            <div className="container">
                <div className="row">
                    <div className="6u">
                        <section className="special">
                            <a href="#" className="image fit">
                                <img src="images/pic01.jpg" alt="" width="680" height="308"/>  
                            </a>
                            <h1>2호선 오시는 길</h1><br/>
                            <p>도보 : 강남역 10번출구 400m 5분거리</p>
                        </section>
                    </div>
                    <div className="6u">
                        <section className="special">
                            <a href="#" className="image fit">
                                <img src="images/pic02.jpg" alt="" width="680" height="308"/>
                            </a>
                            <h3>9호선 오시는 길</h3><br/>
                            <p>도보 : 신논현역 8번출구 300m 3분거리</p>
                        </section>
                    </div>
                </div>
                <hr className="major"/>
                <section>
                    <div className="map-info__wrap">
                        <div className="about-message"> 
                            <h2 className="about-message__title font-size-2em">지도</h2>
                            <div className="about-message__content">
                                <span>서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ)<br/><br/></span>
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
                                    height: '448px',
                                    }}
                                >
                                    {/* 핀 찍힐 위치 */}
                                    <MapMarker
                                        style={{
                                            border: 'tranparent',
                                        }}
                                        position={{ lat: 37.501160763186576, lng: 127.02513738450986 }}
                                    >
                                        <div style={{
                                            height: '48px',
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '100%',
                                                fontSize: '13px',
                                                lineHeight: '16px',
                                            }}>
                                            서울특별시 서초구 <br/> 서초대로77길 41, 4층 (서초동, 대동Ⅱ)
                                            </span>
                                        </div>
                                    </MapMarker>
                                </Map>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
        </>
    );
}