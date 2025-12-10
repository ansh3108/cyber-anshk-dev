const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-primary glow-cyan-text">&gt;</span> Made with{' '}
          <span className="text-secondary glow-magenta-text">♥</span> + JavaScript
        </p>
        <p className="font-mono text-sm text-muted-foreground">
          Open source at{' '}
          <a
            href="http://github.com/ansh3108/cyber-anshk-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors glow-cyan-text"
          >
            ansh3108/anshk-dev
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
