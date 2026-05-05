export interface PracticeMethod {
  _key?: string;
  num: string;
  name: string;
  short: string;
  body: string;
}

export interface PracticePageData {
  headerLabel: string;
  headerTitle: string;
  headerSubtitle: string;
  openingStatement: string;
  openingTags: string[];
  approachLabel: string;
  approachQuote: string;
  approachCite: string;
  methods: PracticeMethod[];
  ctaLabel: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
}

export const defaultPracticePageData: PracticePageData = {
  headerLabel: "Methodology",
  headerTitle: "The Practice",
  headerSubtitle:
    "Philosophy not as a set of answers, but as a way of inhabiting questions with greater clarity and freedom.",
  openingStatement:
    'There is no agenda but truth that is the property of no one. "Philosophy goes second." — Marc Sautet (1947-1998)',
  openingTags: ["Socratic method", "Semantic analysis", "Independent thinking"],
  approachLabel: "Approach",
  approachQuote:
    "Philosophy is cohabitation — actively generating and inhabiting questions with greater clarity, purpose, and freedom.",
  approachCite: "— The Practice",
  methods: [
    {
      num: "I",
      name: "Questionless Inquiry",
      short: "Philosophy also listens.",
      body: "Tell Michael your story. He will respect you by not promising solutions. You can talk with him about the answerless, the unquestioned, and the unquestionable. Michael will not question your questions or dismiss your answers. But expect to be respectfully challenged in thought.",
    },
    {
      num: "II",
      name: "Approximately-Socratic Inquiry",
      short: "Socrates is dead and he's not coming back.",
      body: `Arguably he proffers no definite replicable method. Michael does not pretend to offer an imitation. Socrates could listen and think ahead. Michael will hear you out, and think alongside. Irony is not a method. Michael says: "I don't pretend to know the answers to your problems, or that the answers I know pertain to your problems. I promise open ears for the time it takes for you to say what you need. And I will engage you. But I don't know what I will say. Yet, I won't say what I can't know, except to mention it. Still, if I never say what I don't know, I would forever remain silent. Come, let's talk. Risk your time."`,
    },
    {
      num: "III",
      name: "Thoughtless Belief",
      short: "Our deepest convictions are often laziest.",
      body: "Resting on unexamined metaphors— what Michael calls 'zombie metaphors'. By examining the specific usages of words that describe our intentions, beliefs and actions, the invisible architecture beneath thought is laid bare. This foundation may be built upon or rebuilt through thoughtful belief. Every belief lives in language, and many die there. The examined life is in large measure an examination of what we say or would say about what we do or would do; and what is related to that. But life rarely offers opportunities for examination. Michael can help with that.",
    },
  ],
  ctaLabel: "Ready?",
  ctaTitle: "Begin the Inquiry",
  ctaBody:
    "You don't need a background in philosophy. You just need a life, and issues. This is not philosophy for philosophers. It is philosophy by philosophers in free conversation with human beings (philosophers or not) in the service of life.",
  ctaPrimaryText: "Book a Session",
  ctaPrimaryLink: "/book-session",
  ctaSecondaryText: "View All Services",
  ctaSecondaryLink: "/services",
};
