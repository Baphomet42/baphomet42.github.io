let pageData = {'sidebar': false, 'sections': [], 'current': -1}
let gameData = []

function buildPage(pageData, gamesData) {
    gameData = gamesData.games

    if(pageData.rev === 2)
        return pageRev2(pageData)
}

function toggleSectionCollapse(section) {
    if(pageData.sections[section].collapse == 2) {
        setSectionCollapse(section,0)
    }
    else {
        setSectionCollapse(section,2)
    }
}

function collapseAll(mode) {
    let collapseMode = 2
    if(mode == 0 || mode == 1)
        collapseMode = 0

    let sections = document.getElementsByClassName('collapsable')
    for(let i=0; i<sections.length; i++) {
        setSectionCollapse(i,collapseMode)
    }
}

function setSectionCollapse(section,mode) {
    pageData.sections[section].collapse = mode
    let el = document.getElementById('section_'+section)
    let el_collapse_icon = document.getElementById('section_'+section+'_collapse_icon')

    if(mode == 0 || mode == 1) {
        el.style.display = "block"
        el_collapse_icon.innerHTML = "\u2014"
        if(mode == 0 && (pageData.current<=-1 || pageData.current>=pageData.sections.length || pageData.sections[pageData.current].collapse==2)) {
            pageData.current = section
        }
    }
    else {
        el.style.display = "none"
        el_collapse_icon.innerHTML = "+"
    }
}

function scrollToSection(section) {
    let sections = document.getElementsByClassName('section-group')
    let current = section

    for(let i=0; i<pageData.sections.length; i++) {
        if(pageData.sections[i].collapse == 1 && current!=i)
            setSectionCollapse(i,2)
    }

    if(current<0) {
        scrollToTop()
    }
    else if(current==sections.length) {
        scrollToElement(sections[current-1])
    }
    else {
        if(pageData.sections[current].collapse == 2)
            setSectionCollapse(current,1)
        scrollToElement(sections[current])
    }

    pageData.current = current
}

function scrollToSubsection(section, subsection) {
    scrollToSection(section)
    scrollToElement(document.getElementById('section_'+section+'_'+subsection))
    pageData.current = section
}

function scrollToTop() {
    scrollToElement(document.getElementById('title-section'))
}

function scrollToElement(el) {
    el.scrollIntoView({block: 'start', behavior: 'smooth'})
}

function cycleSection(cycleUp) {
    let sections = document.getElementsByClassName('section-group')
    let newCurrent = pageData.current
    
    if(!(newCurrent>-1 && newCurrent<sections.length && pageData.sections[newCurrent].collapse==2)) {
        if(cycleUp === true)
            newCurrent--
        else
            newCurrent++
    }

    if(newCurrent<-1)
        newCurrent = -1
    else if(newCurrent>sections.length)
        newCurrent = sections.length

    scrollToSection(newCurrent)

}

function toggleSidebar() {
    if(pageData.sidebar === true)
        pageData.sidebar = false
    else
        pageData.sidebar = true

    if(pageData.sidebar === true) {
        document.getElementById('page-table-sidebar').style.display = "block"
        document.getElementById('control-panel-hidden-symbol').classList.add('rotate90')
    }
    else {
        document.getElementById('page-table-sidebar').style.display = "none"
        document.getElementById('control-panel-hidden-symbol').classList.remove('rotate90')
    }
}

