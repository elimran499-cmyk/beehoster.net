/* Single source of truth for the WhatsApp line every CTA on the site points at. */

/** Digits only — wa.me rejects spaces, plus signs and dashes. */
export const WHATSAPP_NUMBER = '447832486269';

/** Human-readable form, used wherever the number is shown rather than linked. */
export const WHATSAPP_DISPLAY = '+44 7832 486269';

/** Builds a wa.me deep link, optionally with the chat pre-filled. */
export const whatsAppLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

/* Social profiles. Handles and URLs live together so the footer can show the
   username while linking the profile, and so the two can't drift apart. These
   are also the `sameAs` entries in the Organization schema in index.html —
   update both if a handle ever changes. */
export const SOCIALS = [
  { name: 'Instagram', handle: '@beehoster', url: 'https://www.instagram.com/beehoster' },
  { name: 'Facebook', handle: 'beehoster.net', url: 'https://www.facebook.com/beehoster.net' },
] as const;
