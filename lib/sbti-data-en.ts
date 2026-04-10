/* eslint-disable */
export const dimensionMeta = {
  S1: {
    name: 'S1 Self-Esteem',
    model: 'Self Model',
  },
  S2: {
    name: 'S2 Self-Clarity',
    model: 'Self Model',
  },
  S3: {
    name: 'S3 Core Values',
    model: 'Self Model',
  },
  E1: {
    name: 'E1 Attachment Security',
    model: 'Emotion Model',
  },
  E2: {
    name: 'E2 Emotional Investment',
    model: 'Emotion Model',
  },
  E3: {
    name: 'E3 Boundaries & Dependence',
    model: 'Emotion Model',
  },
  A1: {
    name: 'A1 Worldview Bias',
    model: 'Attitude Model',
  },
  A2: {
    name: 'A2 Rules & Flexibility',
    model: 'Attitude Model',
  },
  A3: {
    name: 'A3 Sense of Meaning',
    model: 'Attitude Model',
  },
  Ac1: {
    name: 'Ac1 Motivation Direction',
    model: 'Action Drive Model',
  },
  Ac2: {
    name: 'Ac2 Decision Style',
    model: 'Action Drive Model',
  },
  Ac3: {
    name: 'Ac3 Execution Pattern',
    model: 'Action Drive Model',
  },
  So1: {
    name: 'So1 Social Initiative',
    model: 'Social Model',
  },
  So2: {
    name: 'So2 Interpersonal Boundary',
    model: 'Social Model',
  },
  So3: {
    name: 'So3 Expression Authenticity',
    model: 'Social Model',
  },
} as const;