function pageRev2(data) {
    let page = ''
    
    page += '<div class="section" id="title-section">'
    page += '<div class="back-button-wrap"><a class="button back-button" href="/group935" rel="noopener noreferrer"><span class="accent-text"><</span> All Maps</a></div>'
    page += '<h1 class="center">'+data.name+'</h1>'

    let foundGames = [] 
    $.each(gameData, function (gameKey, game) {
        $.each(game.maps, function (mapKey, map) {
            if(map.id === data.id)
                foundGames.push(game.name)
        })
    })
    let subtext_separator = '<span class="accent-color"> Ξ </span>'
    let subtext = subtext_separator
    for(let i=0; i<foundGames.length; i++) {
        if(i>0)
            subtext += subtext_separator
        subtext += foundGames[foundGames.length-1-i]
    }
    subtext += subtext_separator
    page += '<h3 class="center">'+subtext+'</h3>'

    if(data.related_maps && data.related_maps.length > 0) {
        page += '<div class="center related-maps-wrapper"><span class="related-maps-area">'

        if(data.related_maps.length === 1)
            page += '<h3 class="related-maps-header">Related Map:</h3>'
        else
            page += '<h3 class="related-maps-header">Related Maps:</h3>'

        let firstMap = true
        $.each(data.related_maps, function (relMapKey, relMap) {
            let mapName = relMap
            let gameNames = []

            $.each(gameData, function (gameKey, game) {
                $.each(game.maps, function (mapKey, map) {
                    if(map.id === relMap) {
                        mapName = map.name
                        gameNames.push(game.name)
                    }
                })
            })

            if(firstMap)
                firstMap = false
            else
                page += '<h3 class="related-map">&nbsp;</h3>'

            page += '<h3 class="related-map"><a class="related-map-link" href="/group935/zm/'+relMap+'" rel="noopener noreferrer">'
            page += '<span class="nowrap">'+mapName+'</span>'
            page += '</a>'
            if(gameNames.length > 0) {
                page += '<span class="accent-color"> - </span>'
                for(let i=0; i<gameNames.length; i++) {
                    if(i>0)
                        page += '<span class="accent-color"> ◦ </span>'
                    page += '<span class="nowrap">'+gameNames[gameNames.length-1-i]+'</span>'
                }
            }
            page += '</h3>'
        })

        page += '</span></div>'
    }

    if(data.notice) {
        page += '<div class="notice-wrap"><h4 class="notice">⚠ Notice: '+data.notice+'</h4></div>'
    }
    if(data.wip) {
        page += '<h1 class="wip">- WIP -</h1>'
        if(!(data.sections.length > 0))
            page += '<br/>'
    }
    if(data.sections.length > 0) {
        page += '<div class="header-table"><table><tr>'
        page += '<td onclick="collapseAll(2)" class="collapse-button header-table-button no-select"><span class="accent-color">[</span>Collapse All<span class="accent-color">]</span></td>'
        page += '<td onclick="collapseAll(0)" class="collapse-button header-table-button no-select"><span class="accent-color">[</span>Expand All<span class="accent-color">]</span></td>'
        page += '</tr></table></div>'
    }
    page += '</div>'

    if(data.style)
        setColors('var(--accent-text-'+data.style+')','var(--accent-color-'+data.style+')')
    if(data.background) {
        let background = data.background
        if(background.startsWith('assets/'))
            background = 'group935/zm/'+data.id+'/'+background
        setBackground('url('+background+')')
    }

    pageData.sections = []

    if(data.maps) {
        $.each(data.maps, function (mapKey, map) {
            mapLink = map.img
            if(map.link)
                mapLink = map.link
            page += '<div class="center"><a href="'+mapLink+'" rel="noopener noreferrer" target="_blank"><img src="'+map.img+'" class="img-border img-full"/></a></div>'
        })
    }
    
    $.each(data.sections, function (sectionKey, section) {
        let thisSectionData = {'collapse': 2, 'header': section.header, 'subsections': []}

        page += '<div class="section-group">'
        page += '<div class="section-header no-select" onclick="toggleSectionCollapse('+sectionKey+')"><table><tr>'
        page += '<td class="section-header-collapse-icon mobile-hide"></td>'
        page += '<td><h2 class="center">'+section.header+'</h2></td>'
        page += '<td class="section-header-collapse-icon no-select accent-text" id="section_'+sectionKey+'_collapse_icon">+</td>'
        page += '</tr></table></div>'
        page += '<div class="section-body collapsable" id="section_'+sectionKey+'" style="display: none">'

        if(section.description)
            page += '<p class="section-description">'+section.description+'</p>'

        if(section.subsections) {

            if(section.subsections.length > 1) {
                page += '<div class="subsection">'
                page += '<h3 class="subsection-header">Jump to...</h3>'
                page += '<table class="card-table"><tr class="card-table-row"><td class="col-wrap-full"><div class="col-cell center-container"><ul class="inline-list">'
                $.each(section.subsections, function (subKey, sub) {
                    if(sub.header)
                        page += '<li><span class="link" onclick="scrollToSubsection('+sectionKey+','+subKey+')">'+sub.header+'</span></li>'
                })
                page += '</ul></div></td></tr></table></div>'
            }

            $.each(section.subsections, function (subKey, sub) {
                thisSectionData.subsections.push({'header': sub.header})
                page += '<div class="subsection" id="section_'+sectionKey+'_'+subKey+'">'

                if(sub.header)
                    page += '<h3 class="subsection-header">'+sub.header+'</h3>'

                if(sub.description)
                    page += '<p>'+sub.description+'</p>'

                if(sub.elements) {
                    page += '<table class="card-table"><tr class="card-table-row">'
                    $.each(sub.elements, function (elKey, el) {
                        if(el.full)
                            page += '<td class="col-wrap-full"><div class="col-cell center-container">'
                        else
                            page += '<td class="col-wrap"><div class="col-cell center-container">'

                        if(el.pic) {
                            let src = el.pic.src
                            if(src.endsWith('/.jpg'))
                                src = '/assets/wiptexture.png'
                            page += '<div class="pic-wrap"><img class="pic" src="'+src+'"/></div>'

                            let disclaimer = ''
                            if(el.pic.disclaimer)
                                disclaimer = '<span class="pic-disclaimer"><br/>('+el.pic.disclaimer+')</span>'

                            if(el.pic.alt)
                                page += '<p class="pic-alt">'+el.pic.alt+disclaimer+'</p>'
                        }
                        else if(el.step) {
                            if(el.step.title)
                                page += '<h3>'+el.step.title+'</h3>'
                            if(el.step.description)
                                page += '<p>'+el.step.description+'</p>'
                        }
                        else if(el.youtube) {
                            page += '<div class="pic-wrap"><iframe class="pic" src="https://www.youtube.com/embed/'+el.youtube.src+'" frameborder="0" allowfullscreen></iframe></div>'
                            if(el.youtube.alt)
                                page += '<p class="pic-alt">'+el.youtube.alt+'</p>'
                        }
                        else if(el.bullets) {
                            page += '<ul class="inline-list">'
                            $.each(el.bullets, function (bulletKey, bullet) {
                                page += '<li>'+bullet+'</li>'
                            })
                            page += '</ul>'
                        }
                        else if(el.special) {
                            if(el.special === "gorod_valve")
                                page += buildGorodValveStep()
                            else if(el.special === "terminus_code")
                                page += buildTerminusCodeStep()
                        }

                        page += '</div></td>'
                    })
                    page += '</tr></table>'
                }
                page += '</div>'
        
            })
        }

        page += '<div class="section-footer collapse-button no-select" onclick="setSectionCollapse('+sectionKey+',2)"><table><tr><td class="header-table-button center"><span class="accent-color">[</span>Collapse<span class="accent-color">]</span></td></tr></table></div>'
        page += '</div></div>'

        pageData.sections.push(thisSectionData)
    })

    let pageTable = '<table class="page-table"><tr class="page-table-row">'
    pageTable += '<td id="page-table-sidebar"><div id="sidebar-panel">'
    
    pageTable += '<div>'
    pageTable += '<table><tr>'
    pageTable += '<td class="control-panel-button no-select" onclick="scrollToTop()">⌂</td>'
    pageTable += '<td class="control-panel-button no-select" onclick="cycleSection(true)">\u2227</td>'
    pageTable += '<td class="control-panel-button no-select" onclick="cycleSection(false)">\u2228</td>'
    pageTable += '</tr></table>'

    pageTable += '<div class="sidebar-links"><ul class="sidebar-sections">'
    for(let i=0; i<pageData.sections.length; i++) {
        pageTable += '<li class="sidebar-section-li"><h3 class="sidebar-link no-select" onclick="scrollToSection('+i+')">'+pageData.sections[i].header+'</h3></li>'
        if(pageData.sections[i].subsections.length > 0) {
            pageTable += '<ul class="sidebar-subsections">'
            for(let ii=0; ii<pageData.sections[i].subsections.length; ii++) {
                if(pageData.sections[i].subsections[ii].header)
                    pageTable += '<li><p class="sidebar-link sidebar-link-subsection no-select" onclick="scrollToSubsection('+i+','+ii+')">'+pageData.sections[i].subsections[ii].header+'</p></li>'
            }
            pageTable += '</ul>'
        }
    }
    pageTable += '</ul></div>'
    pageTable += '</div>'

    pageTable += '</div></td>'
    pageTable += '<td id="page-table-main">'+page+'</td>'
    pageTable += '</tr></table>'

    page = pageTable
    
    page += '<div id="control-panel-hidden"><table><tr><td id="control-panel-hidden-button" class="control-panel-button no-select" onclick="toggleSidebar()">'
        +'<span id="control-panel-hidden-symbol" class="rotatable">☰</span>'
        +'</td></tr></table></div>'

    return page
}

