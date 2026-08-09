import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

/* The articles live as static HTML under /public/blog so their content is in
   the crawler's first response — this section is the internal link into them. */
const POSTS = [
  {
    href: '/blog/iptv-kijken-nederland',
    kicker: 'Uitleg',
    title: 'IPTV kijken in Nederland: hoe werkt het?',
    excerpt:
      'Wat IPTV precies is, welke internetsnelheid je nodig hebt en waar je op let bij het kiezen van een aanbieder.',
    readTime: '4 min',
  },
  {
    href: '/blog/iptv-installeren',
    kicker: 'Handleiding',
    title: 'IPTV installeren op Firestick, smart-tv en Android',
    excerpt:
      'Stap voor stap per apparaat, met de juiste app en oplossingen voor haperingen en inlogfouten.',
    readTime: '5 min',
  },
  {
    href: '/blog/voetbal-kijken-iptv',
    kicker: 'Sport',
    title: 'Eredivisie en Champions League kijken via IPTV',
    excerpt:
      'Welke zenders je nodig hebt voor het voetbal, en hoe je zorgt dat er niets hapert tijdens de wedstrijd.',
    readTime: '4 min',
  },
];

export const Blog: React.FC = () => (
  <section id="blog" className="relative z-10 py-24 border-t border-ink/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-[#B8790E] uppercase tracking-widest bg-[#FF5C3A]/10 px-3.5 py-1 rounded-full border border-[#FF5C3A]/30">
          <BookOpen className="w-3.5 h-3.5" />
          Blog
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
          Alles over <span className="accent-gradient-text">IPTV</span>, uitgelegd
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400">
          Korte, praktische stukken over kijken, installeren en het voorkomen van haperingen.
        </p>

        {/* The hub page needs an internal link from the homepage, or crawlers
            only ever reach the articles and never the index that groups them. */}
        <a
          href="/blog"
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full clay-panel clay-edge relative text-xs font-bold text-ink hover:text-[#B8790E] transition-colors"
        >
          Alle artikelen
          <ArrowRight className="w-3.5 h-3.5 text-[#FF5C3A]" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {POSTS.map((post) => (
          <a
            key={post.href}
            href={post.href}
            className="group clay-card clay-edge clay-card-hover rounded-3xl p-6 sm:p-7 flex flex-col"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8790E]">
                {post.kicker}
              </span>
              <span className="text-[11px] text-zinc-500">{post.readTime} lezen</span>
            </div>

            <h3 className="text-lg font-bold text-ink leading-snug group-hover:text-[#B8790E] transition-colors">
              {post.title}
            </h3>

            <p className="mt-3 text-sm text-zinc-400 leading-relaxed flex-1">{post.excerpt}</p>

            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#FF5C3A]">
              Lees verder
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        ))}
      </div>

    </div>
  </section>
);
