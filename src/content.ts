import aboutPhoto from "./assets/about.jpg";
import clinicPhoto from "./assets/the-clinic.jpg";
import skinBoostersPhoto from "./assets/skin-boosters.jpg";
import microneedlingPhoto from "./assets/micro-needling.jpg";
import antiWrinklePhoto from "./assets/anti-wrinkle.jpg";
import dermalFillerPhoto from "./assets/dermal-filler.jpg";

import dermalBefore from "./assets/results/dermal-before.jpg";
import dermalAfter from "./assets/results/dermal-after.jpg";

import before1 from "./assets/results/before1.jpg";
import after1 from "./assets/results/after1.jpg";
import before2 from "./assets/results/before2.jpg";
import after2 from "./assets/results/after2.jpg";
import before3 from "./assets/results/before3.jpg";
import after3 from "./assets/results/after3.jpg";
import before4 from "./assets/results/before4.jpg";
import after4 from "./assets/results/after4.jpg";
import before5 from "./assets/results/before5.jpg";
import after5 from "./assets/results/after5.jpg";
import before6 from "./assets/results/before6.jpg";
import after6 from "./assets/results/after6.jpg";

/** Declared here because the page copy links to them, not just the footer. */
export const contact = {
  email: "hello@nurseaesthetics-steph.com",
  instagram: {
    handle: "@nurseaesthetics.withsteph",
    url: "https://instagram.com/nurseaesthetics.withsteph",
  },
};

/**
 * A treatment's copy. A plain string is a paragraph; a nested array of
 * strings is rendered as a bulleted list, so a paragraph can lead into one.
 */
export type TreatmentBody = (string | string[])[];

export type Treatment = {
  /** Used as the URL anchor, e.g. /treatments#anti-wrinkle */
  id: string;
  name: string;
  summary: string;
  body: TreatmentBody;
  /**
   * A freeform closing line beneath the copy — appointment length, how long
   * results last, a tagline. Whatever suits the treatment.
   */
  tagline?: string;
  /** What to expect afterwards, in plain sentence case beneath the tagline. */
  downtime?: string;
  /** Import the photo at the top of this file and assign it here. Omit for a
      labelled placeholder panel. */
  image?: string;
  imageAlt?: string;
  /** Small product shots shown beside the treatment. */
  products?: TreatmentProduct[];
};

/** A branded product used in a treatment, shown as a small image. */
export type TreatmentProduct = {
  /** Import the image at the top of this file and assign it here. */
  image: string;
  /** Doubles as the caption and the image's alt text. */
  name: string;
};

/** A fragment of a paragraph: plain text, or text that links somewhere. */
export type TextPart = string | { text: string; href: string };

/** Plain text, or a run of fragments where some of them are links. */
export type Paragraph = string | TextPart[];

/** A photo-and-text block on the landing page. */
export type Feature = {
  id: string;
  heading: string;
  /** A small label above the heading. */
  eyebrow?: string;
  body: Paragraph[];
  /** Omit until a photo exists: a labelled placeholder panel is shown instead. */
  image?: string;
  imageAlt: string;
  imageCaption?: string;
};

export type ClientResult = {
  id: string;
  treatment?: string;
  caption?: string;
  /** Leave the src fields empty to render the labelled placeholder panels. */
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
};

export type Review = {
  /** One entry per paragraph. */
  quote: string[];
  attribution?: string;
  treatment?: string;
  /** Out of five. Omit for a five-star review. */
  rating?: number;
};

export const site = {
  name: "Nurse Aesthetics with Steph",
  /** Mirrors the meta description in index.html; update both together. */
  description:
    "Nurse-led aesthetics clinic near Bury St Edmunds, Suffolk. Anti-wrinkle treatments, dermal filler, skin boosters, polynucleotides and microneedling.",
  /**
   * Cloudflare Web Analytics site token
   */
  analyticsToken: "c99e1a398384444e817138b53a8b5b0f",
  bookingUrl: "https://portal.aestheticnursesoftware.com/book-online/31454",
  bookingLabel: "Book now",
  domain: "nurseaesthetics-steph.com",
};

