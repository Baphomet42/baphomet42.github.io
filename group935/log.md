
----------------------------------------------------------------

# Entry 741021

To ensure a consistent feel, try to stick to these guidelines.

## New Game/Map

+ New game:
    + Add info to `group935/data.json`
    + Place jpg in `group935/<id>/icon.jpg`
        + Max res 320x320 (some maps are less)
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
+ Bo2 pics without name
    + From https://callofduty.fandom.com/
    + Resized from 480x270 to 480x221
+ IWZ pics
    + From https://www.reddit.com/r/CODZombies/comments/wvw1kg/all_iw_zombies_map_posters_high_quality/
    + Trimmed from 640 width to 600 before above resize
+ Bo3 Chronicles pics unstretch
    + Original pictures 1148x484 (~64/27)
    + Rescale to 16/9 (~861 width)
    + Origins different, scale to 1050x484

## Map Page Paralax Pictures

+ Some from https://callofdutymaps.com/
    + Find an image that represents the map as a whole
+ AWZ:
    + Some from COD fandom
    + Others from map trailers
+ IWZ:
    + Some from https://steamcommunity.com/sharedfiles/filedetails/?id=3306529505
    + Others from map trailers
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
    + Save as jpg 90% (2048x2048 or 4096x2048)

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

# Word Choice, Capitalization, etc.

+ Common words should be consistently capitalized in all maps
    + This goes for names of perks, weapons, rooms, etc.
+ Common elements should be formatted consistently between maps
    + This goes for sections, subsections, etc
+ Ordered lists should be formatted like `1.`, `2.`, `3.`, etc
    + Sublists should be formatted like `i.`, `ii.`, `iii.`, etc
+ Page element consistency:
    + `"header"` texts should use title case capitalization
    + `"title"`, `"alt"`, and `"bullets"` texts should usually be 1 sentence without ending in a period, but not using title case capitalization
        + `"alt"` texts that uses the form `"foo - bar"` should not capitalize `bar` unless it otherwise should be capitalized (like for proper nouns)
    + `"description"` texts should use common sentence capitalization and grammar (always ending in a period)

----------------------------------------------------------------
