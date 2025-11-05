const { useState, useEffect } = React;

function IconSun(props){
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function IconMoon(props){
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function Header({ theme, toggleTheme }){
  return (
    <header className="bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-md">MW</div>
          <div className="font-semibold text-lg">My Website</div>
        </div>
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex gap-6 text-slate-600 dark:text-slate-300">
            <a className="hover:text-primary" href="#learn">Features</a>
            <a className="hover:text-primary" href="#contact">Contact</a>
          </nav>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700">
            {theme === 'dark' ? <IconSun/> : <IconMoon/>}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero(){
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">Beautiful UI, built with React & Tailwind</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">A small, elegant starter for your site — responsive, accessible, and easy to customize.</p>
          <div className="mt-6 flex gap-4">
            <a href="#learn" className="inline-flex items-center gap-2 bg-primary hover:bg-cyan-500 text-white px-5 py-3 rounded-lg shadow-md">Get Started</a>
            <a href="#contact" className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-lg">Contact</a>
          </div>
          <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">No build required — this demo uses CDN builds of React and Tailwind (great for prototyping).</div>
        </div>

        <div className="flex-1">
          <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl ring-1 ring-slate-100 dark:ring-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Preview</div>
                <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Welcome component</div>
              </div>
              <div className="text-xs text-slate-400">Live</div>
            </div>

            <div className="mt-6 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900 dark:to-cyan-900 rounded-xl p-6">
              <div className="text-slate-900 dark:text-white font-bold text-lg">Hi there 👋</div>
              <div className="mt-2 text-slate-600 dark:text-slate-300">This is a beautiful, responsive hero card you can customize with Tailwind utility classes.</div>
              <div className="mt-4 flex gap-3">
                <button className="px-3 py-2 bg-white dark:bg-slate-700 rounded-lg text-sm font-medium">Action</button>
                <button className="px-3 py-2 bg-transparent border border-white/20 rounded-lg text-sm">Secondary</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features(){
  const items = [
    {title: 'Responsive', body: 'Looks great on mobile, tablet and desktop.'},
    {title: 'Accessible', body: 'Semantic markup and good contrast.'},
    {title: 'Customizable', body: 'Tailwind utilities make styling fast.'},
  ];

  return (
    <section id="learn" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What you'll find here</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">A few of the highlights of this starter.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.title} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md ring-1 ring-slate-100 dark:ring-slate-700">
            <div className="text-lg font-semibold text-slate-900 dark:text-white">{it.title}</div>
            <div className="mt-2 text-slate-600 dark:text-slate-300">{it.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact(){
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-900 p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Get in touch</h3>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Want help building this out? Drop a line.</p>
        <div className="mt-4">
          <a href="mailto:hello@example.com" className="inline-block px-4 py-2 bg-primary text-white rounded-lg">hello@example.com</a>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-600 dark:text-slate-400">© {year} My Website — Built with care.</div>
    </footer>
  );
}

function App(){
  const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    if(theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('site-theme', theme);
  }, [theme]);

  function toggleTheme(){
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