export const hero = {
  heading: "Nurse-led aesthetics clinic",
  /** One entry per paragraph. */
  body: [
    "Welcome to Nurse Aesthetics with Steph, located just outside of Bury St Edmunds, Suffolk",
    "We specialise in natural & balanced aesthetic enhancements and overall skin health. All of our treatments are provided with the highest level of care in a safe and clinical setting.",
  ],
};

export const aboutMe: Feature = {
  id: "about",
  heading: "About me",
  // eyebrow: "A nurse first",
  body: [
    "A little about me! I'm an NMC registered nurse with over 12 years of clinical experience with the NHS. My background is in paediatric nursing, where I've had a variety of roles, but specialised in oncology care.",
    "When deciding to embark upon my aesthetics career, I trained with leading training provider Harley Academy, and have since continued my professional development with additional courses to ensure I can provide safe treatments of the highest quality.",
    "Within my clinic, I am passionate about subtle enhancements which will provide natural results. I truly believe that it's not about making drastic changes, and instead that the right targeted treatment can allow you to feel rejuvenated, and at your most confident.",
  ],
  image: aboutPhoto,
  imageAlt: "Portrait of Steph",
};

export const clinicalApproach: Feature = {
  id: "approach",
  heading: "Clinical approach",
  // eyebrow: "Assessment before intervention",
  body: [
    "Every treatment begins with a consultation, including medical history, facial assessment, and an honest conversation about your personal concerns and goals. Together we will develop a bespoke treatment plan, focused on achieving your desired outcome while providing safe and effective treatments.",
    "You will always leave the clinic with clear aftercare advice and my direct contact details if anything concerns you.",
    [
      "If you're unsure which treatment is right for you, we can discuss this in your consultation, or feel free to reach out to me on ",
      { text: "Instagram", href: contact.instagram.url },
      " or via ",
      { text: "email", href: `mailto:${contact.email}` },
      ".",
    ],
  ],
  image: clinicPhoto,
  imageAlt: "Consultation with a client",
};

