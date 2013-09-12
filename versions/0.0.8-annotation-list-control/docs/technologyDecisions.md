

# Technology Decisions For The CATCH UI

Outlines what libraries and frameworks were chosen and why.

## Grid Control / Library

SlickGrid is the leading candidate, because:
- It seems to nicely decouple presentation from data management, not trying to solve ajax loading, etc., which we want to be done in the MVC, not in the grid control
- It seems to have the largest ecosystem among open-source JQuery-compatible grid controls

[More detail and links for grid libraries](./gridReview.md) that were evaluated

## [MVC Framework](./mvcReview.md) - more detail on front-end frameworks that were evaluated

Angular is the leading candidate:
 - easy to implement quickly
 - big and growing ecosystem, supported by Google

Ember may also be a good choice. It's a heavy-duty, opinionated framework designed for complex apps that people spend a lot of time in. As such it may result in a better-engineered product at the expense of additional development time.

[More detail and links for MVC frameworks](./mvcReview.md) that were evaluated

