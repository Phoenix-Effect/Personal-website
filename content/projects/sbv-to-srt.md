---
title: "SBV to SRT converter"
date: 2018-10-13T22:37:36-07:00
project_type: "Programming"
draft: false
short_desc: "A simple browser based javascript subtitles converter from SBV to SRT."
tech: ["javascript", "html"]
live: "sbv-to-srt"
code: ""
thumbnail: "subtitles.jpg"
---

This is a simple subtitles format converter and was created because I could not find one. It purposely does not require any clicks because according to my colleague all new tools just add extra work. Who's wrong now eh?

Here is the conversion algorithm
```
function sbvToSrt(text){
    var str = text.replace(/^\s+|\s+$/g, '');
    var addLine = "\n" + str;
    var split = addLine.split("\n");
    var size = split.length;
    var nSub = "";
    var num = 0;
    var lineNum = 0;

    for(var i = 0; i < size; i++){
        if(lineNum === 0){
            nSub += "\n" + num.toString() + "\n";
            num++;
            lineNum++;
        } else if(lineNum === 1){
            var temp = split[i];
            temp = temp.replace(",", " --> ");
            temp = temp.replace(".", ",");
            nSub += temp + "\n";
            lineNum++;
        } else if(lineNum === 2){
            nSub += split[i] + "\n";
            lineNum = 0;
        }
    }

    nSub += "\n";
    nSub = nSub.substring(1);

    return nSub;
}
```