import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './About.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from('.about-heading', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.about-text p', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, "-=0.4")
    .from('.stats-box', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, "-=0.4")
    .from('.about-photo', {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.8");
  }, { scope: container });

  return (
    <section id="about" className="section about" ref={container}>
      <div className="container">
        <h2 className="about-heading">
          <span className="text-accent-gradient">Detail-oriented</span> Full Stack Developer
        </h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              I am Shafaraz Khurshid, a passionate developer focusing on the MERN stack (MongoDB, Express, React, Node.js). I love integrating modern AI tools to optimize development workflows and deliver innovative solutions.
            </p>
            <p>
              With my background in software development at TCS and continuous learning, I ensure that the user experience is fluid, dynamic, and visually striking, leveraging tools like GSAP and Gemini Pro.
            </p>
            <a href="/Shafaraz_Khurshid_Resume.pdf" download="Shafaraz_Khurshid_Resume.pdf" className="btn interactive" style={{ marginTop: '2rem' }}>Download Resume</a>
          </div>
          
          <div className="about-visuals">
            {/* Placeholder for the traveling image */}
            <div id="about-placeholder"></div>
            <div className="about-stats glass">
              <div className="stats-box">
                <h3 className="text-accent-gradient">MERN</h3>
                <p>Stack Expert</p>
              </div>
              <div className="stats-box">
                <h3 className="text-accent-gradient">UI/UX</h3>
                <p>GSAP & Lenis</p>
              </div>
              <div className="stats-box">
                <h3 className="text-accent-gradient">B.Tech</h3>
                <p>Engineering Degree</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
