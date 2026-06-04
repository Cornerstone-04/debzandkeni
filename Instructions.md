# Debs & Keni Website Instructions

You are helping me build a very personal, emotionally rich website for someone I am currently working with.

Context:  
I work with Keniye Koroye across KNK Labs, Kelvar Industries, and Drink Umbrella / Umbrella Ogogoro. This project is personal to him, not just another business website. Keniye recently shared that his girlfriend, Debz, is 8 weeks pregnant with twins. Their expected delivery date is January 2027.

He asked me to build something creative for them. The domain is:

[www.debzandkeni.com](http://www.debzandkeni.com/)

The project name is:

The Debz & Keni Timeline

This website should feel like a beautiful, interactive digital keepsake that tells the story of how Debz and Keni met, how their relationship began, and how their journey is now becoming a family of four.

This should NOT feel like a generic pregnancy announcement website. It should also NOT be overly futuristic, robotic, or nerdy. Keni likes sci-fi and technology, especially things like I, Robot, Ready Player One, and Upgrade, but we want the design to feel tasteful, emotional, romantic, modern, and cinematic rather than looking like a hacker dashboard or sci-fi control panel.

Core creative direction:  
Build a 2.5D scroll-driven timeline experience using depth-field parallax scrolling. The user should feel like they are scrolling through time, not simply scrolling through sections on a page.

The website should feel like:

- A moving storybook
- A cinematic timeline
- A romantic celestial journey
- Subtle sci-fi, but not heavy sci-fi
- Emotional first, technical second

Avoid:

- Robots
- Matrix code
- Hacker UI
- Overloaded neon
- Hard sci-fi dashboards
- Too much “AI generated” visual language
- Generic baby website templates

Preferred visual language:

- Soft celestial backgrounds
- Stars
- Light trails
- Warm gradients
- Floating memories
- Glassmorphism cards
- Smooth parallax layers
- Illustrated mini characters for Debz and Keni
- Subtle timeline glow
- Clean typography
- Rich but lively colors
- Cinematic design, not a dark cyberpunk look

The timeline:  
The story begins on December 31st, 2025, when Debz and Keni met on New Year’s Eve.

The timeline should run from:  
December 31, 2025 → June 3, 2026 → January 2027

Known story facts:

- Debz and Keni met on New Year’s Eve, December 31st, 2025.
- As of June 3rd, 2026, Debz is 8 weeks pregnant.
- They are expecting twins.
- Expected delivery is January 2027.

Main story arc:  
Two people met on the final night of the year.  
They started a new timeline together.  
Without knowing it at the time, that meeting would eventually lead to four lives becoming connected.  
The website should reveal this gradually.

Suggested page structure:  
This should be a single-page narrative experience.

1. Opening / New Year’s Eve
2. First Contact
3. Growing Together
4. Something Changes
5. The Twin Reveal
6. Journey to January 2027
7. The Beginning of Everything

Important:  
The timeline should be the visual backbone of the website. It should never feel like separate disconnected sections. The user should feel like they are moving along one continuous story path.

Section 1: New Year’s Eve / Two Trajectories Intersect  
This is the most important opening scene.

Scene idea:

- Two mini illustrated characters representing Keni and Debz start on opposite sides of the screen.
- A photo of them can be used as a central memory or later reveal.
- Animated stars in the background.
- Coordinates and location can appear subtly.
- A countdown clock should be frozen around midnight.
- As the user scrolls, the characters move closer to each other.
- The stars, sky, and foreground layers should move at different speeds to create a depth-field parallax effect.
- When the characters meet at the center, the clock reaches or freezes at 00:00:00.
- Text appears:

“Unknown at the time, this moment would alter four lives forever.”

Then the timeline should flow naturally into section 2.

Parallax behavior:  
Use layered 2.5D effects, not actual 3D unless absolutely necessary.

Possible layers:

- Far background: stars, constellations, moon
- Mid background: soft clouds, particles, gradients
- Main layer: glowing timeline path
- Foreground: Keni and Debz illustrated characters
- Floating layer: photos, videos, memory cards

Each layer should move at a different scroll speed to create depth.

Section 2: First Contact  
After Debz and Keni meet, the characters should now continue together along the timeline.

Photos/videos/messages can appear as floating memory cards. These should feel like memories being discovered as the user scrolls.

Section 3: Growing Together  
The timeline becomes warmer and richer. More memory cards appear. The two characters remain together. The scroll movement should continue to feel like a journey.

Section 4: Something Changes  
Around May/June, the pacing should slow down. The timeline can begin to pulse subtly, almost like a heartbeat. There should be a feeling that something important is about to be revealed.

Section 5: The Twin Reveal  
This is the emotional high point.

An ultrasound image should appear as a central reveal.

The single timeline should split into two paths to represent the twins.

Possible text:  
“The future doubled.”

or

“The timeline opened into two new paths.”

Avoid making this section feel like a medical dashboard. It should feel emotional, beautiful, and surprising.

Section 6: Journey to January 2027  
After the twin reveal, the timeline continues toward January 2027.

The future months can appear as checkpoints:

- July 2026
- August 2026
- September 2026
- October 2026
- November 2026
- December 2026
- January 2027

Some content can be locked or placeholder-based for now because Keni will send more photos and videos over time.

Possible future content:

- More ultrasound photos
- Bump photos
- Gender reveal
- Baby shower
- Nursery updates
- Personal messages
- Family memories

Section 7: January 2027 / The Beginning of Everything  
This should not feel like “the end.”  
It should feel like the beginning.

Possible text:  
“January 2027”  
“The beginning of everything.”

Before the babies are born, this section can show a countdown to the expected delivery date.  
After birth, it can be updated with baby photos, names, times of birth, weights, etc.

Technical recommendation:  
Build this with:

- Next.js
- TypeScript
- Tailwind CSS
- GSAP ScrollTrigger
- Lenis for smooth scrolling
- Framer Motion where useful for smaller UI transitions
- Optional: React Spring if needed, but do not overcomplicate it

Avoid Three.js for now.  
This should be a 2.5D parallax experience, not a full 3D WebGL site. Three.js should only be considered later for one special moment if needed, but the initial build should not depend on it.

Development approach:  
Do not try to build the full website all at once.

Start with the first scene only:

- New Year’s Eve opening
- Parallax background layers
- Two characters on opposite sides
- Characters move closer on scroll
- Countdown freezes at midnight
- Text reveal
- Smooth transition into the next timeline section

Once Scene 1 feels magical, use that as the motion/design pattern for the rest of the website.

Implementation requirements:

- Use reusable timeline data objects so new events can be added easily.
- Support photos and videos as media items.
- Make the website responsive, especially for mobile.
- Performance matters because family and friends may open it on phones.
- Use lazy loading for media.
- Keep animations smooth but not overwhelming.
- Respect reduced-motion preferences.
- Use accessible semantic HTML where possible.
- Keep the design premium, emotional, and clean.

Suggested data structure:  
Create a data file for timeline events with fields like:

- id
- title
- date
- chapter
- description
- media
- mediaType
- position
- locked
- future

Suggested components:

- TimelinePage
- ParallaxScene
- TimelinePath
- CharacterPair
- MemoryCard
- TimelineCheckpoint
- TwinReveal
- CountdownToArrival
- MediaCapsule
- ChapterTitle

Tone of the website:  
Personal.  
Cinematic.  
Tender.  
Beautiful.  
Slightly magical.  
Subtly technological.  
Not cheesy.  
Not childish.  
Not overly nerdy.

The website should make people feel like they are witnessing the origin story of a family.

Core line to guide the build:  
“A scroll-driven timeline where two lives converge, become one journey, and then open into two new paths before arriving at January 2027.”

Please build this as a polished, production-quality Next.js project with clean code, reusable components, thoughtful animation architecture, and a strong first-scene prototype before expanding the remaining sections.