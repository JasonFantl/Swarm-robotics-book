# Emergent Ventures Application

## How do you describe your idea in a tweet? (295 chars max)

I'm writing a free, visual, interactive textbook for swarm robotics. My blog posts explaining swarm algorithms have drawn 40,000+ readers, and a professor has already asked to teach with my visuals. Now I want to build the introduction that lets an undergraduate fall in love with the field.

---

## Tell us about your proposal (1500 words max)

# About me

For the last six years, in the evenings after work, I have been building interactive visual explainers of swarm and multi-robot algorithms at jasonfantl.com. Each one takes a month or two. I read the papers, implement the algorithms, then design simulations and figures until the mechanism can be understood by a layperson. These posts have repeatedly made the front page of Hacker News, drawing over 40,000 readers, and have put me in conversation with experts and professors in the field. Most encouragingly, Carlo Pinciroli (Worcester Polytechnic) has already asked if he could use my visuals in his courses.

I have also built these systems myself. At NASA Glenn I worked on delay-tolerant networking for the interplanetary internet, with hardware now in orbit. At Raytheon BBN I published networking research and have a pending patent on deadlock-free scheduling. At Anduril I built coordination algorithms for fielded drone swarms, and I left over concerns about the misuse of autonomous weapons. There are serious moral considerations when building these systems, which I will address in the chapter "The Real World". I am now finishing an AI safety fellowship with Goodfire; when it ends in a few weeks, I will begin the book. I plan to start a PhD in swarm robotics in fall 2027; this book is how I want to spend the time between now and then, and I will be working on it full time.

I have been obsessed with decentralized systems, where simple local interactions produce complex, resilient global behavior. Nature builds this way: ants, bees, and the patterns Turing described. Now our technologies do too: firefighting drones and warehouse fleets. I want others to see what I see: self-healing, scalable systems with no single point of failure, made of simple parts you can fully understand, producing collective behavior at every scale.

# A consensus view I absolutely agree with

Passively watching a video is not the same as learning. Real understanding takes effort. This is one of the better replicated findings in cognitive science (testing yourself beats re-reading and re-watching), but I know it best from my own experience. I love educational YouTube, but when I try to explain to someone what I just watched, I realize I didn't understand it at all. The intuitive visuals fooled me into a false sense of learning. Still, these videos are valuable: they are a great source of inspiration. I want the textbook to combine that inspirational power of animation with the pedagogical value of a textbook (exercises, and predictions the reader tests against the simulations), replacing the false sense of learning with the cognitive friction that comes when we truly learn a new topic.

# A great idea worth investing in

Swarm robotics is becoming central to the physical world, with drones on battlefields and over wildfires, robotic warehouses, autonomous farms, and satellite constellations. But it lacks an inviting introduction. What exists are research papers and dense graduate textbooks ("Swarm Robotics: A Formal Approach" is the standard, but is meant for graduate students). There is no "Nature of Code" or 3Blue1Brown for swarms, nothing an undergraduate can fall in love with, nothing a professor can pull lecture visuals from. The gap is unfortunate, because the subject is extremely well suited to visual explanation. The parts are simple enough to fully understand, and the payoff of emergence is inherently visual.

I am building "Swarm Robotics and Multi-Robot Systems: A Visual Exploration", an open-source animated textbook for undergraduates, meant to inspire people to learn more about swarm robotics.

What is new is the approach. Existing texts start from the formalism and add figures where they can. This book is written around visual intuition from the start: figures do the teaching, animations provide the inspiration, and the reader tests their predictions against live simulations.

Some features of this book:

* Built for professors: Exercises in every sub-section, a permissive license, and animations that can be pulled directly into lecture slides.
* A single HTML file: It will be downloadable and viewable on any device that can render HTML files and run JavaScript.
* Open source: People will have access to all the source tooling to tailor the content to their needs, for example, adapting chapters for a specific course.
* Structure: Introduction and 8 chapters, each made up of 3-5 sub-sections, organized by how much communication the swarm is allowed, starting with no communication, then stigmergy, one-hop messages, multi-hop networks, and finally global knowledge. The full table of contents is in the attached supporting document.

There is a future where robots will be everywhere, exploring the ocean floors, maintaining farms, and building cities on new planets, and we want to make sure they are as robust to failures as possible. The concrete goal is to have the released chapters taught in dozens of classrooms within the next two years, and have demand from professors pulling the remaining chapters forward. We need people excited to work on these problems. I am excited to work on these problems, and I hope I can have others join me. The ambition is for this to become the default first exposure to swarm robotics, the way Nature of Code is for creative coding.

## Timeline

* Week 1: HTML/JS framework and the reusable simulation engine. Much of this already exists from my blog. What's left is to ensure the book can be viewed across devices and browsers and offline (remove external dependencies).
* Week 2-19: One sub-section released roughly every 3 weeks:
    * Week 2-4: 1.1 Boids
    * Week 5-7: 3.1 Pheromone Trails and Ant Colony Optimization
    * Week 8-10: 3.2 Reaction-Diffusion and Turing Patterns
    * Week 11-13: 4.1 Firefly Synchronization
    * Week 14-16: 5.3 Shape Formation and Self-Reconfiguration
    * Week 17-19: Introduction (written last, placed at the beginning)
* Week 20-23: Feedback and polishing. Iterating based on live feedback from student testing cohorts and professors. I expect this to require large changes, potentially replacing or adding a sub-section.

Some of these sections I have already written as blog posts, so I may complete them earlier by reformatting existing content for the textbook. The funded sub-sections are a deliberate sample of the whole book, self-contained enough that professors can adopt them immediately and give feedback while the remaining sections fill in. The remaining chapters will be completed over the following years during my PhD, in part supported by some of the funding ideas below and follow-on grants.

## Budget

Total: $25,000
* $20,000: Stipend, 23 weeks of full-time work
* $3,000: Travel, visits to swarm robotics labs and one conference
* $1,500: Student testing cohort, paid feedback sessions
* $500: Hosting, domain, fonts, assets

## Sustainability

The book will be free forever, since the entire point is to reach as many people as possible. The only cost is my time writing the book, which is what this grant covers. Beyond that, I am considering a companion YouTube channel built from the animations and a Patreon to provide some ongoing support (this has worked well for other educational creators), and looking to companies with education programs (Festo, Amazon Robotics, iRobot) for sponsorship. I also strongly expect the need for understanding swarms to grow in the coming years, so establishing myself as an expert with this publication will lead to many more opportunities. I'd welcome follow-on support as chapters ship, but to start I want to prove out the first few chapters.

---

## Multimedia URL

https://jasonfantl.com/posts/Shaping-Swarms/