function setColors(text, accent) {
    const root = document.documentElement
    root.style.setProperty('--accent-text',text)
    root.style.setProperty('--accent-color',accent)
}

function setBackground(background) {
    const root = document.documentElement
    root.style.setProperty('--parallax-background',background)
}

function buildGorodValveStep() {
    let page = ''
    
    page += '<h3>Valve configuration tool</h3>'
    page += '<p>Input the locations of the green light valve and pink cylinder valve. Then, interact with each valve to set the number based on the output below. <a href="https://kronorium.com/blackops3/gorodkrovi/" rel="noopener noreferrer" target="_blank" class="link">Credit</a></p>'
    page += '<div>'
    page += '<label for="gorod-valve-pink">Pink Cylinder Valve: </label><select id="gorod-valve-pink" style="font-size:large" onchange="setGorodValve(\'pink\',this.value)">'
    page += '<option value="select">Select Location</option>'
    page += '<option value="dragon">Dragon Command</option>'
    page += '<option value="tank">Tank Factory</option>'
    page += '<option value="infirmary">Infirmary</option>'
    page += '<option value="armory">Armory</option>'
    page += '<option value="supply">Supply Depot</option>'
    page += '<option value="dept">Department Store</option>'
    page += '</select>'
    page += '</div><br/><div>'
    page += '<label for="gorod-valve-green">Green Light Valve: </label><select id="gorod-valve-green" style="font-size:large" onchange="setGorodValve(\'green\',this.value)">'
    page += '<option value="select">Select Location</option>'
    page += '<option value="dragon">Dragon Command</option>'
    page += '<option value="tank">Tank Factory</option>'
    page += '<option value="infirmary">Infirmary</option>'
    page += '<option value="armory">Armory</option>'
    page += '<option value="supply">Supply Depot</option>'
    page += '<option value="dept">Department Store</option>'
    page += '</select>'
    page += '</div><br/>'

    page += '<p>Set the valves to the following:</p>'
    page += '<ul>'
    page += '<li>Dragon Command: <span id="gorod-valve-dragon" class="accent-text">(Select Valve Locations)</span></li>'
    page += '<li>Tank Factory: <span id="gorod-valve-tank" class="accent-text">(Select Valve Locations)</span></li>'
    page += '<li>Infirmary: <span id="gorod-valve-infirmary" class="accent-text">(Select Valve Locations)</span></li>'
    page += '<li>Armory: <span id="gorod-valve-armory" class="accent-text">(Select Valve Locations)</span></li>'
    page += '<li>Supply Depot: <span id="gorod-valve-supply" class="accent-text">(Select Valve Locations)</span></li>'
    page += '<li>Department Store: <span id="gorod-valve-dept" class="accent-text">(Select Valve Locations)</span></li>'
    page += '</ul>'

    return page
}

