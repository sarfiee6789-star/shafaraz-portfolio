import React, { useRef, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import './App.css'
import heroPhoto from './assets/hero_photo.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
  const container = useRef(null);
  
  const { scrollY } = useScroll();
  const [metrics, setMetrics] = useState({
    hero: { top: 0, left: 0, width: 300, height: 400 },
    about: { top: 1000, left: 0, width: 300, height: 400 },
    projects: { top: 2000, left: 0, width: 150, height: 150 },
  });
  const [dims, setDims] = useState({ vh: 1000, vw: 1000 });

  // Initialize Lenis for buttery smooth scrolling and to fix Framer Motion jitter
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById('hero-placeholder');
      const about = document.getElementById('about-placeholder');
      const projects = document.querySelector('.avatar-destination');

      if (hero && about && projects) {
        const getRect = (el) => {
          const rect = el.getBoundingClientRect();
          return {
            top: rect.top + window.scrollY,
            left: rect.left,
            width: rect.width,
            height: rect.height
          };
        };
        setMetrics({ hero: getRect(hero), about: getRect(about), projects: getRect(projects) });
        setDims({ vh: window.innerHeight, vw: window.innerWidth });
      }
    };
    
    // Measure after fonts/images load
    setTimeout(measure, 100);
    setTimeout(measure, 1000);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Calculate waypoints safely ensuring strictly monotonic increase
  const p0 = 0;
  const p1 = 50; 
  
  let p3 = metrics.about.top - dims.vh / 2 + metrics.about.height / 2;
  if (p3 <= p1) p3 = p1 + 200;
  
  const p2 = p1 + (p3 - p1) / 2; // Mid-flight to About
  
  let p4 = p3 + Math.max(200, metrics.about.height / 2); // Start leaving About
  
  let p6 = metrics.projects.top - dims.vh / 2 + metrics.projects.height / 2;
  if (p6 <= p4) p6 = p4 + 400; // Ensure enough scroll distance to animate smoothly
  
  const p5 = p4 + (p6 - p4) / 2; // Mid-flight to Projects
  
  const p7 = p6 + 1000; // padding

  const points = [p0, p1, p2, p3, p4, p5, p6, p7];

  const top = useTransform(scrollY, points, [
    metrics.hero.top, 
    metrics.hero.top, 
    metrics.hero.top + (metrics.about.top - metrics.hero.top) / 2, 
    metrics.about.top, 
    metrics.about.top, 
    metrics.about.top + (metrics.projects.top - metrics.about.top) / 2, 
    metrics.projects.top,
    metrics.projects.top
  ]);

  const left = useTransform(scrollY, points, [
    metrics.hero.left, 
    metrics.hero.left, 
    dims.vw / 2 - 75, // Center as circle (75 is half of 150px)
    metrics.about.left, 
    metrics.about.left, 
    dims.vw / 2 - 75, 
    metrics.projects.left,
    metrics.projects.left
  ]);

  const width = useTransform(scrollY, points, [
    metrics.hero.width, 
    metrics.hero.width, 
    150, 
    metrics.about.width, 
    metrics.about.width, 
    150, 
    metrics.projects.width,
    metrics.projects.width
  ]);

  const height = useTransform(scrollY, points, [
    metrics.hero.height, 
    metrics.hero.height, 
    150, 
    metrics.about.height, 
    metrics.about.height, 
    150, 
    metrics.projects.height,
    metrics.projects.height
  ]);

  const borderRadius = useTransform(scrollY, points, [
    "20px", 
    "20px", 
    "50%", 
    "20px", 
    "20px", 
    "50%", 
    "50%",
    "50%"
  ]);

  const border = useTransform(scrollY, points, [
    "2px solid rgba(255,255,255,0.1)", 
    "2px solid rgba(255,255,255,0.1)", 
    "3px solid #ff3366", 
    "1px solid rgba(255,255,255,0.1)", 
    "1px solid rgba(255,255,255,0.1)", 
    "3px solid #ff3366", 
    "3px solid #ff3366",
    "3px solid #ff3366"
  ]);

  return (
    <div className="app-container" ref={container}>
      <motion.img 
        src={heroPhoto} 
        alt="Shafaraz Khurshid Avatar" 
        className="cinematic-traveling-photo"
        style={{
          position: 'absolute',
          top,
          left,
          width,
          height,
          borderRadius,
          border,
          objectFit: 'cover',
          zIndex: 100,
          pointerEvents: 'none'
        }}
      />
      
      <main>
        <Hero />
        <About />
        <Projects />
      </main>
      
      <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
          Get in touch: <a href="mailto:sarfiee.6789@gmail.com" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}>sarfiee.6789@gmail.com</a>
        </p>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>© 2026 Portfolio. Built with React & Node.js.</p>
      </footer>
    </div>
  )
}

export default App
