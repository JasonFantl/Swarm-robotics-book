# Lightcone Commons Application — Draft

## What are you working on?

I'm writing "Swarm Robotics and Multi-Robot Systems: A Visual Exploration" — a free, open-source, interactive textbook for undergraduates on swarm and multi-robot algorithms.

For the last six years, in the evenings after work, I have built interactive visual explainers of swarm algorithms at [jasonfantl.com](https://jasonfantl.com). Each takes a month or two: I read the papers, implement the algorithms, then design simulations and figures until the mechanism is understandable by a layperson. These posts have repeatedly made the front page of Hacker News (40,000+ readers total), and Carlo Pinciroli (Worcester Polytechnic, author of the Buzz swarm language) has asked to use my visuals in his courses.

The problem: swarm robotics has no good on-ramp. The field is becoming central to the physical world — drones over battlefields and wildfires, warehouse fleets, satellite constellations — but what exists for learners is research papers and dense graduate texts. There is no Nature of Code, no 3Blue1Brown, nothing in the explorable-explanations tradition for this field, despite the subject being unusually well suited to it: the parts are simple enough to fully understand, and emergence is inherently visual.

The book is structured around how much communication the swarm is allowed — no communication, stigmergy, one-hop messages, multi-hop networks, global knowledge — across an introduction and 8 chapters of 3–5 sub-sections each (full table of contents available on request or attached). It ships as a single self-contained HTML file that runs on anything with a browser, with a permissive license so professors can pull animations directly into lectures and adapt chapters to their courses. Every sub-section has exercises, and the animations are designed so the reader makes a prediction and then tests it against a live simulation — I want the inspirational power of educational animation without the false sense of understanding that passive watching produces.

Concrete two-year goal: the released chapters taught in dozens of classrooms, with professor demand pulling the remaining chapters forward. The ambition is for this to be the default first exposure to swarm robotics, the way Nature of Code is for creative coding.

To be plain about cause-area fit: this is a field-building and education project in decentralized multi-agent systems, not an AI x-risk project, and I don't want to pretend otherwise. The genuine adjacency is that emergent behavior in decentralized multi-agent systems is background knowledge that seems increasingly relevant to reasoning about multi-agent AI, and the book takes the safety and misuse questions seriously (a dedicated chapter, "The Real World," covers the moral considerations of fielding these systems — informed by my having built them).

## What would you do with funding?

I am going full-time on the book starting around September 2026 regardless of funding; funding determines how long the full-time runway lasts and how much of the book gets built before my PhD starts (fall 2027).

**~$12k — Proof of sample (12 weeks).** The reusable simulation engine plus three complete sub-sections (Boids; Pheromone Trails / Ant Colony Optimization; Firefly Synchronization), enough for professors to adopt and give feedback.

**$25k — Baseline plan (23 weeks).** My default ask, matching the plan I've already scoped:
- $20,000 — stipend, 23 weeks full-time (includes self-employment tax)
- $3,000 — travel: swarm robotics lab visits and one conference
- $1,500 — paid student testing cohorts for live feedback
- $500 — hosting, domain, fonts, assets

Deliverables: the framework plus six sub-sections (Boids; Ant Colony Optimization; Reaction-Diffusion and Turing Patterns; Firefly Synchronization; Shape Formation and Self-Reconfiguration; the Introduction), then a feedback-and-polish cycle with student cohorts and professors. The six are a deliberate cross-section of the whole book — self-contained enough for immediate classroom adoption.

**~$50k — Full year.** Roughly doubles the completed material (≈12 sub-sections, i.e., several complete chapters), funds larger student testing cohorts and direct professor outreach, and carries the book to a state where the remaining chapters can realistically be finished during my PhD.

The book will be free forever; the grant buys my writing time, which is the only real cost. Longer-term sustainability candidates: a companion YouTube channel built from the animations, Patreon, and sponsorship from robotics-education programs (Festo, Amazon Robotics, iRobot).

## Who is involved?

Just me, Jason Fantl ([jasonfantl.com](https://jasonfantl.com), [GitHub](https://github.com/jasonfantl)). Relevant track record:

- **Six years of published visual explainers of swarm algorithms** — the exact skill this project needs, verifiable at [jasonfantl.com](https://jasonfantl.com). Multiple Hacker News front pages; 40,000+ readers; e.g. [Simulating Swarms](https://jasonfantl.com/posts/Shaping-Swarms/).
- **NASA Glenn:** delay-tolerant networking for the interplanetary internet; hardware now in orbit.
- **Raytheon BBN:** published networking research; pending patent on deadlock-free scheduling.
- **Anduril:** built coordination algorithms for fielded drone swarms. I left over concerns about the misuse of autonomous weapons.
- **Goodfire:** currently finishing an AI safety fellowship (ends within weeks, after which the book begins).

Carlo Pinciroli (Worcester Polytechnic) has asked to use my visuals in his courses and is the first of the professors I'll be iterating with. I plan to begin a swarm robotics PhD in fall 2027; this book is the bridge between now and then.

## Anything else evaluators should know?

- **Timing:** I start full-time on the book around September 2026, funded initially by savings. Round 1 recommendations arriving in late October would land mid-project and determine whether I can stay full-time through the plan above.
- **Other applications:** I have applied to Emergent Ventures for the $25k baseline and intend to apply to the Sloan Foundation's book program. I will update or withdraw this application promptly if either comes through, per your norms.
- Everything is open source from day one, so partial funding still produces permanently useful artifacts — each sub-section stands alone.
- Happy to share the full table of contents, sample chapter plans, or anything else; the application will be kept up to date as sections ship.
