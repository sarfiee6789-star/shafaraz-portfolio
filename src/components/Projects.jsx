import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    id: 1,
    title: 'Lingo One',
    category: 'English AI Learning App',
    year: 'Recent'
  },
  {
    id: 2,
    title: '3D Animation Content Platform',
    category: 'Creator & Developer',
    year: 'Recent'
  },
  {
    id: 3,
    title: 'Dynamic Web Applications',
    category: 'TCS (Software Developer)',
    year: '2014-2017'
  },
];

const Projects = () => {
  const container = useRef(null);

  useGSAP(() => {
    const projectItems = gsap.utils.toArray('.project-item');

    projectItems.forEach((item, i) => {
      // Scroll animation for each item
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      // Hover animation logic is handled via CSS mostly, but we could add JS here
      // For a truly premium feel, we scale the image on hover via CSS
    });
    
    gsap.from('.projects-title', {
      scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

  }, { scope: container });

  return (
    <section id="projects" className="section projects" ref={container}>
      <div className="container">
        <h2 className="projects-title" style={{ textAlign: 'center' }}>Featured <span className="text-accent-gradient">Work</span></h2>
        
        {/* Docking Station for the floating avatar */}
        <div className="avatar-destination" style={{ margin: '0 auto 4rem', width: '150px', height: '150px' }}></div>
        
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-item interactive">
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
              <div className="project-year">
                {project.year}
              </div>
            </div>
          ))}
        </div>
        
        <div className="center-btn" style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="#" className="btn interactive">View All Projects</a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