export const questions = [
  {
    id: 'q1',
    dim: 'S1',
    text: 'You read a dramatic self-roast post and think, "That is painfully me."',
    options: [
      { label: 'I feel personally attacked.', value: 1 },
      { label: 'Some parts fit, some do not.', value: 2 },
      { label: 'Nope, that is not me.', value: 3 },
    ],
  },
  {
    id: 'q2',
    dim: 'S1',
    text: 'I often feel like people around me are doing better than I am.',
    options: [
      { label: 'Yes, frequently.', value: 1 },
      { label: 'Sometimes.', value: 2 },
      { label: 'Not really.', value: 3 },
    ],
  },
  {
    id: 'q3',
    dim: 'S2',
    text: 'I have a clear sense of who I really am.',
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 },
    ],
  },
  {
    id: 'q4',
    dim: 'S2',
    text: 'Deep down, I know what I genuinely want.',
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 },
    ],
  },
  {
    id: 'q5',
    dim: 'S3',
    text: 'I feel a strong need to keep leveling up in life.',
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 },
    ],
  },
  {
    id: 'q6',
    dim: 'S3',
    text: 'Other people’s opinions rarely shake me.',
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 },
    ],
  },
  {
    id: 'q7',
    dim: 'E1',
    text: 'Your partner has not replied for five hours and says they felt sick. Your first thought is:',
    options: [
      { label: 'Five hours sounds suspicious.', value: 1 },
      { label: 'I am torn between trust and doubt.', value: 2 },
      { label: 'They probably were really unwell.', value: 3 },
    ],
  },
  {
    id: 'q8',
    dim: 'E1',
    text: 'In relationships, I often worry about being abandoned.',
    options: [
      { label: 'Yes.', value: 1 },
      { label: 'Sometimes.', value: 2 },
      { label: 'No.', value: 3 },
    ],
  },
  {
    id: 'q9',
    dim: 'E2',
    text: 'When I date, I usually mean it seriously.',
    options: [
      { label: 'Not really.', value: 1 },
      { label: 'It depends.', value: 2 },
      { label: 'Yes, absolutely.', value: 3 },
    ],
  },
  {
    id: 'q10',
    dim: 'E2',
    text: 'You meet someone who is kind, smart, reliable, and absurdly attractive. You would:',
    options: [
      { label: 'Stay emotionally guarded.', value: 1 },
      { label: 'Land somewhere in between.', value: 2 },
      { label: 'Invest deeply and wholeheartedly.', value: 3 },
    ],
  },
  {
    id: 'q11',
    dim: 'E3',
    text: 'After you start dating, your partner is very clingy. You feel:',
    options: [
      { label: 'I kind of like it.', value: 1 },
      { label: 'I can adapt.', value: 2 },
      { label: 'I need more personal space.', value: 3 },
    ],
  },
  {
    id: 'q12',
    dim: 'E3',
    text: 'In any close relationship, personal space matters a lot to me.',
    options: [
      { label: 'I prefer dependency and closeness.', value: 1 },
      { label: 'Depends on the person.', value: 2 },
      { label: 'Yes, very much.', value: 3 },
    ],
  },
  {
    id: 'q13',
    dim: 'A1',
    text: 'Most people are fundamentally kind.',
    options: [
      { label: 'I am skeptical of that.', value: 1 },
      { label: 'Maybe.', value: 2 },
      { label: 'I generally believe so.', value: 3 },
    ],
  },
  {
    id: 'q14',
    dim: 'A1',
    text: 'A very cute child offers you candy on the street. Your reaction is:',
    options: [
      { label: 'Aww, that is adorable and sweet.', value: 3 },
      { label: 'Confused but open.', value: 2 },
      { label: 'Is this some kind of scam?', value: 1 },
    ],
  },
  {
    id: 'q15',
    dim: 'A2',
    text: 'School requires mandatory evening study, but you planned a rare game night with your crush.',
    options: [
      { label: 'Skip it this once.', value: 1 },
      { label: 'Try to ask for leave.', value: 2 },
      { label: 'Stick to the rule and study.', value: 3 },
    ],
  },
  {
    id: 'q16',
    dim: 'A2',
    text: 'I enjoy breaking routines and dislike being constrained.',
    options: [
      { label: 'Agree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Disagree.', value: 3 },
    ],
  },
  {
    id: 'q17',
    dim: 'A3',
    text: 'I usually do things with a clear goal in mind.',
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 },
    ],
  },
  {
    id: 'q18',
    dim: 'A3',
    text: 'Sometimes life feels like biological autopilot rather than meaningful purpose.',
    options: [
      { label: 'That resonates.', value: 1 },
      { label: 'I am undecided.', value: 2 },
      { label: 'I strongly disagree.', value: 3 },
    ],
  },
  {
    id: 'q19',
    dim: 'Ac1',
    text: 'I act mainly to make progress, not just to avoid trouble.',
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 },
    ],
  },
  {
    id: 'q20',
    dim: 'Ac1',
    text: 'You are stuck in a frustrating situation for 30 minutes. You are more likely to:',
    options: [
      { label: 'Wait and hope it resolves itself.', value: 1 },
      { label: 'Panic and improvise dramatically.', value: 2 },
      { label: 'Use a practical fix immediately.', value: 3 },
    ],
  },
  {
    id: 'q21',
    dim: 'Ac2',
    text: 'I make decisions quickly and dislike overthinking.',
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 },
    ],
  },
  {
    id: 'q22',
    dim: 'Ac2',
    text: 'This question has no prompt. Pick one blindly.',
    options: [
      { label: 'After overthinking, maybe A.', value: 1 },
      { label: 'Uh... maybe B?', value: 2 },
      { label: 'No clue, choosing C.', value: 3 },
    ],
  },
  {
    id: 'q23',
    dim: 'Ac3',
    text: 'When people say you are highly execution-driven, your inner response is:',
    options: [
      { label: 'Only when deadlines are terrifying.', value: 1 },
      { label: 'Sometimes true.', value: 2 },
      { label: 'Yes, things should move forward.', value: 3 },
    ],
  },
  {
    id: 'q24',
    dim: 'Ac3',
    text: 'I usually plan my tasks, and then...',
    options: [
      { label: 'Reality blows up the plan.', value: 1 },
      { label: 'I finish some, miss some.', value: 2 },
      { label: 'I hate plan disruptions.', value: 3 },
    ],
  },
  {
    id: 'q25',
    dim: 'So1',
    text: 'Online friends invite you to meet offline. Your first instinct is:',
    options: [
      { label: 'I am a bit nervous about it.', value: 1 },
      { label: 'I can go with the flow.', value: 2 },
      { label: 'I would dress up and chat confidently.', value: 3 },
    ],
  },
  {
    id: 'q26',
    dim: 'So1',
    text: 'Your friend brings their friend to hang out. You are most likely to:',
    options: [
      { label: 'Keep a cautious distance at first.', value: 1 },
      { label: 'Warm up if the vibe works.', value: 2 },
      { label: 'Treat them like my friend right away.', value: 3 },
    ],
  },
  {
    id: 'q27',
    dim: 'So2',
    text: 'My relationships come with an invisible electric fence.',
    options: [
      { label: 'Agree.', value: 3 },
      { label: 'Neutral.', value: 2 },
      { label: 'Disagree.', value: 1 },
    ],
  },
  {
    id: 'q28',
    dim: 'So2',
    text: 'With trusted people, I want deep closeness and almost family-level intimacy.',
    options: [
      { label: 'Agree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Disagree.', value: 3 },
    ],
  },
  {
    id: 'q29',
    dim: 'So3',
    text: 'You disagree with something but stay silent. Most often because:',
    options: [
      { label: 'That rarely happens to me.', value: 1 },
      { label: 'I consider relationships and context.', value: 2 },
      { label: 'I do not want to expose my darker side.', value: 3 },
    ],
  },
  {
    id: 'q30',
    dim: 'So3',
    text: 'I present different versions of myself in different social settings.',
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 },
    ],
  },
] as const;

