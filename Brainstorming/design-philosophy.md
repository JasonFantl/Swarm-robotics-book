# Design Philosophy

The design philosophy is based in large part on my personal experience reading textbooks, but I have also listed some design decisions based on research.

Make certain to test everything across browsers and devices and viewers, html can be finicky.

## Text format

Book will be html/css/js files, should be viewable on any device. Potentially one giant html file for easy viewability.

This means it should be viewable on devices with all viewing ratios, including phones. The main target is computer screens, as that is the majority of readers. By using html and hyperlinks we should easily support touch navigation and mouse navigation. Interactive animations should be tested for touch interaction.

A print version is considered. It would require replacing animations with select frames, and removing the interactive sections. Publishers would want to print. Paper has a modest learning advantage for expository text, such as textbooks (Delgado et al. 2018).

Text size, spacing, margin, font, and related should be normal internet defaults, they are this way for a reason. And since this is all html, it shouldn't be too hard to let readers change the css themselves. Readers prefer a different line length from the one they read fastest (Dyson & Haselgrove 2001; Nanavati & Bias 2005). Reading speed is also flat across a wide range of type sizes rather than peaking at one (Legge & Bigelow 2011), and the optimal font differs between individuals (Wallace et al. 2022).

Figure descriptions should be html, keep it copy-pastable and searchable.

Pseudocode should be color coded, it's already hard to read.

Figures referenced by the text should be near each other. Do not place figures in a different place than the text. I don't know why some textbooks do this. The spatial contiguity principle is a highly supported finding (Schroeder & Cenkci 2018; Ginns 2006).

Any reference to other material in the book should be hyperlinked, and we should test that people can easily go forward and backward. I think each paragraph can be linked to. Do browsers store your location when you go back and forward?

We will not use drop-down menus. It has been shown that almost nobody expands these (Conlen et al. 2019). It can also be distracting and decreae learning (Nielsen Norman Group 2014, 2021). It also makes it difficult to ctrl-f.

Asides will not be included, even in bubbles or drop-downs. It has been shown that students perform best with a clear and uncluttered read-through (Rey 2012; Sundararajan & Adesope 2020; Mayer 2021). I would like to have a separate file with comments and further exploration that links into the book, so the option exists to explore further, but it points to the book from the outside.

Add links to all references if possible. The book reference will take you to the bib, and the bib should have a link.

### Equations

Make sure to number the important equations so we can reference them. Ideally this is handled in our build step and the equations have names for internal reference.

Equations/math in general should be copy-pastable. It also needs to be easy to read. This means tex rendering with a copy-option. Equations should be readable by the text-to-speech applications, make it accessible. See `Tooling/Experiments/equations-copy-paste` for best attempt so far.

## Figures

Text gives the author the most framing power, but it can be boring.

Figures are powerful for concepts that are in any way visualizable.

Animations are good for learning concepts that contain a temporal element (Höffler & Leutner 2007; Berney & Bétrancourt 2016; Ploetzner et al. 2020). But, animations also provide the least pedagogical effect. We will useanimations primarily to entertain/inspire, not teach.

Consider carefully if we can replace an animation with 2-3 frames of figures, which has been shown to be a better pedagogical tool. It requires readers to animate the concept in their imagination, which leads to better learning outcomes (Hegarty et al. 2003; de Koning et al. 2009; Mayer et al. 2005). The specific format that works is sequential static frames placed side by side, permitting direct visual comparison between steps (Boucheix & Schneider 2009). Where readers are likely to mis-infer the motion, animation is better (Hegarty et al. 2003).

As an aside, Educational Youtube has been shown to be effective in introducing more people into complex areas of study (anecdotal from talking to people in math). Friendly animations can be a strong tool to introduce students to concepts which they can later learn in depth from dense textbooks. This also provides more motivation for students when learning the difficult parts of a field, which I have too often seen introduced before the application. I feel introductory textbooks could learn from Educational Youtube.

Interactive figures I have personally found to be poor teaching tools. They do not provide enough framing from the author, and I often find myself lost. For this reason, I think they are useful only at the end of a chapter, where a reader can explore the space after they have learned the main concepts. Minimally guided instruction fails novices as a general rule (Kirschner et al. 2006), the amount of guidance a learner needs is inversely proportional to their prior knowledge (Kalyuga 2007).

