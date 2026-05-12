// Comprehensive AI-to-Human text transformation engine

interface TransformRule {
  pattern: RegExp;
  replacement: string;
  description: string;
}

const AI_PHRASES: TransformRule[] = [
  // Overly formal openings
  { pattern: /\bIn today's rapidly evolving (?:digital )?landscape\b/gi, replacement: "These days,", description: "Simplify formal openings" },
  { pattern: /\bIn the realm of\b/gi, replacement: "When it comes to", description: "Casualize formal phrases" },
  { pattern: /\bIn the context of\b/gi, replacement: "When we're talking about", description: "Simplify context phrases" },
  { pattern: /\bIt is worth noting that\b/gi, replacement: "Worth mentioning:", description: "Shorten noting phrases" },
  { pattern: /\bIt is important to note that\b/gi, replacement: "Here's the thing —", description: "Casualize important notes" },
  { pattern: /\bFurthermore\b/gi, replacement: "Also,", description: "Replace formal transitions" },
  { pattern: /\bMoreover\b/gi, replacement: "And on top of that,", description: "Replace moreover" },
  { pattern: /\bAdditionally\b/gi, replacement: "Plus,", description: "Simplify additionally" },
  { pattern: /\bConsequently\b/gi, replacement: "So,", description: "Casualize consequently" },
  { pattern: /\bNevertheless\b/gi, replacement: "Still,", description: "Simplify nevertheless" },
  { pattern: /\bNonetheless\b/gi, replacement: "Even so,", description: "Simplify nonetheless" },
  { pattern: /\bIn conclusion\b/gi, replacement: "So yeah,", description: "Casual conclusion" },
  { pattern: /\bTo summarize\b/gi, replacement: "Long story short,", description: "Casual summary" },
  { pattern: /\bIn summary\b/gi, replacement: "Bottom line,", description: "Casual summary" },
  { pattern: /\bIt is essential to\b/gi, replacement: "You really need to", description: "Simplify essential" },
  { pattern: /\bIt is crucial to\b/gi, replacement: "You've got to", description: "Simplify crucial" },
  { pattern: /\bIn order to\b/gi, replacement: "To", description: "Simplify in order to" },
  { pattern: /\bDue to the fact that\b/gi, replacement: "Because", description: "Simplify due to the fact" },
  { pattern: /\bIn the event that\b/gi, replacement: "If", description: "Simplify event phrases" },
  { pattern: /\bWith regard to\b/gi, replacement: "About", description: "Simplify regarding" },
  { pattern: /\bIn terms of\b/gi, replacement: "When it comes to", description: "Simplify in terms of" },
  { pattern: /\bAs a matter of fact\b/gi, replacement: "Actually,", description: "Casualize matter of fact" },
  { pattern: /\bFor the purpose of\b/gi, replacement: "To", description: "Simplify purpose phrases" },
  { pattern: /\bAt the end of the day\b/gi, replacement: "Honestly,", description: "Replace cliché endings" },
  { pattern: /\bIn today's world\b/gi, replacement: "Nowadays,", description: "Simplify time references" },
  { pattern: /\bIt goes without saying that\b/gi, replacement: "Obviously,", description: "Shorten cliché phrases" },

  // Passive voice patterns
  { pattern: /\bIt can be seen that\b/gi, replacement: "You can see that", description: "Active voice conversion" },
  { pattern: /\bIt should be noted that\b/gi, replacement: "Keep in mind that", description: "Active voice conversion" },
  { pattern: /\bIt has been observed that\b/gi, replacement: "People have noticed that", description: "Active voice conversion" },
  { pattern: /\bIt is generally agreed that\b/gi, replacement: "Most people agree that", description: "Active voice conversion" },
  { pattern: /\bIt is widely believed that\b/gi, replacement: "Most folks think that", description: "Active voice conversion" },

  // Wordy phrases
  { pattern: /\bat this point in time\b/gi, replacement: "right now", description: "Simplify time phrases" },
  { pattern: /\bin the near future\b/gi, replacement: "soon", description: "Simplify future phrases" },
  { pattern: /\ba number of\b/gi, replacement: "several", description: "Simplify quantity phrases" },
  { pattern: /\bin the process of\b/gi, replacement: "while", description: "Simplify process phrases" },
  { pattern: /\bon a daily basis\b/gi, replacement: "every day", description: "Simplify frequency" },
  { pattern: /\bin a timely manner\b/gi, replacement: "on time", description: "Simplify manner phrases" },
  { pattern: /\bhas the ability to\b/gi, replacement: "can", description: "Simplify ability phrases" },
  { pattern: /\bin close proximity to\b/gi, replacement: "near", description: "Simplify proximity" },
  { pattern: /\bmake a decision\b/gi, replacement: "decide", description: "Simplify decision phrases" },
  { pattern: /\bgive consideration to\b/gi, replacement: "think about", description: "Simplify consideration" },
  { pattern: /\btake into consideration\b/gi, replacement: "consider", description: "Simplify consideration" },
  { pattern: /\bin the vicinity of\b/gi, replacement: "around", description: "Simplify vicinity" },
  { pattern: /\bfor the reason that\b/gi, replacement: "because", description: "Simplify reason phrases" },
  { pattern: /\bprior to\b/gi, replacement: "before", description: "Simplify prior to" },
  { pattern: /\bsubsequent to\b/gi, replacement: "after", description: "Simplify subsequent to" },
  { pattern: /\bwith respect to\b/gi, replacement: "about", description: "Simplify respect phrases" },
  { pattern: /\bin light of the fact that\b/gi, replacement: "since", description: "Simplify light phrases" },
  { pattern: /\bon the grounds that\b/gi, replacement: "because", description: "Simplify grounds phrases" },

  // AI-typical sentence starters
  { pattern: /\bDelving deeper into\b/gi, replacement: "Looking closer at", description: "Replace AI-typical starters" },
  { pattern: /\bUnlocking the potential of\b/gi, replacement: "Tapping into", description: "Replace cliché phrases" },
  { pattern: /\bHarnessing the power of\b/gi, replacement: "Using", description: "Replace overused phrases" },
  { pattern: /\bIn the ever-changing landscape of\b/gi, replacement: "In today's", description: "Simplify landscape phrases" },
  { pattern: /\bNavigating the complexities of\b/gi, replacement: "Dealing with", description: "Simplify complexity phrases" },
  { pattern: /\bEmbracing the paradigm shift\b/gi, replacement: "Adapting to change", description: "Replace jargon" },
  { pattern: /\bLeveraging cutting-edge technology\b/gi, replacement: "Using new tech", description: "Simplify tech jargon" },
  { pattern: /\bFostering innovation\b/gi, replacement: "Encouraging new ideas", description: "Simplify innovation phrases" },
  { pattern: /\bDriving transformation\b/gi, replacement: "Pushing change", description: "Simplify transformation" },

  // Overly structured phrases
  { pattern: /\bplays a pivotal role\b/gi, replacement: "matters a lot", description: "Simplify pivotal role" },
  { pattern: /\bplays a crucial role\b/gi, replacement: "is really important", description: "Simplify crucial role" },
  { pattern: /\bof paramount importance\b/gi, replacement: "super important", description: "Simplify paramount" },
  { pattern: /\bmultifaceted approach\b/gi, replacement: "well-rounded plan", description: "Simplify multifaceted" },
  { pattern: /\bcomprehensive overview\b/gi, replacement: "full rundown", description: "Simplify comprehensive" },
  { pattern: /\brobust framework\b/gi, replacement: "solid plan", description: "Simplify framework jargon" },
  { pattern: /\bseamless integration\b/gi, replacement: "smooth fit", description: "Simplify integration" },
  { pattern: /\bholistic approach\b/gi, replacement: "big-picture view", description: "Simplify holistic" },
  { pattern: /\bsynergistic effects\b/gi, replacement: "combined impact", description: "Simplify synergistic" },
  { pattern: /\bparadigm shift\b/gi, replacement: "big change", description: "Simplify paradigm" },

  // Fillers and hedging
  { pattern: /\bIt's worth mentioning that\b/gi, replacement: "Also,", description: "Remove filler phrases" },
  { pattern: /\bOne might argue that\b/gi, replacement: "Some say", description: "Simplify hedging" },
  { pattern: /\bIt can be argued that\b/gi, replacement: "You could say", description: "Simplify hedging" },
  { pattern: /\bFrom my perspective\b/gi, replacement: "I think", description: "Personalize perspective" },
  { pattern: /\bIn my opinion\b/gi, replacement: "I reckon", description: "Casualize opinions" },
  { pattern: /\bI would like to point out that\b/gi, replacement: "Hey,", description: "Casualize pointing out" },

  // Redundant intensifiers
  { pattern: /\bvery unique\b/gi, replacement: "unique", description: "Remove redundant intensifiers" },
  { pattern: /\bvery essential\b/gi, replacement: "essential", description: "Remove redundant intensifiers" },
  { pattern: /\babsolutely essential\b/gi, replacement: "a must", description: "Simplify intensifiers" },
  { pattern: /\bextremely important\b/gi, replacement: "key", description: "Simplify important" },
  { pattern: /\bhighly effective\b/gi, replacement: "works great", description: "Simplify effective" },

  // Noun-heavy to verb-heavy conversions
  { pattern: /\bprovide an explanation for\b/gi, replacement: "explain", description: "Verb-ify noun phrases" },
  { pattern: /\bmake an improvement\b/gi, replacement: "improve", description: "Verb-ify noun phrases" },
  { pattern: /\bgive a description of\b/gi, replacement: "describe", description: "Verb-ify noun phrases" },
  { pattern: /\bconduct an analysis of\b/gi, replacement: "analyze", description: "Verb-ify noun phrases" },
  { pattern: /\bmake a comparison\b/gi, replacement: "compare", description: "Verb-ify noun phrases" },
  { pattern: /\breach a conclusion\b/gi, replacement: "conclude", description: "Verb-ify noun phrases" },

  // Overly polite/formal structures
  { pattern: /\bI would like to\b/gi, replacement: "I want to", description: "Casualize polite phrases" },
  { pattern: /\bI am writing to\b/gi, replacement: "I'm", description: "Simplify writing intros" },
  { pattern: /\bPlease be advised that\b/gi, replacement: "Just so you know,", description: "Casualize advisory" },
  { pattern: /\bKindly note that\b/gi, replacement: "Heads up:", description: "Casualize kindly note" },

  // List-style AI patterns
  { pattern: /\bfirst and foremost\b/gi, replacement: "first off,", description: "Casualize list starters" },
  { pattern: /\blast but not least\b/gi, replacement: "and finally,", description: "Simplify list endings" },
  { pattern: /\bnot to mention\b/gi, replacement: "plus", description: "Simplify mentions" },
];

// Sentence-level transformations
function varySentenceLength(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  return sentences.map((sentence, index) => {
    // Occasionally add conversational fillers at the start
    if (index > 0 && index % 4 === 0 && Math.random() > 0.5) {
      const fillers = ["Look,", "Honestly,", "Here's the deal:", "Real talk:", "So,"];
      const filler = fillers[Math.floor(Math.random() * fillers.length)];
      return filler + " " + sentence.charAt(0).toLowerCase() + sentence.slice(1);
    }
    
    // Occasionally break long sentences
    if (sentence.split(/\s+/).length > 20 && Math.random() > 0.6) {
      const words = sentence.split(/\s+/);
      const midpoint = Math.floor(words.length * 0.6);
      return words.slice(0, midpoint).join(" ") + ". " + 
        words[midpoint].charAt(0).toLowerCase() + words[midpoint].slice(1) + " " +
        words.slice(midpoint + 1).join(" ");
    }
    
    return sentence;
  }).join(" ");
}

// Add natural imperfections
function addNaturalImperfections(text: string): string {
  // Occasionally add parenthetical asides
  if (Math.random() > 0.6) {
    const asides = [
      "(and I mean that)",
      "(trust me on this)",
      "(no joke)",
      "(seriously)",
      "(you'll see what I mean)",
      "(it's true)",
    ];
    const sentences = text.split(/(?<=[.!?])\s+/);
    if (sentences.length > 2) {
      const insertAt = Math.floor(Math.random() * (sentences.length - 1)) + 1;
      sentences[insertAt] = sentences[insertAt] + " " + asides[Math.floor(Math.random() * asides.length)];
    }
    return sentences.join(" ");
  }
  return text;
}

// Contractions and casual forms
function addContractions(text: string): string {
  const contractions: [RegExp, string][] = [
    [/\bdo not\b/gi, "don't"],
    [/\bdoes not\b/gi, "doesn't"],
    [/\bdid not\b/gi, "didn't"],
    [/\bwill not\b/gi, "won't"],
    [/\bwould not\b/gi, "wouldn't"],
    [/\bcould not\b/gi, "couldn't"],
    [/\bshould not\b/gi, "shouldn't"],
    [/\bcannot\b/gi, "can't"],
    [/\bI am\b/gi, "I'm"],
    [/\byou are\b/gi, "you're"],
    [/\bwe are\b/gi, "we're"],
    [/\bthey are\b/gi, "they're"],
    [/\bit is\b/gi, "it's"],
    [/\bthat is\b/gi, "that's"],
    [/\bthere is\b/gi, "there's"],
    [/\bI have\b/gi, "I've"],
    [/\bwe have\b/gi, "we've"],
    [/\bthey have\b/gi, "they've"],
    [/\bI would\b/gi, "I'd"],
    [/\bwe will\b/gi, "we'll"],
    [/\bthey will\b/gi, "they'll"],
    [/\blet us\b/gi, "let's"],
    [/\bwhat is\b/gi, "what's"],
    [/\bwho is\b/gi, "who's"],
    [/\bhere is\b/gi, "here's"],
  ];

  let result = text;
  for (const [pattern, replacement] of contractions) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

// Add transition variety
function varyTransitions(text: string): string {
  // Replace some sentence-starting transitions with more varied ones
  const transitions: [RegExp, string[]][] = [
    [/^However,/gm, ["But,", "Still,", "That said,"]],
    [/^Therefore,/gm, ["So,", "Because of that,", "That's why"]],
    [/^Moreover,/gm, ["Plus,", "And,", "Also,"]],
    [/^In addition,/gm, ["Also,", "And,", "On top of that,"]],
    [/^As a result,/gm, ["So,", "Because of this,", "That means"]],
    [/^Meanwhile,/gm, ["At the same time,", "While that's happening,"]],
    [/^Ultimately,/gm, ["At the end of the day,", "When all is said and done,"]],
    [/^Significantly,/gm, ["What's interesting is,", "The cool part is,"]],
  ];

  let result = text;
  for (const [pattern, replacements] of transitions) {
    if (pattern.test(result)) {
      const replacement = replacements[Math.floor(Math.random() * replacements.length)];
      result = result.replace(pattern, replacement);
    }
  }
  return result;
}

// Main humanizer function
export function humanizeText(input: string, intensity: number = 7): string {
  if (!input.trim()) return "";

  let text = input;

  // Step 1: Apply phrase replacements (more at higher intensity)
  const rulesToApply = AI_PHRASES.slice(0, Math.min(AI_PHRASES.length, 15 + intensity * 3));
  
  for (const rule of rulesToApply) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // Step 2: Add contractions
  text = addContractions(text);

  // Step 3: Vary transitions
  text = varyTransitions(text);

  // Step 4: Vary sentence length
  if (intensity > 4) {
    text = varySentenceLength(text);
  }

  // Step 5: Add natural imperfections
  if (intensity > 5) {
    text = addNaturalImperfections(text);
  }

  // Step 6: Clean up any double spaces or punctuation issues
  text = text.replace(/\s{2,}/g, " ").trim();
  text = text.replace(/\s+([.!?,;:])/g, "$1");

  // Capitalize first letter of sentences
  text = text.replace(/(^|[.!?]\s+)([a-z])/g, (_match, prefix, letter) => prefix + letter.toUpperCase());

  return text;
}

// Analyze text for AI characteristics
export function analyzeAIScore(text: string): {
  score: number;
  flags: string[];
  suggestions: string[];
} {
  const flags: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  // Check for formal transitions
  const formalTransitions = [
    "furthermore", "moreover", "additionally", "consequently", "nevertheless",
    "nonetheless", "in conclusion", "to summarize", "in summary"
  ];
  for (const t of formalTransitions) {
    if (text.toLowerCase().includes(t)) {
      flags.push(`Found formal transition: "${t}"`);
      score += 8;
    }
  }

  // Check for wordy phrases
  const wordyPhrases = [
    "in order to", "due to the fact that", "in the event that",
    "at this point in time", "in the near future", "plays a crucial role",
    "it is important to", "it is essential to", "it should be noted"
  ];
  for (const p of wordyPhrases) {
    if (text.toLowerCase().includes(p)) {
      flags.push(`Found wordy phrase: "${p}"`);
      score += 10;
      suggestions.push(`Replace "${p}" with something more direct`);
    }
  }

  // Check for lack of contractions
  const hasContractions = /\b(don't|won't|can't|I'm|you're|it's|they're|we're)\b/i.test(text);
  if (!hasContractions && text.length > 50) {
    flags.push("No contractions found — text sounds formal");
    score += 12;
    suggestions.push("Add contractions (don't, can't, it's) for a natural feel");
  }

  // Check sentence length uniformity
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length > 3) {
    const avgLength = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentences.length;
    if (avgLength > 18 && avgLength < 25) {
      flags.push("Sentences are uniformly long — varies length for natural feel");
      score += 7;
      suggestions.push("Vary sentence lengths — mix short and long sentences");
    }
  }

  // Check for AI clichés
  const aiClichés = [
    "delve", "delve deeper", "tapestry", "landscape", "leverage",
    "harness", "foster", "cutting-edge", "state-of-the-art", "robust",
    "seamless", "holistic", "paradigm", "synergy", "empower"
  ];
  for (const c of aiClichés) {
    if (text.toLowerCase().includes(c)) {
      flags.push(`Found AI cliché: "${c}"`);
      score += 10;
      suggestions.push(`Replace "${c}" with a simpler, more direct word`);
    }
  }

  // Check for hedging language
  const hedging = [
    "it can be argued", "one might argue", "it is worth noting",
    "it should be noted", "it is important to note"
  ];
  for (const h of hedging) {
    if (text.toLowerCase().includes(h)) {
      flags.push(`Found hedging language: "${h}"`);
      score += 6;
      suggestions.push(`"${h}" sounds non-committal — be more direct`);
    }
  }

  // Normalize score to 0-100
  score = Math.min(100, score);

  if (score === 0) {
    suggestions.push("Text already sounds pretty natural! Minor tweaks can still help.");
  }

  return { score, flags, suggestions };
}