export const specialQuestions = [
  {
    id: 'drink_gate_q1',
    special: true,
    kind: 'drink_gate',
    text: 'Which hobby sounds most like you?',
    options: [
      { label: 'Basic survival things', value: 1 },
      { label: 'Arts and culture', value: 2 },
      { label: 'Drinking', value: 3 },
      { label: 'Fitness', value: 4 },
    ],
  },
  {
    id: 'drink_gate_q2',
    special: true,
    kind: 'drink_trigger',
    text: 'What is your relationship with alcohol?',
    options: [
      { label: 'Casual drinker, small amounts only.', value: 1 },
      { label: 'I basically run on liquor. Respect the ethanol.', value: 2 },
    ],
  },
] as const;

export const typeLibrary = {
  CTRL: {
    code: 'CTRL',
    cn: 'Controller',
    intro: 'You run the room before the room notices.',
    desc: 'CTRL is the human version of save-state plus project management. You are structured, strategic, and unreasonably calm under pressure. Where most people see "rules," you see tunable parameters. Friends rely on you when plans derail because you stabilize chaos fast, then quietly enforce a better system.',
  },
  'ATM-er': {
    code: 'ATM-er',
    cn: 'The Giver',
    intro: 'You keep paying: time, energy, attention.',
    desc: 'ATM-er is not about money, it is about emotional spending. You absorb other people’s mess, shoulder hidden labor, and keep everyone functional. Reliable and generous, yes, but often overextended. Your growth edge is boundaries that protect your care instead of erasing it.',
  },
  'Dior-s': {
    code: 'Dior-s',
    cn: 'The Cynic Realist',
    intro: 'You reject hype and keep your feet on the ground.',
    desc: 'Dior-s sees through performative ambition and marketing-driven life scripts. You are not lazy; you are selective. You trust comfort, basics, and practical truth over social theater. Others call it "lying flat," but for you it is defensive clarity in a noisy world.',
  },
  BOSS: {
    code: 'BOSS',
    cn: 'The Leader',
    intro: 'Hand me the wheel. I will drive.',
    desc: 'BOSS types default to ownership. You make calls, create order, and convert abstract goals into execution. High standards can make you look intense, but people follow you because your direction is coherent. Your challenge is pacing yourself without lowering ambition.',
  },
  'THAN-K': {
    code: 'THAN-K',
    cn: 'The Grateful One',
    intro: 'You can find light in almost anything.',
    desc: 'THAN-K reframes setbacks with unusual emotional generosity. You are warm, forgiving, and socially uplifting. In tense settings, you regulate group mood better than most. Just remember optimism is strongest when paired with honest limits.',
  },
  'OH-NO': {
    code: 'OH-NO',
    cn: 'Risk Sentinel',
    intro: 'You see the failure mode before anyone else.',
    desc: 'OH-NO minds run continuous risk simulation. You anticipate edge cases, prevent avoidable disasters, and protect boundaries with precision. People may call you anxious, but your caution saves teams repeatedly. The key is to balance prevention with flexibility.',
  },
  GOGO: {
    code: 'GOGO',
    cn: 'The Mover',
    intro: 'Done beats perfect. Move.',
    desc: 'GOGO is action-first cognition. You test, iterate, and clear tasks fast instead of over-debating theory. Your momentum is contagious and often decisive. The tradeoff is occasional blind spots when speed outruns reflection.',
  },
  SEXY: {
    code: 'SEXY',
    cn: 'The Charmer',
    intro: 'Your presence changes the temperature of a room.',
    desc: 'SEXY types carry social magnetism naturally. You communicate with tone, vibe, and timing as much as words. Attention follows you, often before intent. Your best version pairs that charisma with grounded self-definition.',
  },
  'LOVE-R': {
    code: 'LOVE-R',
    cn: 'The Romantic',
    intro: 'You feel in full color, not grayscale.',
    desc: 'LOVE-R treats emotion as primary data. You experience connection as meaning, not convenience, and read symbols where others see noise. This depth makes you poetic and vulnerable at once. Your task is choosing containers that can hold your intensity.',
  },
  MUM: {
    code: 'MUM',
    cn: 'The Caregiver',
    intro: 'You are soft with others, strict with yourself.',
    desc: 'MUM offers emotional shelter. You sense shifts, respond with care, and stabilize people in distress. Others heal faster around you. But self-care often gets postponed, so sustainable care requires giving yourself the same tenderness you give everyone else.',
  },
  FAKE: {
    code: 'FAKE',
    cn: 'The Mask-Switcher',
    intro: 'You adapt faster than people can track.',
    desc: 'FAKE is high-context social shapeshifting. You can match tone, role, and power dynamics in seconds, which is a real survival skill. The cost is identity drift when adaptation never pauses. Your growth is keeping one core voice that does not disappear across masks.',
  },
  OJBK: {
    code: 'OJBK',
    cn: 'The Whatever Monarch',
    intro: 'You refuse to waste energy on trivial battles.',
    desc: 'OJBK is strategic indifference. You decline unnecessary conflict and preserve bandwidth for what actually matters. To outsiders this can read as apathy, but your logic is efficiency. The watch-out is disengaging from things that quietly do matter.',
  },
  MALO: {
    code: 'MALO',
    cn: 'The Chaos Monkey',
    intro: 'You turn rigidity into play.',
    desc: 'MALO types are mischievous, creative, and anti-boring by design. You poke at stale norms and create surprise paths through routine systems. That spontaneity can unlock fresh ideas in stuck groups. Your edge is adding enough structure so your spark scales.',
  },
  'JOKE-R': {
    code: 'JOKE-R',
    cn: 'The Clown',
    intro: 'You laugh first, bleed later.',
    desc: 'JOKE-R weaponizes humor as social glue and emotional armor. You keep rooms alive, diffuse tension, and carry the entertainment load. The hidden risk is masking pain so well that nobody sees it, including you. Honest check-ins protect your core.',
  },
  'WOC!': {
    code: 'WOC!',
    cn: 'The Exclaimer',
    intro: 'Dramatic reaction outside, cold analysis inside.',
    desc: 'WOC! runs two systems: expressive surface and rational backend. You react loudly, think clearly, and avoid pointless argument with people committed to nonsense. Your style is sharp, efficient, and meme-native. Used well, it is social intelligence with speed.',
  },
  'THIN-K': {
    code: 'THIN-K',
    cn: 'The Thinker',
    intro: 'Your mind never really logs off.',
    desc: 'THIN-K prioritizes logic quality: claims, evidence, assumptions, bias checks. You resist herd narratives and value conceptual precision. This gives you analytical credibility in noisy environments. The risk is analysis paralysis when decision windows are short.',
  },
  SHIT: {
    code: 'SHIT',
    cn: 'The Angry Builder',
    intro: 'You complain like hell, then fix the whole thing.',
    desc: 'SHIT types are paradox engines: cynical language, high responsibility behavior. You criticize systems because you can see where they break, then end up repairing them anyway. Underneath the rage is competence and standards. Sustainable mode needs rest, not just grit.',
  },
  ZZZZ: {
    code: 'ZZZZ',
    cn: 'The Deadline Zombie',
    intro: 'Dormant... until the final alarm.',
    desc: 'ZZZZ appears offline until urgency hits critical mass, then delivers under absurd pressure. You are not lazy; you are threshold-activated. This can work surprisingly well in short bursts. Long-term performance improves when activation happens before crisis mode.',
  },
  POOR: {
    code: 'POOR',
    cn: 'The Focused Minimalist',
    intro: 'Low noise, high concentration.',
    desc: 'POOR is resource concentration, not lack. You ignore nonessential signals and funnel energy into one meaningful line of effort. People mistake this for scarcity mindset, but it is strategic compression. Your upside is depth; your risk is tunnel vision.',
  },
  MONK: {
    code: 'MONK',
    cn: 'The Hermit',
    intro: 'You treat solitude as sacred infrastructure.',
    desc: 'MONK protects psychological space with discipline. You do not avoid people out of fear; you optimize for clarity and inner order. Independence is your default and noise tolerance is low. Your growth area is selective intimacy without losing your center.',
  },
  IMSB: {
    code: 'IMSB',
    cn: 'The Inner Fighter',
    intro: 'Two voices in your head are always in a cage match.',
    desc: 'IMSB is conflict between impulse and self-criticism. One side says "go for it," the other predicts disaster and shame. You are not incapable; you are overloaded by internal opposition. Progress comes from reducing self-attack, not forcing fake confidence.',
  },
  SOLO: {
    code: 'SOLO',
    cn: 'The Lone Hedgehog',
    intro: 'Spikes outside, tenderness inside.',
    desc: 'SOLO guards closeness by preemptive distance. You may crave deep connection while building strong defensive walls. That push-pull can look contradictory to others, but it makes emotional sense from your history. Safe relationships help you lower armor gradually.',
  },
  FUCK: {
    code: 'FUCK',
    cn: 'The Wild Card',
    intro: 'Unfiltered life force, zero domestication.',
    desc: 'FUCK rejects performative politeness and over-managed norms. You swing between full-throttle yes and hard no, with little middle space. This raw energy can be liberating and disruptive in equal measure. Best outcomes come when freedom meets responsibility.',
  },
  DEAD: {
    code: 'DEAD',
    cn: 'The Detached One',
    intro: 'You have seen enough to stop chasing noise.',
    desc: 'DEAD is low-drive detachment after chronic overstimulation. You step back from status games and motivational slogans that no longer feel real. To others it can seem numb, but often it is strategic withdrawal. Meaning may return through smaller, honest commitments.',
  },
  IMFW: {
    code: 'IMFW',
    cn: 'The Sensitive Dependent',
    intro: 'You trust deeply and bruise easily.',
    desc: 'IMFW has fragile self-worth with high emotional sincerity. You tune quickly to reliable people and attach with intensity, which is beautiful and risky. With stable support, you are loyal and warm. Healthy boundaries turn dependence into secure connection.',
  },
  HHHH: {
    code: 'HHHH',
    cn: 'The Glitch Laugher',
    intro: 'The model gave up, so it assigned pure chaos.',
    desc: 'HHHH is the fallback for profiles that do not map cleanly to the standard library. You are likely nonlinear, surprising, and difficult to stereotype. Instead of forcing one neat label, this type invites curiosity. Your uniqueness is signal, not error.',
  },
  DRUNK: {
    code: 'DRUNK',
    cn: 'The Drunk Mode',
    intro: 'When ethanol enters, chaos gets admin rights.',
    desc: 'DRUNK is a hidden override state triggered by the alcohol gate. Energy spikes, inhibition drops, and the persona goes theatrical fast. It is intentionally exaggerated for humor and social storytelling. Treat it as a joke mode, not a clinical category.',
  },
} as const;

