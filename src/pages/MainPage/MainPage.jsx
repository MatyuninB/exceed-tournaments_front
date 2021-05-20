import React, { useEffect, useRef, useState} from "react";
import AOS from "aos";
import { useSelector } from "react-redux";
import { Parallax } from "react-scroll-parallax";
import YouTube from "react-youtube";
import Section2 from "./components/Section2/Section2";
import Section3 from "./components/Section3/Section3";
import Section1 from "./components/Section1/Section1";
import Button from "../../components/Button/Button";
import Section4 from "./components/Section4/Section4";
import star from '../../assets/pack-svgs/star.svg';
import code from '../../assets/pack-svgs/code.svg';
import plane from '../../assets/pack-svgs/plane.svg';
import "./MainPage.scss";
import "aos/dist/aos.css"; 

const MainPage = () => {
  const [buttonProps, setButtonProps] = useState({})
  const data = useSelector((state) => state.events.event);
  const id = useSelector((state) => state.events.publicId);
  const main = useRef();
  const firstContainer = useRef();
  const opts = {
    height: "600",
    width: "100%",
  };

  
  useEffect(() => {
    const firstHeigth = firstContainer.current.offsetHeight;  
    AOS.init({
      offset: 150,
      delay: 0,
      duration: 1000,
    });

    const handleScroll = () => {
      let scroll = window.scrollY;
      let maxScroll = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );

      if(
        scroll > firstHeigth
        && scroll < maxScroll-1500
        ) {
        setButtonProps({position: 'fixed', left:'46.5%', bottom: `20px` }); 
      } else {
        setButtonProps();
      }
      
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainPage" ref={main}>
      <Parallax y={[100, 200]} x={[-1000, 70]} tagOuter="figure" styleOuter={{position:'absolute',top: '90%', left: "20%"}}>
        <img style={{height:"80px", transform: "rotate(-25deg)"}}src={plane} alt='' />
      </Parallax>
      <Parallax y={[-50, 100]} x={[-10, 50]} tagOuter="figure" styleOuter={{position:'absolute', left: "5%"}}>
        <img src={star} alt='' />
      </Parallax>
      <Parallax y={[100, 200]} x={[-400, -500]} tagOuter="figure" styleOuter={{position:'absolute',top: '410%', right: "10%"}}>
        <img style={{height:"80px"}}src={code} alt='' />
      </Parallax>
      <div className="section one" ref={firstContainer} data-aos="zoom-in-down">
        <Section1 />
      </div>
      <div className="section two">
        <Section2 content={data} />
      </div>
      <div data-aos="flip-down" className="section">
        {data.video && <YouTube videoId={data.video} opts={opts} />}
      </div>
      <div className="section three">
        <Section3 content={data} />
      </div>

      <div className="section four">
        <Section4 content={data} />
      </div>
      <div className="go">
        <Button to={`/${id}/table`}  style={buttonProps} text="view table" />
      </div>
    </div>
  );
};

export default MainPage;