Figures/animations should be video files with the source code available to copy. Most people just want to copy a figure to their own work, they should not have to screen capture. For the small group who want to modify the figure to their use case, the code should be available (all self-contained as usual).

It is common for students to first skim the chapter and just look at the figures. Ideally the figures should present the story of the chapter on their own, then the text provides the finer details. This should naturally occur, but it is worth double checking if a chapter makes sense looking only at the title and figures. Around a quarter of students began exercises within twenty seconds of a page loading (Fouh et al. 2014).

Minimal text in figures, makes it more accessible for an international audience. Place all text in the description (more searchable and copyable).

Make as many of the figures SVGs as possible, much cleaner. It also allows for text that is searchable on the page.

User should always have control over an animation. They can scrub thorugh it, pause it, slow down the speed. Each reader will need to focus on different sections of an animation, wach reader will best learn at different animation speeds.

Make sure we do whatever html/css trickery is needed so the figures take up the correct amount of space on screen even before they load. It is a peeve of mine when we see pages grow in size in reponse to images. It is a static page, it should be statically sized when it loads.
I think as long as we include the width and height of the image in the html this will work.

Animations should be video files. This makes them easy to control and to copy. In the source repo there should be the source code to generate the animation.

We should try to maintain a consistent visual language across all figures. Use the same color for the same measure (like time or number of nodes), use the same symbols to mean the same thing, and keep legend styles consistent scross chapters. 

Ensure to cite where a figure was inspired or copied (remade in our visual language) from.

## Book layout & navigation

This is targeted at novices in the field, for whom it has been shown that a strict linear reading order is most effective (McDonald & Stevenson 1998; Amadieu et al. 2009; Kalyuga 2007). Each chapter and section will be its own file, so it could in theory be a graph or tree, but we will stick to a linear reading order with chapters and sub-sections.

Long scrolling pages are difficult to navigate as you can lose your place easily and it is hard to navigate to a section you are looking for (Piolat et al. 1997; Delgado et al. 2018). We want to segment the sections as much as possible into separate pages that a user can navigate.

Keep the section lengths as small as possible. A single page is acceptable, 2-3 pages is ideal, longer is not desirable (Mayer 2021; Rey et al. 2019).

There will also be a single-page version, this is easier to ctrl-f to find content in.

A wonderful example of this structure (and lots of visuals) at https://www.feynmanlectures.caltech.edu/ (Gottlieb & Pfeiffer 2013).

We want to make sure the book is easy to navigate. We could add javascript to make a navigation bar, but I also want this to be as portable as possible, and a nav bar might act strange on different devices. Instead we should keep the navigation as simple as possible: A page for the table of contents, each section is a page, links from each section to the table of contents (at the chapter we are in) and links to the next and previous section. We may not even need the next/prev buttons, navigating to the TOC is minimal work and allows the reader to track easily the progress they are making, similar to seeing the thickness of a book as you read through it. Elaborate graphical overviews can reduce comprehension (Salmerón et al. 2009).

We should include an alternative TOC for the typical reading order, as opposed to our communicaiton-based reading order. This could be useful for teachers. This should be in a seperate notes file, not a part of the book.

## Writting style

People love examples, we should ensure to include as many as possible.

The field is highly interdisiplinary, inspiration can be found in many new places, we should mention and link to related areas of study whenever possible.

I have always found that a short paragraph or two on the history of a topic or algorithm can help make it more memerable and humanizing. Talking about an equation in its platonic form is more concise and clear. I think we can have history in the intro, and when getting into the details we make things as concise as possible.



## Assumed audience

## Practice problems

Place practice problems at the end of each section. These are highly effective teaching tools. Retrieval practice outperformed restudying and every other comparison condition (Adesope et al. 2017; Dunlosky et al. 2013).

Include problems about previous sections to encourage spaced-repetition (shown to be very effective for learning). Interleaving material also improves problem solving (Rohrer & Taylor 2007).