export const typeImages = {
  IMSB: '/image/IMSB.png',
  BOSS: '/image/BOSS.png',
  MUM: '/image/MUM.png',
  FAKE: '/image/FAKE.png',
  'Dior-s': '/image/Dior-s.jpg',
  DEAD: '/image/DEAD.png',
  ZZZZ: '/image/ZZZZ.png',
  GOGO: '/image/GOGO.png',
  FUCK: '/image/FUCK.png',
  CTRL: '/image/CTRL.png',
  HHHH: '/image/HHHH.png',
  SEXY: '/image/SEXY.png',
  OJBK: '/image/OJBK.png',
  'JOKE-R': '/image/JOKE-R.jpg',
  POOR: '/image/POOR.png',
  'OH-NO': '/image/OH-NO.png',
  MONK: '/image/MONK.png',
  SHIT: '/image/SHIT.png',
  'THAN-K': '/image/THAN-K.png',
  MALO: '/image/MALO.png',
  'ATM-er': '/image/ATM-er.png',
  'THIN-K': '/image/THIN-K.png',
  SOLO: '/image/SOLO.png',
  'LOVE-R': '/image/LOVE-R.png',
  'WOC!': '/image/WOC.png',
  DRUNK: '/image/DRUNK.png',
  IMFW: '/image/IMFW.png',
} as const;

