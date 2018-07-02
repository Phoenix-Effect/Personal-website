---
title: "Center for Evolution and Medicine"
date: 2017-06-01T01:10:49-07:00
draft: false
project_type: "Website"
short_desc: "Website for research center at ASU. Rebuilt from scratch using drupal and
            ASU brand guidelines with a custom built RSVP system."
tech: ["php", "drupal", "javascript"]
live: "http://evmed.asu.edu/"
thumbnail: "cem-thumb.jpg"
---

Center for Evolution is a research unit under college for libral arts and sciences. CEM required a revamp of their website in order to comply with ASU brand guidelines with its content being linked to other ASU departments.

---

## Requirements
* Website has to comply with ASU brand guidelines which includes accessibility guidelines.
* Events and news on the website is pulled from ASU now and ASU events website.
* An intuitive RSVP system for events with export options.
* Users should be able to log in using their ASURITE ID.
* A blog section where faculty can publish their blog articles.
* A videos section where videos can be sorted by category.
* Newsletter subscription form and integration with salesforce.
* Faculty and staff page that pulls content from ASU iSearch directory.

---

## Solution
### Toolbox

* **Drupal:** Since most of the websites under CLAS are made with Drupal, it is relatively easy to get support for Drupal compared to any other platform. Most of ASU plugins are also exclusively developed for Drupal only.
* **ASU Webspark:** This is a bundle that consists of ASU brand theme for drupal and all the plugins required to setup a center or school website.
* **Pantheon:** With custom upstream for ASU Webspark, pantheon is the go to choice for host when building ASU sites with drupal.
* **Airtable:** Airtable was used to store a copy of all the form submissions since navigating salesforce can sometimes be a daunting task.

### Implementation

The project took about 3 months, mostly because I was not familiar with Drupal or ASU guidelines for anything. I spent about a month researching what was possible with what plugin. Another difficult task was using the ASU webspark theme and plugins since they were designed for very specific tasks and their documentation was limited. In the end I ended up designing a few custom solutions along with a custom made ajax based salesforce subscription form.