Include worked examples alongside practice problems. Studying examples beats pure problem solving (Barbieri et al. 2023), and we note that self-explanation prompts do not work.

Answer sheet at end of book. Make sure there is enough cognitive effort to prevent quickly looking.

## Interviews

I want to interview professors and PhD students in the field to influence the chapters of this book. I am curious what got them excited about swarm stuff, what excites them now, and what topics they would love to see visualized. What would they be excited to show to their family or friends?

Professors I would additionally like to ask what they typically teach (can I get slides?) so I can see what figures they would be interested in.

Test-run the first two chapters with actual readers. Collect as much feedback as possible. These design decisions are currently based off research and my personal experience, but the best source of design constraints will be from real readers.

## References

Adesope, O. O., Trevisan, D. A., & Sundararajan, N. (2017). Rethinking the use of tests: A meta-analysis of practice testing. *Review of Educational Research*, 87(3), 659–701. https://doi.org/10.3102/0034654316689306

Alpizar, D., Adesope, O. O., & Wong, R. M. (2020). A meta-analysis of signaling principle in multimedia learning environments. *Educational Technology Research and Development*, 68, 2095–2119. https://doi.org/10.1007/s11423-020-09748-7

Amadieu, F., Tricot, A., & Mariné, C. (2009). Prior knowledge in learning from a non-linear electronic document: Disorientation and coherence of the reading sequences. *Computers in Human Behavior*, 25(2), 381–388. https://doi.org/10.1016/j.chb.2008.12.017

Barbieri, C. A., Miller-Cotto, D., Clerjuste, S. N., & Chawla, K. (2023). A meta-analysis of the worked examples effect on mathematics performance. *Educational Psychology Review*, 35, 11. https://www.danamillercotto.com/uploads/4/7/7/2/47725475/barbieri_et_al__2023__we_meta-analysis.pdf

Berney, S., & Bétrancourt, M. (2016). Does animation enhance learning? A meta-analysis. *Computers & Education*, 101, 150–167. https://doi.org/10.1016/j.compedu.2016.06.005

Boucheix, J.-M., & Schneider, E. (2009). Static and animated presentations in learning dynamic mechanical systems. *Learning and Instruction*, 19(2), 112–127. https://doi.org/10.1016/j.learninstruc.2008.03.004

Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. *Psychological Bulletin*, 132(3), 354–380. https://doi.org/10.1037/0033-2909.132.3.354

Clinton, V. (2019). Reading from paper compared to screens: A systematic review and meta-analysis. *Journal of Research in Reading*, 42(2), 288–325. https://doi.org/10.1111/1467-9817.12269

Conlen, M., Kale, A., & Heer, J. (2019). Capture and analysis of active reading behaviors for interactive articles on the web. *Computer Graphics Forum*, 38(3), 687–698. https://idl.cs.washington.edu/files/2019-IdyllAnalytics-EuroVis.pdf

de Koning, B. B., Tabbers, H. K., Rikers, R. M. J. P., & Paas, F. (2009). Towards a framework for attention cueing in instructional animations: Guidelines for research and design. *Educational Psychology Review*, 21, 113–140. https://doi.org/10.1007/s10648-009-9098-7

Delgado, P., Vargas, C., Ackerman, R., & Salmerón, L. (2018). Don't throw away your printed books: A meta-analysis on the effects of reading media on reading comprehension. *Educational Research Review*, 25, 23–38. https://doi.org/10.1016/j.edurev.2018.09.003

DeStefano, D., & LeFevre, J.-A. (2007). Cognitive load in hypertext reading: A review. *Computers in Human Behavior*, 23(3), 1616–1641. https://doi.org/10.1016/j.chb.2005.08.012

Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving students' learning with effective learning techniques. *Psychological Science in the Public Interest*, 14(1), 4–58. https://doi.org/10.1177/1529100612453266

Dyson, M. C., & Haselgrove, M. (2001). The influence of reading speed and line length on the effectiveness of reading from screen. *International Journal of Human-Computer Studies*, 54(4), 585–612. https://doi.org/10.1006/ijhc.2001.0458