export const normalTypes = [
  { code: 'CTRL', pattern: 'HHH-HMH-MHH-HHH-MHM' },
  { code: 'ATM-er', pattern: 'HHH-HHM-HHH-HMH-MHL' },
  { code: 'Dior-s', pattern: 'MHM-MMH-MHM-HMH-LHL' },
  { code: 'BOSS', pattern: 'HHH-HMH-MMH-HHH-LHL' },
  { code: 'THAN-K', pattern: 'MHM-HMM-HHM-MMH-MHL' },
  { code: 'OH-NO', pattern: 'HHL-LMH-LHH-HHM-LHL' },
  { code: 'GOGO', pattern: 'HHM-HMH-MMH-HHH-MHM' },
  { code: 'SEXY', pattern: 'HMH-HHL-HMM-HMM-HLH' },
  { code: 'LOVE-R', pattern: 'MLH-LHL-HLH-MLM-MLH' },
  { code: 'MUM', pattern: 'MMH-MHL-HMM-LMM-HLL' },
  { code: 'FAKE', pattern: 'HLM-MML-MLM-MLM-HLH' },
  { code: 'OJBK', pattern: 'MMH-MMM-HML-LMM-MML' },
  { code: 'MALO', pattern: 'MLH-MHM-MLH-MLH-LMH' },
  { code: 'JOKE-R', pattern: 'LLH-LHL-LML-LLL-MLM' },
  { code: 'WOC!', pattern: 'HHL-HMH-MMH-HHM-LHH' },
  { code: 'THIN-K', pattern: 'HHL-HMH-MLH-MHM-LHH' },
  { code: 'SHIT', pattern: 'HHL-HLH-LMM-HHM-LHH' },
  { code: 'ZZZZ', pattern: 'MHL-MLH-LML-MML-LHM' },
  { code: 'POOR', pattern: 'HHL-MLH-LMH-HHH-LHL' },
  { code: 'MONK', pattern: 'HHL-LLH-LLM-MML-LHM' },
  { code: 'IMSB', pattern: 'LLM-LMM-LLL-LLL-MLM' },
  { code: 'SOLO', pattern: 'LML-LLH-LHL-LML-LHM' },
  { code: 'FUCK', pattern: 'MLL-LHL-LLM-MLL-HLH' },
  { code: 'DEAD', pattern: 'LLL-LLM-LML-LLL-LHM' },
  { code: 'IMFW', pattern: 'LLH-LHL-LML-LLL-MLL' },
] as const;

