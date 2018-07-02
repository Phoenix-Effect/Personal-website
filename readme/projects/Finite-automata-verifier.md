# Finite automata verifier

## Overview
The goal of this program is to check whether a system meets it specifications or not. This program takes in two FA A = System automaton, B = Specifications automaton and if they are NFAs then it converts them to DFAs using Gallier's subset construction. It then generates an intersection between A and compliment of B and finds strings in the new language. If a string exists in the new language it means the system does not meet the specifications.

## How to use
### Compiling
The program is written in C++ and requires g++ to compile. A makefile is included in the program so the program can be compiled by going into the directory and running the command `make`. The make file generates a file with name `optionalProject` which can be executed directly.

### Input
The program takes input from stdin by default which can be redirected through the terminal `./optionalProject < inputText.txt`. This can be changed using the program config.

Here is a sample of valid input:

```
% Input alphabet
a 
b
% Specification automaton  
% Transition function
1 b 1
1 b 2
2 a 2
2 b 3
3 a 3
3 b 3
% Initial state
1
% Final states
1
2
% System automaton
% Transition function
1 a 2
1 b 3
2 a 2
3 a 1
3 a 4
4 a 4
4 b 3
% Initial state
1
% Final states
3
4
 ```

### Output
The program outputs 2 files by default (this behavior can be changed through program config).

1. **ASUAD\_Milestone2\_M.txt** - Which contains the intersected machine.
2. **ASUAD\_Milestone2\_str.txt** - Which contains the shortest string in the new intersected machine.

For ease of debugging the program also contains 4 html files which has 4 javascript files embedded in them. The 4 javascript files are generated by the program at runtime and they contain a visual representation of the system, specification, compliment of specification and the intersected automaton. These files are located in the `/visualize` sub-folder.

![graph screenshot]( /~saghafoo/images/graph.screenshot.png "Screenshot of graph") 
##### The program uses [vis.js link](http://visjs.org/) to generate the graphs. 

Where orange node is initial, green nodes are accepting and grey nodes are default. 

### Program config
For ease of use I've grouped up all of the important values in the same place which might help with testing and debugging the program. The config box is in the **main.cpp** file start from line 24 and ending at line 30.


  * **takeInputFromFile** - bool - *(default: false)* - Allows you to hardcode the path to the input file within the program. If set to true then **inputFilePath** also needs to be defined.
  * **inputFilePath** - string - *(default: "")* - Absolute path to the input file. **takeInputFromFile** needs to be set to true to make the program use this. The type of slashes in the absolute are determined by your OS. (forward slashes for MAC OS, double backslashes for windows).
  * **printEpsilonInsteadOfEmptyString** - bool - *(default: true)* - Prints out the string "epsilon" instead of an empty string "" which can help visually to see whats going on.
  * **deadStateName** - string - *(default: "Dead-State")* - Since the dead-state is technically not a subset of the set of states of the NFA, a new 'dead state' needs to be added in order to successfully construct a DFA. This value lets you set the name of that dead state. 
  * **nicefyNames** - bool - *(default: true)* - Generate integer names for the new states in intersected automaton. If set to false then shows the intersected names which are something like `12SYS##SP23` which means state 1,2 of the system automaton intersected with state 2,3 of the specifications automaton. Useful when debugging. 

  The colors of the output graph can be changed by going to helper.h file and editing values on line 52-55. The values are as follows. 
  * **initColor** Color of the initial state.
  * **defColor** Color of default nodes i.e. nodes that are neither accepting nor initial.
  * **accColor** Color of accepting nodes.
  * **initAccColor** Color of nodes that are both accepting and initial. *Note: Nodes that are both accepting and initial have green outlines. This behavior can be changed on line 73*

#### Notes:
  * The program gives parameter mismatch errors in some compilers but still compiles fine. It has been tested on my local computer and ASU general server where it compiled without any issue.
  *  If console is used for input then you need to press Enter twice since the program looks for an empty line before it starts parsing.
  * On OSX The html graphs have the best performance on Safari. Your experience might vary.  