Fouh, E., Breakiron, D. A., Hamouda, S., Farghally, M. F., & Shaffer, C. A. (2014). Exploring students' learning behavior with an interactive etextbook in computer science courses. *Computers in Human Behavior*, 41, 478–485. https://people.cs.vt.edu/shaffer/Papers/Exploring_students_learning_behavior_wit.pdf

Ginns, P. (2006). Integrating information: A meta-analysis of the spatial contiguity and temporal contiguity effects. *Learning and Instruction*, 16(6), 511–525. https://doi.org/10.1016/j.learninstruc.2006.10.001

Gottlieb, M. A., & Pfeiffer, R. (2013). *The Feynman Lectures on Physics, New Millennium Edition* (online HTML edition). California Institute of Technology. https://www.feynmanlectures.caltech.edu/

Hannebauer, C., Hesenius, M., & Gruhn, V. (2018). Does syntax highlighting help programming novices? *Empirical Software Engineering*, 23, 2795–2828. https://doi.org/10.1007/s10664-017-9579-1

Hartl, M. (2013). Comments on the HTML edition of the Feynman Lectures. *Hacker News*. https://news.ycombinator.com/item?id=6380187

Hegarty, M., Kriz, S., & Cate, C. (2003). The roles of mental animations and external animations in understanding mechanical systems. *Cognition and Instruction*, 21(4), 325–360. https://doi.org/10.1207/s1532690xci2104_1

Höffler, T. N., & Leutner, D. (2007). Instructional animation versus static pictures: A meta-analysis. *Learning and Instruction*, 17(6), 722–738. https://doi.org/10.1016/j.learninstruc.2007.09.013

Hohman, F., Conlen, M., Heer, J., & Chau, D. H. (2020). Communicating with interactive articles. *Distill*. https://doi.org/10.23915/distill.00028

Kalyuga, S. (2007). Expertise reversal effect and its implications for learner-tailored instruction. *Educational Psychology Review*, 19, 509–539. https://doi.org/10.1007/s10648-007-9054-3

Kirschner, P. A., Sweller, J., & Clark, R. E. (2006). Why minimal guidance during instruction does not work: An analysis of the failure of constructivist, discovery, problem-based, experiential, and inquiry-based teaching. *Educational Psychologist*, 41(2), 75–86. https://doi.org/10.1207/s15326985ep4102_1

Legge, G. E., & Bigelow, C. A. (2011). Does print size matter for reading? A review of findings from vision science and typography. *Journal of Vision*, 11(5), 8. https://doi.org/10.1167/11.5.8

Mayer, R. E. (2021). *Multimedia Learning* (3rd ed.). Cambridge University Press. https://doi.org/10.1017/9781316941355

Mayer, R. E., Hegarty, M., Mayer, S., & Campbell, J. (2005). When static media promote active learning: Annotated illustrations versus narrated animations in multimedia instruction. *Journal of Experimental Psychology: Applied*, 11(4), 256–265. https://doi.org/10.1037/1076-898X.11.4.256

McDonald, S., & Stevenson, R. J. (1998). Effects of text structure and prior knowledge of the learner on navigation in hypertext. *Human Factors*, 40(1), 18–27. https://doi.org/10.1518/001872098779480541

Nanavati, A. A., & Bias, R. G. (2005). Optimal line length in reading: A literature review. *Visible Language*, 39(2), 120–144.

Nielsen Norman Group. (2014). *Accordions are not always the answer for complex content on desktops*. https://www.nngroup.com/articles/accordions-complex-content/

Nielsen Norman Group. (2021). *Tabs vs. accordions: When to use each*. https://www.nngroup.com/videos/tabs-vs-accordions/

Okabe, M., & Ito, K. (2008). *Color Universal Design (CUD): How to make figures and presentations that are friendly to colorblind people*. https://jfly.uni-koeln.de/color/

Piolat, A., Roussey, J.-Y., & Thunin, O. (1997). Effects of screen presentation on text reading and revising. *International Journal of Human-Computer Studies*, 47(4), 565–589. https://doi.org/10.1006/ijhc.1997.0145

