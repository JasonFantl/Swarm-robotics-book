# Emergent Ventures Application — DRAFT 1

> Notes to self are in blockquotes like this one — delete them all before submitting.
> Anything in [BRACKETS] is a placeholder to verify or fill in.
> Target: proposal under 1,500 words. This draft's proposal is ~1,250 words.

---

## How do you describe your idea in a tweet? (295 chars max)

I'm writing the first visual, interactive, open textbook on swarm robotics. My blog explainers on swarm algorithms have reached [40,000+] readers and professors already use them in class. I want to turn that into the field's default first exposure — free, on any device, forever.

> 288 characters. Alternative, punchier version:
> "A 3Blue1Brown-style open textbook for swarm robotics. I've built drone-swarm autonomy in industry and spent 6 years writing visual explainers professors now teach from. The field that will run our warehouses, farms, and space missions deserves a beautiful front door. I'm building it."

---

## Tell us about your proposal (1500 words max)

### Part 1 — About me

For the last [six] years, in the evenings after work, I have been building interactive visual explainers of swarm and multi-robot algorithms and publishing them at [jasonfantl.com]. Each one takes a month or two: I read the papers, implement the algorithm, then design simulations and figures until the mechanism is obvious enough that a reader can predict what happens when they change a parameter — and then I let them change it. These posts have repeatedly reached the front page of Hacker News, drawing [over 40,000 readers], and — the part I'm proudest of — they've drawn the field's own researchers to me. They have put me in conversation with [Carlo Pinciroli (Worcester Polytechnic)], [Steven Strogatz (Cornell)], and [Sabine Hauert (Bristol)], one of the best-known swarm robotics researchers in the world, whom I'm meeting in three weeks to discuss what teaching materials the field most needs. One professor has already told me he will use my existing visuals in his courses.

I know this material from the inside, not just as an explainer. At NASA [Glenn], I worked on delay-tolerant networking for the interplanetary internet — [with hardware now in orbit]. At Raytheon BBN, I did networking research [resulting in publications and a pending patent]. At Anduril, I built autonomy for real drone swarms — and left over concerns about autonomous weapons, because I care about where this technology goes and who gets to shape it. [Currently: Goodfire AI-safety fellowship.] I plan to start a PhD in swarm robotics in fall 2027; this book is how I want to spend the time between now and then, and it will compound with everything after.

I have been obsessed with decentralized systems for eight years. Nature builds this way — ants, bees, slime molds, the patterns Turing described — and increasingly so do we, from satellite constellations to warehouse fleets. I want other people to see what I see: self-healing, scalable systems with no single point of failure, made of simple parts you can fully understand, producing collective behavior you can't look away from.

### Part 2 — A consensus view I absolutely agree with

