'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  Play,
  Send,
  Sparkles,
  X,
} from 'lucide-react';

const projects = [
  {
    number: '01',
    category: 'Data product · Next.js · Real-time',
    title: 'Real-time stock analytics dashboard',
    description: 'A live market intelligence product with real-time price updates over WebSockets, server-side API proxying with custom TTL caching, and automated background alerts — so traders always have accurate, up-to-date data without hammering external APIs.',
    tags: ['Next.js', 'TypeScript', 'WebSockets', 'Zustand', 'MongoDB'],
    image: '/images/stock-app.png',
    live: 'https://my-stock-app-76ar.vercel.app/',
    repo: 'https://github.com/Shruti01207/my-stock-app',
    accent: 'amber',
    icon: BarChart3,
  },
  {
    number: '02',
    category: 'Learning project · Responsive web',
    title: 'Responsive blog website',
    description: 'A mobile-first editorial site built to master fluid layouts, responsive typography, and the fine details that make a reading experience feel comfortable and natural on every screen size.',
    tags: ['HTML', 'CSS', 'Mobile-first design'],
    image: '/images/responsive-blog.png',
    live: 'https://shruti01207.github.io/responsive-site/',
    repo: 'https://github.com/Shruti01207/responsive-site',
    accent: 'blue',
    icon: Code2,
  }
  // {
  //   number: '03',
  //   category: 'Customer feedback · Full-stack',
  //   title: 'Survey application',
  //   description: 'A complete feedback workflow — from creating survey sessions and serving questions to storing and retrieving customer responses — built with a responsive Angular interface backed by a structured .NET Web API and SQL Server.',
  //   tags: ['Angular 15', '.NET Web API', 'SQL Server'],
  //   image: '/images/survey-app.png',
  //   repo: 'https://github.com/Shruti01207/survey-angular-application',
  //   demo: 'https://drive.google.com/file/d/1CAmZYRLlrquTRR9H2h33y4qjyUN6paHz/view',
  //   accent: 'coral',
  //   icon: BriefcaseBusiness,
  // },
];

const skills = [
  ['Core', 'TypeScript · JavaScript · React.js · Next.js · Angular · Zustand · TanStack Query'],
  ['UI & Styling', 'Tailwind CSS · Angular Material · PrimeNG · Recharts · shadcn/ui · Bootstrap 5'],
  ['Backend & Data', 'REST APIs · SQL Server · ASP.NET Core MVC · MongoDB · Firebase · WebSockets · Inngest'],
  ['Integrations', 'LLM Integration · MCP Servers · BLE · Nodemailer · Git · GitHub'],
];

const experience = [
  { period: 'Dec 2024 — May 2026', company: 'Scrum Labs', role: 'Software Developer', detail: 'Shipped a revenue forecasting report with a 5-level drill-down, an LLM-powered product matcher that cut a full day of manual work to under 5 minutes, and an inventory forecasting module that earned strong client feedback at its very first demo.' },
  { period: 'Dec 2023 — Nov 2024', company: 'Qloron Private Limited', role: 'Angular Developer', detail: 'Built and debugged responsive, client-facing web applications using Angular 14, TypeScript, and Angular Material. Returned full-time post-graduation on a direct referral — a signal of the trust earned during the initial internship.' },
  { period: 'Apr 2023 — Aug 2023', company: 'Minvik Technologies', role: 'Tech Intern', detail: 'Built IoT dashboards for real-time urban infrastructure monitoring, improved app performance via lazy loading and standalone component migration, and extended a backend quiz application with server-side search using ASP.NET Core and SQL Server.' },
];

const services = ['Real-time dashboards & analytics', 'Full-stack web applications', 'API & database integration', 'AI & LLM-powered features', 'Inventory & procurement systems', 'Performance optimization'];

