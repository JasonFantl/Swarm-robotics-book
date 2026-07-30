

The design philosophy is based in large part on my personal experience reading textbooks, but I have also made some design decisions based on the existing research.

## Text format

Book will be html/css/js files, should be viewable on any device. Potentially one giant html file for easy viewability.

This means it should be viewable on devices will all viewing ratios, including phones. The main target is computer screens, as that is the majority of readers. By using html and hyperlinks we should easily support touch navigation and mouse navigation. Interactive animaitons should be tested for touch interaction.

A print version is considerded. It would require replacing animations with select frames, and removing the interactive sections.

Text size, spacing, margin, font, and related should be normal internet defaults, they are this way for a reason. And since this is all hmtl, it shouldnt be too hard to let readers change the css themselves.

Figure descriptions should be html, keep it copy-pastable and searchable.

Pseudocode should be color coded, it already hard to read.

Figures refernces by the text should be near each other. Do not place figures in a different place then the text. I don't know why some textbooks do this.

Any reference to other material in the book should be hyperlinked, and we should test that people can easily go forward and backward. I think each paragraph can be linked to. Do browsers store your locaiton when you go back and forward?

We will not use drop-down menus. It has been shown that almost nobody expands these. In general, readers rarely click on things, they just scroll. It also makes it dificult to ctrl-f.

Asides will not be included, even in bubbles or drop-downs. It has been shown that students perform best with a clear and uncluttered read-through. I would like to have a seperate file with comments and further exploration that links into the book, so the option exists to explore further, but it points to the book from the outside.

Add links to all refernces if possible. The book reference will take you to the bib, and the bib should have a link.

### Equations

Make sure to number the important equations so we can refernce them. Ideally this is handled in our build step and the equations have names for internal reference.

Add color to equations to match terms of equations of markers in figures. Use a color-vision-deficiency-safe palette.

Equations/math in general should be copy-pastable. It also needs to be easy to read. This means tex rendering with a copy-option. Also test for voice-to-text, makes it more accessable. This is apparently [difficult](https://news.ycombinator.com/item?id=6380187), need to be careful how I format the equations.
=> It seems that a javascript handler might the best way to do this, see `Tooling/Experiments/equations-copy-paste`

## Figures

Text gives the author the most framing power, but it can be boring.

Figures are powerful for concepts that are in any way visualizable.

Animations are good for concepts that contain a temporal element. But, animaitons also provide the least pedogolocial effect. Animations should primarily be used to entertain/inspire, not teach. Consider carefully if we can replace an animation with 2-3 frames of figures, which has been shown to be a better pesogological tool (it requires readers to animate the concept in their imagination, which leads to better learning outcomes). Even if they only serve to entertain/inspire, I feel textbooks would benifit from more of them, too many textbooks are boring and hard to read.

As an aside, Educational Youtube has been shown to be effective in introducing more people into complex areas of study. Friendly animations can be a strong tool to introduce students to concepts which they can later learn in depth from dense textbooks. This also provides more motivation for students when learning the difficult parts of a field, which I have too often seen introduced before the application. I feel introductory textbooks could learn from Educational Youtube.

Interactive figures I have personally found to be poor teaching tools. They do not provide enough framing from the author, and I often find myself lost. For this reason, I think they are useful only at the end of a chapter, where a reader can explore the space after they have learned the main concepts.


Figues/animations should be video files with the source code available to copy. Most people just want to copy a figure to their own work, they should not have to screen capture. For the small group who want to modify the figure to their use case, the code should be available (all self-contained as usual).

It is common for students to first skim the chapter and just look at the figures. Ideally the figures should present the story of chapter on their own, then the text provides the finer details. THis should naturally occur, but it is worth double checking if a chapter makes sense looking only at the title and figures.

Avoid text in figures, makes it more acessable for an international audience. Place all text in the description (which is html).

Make as many of the figures SVGs as possible, much cleaner.

## Book layout & navigation

This is targeted at novices in the field, for whom it has been shown that a strict linear reading order is most effective. Each chapter and section will be its own file, so it could in theory be a graph or tree, but we will stick to a linear reading order with chapters and sub-sections.

Long scrolling pages are difficult to navigate as you can lose your place easily and it is hard to navigate to a section you are looking for. We want to segment the secitons as much as possible into seperate pages that a user can navigate between.

Keep the section lengths as small as possible. A single page is acceptable, 2-3 pages is ideal, longer is not desirable.

There will also be a single-page version, this is easier to ctrl-f to find content in.

A wonderful example of this structure (and lots of visuals) at https://www.feynmanlectures.caltech.edu/.

We want to make sure the book is easy to navigate. We could add javascript to make a navigation bar, but I also want this to be as portable as possible, and a nav bar might act strange. Instead we shoudl keep the navigation as simple as possible: A page for the table of contents, each section is a page, links from each section to the table of contents (at the chapter we are in) and links to the next and previous section. We may not even need the next/prev buttons, navigating to the TOC is minimal work and allows the reader to track easily the progress they are making, similar to seeing the thickness of a book as you read through it.

## Practice problems

Place practive problems at the end of each section. These are highly effective teching tools.

Include problems about previous sections to encourage spaced-repition (shown to be very effective for learning).

Answer sheet at end of book. Make sure there is enough cognative effort to prevent quickly looking. 

## Interviews

I want to interview professors and PhD students in the field. I am curious what got them excited about swarm stuff, what excites them now, and what topcis they would love to see visualized. What would they be excited to show to their family or friends?

Profssors I would additionally like to ask what they typically teach (can I get slides?) so I can see what figures they would be interested in.



## References

A Meta‑analysis of the Worked Examples Effect
on Mathematics Performance
https://www.danamillercotto.com/uploads/4/7/7/2/47725475/barbieri_et_al__2023__we_meta-analysis.pdf