Ploetzner, R., Berney, S., & Bétrancourt, M. (2020). A review of learning demands in instructional animations: The educational effectiveness of animations unfolds if the features of change need to be learned. *Journal of Computer Assisted Learning*, 36(6), 838–860. https://doi.org/10.1111/jcal.12476

Rey, G. D. (2012). A review of research and a meta-analysis of the seductive detail effect. *Educational Research Review*, 7(3), 216–237. https://doi.org/10.1016/j.edurev.2012.05.003

Rey, G. D., Beege, M., Nebel, S., Wirzberger, M., Schmitt, T. H., & Schneider, S. (2019). A meta-analysis of the segmenting effect. *Educational Psychology Review*, 31, 389–419. https://doi.org/10.1007/s10648-018-9456-4

Richter, J., Scheiter, K., & Eitel, A. (2016). Signaling text-picture relations in multimedia learning: A comprehensive meta-analysis. *Educational Research Review*, 17, 19–36. https://doi.org/10.1016/j.edurev.2015.12.003

Richter, J., Scheiter, K., & Eitel, A. (2018). Signaling text-picture relations in multimedia learning: The influence of prior knowledge. *Journal of Educational Psychology*, 110(4), 544–560. https://doi.org/10.1037/edu0000220

Rohrer, D., & Taylor, K. (2007). The shuffling of mathematics problems improves learning. *Instructional Science*, 35, 481–498. https://doi.org/10.1007/s11251-007-9015-8

Salmerón, L., Baccino, T., Cañas, J. J., Madrid, R. I., & Fajardo, I. (2009). Do graphical overviews facilitate or hinder comprehension in hypertext? *Computers & Education*, 53(4), 1308–1319. https://doi.org/10.1016/j.compedu.2009.06.013

Sarkar, A. (2015). The impact of syntax colouring on program comprehension. *Proceedings of the 26th Annual Conference of the Psychology of Programming Interest Group*, 49–58. https://ppig.org/files/2015-PPIG-26th-Sarkar1.pdf

Schroeder, N. L., & Cenkci, A. T. (2018). Spatial contiguity and spatial split-attention effects in multimedia learning environments: A meta-analysis. *Educational Psychology Review*, 30(3), 679–701. https://doi.org/10.1007/s10648-018-9435-9

Soiffer, N. (2016). Browser support for MathML and accessible mathematics. *Proceedings of the 13th Web for All Conference*. (See also the W3C MathML Accessibility Gap Analysis.) https://www.w3.org/TR/maths-a11y-gap/

Sundararajan, N., & Adesope, O. (2020). Keep it coherent: A meta-analysis of the seductive details effect. *Educational Psychology Review*, 32, 707–734. https://doi.org/10.1007/s10648-020-09522-4

Thomas, A. F., Carr, R., & Guo, J. (2024). Color-coding equations and diagrams in introductory mechanics. *arXiv preprint*. https://arxiv.org/abs/2411.14605

Tversky, B., Morrison, J. B., & Bétrancourt, M. (2002). Animation: Can it facilitate? *International Journal of Human-Computer Studies*, 57(4), 247–262. https://doi.org/10.1006/ijhc.2002.1017

W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*, Success Criterion 1.4.1 Use of Color. https://www.w3.org/TR/WCAG22/#use-of-color

W3C. (2025). *MathML 4 — the `intent` attribute*. https://www.w3.org/TR/mathml4/

Wallace, S., Bylinskii, Z., Dobres, J., Kerr, B., Berlow, S., Treitman, R., Kumawat, N., Arpin, K., Miller, D. B., Huang, J., & Sawyer, B. D. (2022). Towards individuated reading experiences: Different fonts increase reading speed for different individuals. *ACM Transactions on Computer-Human Interaction*, 29(4), 38. https://doi.org/10.1145/3502222

Wieman, C. E., Adams, W. K., & Perkins, K. K. (2008). PhET: Simulations that enhance learning. *Science*, 322(5902), 682–683. https://doi.org/10.1126/science.1161948

Wong, R., et al. (2025). Is pagination better than scrolling when reading on a phone? *Extended Abstracts of the CHI Conference on Human Factors in Computing Systems*. https://doi.org/10.1145/3706599.3720178
