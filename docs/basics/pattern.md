## Idea and Motivation

The basic idea of a pattern library is to provide the basis for consistent UI development.

In total we gain:

- **Efficiency**: Instead of repeatedly building similar components from scratch, Design Systems enable designers & developers to reuse components and thereby increase efficiency.
- **Consistency**: Design Systems introduce a shared set of principles and rules to build components. It becomes much easier to create consistent experiences across different platforms.
- **Scale**: Increased efficiency and consistency lead a company to build faster products at scale.
- **Alignment**: A Design System that responds to the needs of all platforms drives product alignment. Companies make sure their product is consistent on iOS, Android, and web.
- **Speed**: Design Systems provide a shared library of reusable components and guidelines. Building products becomes much faster.
- **Gaining time**: As building products becomes faster, designers gain time they can invest in other areas. Companies invest more in understanding users and their needs. There's more space for exploration because designers are no longer reinventing the wheel.

## Motion Pattern

We use motion not for fancy effects, but rather to point the user in the right direction and to create a vivid and fluid user experience.

### Principles

The Motion Design Patterns will describe some high level principles along with a few speciﬁc guidelines for the design of motion in our interface components. Please use them as a reference but deviations and adjustments are desired when necessary!

- **Functional**: Motion within interactions should be meaningful and conscious. It is used to establish hierarchy and draw the user's attention to essential elements, giving them an understanding of an object's role within the design. To communicate specific meaning and relationships between objects or events, the motion needs to be fast, direct, and precise.
- **Familiar**: Motion design should reflect movements we ﬁnd in the physical world around us. This derivation creates repetition and consistency, which allows users to predict what comes next. Providing motion feedback can help guide the user's workﬂow, creating a clear path towards their end goal.
- **Inconspicuous**: Motion should feel like a natural part of the interaction. When applied properly, motion goes unnoticed.

### Easing

Standard: `cubic-bezier(0.5, 0, 0.1, 1)`

This standard easing function is used for the majority of animations. Acceleration and deceleration appear asymmetrically to feel natural and light used, e.g., for opacity .

![Standard easing](ease-standard.png)

Ease-out: `cubic-bezier(0, 0, 0.25, 1)`

Mainly used for adding elements to the stage or changing on-screen states at a users' input, e.g., `Modal`, `DropdownField`, `Accordion`.

![Outfading ease](ease-out.png)

Ease-in: `cubic-bezier(0.25, 0, 1, 1)`

The ease-in cubic-bezier is used primarily for removing elements from the screen, e.g., toast `Notiﬁcation` or mobile components.

![Introducing ease](ease-in.png)

### Timing

The following duration times should be used for the whole animation.

| Duration     | Type                   |
| ------------ | ---------------------- |
| 100 - 200 ms | Buttons                |
| 200 - 250 ms | Expand UI components   |
| 300 ms       | Alerts / notifications |
| 300 - 400 ms | Popups / modals        |