type FormState = { name: string; email: string; projectType: string; budget: string; message: string };
const initialForm: FormState = { name: '', email: '', projectType: '', budget: '', message: '' };

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'sending' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus({ type: 'sending', message: 'Sending your enquiry…' });
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, projectType: form.projectType }) });
      const result: { message?: string } = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to send');
      setForm(initialForm);
      setFormStatus({ type: 'success', message: result.message || 'Thanks — your enquiry is on its way.' });
    } catch {
      setFormStatus({ type: 'error', message: 'We could not send that just now. Please try again.' });
    }
  }

  return (
    <main>
      <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
        <a className="wordmark" href="#top" aria-label="Shruti Gupta home"><span>SG</span><b>Shruti Gupta</b></a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-right">
          <a className="header-social" href="https://github.com/Shruti01207" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
          <a className="header-social" href="https://www.linkedin.com/in/guptashruti012/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a className="header-cta" href="#contact">Let&apos;s talk <ArrowUpRight size={15} /></a>
        </div>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Available for thoughtful freelance projects</p>
          <h1>Software that turns <em>real problems</em> into results.</h1>
          <p className="hero-intro">I&apos;m Shruti — a full-stack developer specializing in Next.js, Angular, and TypeScript. I ship things that matter: AI-powered tools, real-time dashboards, and data-driven workflows that businesses actually rely on.</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDownRight size={17} /></a><a className="text-link" href="#contact">Have a project in mind? <ArrowUpRight size={16} /></a></div>
          <div className="hero-proof">
            <div><strong>2+</strong><span>years building<br />for the web</span></div>
            <div><strong>3</strong><span>verified projects<br />to explore</span></div>
            <div><strong>10k+</strong><span>SKU catalog<br />matched with AI</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-grid" />
          <div className="portrait-outer">
            <div className="portrait-ring">
              <div className="portrait-frame">
                <img src="/images/my-professional-pic.jpg" alt="Shruti Gupta" />
              </div>
            </div>
            <div className="portrait-chip chip-top"><span className="chip-dot" />Available for work</div>
            <div className="portrait-chip chip-bottom">Agra · India · Remote</div>
          </div>
          <div className="orbit-label"><Sparkles size={14} /> Ideas into impact</div>
          <div className="vertical-note">DIGITAL PRODUCTS · DATA · DESIGN</div>
        </div>
      </section>

      <section className="statement-band"><div className="section-shell statement-inner"><p>Good software is quiet confidence.</p><span>It gives people clarity, momentum, and a better way to work.</span><ArrowDownRight size={22} /></div></section>

      <section className="section-shell work-section" id="work">
        <div className="section-heading"><div><p className="eyebrow">01 / Work that ships</p><h2>Projects built for<br /><em>real impact.</em></h2></div><p className="section-note">A curated selection of work where engineering decisions were driven by real user needs and business outcomes.</p></div>
        <div className="project-list">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <article className={`project-card ${project.accent}`} key={project.number}>
                <div className="project-image-wrap">
                  <div className="browser-bar"><span /><span /><span /></div>
                  <div className="project-image-inner">
                    <img src={project.image} alt={project.title} className="project-screenshot" />
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-meta">
                    <span className="project-number">{project.number}</span>
                    <span className="project-category">{project.category}</span>
                    <Icon className="project-icon" size={22} strokeWidth={1.5} />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-footer">
                    <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="project-links">
                      {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live project <ExternalLink size={14} /></a>}
                      <a href={project.repo} target="_blank" rel="noreferrer">GitHub <Github size={14} /></a>
                      {/* {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Watch demo <Play size={13} fill="currentColor" /></a>} */}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell about-section" id="about">
        <div className="about-intro">
          <p className="eyebrow">02 / The human behind the work</p>
          <h2>Curious by nature.<br /><em>Precise by practice.</em></h2>
          <p>I work at the intersection of engineering and real-world business impact. Whether it&apos;s an LLM-powered matching engine, an inventory forecasting module, or a real-time IoT dashboard — I care about the outcome for the person using the product, not just the elegance of the code behind it.</p>
          <div className="about-facts">
            <div className="about-fact"><strong>2+</strong><span>Years experience</span></div>
            <div className="about-fact"><strong>B.Tech</strong><span>DEI Agra, 2024</span></div>
            <div className="about-fact"><strong>Remote</strong><span>Open to global work</span></div>
          </div>
          <div className="about-links">
            <a className="text-link" href="https://github.com/Shruti01207" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
            <a className="text-link" href="https://www.linkedin.com/in/guptashruti012/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="about-details">
          <div className="skill-block">
            <h3>What I bring</h3>
            {skills.map(([name, detail]) => (
              <div className="skill-row" key={name}>
                <span>{name}</span>
                <div className="skill-chips">{detail.split(' · ').map(chip => <span key={chip} className="skill-chip">{chip}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="experience-block">
            <h3>Experience</h3>
            {experience.map((item) => (
              <div className="experience-row" key={item.company}>
                <div className="exp-left">
                  <span className="exp-period">{item.period}</span>
                  <strong className="exp-company">{item.company}</strong>
                </div>
                <div className="exp-right">
                  <b className="exp-role">{item.role}</b>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-band"><div className="section-shell"><div className="section-heading services-heading"><div><p className="eyebrow">03 / How I can help</p><h2>From first sketch<br />to <em>finished product.</em></h2></div><p className="section-note">Whether you need a new build or a sharper version of what you have, I bring structure to the process and care to the outcome.</p></div><div className="service-grid">{services.map((service, index) => <div className="service-item" key={service}><span>0{index + 1}</span><h3>{service}</h3><MoveUpRight size={18} /></div>)}</div></div></section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-copy"><p className="eyebrow">04 / Let&apos;s talk</p><h2>Have something<br /><em>worth building?</em></h2><p>Tell me a little about it. I&apos;ll get back to you with a thoughtful next step.</p><div className="contact-links"><a href="mailto:guptashruti232@gmail.com"><Mail size={17} /> guptashruti232@gmail.com</a><a href="https://www.linkedin.com/in/guptashruti012/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a href="https://github.com/Shruti01207" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a></div></div>
        <form className="contact-form" onSubmit={submitForm}><div className="form-row"><label>Name<input required value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Your name" /></label><label>Email<input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@company.com" /></label></div><div className="form-row"><label>What can I help with?<div className="select-wrap"><select required value={form.projectType} onChange={(event) => updateField('projectType', event.target.value)}><option value="">Choose a service</option><option>New web application</option><option>Dashboard or analytics product</option><option>API and database work</option><option>Something else</option></select><ChevronDown size={17} /></div></label><label>Budget range <input value={form.budget} onChange={(event) => updateField('budget', event.target.value)} placeholder="Optional" /></label></div><label>Tell me about the project<textarea required minLength={20} value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="A few lines about what you are building, what is not working, or where you want to go next…" /></label><div className="form-footer"><button className="button button-dark" type="submit" disabled={formStatus.type === 'sending'}>{formStatus.type === 'sending' ? 'Sending…' : 'Send enquiry'} <Send size={16} /></button>{formStatus.type === 'success' && <span className="form-message success"><Check size={15} /> {formStatus.message}</span>}{formStatus.type === 'error' && <span className="form-message error">{formStatus.message}</span>}</div></form>
      </section>

      <footer className="site-footer section-shell"><a className="wordmark" href="#top"><span>SG</span><b>Shruti Gupta</b></a><p>Built with care in India · © 2026</p><a className="back-top" href="#top">Back to top <ArrowUpRight size={15} /></a></footer>
    </main>
  );
}
