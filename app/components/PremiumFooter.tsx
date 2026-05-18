import { FaInstagram, FaSpotify } from "react-icons/fa";
import { SectionReveal } from "./ui/SectionReveal";

export function PremiumFooter() {
  return (
    <SectionReveal>
      <footer className="relative border-t border-white/5 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="sm:col-span-2 md:col-span-1">
              <p className="font-display text-lg sm:text-2xl font-bold tracking-widest">
                BEAT<span className="neon-text">PLATFORM</span>
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/zewoneprod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neon/15 bg-neon/5 text-neon transition-all hover:border-neon hover:shadow-[0_0_20px_rgba(255,77,0,0.5)]"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://open.spotify.com/user/11141663550?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcAR2_otleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA01NjcwNjczNDMzNTI0MjcAAae6L2Sof-59G1KPtG6T11fcJ9aq2Go9q2eb3K9ky6F_PPMdoYBXrTf6TUwTLg_aem_P4dcKocTcrqKPlaEYq_7KQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neon/15 bg-neon/5 text-neon transition-all hover:border-neon hover:shadow-[0_0_20px_rgba(255,77,0,0.5)]"
                  aria-label="Spotify"
                >
                  <FaSpotify className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-4 max-w-sm text-xs sm:text-sm text-muted">
                The premium marketplace for trap, drill & cinematic instrumentals.
                Built for artists who demand excellence.
              </p>
            </div>
            <div>
              <p className="label-mono text-xs sm:text-sm text-neon">Platform</p>
              <ul className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm text-muted">
                <li><a href="#featured" className="hover:text-foreground transition-colors">Featured</a></li>
                <li><a href="#catalog" className="hover:text-foreground transition-colors">Catalog</a></li>
                <li><a href="#analytics" className="hover:text-foreground transition-colors">Analytics</a></li>
              </ul>
            </div>
            <div>
              <p className="label-mono text-xs sm:text-sm text-neon">Legal</p>
              <ul className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm text-muted">
                <li><a href="#" className="hover:text-foreground transition-colors">Licensing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <p className="label-mono text-xs sm:text-sm text-neon">Contact</p>
              <p className="mt-3 sm:mt-4 max-w-xs text-xs sm:text-sm leading-relaxed text-muted">
                For business inquiries, custom beats & licensing:
              </p>
              <a
                href="mailto:Zewone.music@gmail.com"
                className="mt-2 sm:mt-3 inline-block text-xs sm:text-sm font-medium text-muted transition-colors hover:text-foreground break-all"
              >
                Zewone.music@gmail.com
              </a>
            </div>
          </div>
          <div className="mt-10 sm:mt-12 md:mt-16 flex flex-col items-center justify-between gap-3 sm:gap-4 border-t border-white/5 pt-6 sm:pt-8 sm:flex-row">
            <p className="label-mono text-xs sm:text-sm text-muted">
              © {new Date().getFullYear()} Beat Platform
            </p>
            <p className="text-xs sm:text-sm text-neon/60">Crafted with precision.</p>
          </div>
        </div>
      </footer>
    </SectionReveal>
  );
}