Great explanations of technical material have enormous positive externalities, and we systematically underproduce them. This is about as mainstream as a view gets — every educator believes it — and I think it is completely true. A single excellent free resource (Feynman's lectures, *Nature of Code*, 3Blue1Brown) gets consumed by millions of people over decades at zero marginal cost, and some fraction of those people go on to enter the field, which is worth incomparably more than the cost of production. The reason we underproduce them anyway is also boringly conventional: the person with the expertise rarely has the time, the incentive, or the visual craft, and no one captures the value they create. I agree with the diagnosis and I am trying to be the exception on the supply side.

> Verify this actually feels like YOUR sincere answer — Cowen uses this as a sincerity test, not a cleverness test. Another candidate if this one doesn't feel right: "Redundancy is expensive and worth it" is too contrarian-flavored; "learning by doing beats passive reading" is defensible and ties directly to the interactive-exercises design of the book.

### Part 3 — The idea

**The problem.** Swarm robotics and multi-robot systems are becoming central to the physical world — drones dominating battlefields, robotic warehouses, autonomous farms, seafloor and space infrastructure — but the field has no good front door. What exists is fragmented research papers and dense graduate monographs (*Swarm Robotics: A Formal Approach* is the standard, and it is not for beginners). There is no equivalent of *Nature of Code* or 3Blue1Brown for this field: nothing an undergraduate can fall in love with, and nothing a professor can pull visuals from for a lecture. This is a strange gap, because swarm robotics is possibly the single best-suited subject in engineering for interactive explanation: it is physical, it is built from simple local rules anyone can fully understand, and the payoff — emergent global behavior — is inherently visual and genuinely beautiful.

**What I'm building.** A free, open, interactive textbook introducing swarm and multi-robot algorithms to undergraduates: *[Multi-Robot Algorithms: A Visual Exploration]*. Every concept gets an interactive simulation the reader can manipulate; each chapter breaks its system into small mechanisms taught in isolation, then ends with a sandbox combining them — so the reader doesn't just watch flocking or self-healing formation control, they understand it well enough to predict how the behavior changes before they touch the slider. Planned coverage runs from nature's blueprints (ants, bees, Turing patterns) through core primitives (flocking, consensus, synchronization, task allocation, shape formation) to real deployments (disaster search, wildfire response, warehouse fleets, satellite constellations). Frequent embedded exercises, a serious bibliography, careful accuracy without heavy formalism.

**Distribution is half the design.** Written in public in an open repository, released chapter by chapter (my existing audience and Hacker News track record are the launch channel), viewable on any device and downloadable as a single offline HTML file, with every figure and animation explicitly licensed for professors to drop into their lectures. I am talking with professors now — including the meeting with [Hauert] — specifically to find out which visuals they wish existed, so the book is adopted into courses as it's written rather than after. Supplementary YouTube videos lean on the animations to reach people who will never open a textbook.

**Why me, why now.** I have already done this at small scale for six years and academia validated it unprompted: professors found my blog and asked to teach from it. The only missing ingredient is time. At my current pace — nights and weekends — a post takes two months and a book is impossible. The grant buys the pace.

**What's new here** is not "a textbook with animations." It's the conviction that in this field, the interactive simulation *is* the pedagogy — the reader should finish each chapter able to run modifications in their mind's eye — combined with a builder who has shipped both the explainers and the real systems (NASA, BBN, Anduril) and an adoption channel into classrooms that already exists.

**Budget: [$30,000].**
- [$24,000] — six months of full-time work: writing, building simulations, and producing the first [6–8] chapters (I am leaving my job to do this; this is a living-expenses buyout of my time).
- [$4,000] — design and tooling: [illustration/animation tooling, possible contract help on visual design], making it beautiful enough that people share it for the visuals alone.
- [$2,000] — hosting, domain, video production for the companion YouTube channel, and travel to visit [one or two swarm robotics labs] to ground the applied chapters.

**Sustainability.** The web version stays free forever — that's the point, and it's what maximizes the externality. Revenue layers on top rather than gating: print and PDF editions, a Patreon (my audience already exists), and sponsorship from robotics companies with education programs [(iRobot Education, Festo's Bionic Learning Network, Amazon Robotics)]. I'd welcome follow-on support as chapters ship, but the goal is for the book to sustain itself the way *Nature of Code* does.

**Status.** I have been developing this project for [X months], full outline in progress, [N] chapters' worth of material already exists as blog posts that will be rewritten and expanded to the book's standard. I will be working on it full time. Informal supporters so far: [the professors above; list any who've committed to using material].

> Word count of Parts 1–3 above: ~1,250. Room to expand ~250 words if needed.

---

## Supporting documentation

> No PDFs accepted. Options:
> - Screenshots (PNG) of your best blog interactives + the HN front-page threads
> - A one-page .docx chapter outline of the book
> - A .docx with links to the specific posts professors said they'd use

## Multimedia URL

> Best single link — probably your most impressive interactive post, e.g. the one that did best on HN, or a page collecting the best animations. One URL only, so make it the strongest.

---

# Reviewer checklist (delete before submit)

- [ ] Verify every [BRACKETED] fact: view counts, professor names/spellings (it's Sabine **Hauert**, Carlo **Pinciroli**), NASA center, patent status, fellowship name
- [ ] Confirm the consensus-view answer is sincerely yours
- [ ] Confirm budget numbers match what you actually need
- [ ] Final word count under 1,500
- [ ] Read Sam Atis's "Emergent Ventures FAQ" (samstack.io) before submitting
- [ ] Consider a warm intro first — you have real correspondence with well-known researchers; a mention from an EV-adjacent person beats a cold application
