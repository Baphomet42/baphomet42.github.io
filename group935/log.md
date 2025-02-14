# Entry 741021

To ensure a consistent feel, try to stick to these guidelines.

## New Game/Map

+ New game:
    + Add info to `group935/data.json`
    + Place jpg in `group935/assets/<id>.jpg`
+ New map:
    + Create folder `group935/zm/<id>/`
        + Copy `index.html` from another map and change the map name in the `<head><title>`
        + Copy `data.json` from another map and set the `id` and `name`. Remove most other data.
            + Set `"wip": true`
        + Create `icon.jpg` using rules below
    + Edit `group935/data.json` to add map to game(s)
        + Set `id` and `name`, and optionally `img_alt`
        + Add `"wip": true`

## Guide Steps

+ Test everything in game
+ Include screenshots for almost everything
+ Compare to COD fandom
    + Make sure steps seem consistent
    + Use similar terminology
+ Use in-game names
    + Common names (like `Fire Bow` can be used in addition to the in-game name)

## Guide Screenshots

+ Files
    + 1920x1080 png converted to jpg with 70% quality
    + Add red arrow only when needed and helpful
    + All images should be stored on site (no links)
+ Ingame
    + FOV 100
    + Disable HUD and crosshair
        + Some screenshots may show gun/crosshair/etc if helpful
        + Minimap can be shown if useful

## Map Selection Pictures

+ Currently mostly from COD fandom
    + Maps in multiple games can have different image (and name) depending on game
+ Scale image min length to 320, trim canvas to square, and adjust to fit in frame
    + Save as JPG at 70% quality
+ Chronicles pics unstretch
    + Original pictures 1148x484 (~64/27)
    + Rescale to 16/9 (~861 width)
    + Origins different, scale to 1050x484
+ Bo2 pics without name
    + From https://callofduty.fandom.com/
    + Resized from 480x270 to 480x221

## Map Page Paralax Pictures

+ Some from https://callofdutymaps.com/
    + Find an image that represents the map as a whole
+ Bo3 Chronicles:
    + Some from https://store.steampowered.com/app/581450/Call_of_Duty_Black_Ops_III__Zombies_Chronicles/
    + Some from https://www.pushsquare.com/games/ps4/call_of_duty_black_ops_iii_zombies_chronicles
        + Official low-res versions at https://support.activision.com/call-of-duty--black-ops-iii/articles/call-of-duty-black-ops-iii-zombies-chronicles
+ Bo6:
    + Link to callofduty.com (ideally without any logos or watermarks)

## Map Diagrams

+ If ingame, use screenshot
+ Some from https://callofdutymaps.com/
+ Bo6:
    + From https://callofduty.fandom.com/
    + Position all map layers horizontally
    + Save as jpg 90%

# Image edits

+ Keep original jpg and edited file
    + Edited name like 1_edit.jpg
+ Use same arrow, rotated but no resizing
    + Color #FF0000
+ Text and numbers added in Pixlr
    + Font size 100
    + Font Verdana
    + Color #FF0000
    + Sometimes add outline, black, size 50
+ Save as JPG 70% quality
+ Image overlay outer glow
    + Color #FF0000
    + Size 15px
    + Feather 50%
    + Opacity 100%
+ Unique
    + Origins ice staff upgrade symbols
        + Set canvas to 500x220
        + Add wall texture to left and stone to right both with 220 height
        + Resize canvas to 640x270
        + Combine 12 images
