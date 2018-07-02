---
title: "Molecular Epidemiology Analytics Core"
date: 2018-07-01T01:39:16-07:00
draft: false
short_desc: "ASU branded website for a lab with custom built ordering forms, pdf invoice generator 
            with MEAC letterhead and ASU branded transactional emails."
project_type: "Website"
tech: ["php", "wordpress", "pdf"]
live: "http://meac.asu.edu/"
---

MEAC is a lab at ASU which does biomarker analysis on given samples. People from other universities can also send in their samples and get them tested.

---
## Requirements
A website where users can

* Get information about lab equipment and the types of tests the lab does.
* View pricing of the lab and get a quick estimate of price base on their type of testing and number of samples.
* Place online order, view order status and get results online.
* Receive email updates on order status change. 
* A control panel where they can view all past orders, their status and invoices.

and administrator can

* View status of all current and past orders.
* Change status of any order while automatically informing the customer.
* Generate invoice with the ability to apply custom discounts and coupons.
* A ledger to view reports of monthly or annual sales and profits.

and 

* The website needs to follow ASU brand guidelines.
* Be accessible.
* Hosted on ASU approved platform.

---

## Solution
### Toolbox

* **Wordpress:** For quickly creating content pages along with **Gravity Forms** plugin to make a price calculator and ordering forms.
* **WooCommerce:** For keeping track of all orders and making user control panel.
* **Sendgrid:** For sending out all transactional emails and getting delivery reports.
* **Dompdf:** PHP library used to convert HTML invoices to PDF. 
* **Pantheon:** Hosting platform that comes with version control and feature branching used to deploy and host the website.

### Implementation
The project took about a month, most of which was spent on research and testing. I wrote about 600 lines of code to implement the functional requirements and around 400 for non-functional requirements like styling the content. Since in a typical ecommerce website an order is shipped out by the store I had to modify the workflow of orders and add new order statuses as appropriate. Since the lab only accepts payment in checks I did not have to add any online payment gateway. I spent most of the time making sure the order workflow made sense for both the administrator and the customer and that transactional emails went out when they were supposed to. 