export const dimExplanations = {
  S1: {
    L: 'You are harder on yourself than most critics could ever be.',
    M: 'Your confidence is situational: strong in wins, shaky in storms.',
    H: 'You have stable self-respect and recover fast from outside judgment.',
  },
  S2: {
    L: 'Identity feels blurry and self-definition often changes with mood.',
    M: 'You mostly know yourself, but emotional spikes can still blur the signal.',
    H: 'You are clear about your needs, limits, and personal values.',
  },
  S3: {
    L: 'Comfort and safety often outrank achievement in your internal priority list.',
    M: 'You balance ambition with rest, and that balance is still being negotiated.',
    H: 'Purpose and growth strongly guide your daily choices and long-term behavior.',
  },
  E1: {
    L: 'Attachment alarms trigger quickly; silence can feel threatening.',
    M: 'You oscillate between trust and self-protection in close bonds.',
    H: 'You trust relational stability and are not easily shaken by small signals.',
  },
  E2: {
    L: 'You invest emotionally with caution and layered protection.',
    M: 'You can commit, but usually keep a safety margin in reserve.',
    H: 'When you choose someone, you show up with full emotional bandwidth.',
  },
  E3: {
    L: 'Closeness and mutual dependence feel comforting and important to you.',
    M: 'You want both intimacy and autonomy, depending on context.',
    H: 'Personal space is essential; love does not cancel boundaries for you.',
  },
  A1: {
    L: 'You approach people with defensive realism first, trust later.',
    M: 'You are observant and cautious without going fully cynical.',
    H: 'You retain baseline faith in people and avoid instant moral doom-scrolling.',
  },
  A2: {
    L: 'Freedom and flexibility usually outrank formal rules.',
    M: 'You can follow structure while staying adaptable when needed.',
    H: 'You prefer order, process, and predictable coordination.',
  },
  A3: {
    L: 'Meaning can feel distant; many tasks seem procedural rather than purposeful.',
    M: 'Your sense of direction comes and goes in cycles.',
    H: 'You operate with a clear vector and stronger existential orientation.',
  },
  Ac1: {
    L: 'Risk avoidance starts earlier than ambition in your decision flow.',
    M: 'You alternate between progress-seeking and damage-control motives.',
    H: 'Progress, outcomes, and momentum are strong internal motivators for you.',
  },
  Ac2: {
    L: 'You deliberate extensively before committing to a choice.',
    M: 'You think carefully but can still move when timing requires it.',
    H: 'You decide quickly and dislike prolonged indecision loops.',
  },
  Ac3: {
    L: 'Deadlines are your activation code; urgency unlocks your output.',
    M: 'Execution quality varies with context, energy, and external pressure.',
    H: 'You push initiatives forward consistently and dislike unresolved tasks.',
  },
  So1: {
    L: 'Social initiation is slow; you warm up before engaging actively.',
    M: 'You are responsive in social settings without forcing intensity.',
    H: 'You initiate interaction comfortably and take social lead naturally.',
  },
  So2: {
    L: 'You seek closeness and merge quickly with trusted people.',
    M: 'Your boundary setting is dynamic and person-dependent.',
    H: 'You maintain clear interpersonal boundaries and protect personal space.',
  },
  So3: {
    L: 'You communicate directly and rarely hide your position.',
    M: 'You balance honesty with tact based on context.',
    H: 'You are highly adaptive in persona management across social settings.',
  },
} as const;

export const dimensionOrder = [
  'S1',
  'S2',
  'S3',
  'E1',
  'E2',
  'E3',
  'A1',
  'A2',
  'A3',
  'Ac1',
  'Ac2',
  'Ac3',
  'So1',
  'So2',
  'So3',
] as const;

export const DRUNK_TRIGGER_QUESTION_ID = 'drink_gate_q2' as const;
