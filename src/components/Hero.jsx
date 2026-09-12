import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './Hero.css';

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Staggered text reveal
    const tl = gsap.timeline();
    
    tl.from('.hero-title span', {
      y: 150,
      opacity: 0,
      rotateZ: 5,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.5
    })
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.8")
    .from('.hero-btn', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.6")
    .from('.hero-photo', {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.8");

    // Continuous floating animation for geometric shapes
    gsap.to('.shape-1', {
      y: -30,
      x: 20,
      rotation: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.shape-2', {
      y: 40,
      x: -30,
      rotation: -25,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: container });

  return (
    <section className="hero section" ref={container}>
      {/* Decorative background elements */}
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      
      <div className="container hero-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="hero-text-container">
          <h1 className="hero-title">
            <div className="line-wrapper">
              <span>Shafaraz</span>
            </div>
            <div className="line-wrapper">
              <span className="text-accent-gradient">Khurshid</span>
            </div>
          </h1>
          
          <p className="hero-subtitle">
            Full Stack MERN Developer (React.js & Node.js). Passionate about building highly responsive, scalable web applications with smooth UI/UX animations.
          </p>
          
          <div className="hero-btn-container">
            <a href="#projects" className="btn hero-btn interactive">Explore Work</a>
          </div>
        </div>
        
        <div className="hero-image-container" style={{ flex: '0 0 40%' }}>
          {/* Placeholder for the traveling image */}
          <div id="hero-placeholder" style={{ width: '100%', height: '600px' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
