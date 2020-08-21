# Merthew's Text Adventure Game Engine - MTAGE

Website: https://merthew-game.surge.sh/

## How to use:

1. Download the file `save1.msf` from the folder "Save Tests"
2. Go to the link above
3. Chose `save1.msf` as the file to upload.
4. Make changes to the file, then reupload to test your changes.
5. Have fun making Text Adventure Games

### IMPORTANT

```
Syntax for save files:
===========================================================
startupMessage    = <T><T> 
optionText        = <"0"><"0"> where 0 is the index of the entry.
optionAddition    = <'0'><'0'> where 0 is the index of the entry.
optionGroups      = <:0:>1,2<:0:> where 0 is the index of the group, and 1,2 is the list of the entries separated by commas
random selection  = <[>option 1,option 2<]> Only used in optionAddition
===========================================================
Overrides are done by the last conflicting thing in the file being chosen.
Important sections of the text are denoted by <!></!> and will show up as blue text.
Newline characters are denoted as \n and ONLY usable in the optionAddition tag.
```