function buildTerminusCodeStep() {
    let page = ''
    
    page += '<h3>Code solver tool</h3>'
    page += '<p>Select the symbol corresponding to each of the 3 letters, as seen on both the laptops and the yellow notes. Then, enter the code using the output below.</p>'
    page += '<div><table class="terminus-code-group"><tr>'
    page += '<td><label for="terminus-code-x">X: </label></td>'
    page += '<td><label><input type="radio" name="terminus-code-x" value="0" onchange="setTerminusSymbol(0,0)"/><img src="assets/code_symbol_0.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-x" value="1" onchange="setTerminusSymbol(0,1)"/><img src="assets/code_symbol_1.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-x" value="2" onchange="setTerminusSymbol(0,2)"/><img src="assets/code_symbol_2.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-x" value="3" onchange="setTerminusSymbol(0,3)"/><img src="assets/code_symbol_3.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-x" value="4" onchange="setTerminusSymbol(0,4)"/><img src="assets/code_symbol_4.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-x" value="5" onchange="setTerminusSymbol(0,5)"/><img src="assets/code_symbol_5.png"/></label></td>'
    page += '</tr></table></div><br/>'
    page += '<div><table class="terminus-code-group"><tr>'
    page += '<td><label for="terminus-code-y">Y: </label></td>'
    page += '<td><label><input type="radio" name="terminus-code-y" value="0" onchange="setTerminusSymbol(1,0)"/><img src="assets/code_symbol_0.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-y" value="1" onchange="setTerminusSymbol(1,1)"/><img src="assets/code_symbol_1.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-y" value="2" onchange="setTerminusSymbol(1,2)"/><img src="assets/code_symbol_2.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-y" value="3" onchange="setTerminusSymbol(1,3)"/><img src="assets/code_symbol_3.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-y" value="4" onchange="setTerminusSymbol(1,4)"/><img src="assets/code_symbol_4.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-y" value="5" onchange="setTerminusSymbol(1,5)"/><img src="assets/code_symbol_5.png"/></label></td>'
    page += '</tr></table></div><br/>'
    page += '<div><table class="terminus-code-group"><tr>'
    page += '<td><label for="terminus-code-z">Z: </label></td>'
    page += '<td><label><input type="radio" name="terminus-code-z" value="0" onchange="setTerminusSymbol(2,0)"/><img src="assets/code_symbol_0.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-z" value="1" onchange="setTerminusSymbol(2,1)"/><img src="assets/code_symbol_1.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-z" value="2" onchange="setTerminusSymbol(2,2)"/><img src="assets/code_symbol_2.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-z" value="3" onchange="setTerminusSymbol(2,3)"/><img src="assets/code_symbol_3.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-z" value="4" onchange="setTerminusSymbol(2,4)"/><img src="assets/code_symbol_4.png"/></label></td>'
    page += '<td><label><input type="radio" name="terminus-code-z" value="5" onchange="setTerminusSymbol(2,5)"/><img src="assets/code_symbol_5.png"/></label></td>'
    page += '</tr></table></div><br/>'

    page += '<p class="terminus-code-output-line">Calculated code: <span id="terminus-code-output" class="accent-text">(Select all 3 symbols)</span></p>'

    return page
}

