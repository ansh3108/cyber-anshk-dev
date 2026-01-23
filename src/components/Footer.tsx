const Footer = () => {
  return (
    <div className="py-12 px-4 mt-16">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="font-mono text-base text-muted-foreground">
          <span className="text-primary glow-cyan-text">&gt;</span> Made with{' '}
          <span className="text-secondary glow-magenta-text">♥</span> + TypeScript
        </p>
        <p className="font-mono text-base text-muted-foreground">
          Open source at{' '}
          <a
            href="http://github.com/ansh3108/cyber-anshk-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors glow-cyan-text"
          >
            ansh3108/cyber-anshk-dev
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
