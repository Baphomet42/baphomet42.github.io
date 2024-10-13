var pageData = {'panel': false, 'sections':[], 'current': -1}
var gameData = []

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

function scrollToSubsection(section, subsection) {
    setSectionCollapse(section,0)
    scrollToElement(document.getElementById('section_'+section+'_'+subsection))
}

function scrollToTop() {
    scrollToElement(document.getElementById('title-section'))
}

function scrollToElement(el) {
    el.scrollIntoView({block: 'start', behavior: 'smooth'})
}

function cycleSection(cycleUp) {
    let sections = document.getElementsByClassName('section-group')
    let current = pageData.current
    
    if(!(current>-1 && current<sections.length && pageData.sections[current].collapse==2)) {
        if(cycleUp === true)
            current--
        else
            current++
    }

    if(current<-1)
        current = -1
    else if(current>sections.length)
        current = sections.length

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

function toggleControlPanelVisibility() {
    if(pageData.panel == true)
        pageData.panel = false
    else
        pageData.panel = true

    if(pageData.panel == true) {
        document.getElementById('control-panel').style.display = "block"
        document.getElementById('control-panel-hidden-button').innerHTML = ">"
    }
    else {
        document.getElementById('control-panel').style.display = "none"
        document.getElementById('control-panel-hidden-button').innerHTML = "<"
    }
}

function pageRev2(data) {
    var page = ''

    if(data.background) {
        page += '<div id="parallax-background" style="background-image: url('+data.background+')"></div>'
    }
    
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
    var subtext_separator = '<span class="accent-color"> | </span>'
    let subtext = subtext_separator
    for(let i=0; i<foundGames.length; i++) {
        if(i>0)
            subtext += subtext_separator
        subtext += foundGames[foundGames.length-1-i]
    }
    subtext += subtext_separator
    page += '<h3 class="center">'+subtext+'</h3>'

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

    if(data.style) {
        if(data.style === 'ultimis')
            setColors('#FF5555','#AA0000')
        else if(data.style === 'victis')
            setColors('#55FFFF','#00CCFF')
        else if(data.style === 'primis')
            setColors('#FFAA00','#FF6600')
        else if(data.style === 'aether')
            setColors('#FFFF55','#DEB12D')
        else if(data.style === 'dark_aether')
            setColors('#7078F1','#5C49A4')
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
        pageData.sections.push({'collapse': 2})

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
                page += '<table class="card-table"><tr class="card-table-row"><td class="col-wrap-full"><div class="col-cell center-container"><ul>'
                $.each(section.subsections, function (subKey, sub) {
                    if(sub.header)
                        page += '<li><span class="link" onclick="scrollToSubsection('+sectionKey+','+subKey+')">'+sub.header+'</span></li>'
                })
                page += '</ul></div></td></tr></table></div>'
            }

            $.each(section.subsections, function (subKey, sub) {
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
                            page += '<ul>'
                            $.each(el.bullets, function (bulletKey, bullet) {
                                page += '<li>'+bullet+'</li>'
                            })
                            page += '</ul>'
                        }
                        else if(el.special) {
                            if(el.special === "gorod_valve")
                                page += buildGorodValveStep()
                        }

                        page += "</div></td>"
                    })
                    page += '</tr></table>'
                }
                page += '</div>'
        
            })
        }

        page += '<div class="section-footer collapse-button no-select" onclick="setSectionCollapse('+sectionKey+',2)"><table><tr><td class="header-table-button center"><span class="accent-color">[</span>Collapse<span class="accent-color">]</span></td></tr></table></div>'
        page += '</div></div>'
    })

    page += '<div id="control-panel" class="control-panel" style="display: none">'
    page += '<table><tr>'
    page += '<td class="control-panel-button no-select" onclick="scrollToTop()">⌂</td>'
    page += '<td class="control-panel-button no-select" onclick="cycleSection(true)">\u2227</td>'
    page += '<td class="control-panel-button no-select" onclick="cycleSection(false)">\u2228</td>'
    page += '</tr></table>'
    page += '</div>'
    page += '<div id="control-panel-hidden" class="control-panel"><table><tr><td id="control-panel-hidden-button" class="control-panel-button no-select" onclick="toggleControlPanelVisibility()"><</td></tr></table></div>'

    return page
}

function setColors(text, accent) {
    const root = document.documentElement
    root.style.setProperty('--accent-text',text)
    root.style.setProperty('--accent-color',accent)
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

function setGorodValve(type, location) {
    if(type === "pink")
        gorodValvePink = location
    else
        gorodValveGreen = location

    updateGorodValve()
}

var gorodValvePink = ''
var gorodValveGreen = ''
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