function setTerminusSymbol(letter, symbol) {
    if(letter >= 0 && letter < 3 && symbol >= 0 && symbol < 6)
        terminusSymbols[letter] = symbol
    else
        terminusSymbols = [-1, -1, -1]

    updateTerminusCode()
}

let terminusSymbols = [-1, -1, -1]
function updateTerminusCode() {
    let output = '(Select all 3 symbols)'

    let nums = [-1, -1, -1]
    let error = false

    for(let i=0; i<3; i++) {
        if(terminusSymbols[i] === 0)
            nums[i] = 0
        else if(terminusSymbols[i] === 1)
            nums[i] = 11
        else if(terminusSymbols[i] === 2)
            nums[i] = 10
        else if(terminusSymbols[i] === 3)
            nums[i] = 22
        else if(terminusSymbols[i] === 4)
            nums[i] = 21
        else if(terminusSymbols[i] === 5)
            nums[i] = 20
        else
            error = true
    }

    if(!error) {
        output = '| '
            + formatTerminusCodeNum(Math.abs(2*nums[0]+11)) + ' | '
            + formatTerminusCodeNum(Math.abs(2*nums[2]+nums[1]-5)) + ' | '
            + formatTerminusCodeNum(Math.abs(nums[1]+nums[2]-nums[0])) + ' |'
    }

    document.getElementById('terminus-code-output').innerHTML = output
}