export const treatments: Treatment[] = [
  {
    id: "anti-wrinkle",
    name: "Anti-wrinkle treatments",
    summary:
      "Muscle relaxing injections used to soften wrinkles whilst allowing some natural movement and expression",
    body: [
      "A prescription-only medication (Botulinum toxin) used to relax your muscles and soften the dynamic lines caused by muscle movement. Dosing is always tailored to your anatomy, strength of muscle movement and your desired outcome. This treatment is most often used to reduce wrinkles across the forehead, between the brows and around the eyes - but other areas are available.",
      "Results can take up to two weeks to reach full potential, but most clients start to notice changes from three to five days. All anti-wrinkle clients will be invited back for a review two to three weeks following their treatment. Effects of anti-wrinkle treatments usually last three to four months.",
      "Botulinum toxin is a prescription only medication, so all clients will be required to book in for a prescription appointment prior to treatment.",
    ],
    image: antiWrinklePhoto,
    tagline: "30 minute appointment",
    downtime: "Minimal downtime",
  },
  {
    id: "dermal-filler",
    name: "Dermal filler",
    summary:
      "Restoring volume and definition where age or anatomy has taken it away",
    body: [
      "Premium hyaluronic acid gel is carefully placed to restore lost volume, support facial structure or help to refine contouring. All of our filler treatments are a careful balance between subtle enhancements and restoring lost volume, whilst maintaining your natural features.",
      "Every filler treatment follows a facial assessment and a conversation about your expectations as well as any potential risks associated with the treatment. Topical anaesthetic cream is used to help make the treatment as comfortable as possible and, as with all of our treatments, safe and sterile infection control standards are followed. Results usually last nine to twelve months (depending on anatomy and treatment area).",
    ],
    image: dermalFillerPhoto,
    tagline: "45–60 minute appointment",
    downtime:
      "Depending on the treatment area, some swelling or bruising can follow.",
  },
  {
    id: "skin-boosters",
    name: "Skin boosters",
    summary: "Injectable treatments that hydrate the skin from within",
    body: [
      "Skin boosters deliver hyaluronic acid directly into the dermis for deep hydration. They do not alter the shape of the face or add any additional volume, instead focusing on restoring lost moisture and helping to promote overall skin health.",
      "Our skin boosters can be used for:",
      [
        "Dehydrated, dry skin",
        "Dull skin lacking radiance",
        "Fine lines",
        "Crepey skin texture",
        "Skin laxity",
      ],
      "We offer a range of different skin boosters in clinic, including Profhilo and Seventy Hyal. The different types can be discussed with you and carefully selected to suit your concerns, target treatment area and skin type. Depending on which booster you have, you may be advised to have a course of treatments for best results.",
    ],
    tagline: "45 minute appointment",
    downtime: "Minimal downtime",
    image: skinBoostersPhoto,
    imageAlt: "Skin booster treatment being prepared in the clinic",
  },
  {
    id: "polynucleotides",
    name: "Polynucleotides",
    summary:
      "Advanced regenerative injectable treatments used to repair and rejuvenate the skin",
    body: [
      "Polynucleotides are an injectable treatment derived from purified salmon DNA fragments. The product is injected superficially beneath the skin surface and triggers tissue regeneration by sending specific signals to the skin at a cellular level. This response helps increase cell turnover, restore lost elasticity, improve the skin barrier and promote collagen production.",
      "This treatment can be used to treat:",
      [
        "Dark under eyes",
        "Skin texture and laxity",
        "Acne scarring",
        "Tired or ageing skin",
      ],
      "A course of usually three polynucleotide treatments is recommended in order to see the full effects. Results are usually noticed following the second session, however effects from this treatment continue to improve over several months and actually peak two to three months after finishing the course.",
    ],
    tagline: "45 minute appointment",
    downtime:
      "Some mild swelling or bumps can usually be seen at the treatment area, and should settle over the first 24 hours.",
  },
  {
    id: "microneedling",
    name: "Microneedling",
    summary:
      "An effective skin treatment to target imperfections and restore a youthful and healthy appearance",
    body: [
      "In our clinic, we use a medical grade CE marked device to create tiny micro-punctures in the skin surface. This prompts the body's natural healing response and boosts collagen formation. Microneedling is a brilliant treatment for overall skin health, but is specifically effective for uneven texture, scarring, enlarged pores or pigmentation.",
      "During treatment the skin is cleansed thoroughly, gently exfoliated and then sterilised to ensure any impurities or surface oils are removed. For an enhanced and targeted treatment, we combine microneedling with the use of medical grade skincare brand Cliniccare and their specific mesotherapy cocktails. There are a range of different vials, each focusing on different skin types and concerns. Each vial contains Epidermal Growth Factor (EGF) to activate skin cell regeneration and hydration, alongside a mix of rejuvenating, firming and antioxidant ingredients.",
      "For optimum results a course of three to six sessions is usually recommended, but this is dependent on skin type and concerns.",
    ],
    tagline: "60 minute appointment",
    downtime: "Some redness is to be expected on the day of treatment.",
    image: microneedlingPhoto,
    imageAlt: "Microneedling treatment being carried out in the clinic",
  },
];

export const clientResults: ClientResult[] = [
  {
    id: "ba-6",
    beforeSrc: before6,
    afterSrc: after6,
  },
  {
    id: "ba-1",
    beforeSrc: before1,
    afterSrc: after1,
  },
  {
    id: "ba-5",
    beforeSrc: dermalBefore,
    afterSrc: dermalAfter,
  },
  {
    id: "ba-2",
    beforeSrc: before2,
    afterSrc: after2,
  },
  {
    id: "ba-3",
    beforeSrc: before3,
    afterSrc: after3,
  },
  {
    id: "ba-4",
    beforeSrc: before4,
    afterSrc: after4,
  },
  {
    id: "ba-5",
    beforeSrc: before5,
    afterSrc: after5,
  },
];

