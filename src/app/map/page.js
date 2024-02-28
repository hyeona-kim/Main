"use client"
import Banner from "@/component/banner";
import { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";


export default function test(){

    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`
        document.head.appendChild(kakaoMapScript)

        const onLoadKakaoAPI = () => {
            window.kakao.maps.load(() => {
            var container = document.getElementById('map')
            var options = {
                center: new window.kakao.maps.LatLng(37.501160763186576, 127.02513738450986),
                level: 3,
            }

            var map = new window.kakao.maps.Map(container, options)
            // 마커가 표시될 위치입니다 
            var markerPosition  = new kakao.maps.LatLng(37.501160763186576, 127.02513738450986); 
    
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: markerPosition
            });
    
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            var iwContent = '<div style="width: 290px; height: 62px; padding: 5px;"><span style="display: inline-block; width: 100%; font-size: 16px;">서울특별시 서초구 <br/> 서초대로77길 41, 4층 (서초동, 대동Ⅱ)</span><a href="https://kko.to/peUbsxk2hV" style="color:#898989; text-decoration: none;" target="_blank">길찾기</a></div>',
                iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다
    
            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                position : iwPosition, 
                content : iwContent,
            });
            
            // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            infowindow.open(map, marker);
            })
        }



        kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
    }, []);

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
                        <div className="map-wrap" id="map">
                            
                        </div>
                    </div>
                </section>
            </div>
        </section>
        </>
    );
}