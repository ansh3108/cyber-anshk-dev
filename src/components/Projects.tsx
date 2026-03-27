import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    name: 'Parallax',
    description: 'A 2D simulation of a projectile game with some great physics!',
    tech: ['HTML5', 'Canvas', 'Javascript'],
    liveUrl: 'https://2d-game-orcin.vercel.app/',
    githubUrl: 'https://github.com/ansh3108/parallax',
  },
  {
    name: 'USB Hub',
    description: 'A USB powered module that can provide four 5V output ports from a single USB input',
    tech: ['Hardware', 'Circuits', 'Routing'],
    liveUrl: 'https://oshwlab.com/itz.anshkumar/usb-hub',
    // githubUrl: 'https://github.com/ansh3108/parallax',   TODO: remove gh button
  },
  
];

const Projects = () => {
  return (
    <section className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-mono mb-16 text-gradient-magenta">
          <span className="text-secondary glow-magenta-text">//</span> Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="perspective-card group relative bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-mono font-bold text-primary glow-cyan-text group-hover:text-gradient-cyan transition-all">
                    {project.name}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-primary hover:glow-cyan transition-all"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-primary hover:glow-cyan transition-all"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-muted border border-primary/20 text-primary hover:border-primary/50 hover:glow-cyan transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