function formatTerminusCodeNum(num) {
    return num.toString().padStart(2,'0')
}

function setGorodValve(type, location) {
    if(type === "pink")
        gorodValvePink = location
    else
        gorodValveGreen = location

    updateGorodValve()
}

let gorodValvePink = ''
let gorodValveGreen = ''
function updateGorodValve() {
    let errorMsg = '(Select Valve Locations)'
    let endMsg = '(End Point)'

    let outputDragon = errorMsg
    let outputTank = errorMsg
    let outputInfirmary = errorMsg
    let outputArmory = errorMsg
    let outputSupply = errorMsg
    let outputDept = errorMsg

    if(gorodValvePink === 'dragon') {
        if(gorodValveGreen === 'tank') {
            outputDragon = endMsg
            outputTank = '1'
            outputInfirmary = '1'
            outputArmory = '1'
            outputSupply = '1'
            outputDept = '1'
        }
        else if(gorodValveGreen === 'infirmary') {
            outputDragon = endMsg
            outputTank = '2'
            outputInfirmary = '2'
            outputArmory = '3'
            outputSupply = '2'
            outputDept = '3'
        }
        else if(gorodValveGreen === 'armory') {
            outputDragon = endMsg
            outputTank = '2'
            outputInfirmary = '2'
            outputArmory = '3'
            outputSupply = '1'
            outputDept = '2'
        }
        else if(gorodValveGreen === 'supply') {
            outputDragon = endMsg
            outputTank = '3'
            outputInfirmary = '3'
            outputArmory = '3'
            outputSupply = '3'
            outputDept = '2'
        }
        else if(gorodValveGreen === 'dept') {
            outputDragon = endMsg
            outputTank = '3'
            outputInfirmary = '2'
            outputArmory = '1'
            outputSupply = '1'
            outputDept = '2'
        }
    }
    else if(gorodValvePink === 'tank') {
        if(gorodValveGreen === 'dragon') {
            outputDragon = '3'
            outputTank = endMsg
            outputInfirmary = '1'
            outputArmory = '1'
            outputSupply = '3'
            outputDept = '1'
        }
        else if(gorodValveGreen === 'infirmary') {
            outputDragon = '2'
            outputTank = endMsg
            outputInfirmary = '3'
            outputArmory = '1'
            outputSupply = '3'
            outputDept = '1'
        }
        else if(gorodValveGreen === 'armory') {
            outputDragon = '1'
            outputTank = endMsg
            outputInfirmary = '3'
            outputArmory = '3'
            outputSupply = '3'
            outputDept = '2'
        }
        else if(gorodValveGreen === 'supply') {
            outputDragon = '3'
            outputTank = endMsg
            outputInfirmary = '2'
            outputArmory = '3'
            outputSupply = '2'
            outputDept = '3'
        }
        else if(gorodValveGreen === 'dept') {
            outputDragon = '1'
            outputTank = endMsg
            outputInfirmary = '3'
            outputArmory = '2'
            outputSupply = '2'
            outputDept = '2'
        }
    }
    else if(gorodValvePink === 'infirmary') {
        if(gorodValveGreen === 'dragon') {
            outputDragon = '1'
            outputTank = '3'
            outputInfirmary = endMsg
            outputArmory = '3'
            outputSupply = '3'
            outputDept = '2'
        }
        else if(gorodValveGreen === 'tank') {
            outputDragon = '3'
            outputTank = '2'
            outputInfirmary = endMsg
            outputArmory = '3'
            outputSupply = '2'
            outputDept = '3'
        }
        else if(gorodValveGreen === 'armory') {
            outputDragon = '2'
            outputTank = '2'
            outputInfirmary = endMsg
            outputArmory = '2'
            outputSupply = '1'
            outputDept = '2'
        }
        else if(gorodValveGreen === 'supply') {
            outputDragon = '3'
            outputTank = '3'
            outputInfirmary = endMsg
            outputArmory = '3'
            outputSupply = '3'
            outputDept = '3'
        }
        else if(gorodValveGreen === 'dept') {
            outputDragon = '3'
            outputTank = '2'
            outputInfirmary = endMsg
            outputArmory = '2'
            outputSupply = '1'
            outputDept = '1'
        }
    }
    else if(gorodValvePink === 'armory') {
        if(gorodValveGreen === 'dragon') {
            outputDragon = '1'
            outputTank = '1'
            outputInfirmary = '1'
            outputArmory = endMsg
            outputSupply = '3'
            outputDept = '1'
        }
        else if(gorodValveGreen === 'tank') {
            outputDragon = '1'
            outputTank = '1'
            outputInfirmary = '1'
            outputArmory = endMsg
            outputSupply = '2'
            outputDept = '3'
        }
        else if(gorodValveGreen === 'infirmary') {
            outputDragon = '2'
            outputTank = '2'
            outputInfirmary = '2'
            outputArmory = endMsg
            outputSupply = '1'
            outputDept = '1'
        }
        else if(gorodValveGreen === 'supply') {
            outputDragon = '2'
            outputTank = '1'
            outputInfirmary = '3'
            outputArmory = endMsg
            outputSupply = '3'
            outputDept = '1'
        }
        else if(gorodValveGreen === 'dept') {
            outputDragon = '3'
            outputTank = '2'
            outputInfirmary = '2'
            outputArmory = endMsg
            outputSupply = '2'
            outputDept = '3'
        }
    }
    else if(gorodValvePink === 'supply') {
        if(gorodValveGreen === 'dragon') {
            outputDragon = '2'
            outputTank = '3'
            outputInfirmary = '2'
            outputArmory = '1'
            outputSupply = endMsg
            outputDept = '2'
        }
        else if(gorodValveGreen === 'tank') {
            outputDragon = '2'
            outputTank = '1'
            outputInfirmary = '3'
            outputArmory = '1'
            outputSupply = endMsg
            outputDept = '1'
        }
        else if(gorodValveGreen === 'infirmary') {
            outputDragon = '2'
            outputTank = '2'
            outputInfirmary = '3'
            outputArmory = '2'
            outputSupply = endMsg
            outputDept = '1'
        }
        else if(gorodValveGreen === 'armory') {
            outputDragon = '1'
            outputTank = '1'
            outputInfirmary = '1'
            outputArmory = '2'
            outputSupply = endMsg
            outputDept = '3'
        }
        else if(gorodValveGreen === 'dept') {
            outputDragon = '1'
            outputTank = '1'
            outputInfirmary = '3'
            outputArmory = '2'
            outputSupply = endMsg
            outputDept = '1'
        }
    }
    else if(gorodValvePink === 'dept') {
        if(gorodValveGreen === 'dragon') {
            outputDragon = '1'
            outputTank = '1'
            outputInfirmary = '1'
            outputArmory = '2'
            outputSupply = '2'
            outputDept = endMsg
        }
        else if(gorodValveGreen === 'tank') {
            outputDragon = '1'
            outputTank = '1'
            outputInfirmary = '3'
            outputArmory = '3'
            outputSupply = '2'
            outputDept = endMsg
        }
        else if(gorodValveGreen === 'infirmary') {
            outputDragon = '1'
            outputTank = '3'
            outputInfirmary = '3'
            outputArmory = '3'
            outputSupply = '3'
            outputDept = endMsg
        }
        else if(gorodValveGreen === 'armory') {
            outputDragon = '2'
            outputTank = '1'
            outputInfirmary = '3'
            outputArmory = '1'
            outputSupply = '3'
            outputDept = endMsg
        }
        else if(gorodValveGreen === 'supply') {
            outputDragon = '2'
            outputTank = '1'
            outputInfirmary = '3'
            outputArmory = '2'
            outputSupply = '2'
            outputDept = endMsg
        }
    }

    document.getElementById('gorod-valve-dragon').innerHTML = outputDragon
    document.getElementById('gorod-valve-tank').innerHTML = outputTank
    document.getElementById('gorod-valve-infirmary').innerHTML = outputInfirmary
    document.getElementById('gorod-valve-armory').innerHTML = outputArmory
    document.getElementById('gorod-valve-supply').innerHTML = outputSupply
    document.getElementById('gorod-valve-dept').innerHTML = outputDept
}
