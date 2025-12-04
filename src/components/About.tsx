import { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold font-mono mb-16 text-gradient-cyan">
          <span className="text-primary glow-cyan-text">//</span> About
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl group-hover:bg-primary/30 transition-all duration-300"></div>
            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-primary/50 glow-cyan">
              <img 
                src="https://avatars.githubusercontent.com/u/115077985?v=4" 
                alt="Ansh Kumar" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />

              <div className="absolute bottom-4 left-4 px-4 py-1.5 
                    bg-white/10 backdrop-blur-md 
                    border border-white/20 
                    rounded-full text-sm font-mono 
                    text-white tracking-wide
                    shadow-lg shadow-cyan-500/20
                    flex items-center gap-1">
                    <span>📍</span>
                    <span>Microsoft Noida</span>
              </div>

            </div>
          </div>

          <div className="space-y-6">
            <div className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">&gt;</span> whoami
            </div>
            
            <p className="text-lg leading-relaxed text-foreground/90 font-sans">
              <span className="text-primary glow-cyan-text font-mono">//</span> powered by caffeine!
            </p>
            
            <p className="text-base leading-relaxed text-muted-foreground font-sans">
              I'm a dev who loves building, and right now I'm obsessed with Web3. I'm heads-down learning and building on Solana with Rust. Always curious and tinkering!
            </p>

            <div className="pt-4 space-y-2 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="text-secondary glow-magenta-text">❯</span>
                <span className="text-muted-foreground">const</span>
                <span className="text-foreground">location</span>
                <span className="text-muted-foreground">=</span>
                <span className="text-primary">"Delhi, India"</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary glow-magenta-text">❯</span>
                <span className="text-muted-foreground">const</span>
                <span className="text-foreground">interests</span>
                <span className="text-muted-foreground">=</span>
                <span className="text-primary">["Web3", "AI", "OSS"]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary glow-magenta-text">❯</span>
                <span className="text-muted-foreground">const</span>
                <span className="text-foreground">status</span>
                <span className="text-muted-foreground">=</span>
                <span className="text-primary">"Learning & Building"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
