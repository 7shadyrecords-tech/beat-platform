import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CGV — Conditions Générales de Vente | ZewOne Beats",
  description: "Conditions générales de vente de ZewOne Beats — licences de beats numériques.",
};

const ORANGE = "#e05c20";

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-xs tracking-widest text-white/40 transition-colors hover:text-white/70"
        >
          ← RETOUR
        </Link>

        <header className="mb-12">
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: ORANGE }}>
            Légal
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Conditions Générales de Vente
          </h1>
          <p className="mt-2 text-sm text-white/40">
            Dernière mise à jour : mai 2025
          </p>
        </header>

        <div className="space-y-10 text-sm leading-relaxed text-white/70">

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white">
              1. Vendeur
            </h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les ventes réalisées sur le site{" "}
              <span className="text-white">zewonebeats.com</span>, exploité par :
            </p>
            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p><span className="text-white">Nom commercial :</span> ZewOne Beats</p>
              <p className="mt-1">
                <span className="text-white">Contact :</span>{" "}
                <a
                  href="mailto:Zewone.music@gmail.com"
                  className="underline underline-offset-2 transition-colors hover:text-white"
                  style={{ color: ORANGE }}
                >
                  Zewone.music@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white">
              2. Nature des produits
            </h2>
            <p>
              ZewOne Beats commercialise des <span className="text-white">licences de beats numériques</span>{" "}
              (instrumentales) sous différentes formules (MP3 Lease, WAV Lease, Premium Lease, Exclusive).
              Chaque licence confère à l'acheteur un droit d'utilisation de l'instrumental selon les
              conditions propres à la formule choisie.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white">
              3. Prix
            </h2>
            <p>
              Les prix sont affichés sur le site en <span className="text-white">euros toutes taxes comprises (TTC)</span>.
              ZewOne Beats se réserve le droit de modifier ses tarifs à tout moment ; les prix applicables
              sont ceux affichés au moment de la validation de la commande.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white">
              4. Paiement
            </h2>
            <p>
              Le paiement est sécurisé et traité par{" "}
              <span className="text-white">Stripe</span>. Les données bancaires de l'acheteur ne
              transitent pas par nos serveurs et sont chiffrées selon les standards PCI-DSS.
              Les moyens de paiement acceptés sont ceux proposés par Stripe (carte bancaire, etc.).
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white">
              5. Livraison
            </h2>
            <p>
              Après confirmation du paiement, les fichiers achetés sont mis à disposition de l'acheteur
              par <span className="text-white">téléchargement immédiat</span>. Un e-mail contenant les
              liens de téléchargement est envoyé à l'adresse fournie lors de la commande dans les
              minutes suivant le paiement. Ces liens sont valables <span className="text-white">24 heures</span>{" "}
              et limités à <span className="text-white">3 téléchargements</span>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white">
              6. Droit de rétractation et politique de remboursement
            </h2>
            <div
              className="mb-4 rounded-xl border p-4 text-white"
              style={{ borderColor: `${ORANGE}60`, background: `${ORANGE}10` }}
            >
              <p className="font-semibold" style={{ color: ORANGE }}>
                Aucun remboursement sur contenu numérique téléchargé
              </p>
              <p className="mt-2 text-sm text-white/80">
                Conformément à l'article{" "}
                <span className="font-medium text-white">L221-28 du Code de la consommation</span>,
                le droit de rétractation ne s'applique pas aux contenus numériques dont l'exécution
                a commencé avec l'accord préalable et exprès du consommateur, qui a renoncé à son
                droit de rétractation.
              </p>
            </div>
            <p>
              En cochant la case de confirmation lors du processus d'achat, l'acheteur reconnaît
              expressément renoncer à son droit de rétractation et accepte qu'aucun remboursement
              ne pourra être accordé une fois le contenu téléchargé.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white">
              7. Propriété intellectuelle
            </h2>
            <p>
              <span className="text-white">ZewOne conserve l'intégralité des droits d'auteur</span>{" "}
              sur tous les beats proposés à la vente. L'achat d'une licence confère à l'acheteur un
              droit d'utilisation non exclusif (sauf licence Exclusive) selon les termes de la
              formule choisie. Toute reproduction, revente ou cession des fichiers sans autorisation
              préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white">
              8. Litiges et droit applicable
            </h2>
            <p>
              Les présentes CGV sont soumises au{" "}
              <span className="text-white">droit français</span>. En cas de litige, une solution
              amiable sera recherchée en priorité. À défaut d'accord amiable, le litige sera porté
              devant les tribunaux compétents du ressort du vendeur.
            </p>
            <p className="mt-3">
              Conformément au règlement (UE) n° 524/2013, l'acheteur peut également recourir à la
              plateforme de règlement en ligne des litiges de la Commission européenne (RLL).
            </p>
          </section>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold tracking-widest text-black transition-transform hover:scale-[1.02]"
            style={{ background: ORANGE }}
          >
            RETOUR AU CATALOGUE
          </Link>
        </div>
      </div>
    </div>
  );
}
