
Swarm Robotics and Multi-Robot Systems: A Visual Exploration — application July 2026
What are you working on?
Project: I'm writing "Swarm Robotics and Multi-Robot Systems: A Visual Exploration", a free, open-source, interactive textbook for undergraduates on swarm and multi-robot algorithms.
Background: For the last six years, in the evenings after work, I have built interactive visual explainers of swarm algorithms at jasonfantl.com. Each takes a month or two: I read the papers, implement the algorithms, then design simulations and figures until the mechanism is understandable by a layperson. These posts have repeatedly made the front page of Hacker News (40,000+ readers total), and Professor Carlo Pinciroli (Worcester Polytechnic Institute) has asked to use my visuals in his courses.
The problem: swarm robotics has no good on-ramp. The field is becoming central to the physical world — drones over battlefields and wildfires, warehouse fleets, satellite constellations — but what exists for learners is research papers and dense graduate texts. There is no Nature of Code, no 3Blue1Brown, nothing in the explorable-explanations tradition for this field, despite the subject being unusually well suited to it: the parts are simple enough to fully understand, and emergence is inherently visual.
Structure: The book is structured around how much communication the swarm is allowed — no communication, stigmergy, one-hop messages, multi-hop networks, global knowledge — across an introduction and 8 chapters of 3–5 sub-sections each (full table of contents at bottom of application). It ships as a single self-contained HTML file that runs on anything with a browser, with a permissive license so professors can pull animations directly into lectures and adapt chapters to their courses. Every sub-section has exercises, and the animations are designed so the reader makes a prediction and then tests it against a live simulation. I want the inspirational power of educational animation without the false sense of understanding that passive watching produces.
Concrete two-year goal: the released chapters taught in dozens of classrooms, with demand from professors pulling the remaining chapters forward. The ambition is for this to be the default first exposure to swarm robotics, the way Nature of Code is for creative coding.
Cause-area fit: this is a field-building and education project in decentralized multi-agent systems. Emergent behavior in decentralized multi-agent systems is background knowledge that also seems increasingly relevant to reasoning about multi-agent AI (as I have learned in my recent AI safety work), and the book takes safety and misuse seriously: a dedicated chapter, "The Real World", covers the moral considerations of fielding these systems, informed by my having built them.
What would you do with funding?
I am going full-time on the book starting around September 2026 regardless of funding; funding determines how long the full-time runway lasts and how much of the book gets built before my PhD starts (fall 2027).
$12k — Minimal example (12 weeks). The reusable simulation engine plus three complete sub-sections (Boids; Pheromone Trails / Ant Colony Optimization; Firefly Synchronization), enough for professors to adopt and give feedback.
$25k — Baseline plan (23 weeks). My default ask, matching the plan I've already scoped:
$20,000 — stipend, 23 weeks full-time (includes self-employment tax)
$3,000 — travel: swarm robotics lab visits and one conference
$1,500 — paid student testing cohorts for live feedback
$500 — hosting, domain, fonts, assets
Deliverables: the framework plus six sub-sections (Boids; Ant Colony Optimization; Reaction-Diffusion and Turing Patterns; Firefly Synchronization; Shape Formation and Self-Reconfiguration; the Introduction), then a feedback-and-polish cycle with student cohorts and professors. The six are a deliberate cross-section of the whole book — self-contained enough for immediate classroom adoption.
$50k — Full year. Roughly doubles the completed material (≈12 sub-sections, i.e., several complete chapters), funds larger student testing cohorts and direct professor outreach, and carries the book to a state where the remaining chapters can realistically be finished during my PhD.
The book will be free forever; the grant buys my writing time, which is the only real cost. Longer-term sustainability candidates: a companion YouTube channel built from the animations, Patreon, and sponsorship from robotics-education programs (Festo, Amazon Robotics, iRobot).
Who is involved?
Just me, Jason Fantl (website, LinkedIn, GitHub). Relevant track record:
Six years of published visual explainers of swarm algorithms. Multiple Hacker News front pages and 40,000+ readers.
NASA Glenn: delay-tolerant networking for the interplanetary internet; hardware now in orbit.
Raytheon BBN: published networking research; pending patent on deadlock-free scheduling.
Anduril: built coordination algorithms for fielded drone swarms. I left over concerns about the misuse of autonomous weapons.
Cambridge Boston Alignment Institute: currently finishing an AI safety fellowship (ends within weeks, after which the book begins).
Carlo Pinciroli (Worcester Polytechnic) has asked to use my visuals in his courses and is the first of the professors I'll be iterating with. I am also in contact (only an initial meeting so far) with Professor Sabine Hauert (Bristol) to see if she is willing to be involved in the project. I plan to begin a swarm robotics PhD in fall 2027; this book is the bridge between now and then.
Anything else evaluators should know?
Other applications: I have applied to Emergent Ventures for the $25k baseline and intend to apply to the Sloan Foundation's book program. I will update or withdraw this application promptly if either comes through, per your norms.
Everything is open source from day one, so partial funding still produces permanently useful artifacts — each sub-section stands alone.
Happy to share sample chapter plans or anything else; the application will be kept up to date as sections ship.


Appendix
Table of Contents
Introduction
Why Swarms? Robustness, Scalability, and Emergence
Fleets and Swarms: Local Sensing vs. Global Knowledge
The Communication Ladder (How to Use This Book)
Chapter 1: Moving Together (no communication)
Boids: Flocking from Three Rules
The Vicsek Model: Consensus and Phase Transitions
Avoidance: Potential Fields and Velocity Obstacles
Chapter 2: Covering Ground (no communication)
Aggregation and Density from Encounter Rates
Dispersion and Coverage: Voronoi and Lloyd's Algorithm
Collective Search: Lévy Flights and Gradient Following
Chapter 3: Stigmergy (the environment as the medium)
Pheromone Trails and Ant Colony Optimization
Reaction-Diffusion and Turing Patterns
Collective Construction
Chapter 4: Talking to Neighbors (one hop)
Firefly Synchronization: Pulse-Coupled Oscillators
Sharing the Medium: Bandwidth, Interference, and Contention
Opinion Dynamics and Consensus
Best-of-n: Quorum Sensing and Cross-Inhibition
Division of Labor: Response Thresholds
Chapter 5: Building with Neighbors (one hop, in physical space)
Relative Localization: Estimating Where Your Neighbors Are
Gradients and Local Coordinate Frames
Shape Formation and Self-Reconfiguration
Cooperative Transport
Chapter 6: Relaying Messages (many hops)
Gossip and Replicated State: Epidemics, Counting, CRDTs
Routing on a Moving Graph: MANETs and DTN
Collective Mapping and Frontier-Based Exploration
Chapter 7: Seeing Everything (global knowledge)
Task Assignment and Path Finding: The Warehouse Problem
Agreement: Leader Election, Raft, and Linearizability
Where Centralization Breaks
Chapter 8: The Real World
Designing a Swarm: Hand-Crafted, Evolved, and Learned
The Reality Gap: Noise, Embodiment, and Simulation Error
Fault Tolerance: Degradation, Self-Healing, and Rogue Agents
Deployed Systems: Wildfire, Warehouses, Farms, Space, Sea, and the Battlefield
Dual Use, Oversight, and Open Frontiers