export const clientResultsPage = {
  heading: "Client Results",
  eyebrow: "Before & after",
  intro: [
    "Drag the handle, or move your cursor across each image to compare before and after.",
    "All photos are shared with client consent, and where possible are taken in the same lighting and position. Other than cropping, none of the photos are retouched or edited in any way.",
    [
      "For more client transformations, follow us on social media! ",
      { text: contact.instagram.handle, href: contact.instagram.url },
    ],
  ] satisfies Paragraph[],
  consentNote:
    "Individual results vary. These images are examples of outcomes, not a guarantee of them.",
};

export const treatmentsPage = {
  heading: "Treatments",
  intro: [
    "Browse our available treatments below to discover and understand what we offer. All prices can be found on our booking page.",
    "Following a consultation, together we can create a treatment package tailored to your needs.",
  ],
};

const reviewQuotes: Review[] = [
  {
    quote: [
      "From start to finish Steph was knowledgeable, professional and put me at ease. I feel very happy with the results from the treatments, highly recommend!",
    ],
  },

  {
    quote: [
      "Super pleased with my appointment today — in fact, when she handed me the mirror, I felt quite emotional. Highly recommend.",
    ],
  },
  {
    quote: [
      "...I felt totally at ease throughout both appointments and couldn't be happier with the whole experience. Steph is clearly extremely experienced and a total professional, and I will definitely be going back to see her on a regular basis.",
      "I wouldn't hesitate to recommend Steph to anyone considering treatments with her.",
    ],
  },
  {
    quote: [
      "Such a lovely experience, Steph is so knowledgeable about her services and is great at what she does…loving the results!",
    ],
  },
];

export type Reviews = {
  eyebrow?: string;
  heading?: string;
  aggregate?: string;
  ratingLabel?: string;
  stars?: number;
  reviewsUrl?: string;
  /** Omit to hide the "read all reviews" call to action entirely. */
  reviewsLinkLabel?: string;
  quotes: Review[];
};

export const reviews: Reviews = {
  heading: "Reviews",
  /** TODO: Add reviews link in once google link is ready */
  // reviewsUrl: "https://example.com/reviews",
  reviewsLinkLabel: "Read all reviews",
  quotes: reviewQuotes,
};

export type FooterContent = {
  email: string;
  instagram: { handle: string; url: string };
  /** One entry per line. */
  address: string[];
  /**
   * Unused: the address is plain text for now. Kept for when the Google Maps
   * link is restored, at which point it overrides the URL built from
   * `address`.
   */
  mapsUrl?: string;
  /** Getting here and parking. One entry per paragraph; omit to hide. */
  gettingHere?: string[];
};

export const footer: FooterContent = {
  email: contact.email,
  instagram: contact.instagram,
  address: [
    "The Wellness Studio",
    "Sandy Lane",
    "Wilding Road",
    "Badwell Ash",
    "IP31 3FA",
  ],
  gettingHere: [
    "The clinic is located inside The Wellness Studio in Badwell Ash, just 20 minutes from Bury St Edmunds.",
    "It's a private location with on-site parking directly outside the studio entrance.",
  ],
};

export type NavLink = { label: string; to: string };
export type NavGroup = { label: string; to: string; children?: NavLink[] };

export const nav: NavGroup[] = [
  { label: "Home", to: "/" },
  {
    label: "Treatments",
    to: "/treatments",
    children: treatments.map((treatment) => ({
      label: treatment.name,
      to: `/treatments#${treatment.id}`,
    })),
  },
  { label: "Client Results", to: "/client-results" },
];
