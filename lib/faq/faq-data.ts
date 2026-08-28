export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FaqGroup {
  heading: string;
  entries: FaqEntry[];
}

export const faqGroups: FaqGroup[] = [
  {
    heading: "What SoundPrint is",
    entries: [
      {
        question: "What is SoundPrint?",
        answer:
          "A shareable musical profile in one link. Instruments, qualifications, bands, and highlights, captured as a snapshot anyone can open without an account.",
      },
      {
        question: "Who is it for?",
        answer:
          "Musicians who want something quick to send to bandmates, venues, students, or teachers, or just for fun. Share your profile far and wide.",
      },
    ],
  },
  {
    heading: "Using SoundPrint",
    entries: [
      {
        question: "How do I create a profile?",
        answer:
          "Go to Create, fill in what applies, and generate a shareable link. That link is your profile.",
      },
      {
        question: "What do I actually need to fill in?",
        answer:
          "Only your name is required. If your worried about sharing that please make up a 'stage name'. Instruments, qualifications, bands, highlights, and looking-for-band status are all optional, leave out anything that doesn't apply.",
      },
      {
        question: "How do I share it?",
        answer:
          "Copy the generated link and send it anywhere. No sign-in is needed to view it.",
      },
      {
        question: "Can I update a profile after sharing it?",
        answer:
          "Not the link you already sent as this is tied to the data. Open Create, use \"Import from existing link\" to load your previous data, make changes, and generate a new link.",
      },
      {
        question: "How does comparing profiles work?",
        answer:
          "Go to Compare and paste two shareable links. Both profiles load side by side, with a summary at the top showing shared and distinct instruments and genres.",
      },
      {
        question: "What's the point of comparing profiles?",
        answer:
          "It's a talking point, not a contest. There's no score or winner, just two profiles next to each other so you and a bandmate or friend can spot what you have in common and what you don't.",
      },
    ],
  },
  {
    heading: "Badges & achievements",
    entries: [
      {
        question: "What are badges?",
        answer:
          "Bronze, silver, and gold badges earned from what's in your profile: instrument count, skill level, qualifications logged, and repertoire breadth. There are also one-off badges for having a band, linking a recording, and filling in every section.",
      },
      {
        question: "How do I earn a badge?",
        answer:
          "Just fill in your profile. Badges are computed straight from your instruments, qualifications, bands, and repertoire, there's nothing extra to do.",
      },
      {
        question: "Why do I only see one badge per category?",
        answer:
          "Each category shows your highest tier only, gold already implies you've cleared bronze and silver for that category.",
      },
      {
        question: "Where can I see every badge and what it takes to earn it?",
        answer: "The Achievements page lists the full catalogue, earned or not, with what each tier requires.",
      },
      {
        question: "Are badges saved to my profile?",
        answer:
          "No. Like the rest of your data, badges aren't stored anywhere, they're recalculated from your profile every time the link is opened. Update your profile and generate a new link to see new badges reflected.",
      },
    ],
  },
  {
    heading: "Common pitfalls",
    entries: [
      {
        question: "I lost my link. Can I recover my profile?",
        answer:
          "No. There's no account or database behind SoundPrint, the link is the only copy of your data. Keep it somewhere safe. Your data is not stored. Its created and decoded via the URL.",
      },
      {
        question: "I edited my profile but the old link still shows the old data.",
        answer:
          "That's expected. Each link is a fixed snapshot, editing always produces a new link rather than updating the old one in place.",
      },
      {
        question: "Is my profile private?",
        answer:
          "No. Anyone with the link can view it. Don't share it anywhere you wouldn't want it public.",
      },
      {
        question: "Why can I only add a few qualifications, bands, or highlights?",
        answer:
          "Each list is capped by design, five entries. SoundPrint is meant to be a quick highlight reel, not a full CV.",
      },
    ],
  },
  {
    heading: "Technical",
    entries: [
      {
        question: "What is this written in?",
        answer: "Its in Next, TypeScript and Tailwind. Feel free to check out the package.json here https://github.com/JordanAlec/soundprint/blob/main/package.json"
      },
      {
        question: "How do I log a technical issue?",
        answer: "You can do that here https://github.com/JordanAlec/soundprint/issues"
      },
      {
        question: "Can I contribute or see the code?",
        answer: "You can view the code here https://github.com/JordanAlec/soundprint. You can fork and create a PR but there are no guarantees on accepting merges."
      }
    ]
  }
];
