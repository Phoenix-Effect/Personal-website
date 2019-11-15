---
title: "Online bingo"
date: 2019-11-14T23:33:56-07:00
project_type: "Website"
draft: false
short_desc: "Simple bingo website that lets you host your very own bingo party with a computer."
tech: ["python", "InDesign", "javascript"]
live: "bingo"
code: "https://github.com/Phoenix-Effect/Online-Bingo"
thumbnail: "bingo-thumb.jpg"
---

Simple bingo website that lets you host your very own bingo party with a computer. The code has two components

## Cards
* `num_gener.py` Lets us generate a csv with 24 random numbers between 1-75 per row. 
* `bingocards.csv` Output produced by our python number generator.
* `Bingo page.indd` This is a template for indesign that contain variables. Using data merge with our csv file we can produce our bingo cards.
* `Bingo page.pdf` Output produced by InDesign data merge.

## Generator
Generator is the web component the code. It is a simple website that generates numbers between 1-75 for our bingo. It has a small animation and keeps track of previously generated numbers. To run the generator simply download the code and run `index.html` in generator folder.