---
title: Example report
---

## The Space Shuttle era

```js
import {timeline} from "./components/timeline.js";
```

```js
const events = FileAttachment("./data/events.json").json();
```

```js
timeline(events, {height: 300})
```
