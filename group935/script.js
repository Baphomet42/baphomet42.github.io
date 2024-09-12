var pageData = {'panel': false, 'sections':[], 'current': -1}

function buildPage(data) {
    if(data.rev === 1)
        return pageRev1(data)
    else if(data.rev === 2)
        return pageRev2(data)
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

    if(mode == 0 || mode == 1) {
        el.style.display = "block"
        if(mode == 0 && (pageData.current<=-1 || pageData.current>=pageData.sections.length || pageData.sections[pageData.current].collapse==2)) {
            pageData.current = section
        }
    }
    else
        el.style.display = "none"
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

    console.log('test')

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
    page += '<div class="back-button-wrap"><a class="button back-button" href="/group935" rel="noopener noreferrer">< All Maps</a></div>'
    page += '<h1 class="center">'+data.name+'</h1>'
    page += '<h3 class="center">'+data.subtext+'</h3>'
    if(data.wip) {
        page += '<h1 class="wip">- WIP -</h1>'
    }
    if(data.sections.length > 0) {
        page += '<div class="header-table"><table><tr>'
        page += '<td onclick="collapseAll(2)" class="collapse-button header-table-button">[Collapse All]</td>'
        page += '<td onclick="collapseAll(0)" class="collapse-button header-table-button">[Expand All]</td>'
        page += '</tr></table></div>'
    }
    page += '</div>'

    pageData.sections = []

    if(data.maps) {
        $.each(data.maps, function (mapKey, map) {
            mapLink = map.img;
            if(map.link)
                mapLink = map.link;
            page += '<div class="center"><a href="'+mapLink+'" rel="noopener noreferrer" target="_blank"><img src="'+map.img+'" class="img-border img-full"/></a></div>'
        })
    }
    
    $.each(data.sections, function (sectionKey, section) {
        pageData.sections.push({'collapse': 2})

        page += '<div class="section-group">'
        page += '<div class="section-header" onclick="toggleSectionCollapse('+sectionKey+')"><h2 class="center">'+section.header+'</h2></div>'
        page += '<div class="section-body collapsable" id="section_'+sectionKey+'" style="display: none">'

        if(section.description)
            page += '<h3 class="center">'+section.description+'</h3>'

        if(section.subsections) {

            if(section.links) {
                page += '<div class="jump-link-wrap">';
                page += '<p class="jump-link-header">Jump to...</p>'
                page += '<ul>';
                $.each(section.subsections, function (subKey, sub) {
                    if(sub.header)
                        page += '<li><span class="link" onclick="scrollToSubsection('+sectionKey+','+subKey+')">'+sub.header+'</span></li>';
                })
                page += '</ul></div>';
            }

            $.each(section.subsections, function (subKey, sub) {
                page += '<div class="subsection" id="section_'+sectionKey+'_'+subKey+'">'

                if(sub.header)
                    page += '<h3>'+sub.header+'</h3>'

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
                            page += '<div class="pic-wrap"><img class="pic" src="'+el.pic.src+'"/></div>';
                            if(el.pic.alt)
                                page += '<p class="pic-alt">'+el.pic.alt+'</p>';
                        }
                        else if(el.step) {
                            if(el.step.title)
                                page += '<h3>'+el.step.title+'</h3>';
                            if(el.step.description)
                                page += '<p>'+el.step.description+'</p>';
                        }
                        else if(el.youtube) {
                            page += '<div class="pic-wrap"><iframe class="pic" src="https://www.youtube.com/embed/'+el.youtube+'" frameborder="0" allowfullscreen></iframe></div>';
                        }
                        else if(el.bullets) {
                            page += '<ul>';
                            $.each(el.bullets, function (bulletKey, bullet) {
                                page += '<li>'+bullet+'</li>';
                            })
                            page += '</ul>';
                        }

                        page += "</div></td>"
                    })
                    page += '</tr></table>'
                }
                page += '</div>'
        
            })
        }

        page += '<div class="section-footer collapse-button" onclick="setSectionCollapse('+sectionKey+',2)"><h2 class="center section-footer-text">[Collapse]</h2></div>'
        page += '</div></div>'
    })

    page += '<div id="control-panel" class="control-panel" style="display: none">'
    page += '<table><tr>'
    page += '<td class="control-panel-button" onclick="scrollToTop()">⌂</td>'
    page += '<td class="control-panel-button" onclick="cycleSection(true)">\u2227</td>'
    page += '<td class="control-panel-button" onclick="cycleSection(false)">\u2228</td>'
    page += '</tr></table>'
    page += '</div>'
    page += '<div id="control-panel-hidden" class="control-panel"><table><tr><td id="control-panel-hidden-button" class="control-panel-button" onclick="toggleControlPanelVisibility()"><</td></tr></table></div>'

    return page
}







function pageRev1(data) {
    var page = ''

    if(data.background) {
        page += '<div id="parallax-background" style="background-image: url('+data.background+')"></div>'
    }
    
    page += '<div class="section">'
    page += '<h1 class="center">'+data.name+'</h1>'
    page += '<h3 class="center">'+data.subtext+'</h3>'
    page += '<br/>'
    page += '<div class="center"><a href="'+data.wiki+'" rel="noopener noreferrer" target="_blank" class="button">Call of Duty Wiki</a></div>'
    if(data.wip) {
        page += '<br/>'
        page += '<h1 class="wip">- WIP -</h1>'
    }
    page += '</div>'

    if(data.maps) {
        $.each(data.maps, function (mapKey, map) {
            mapLink = map.img;
            if(map.link)
                mapLink = map.link;
            page += '<div class="center"><a href="'+mapLink+'" rel="noopener noreferrer" target="_blank"><img src="'+map.img+'" class="img-border img-full"/></a></div>'
        })
    }
    
    $.each(data.sections, function (sectionKey, section) {
        page += '<div class="section">'
        page += '<h2 class="center">'+section.header+'</h2>'

        if(section.rows) {
            page += '<table class="card-table">'
            $.each(section.rows, function (rowKey, row) {
                page += '<tr class="card-table-row">'
        
                $.each(row.cols, function (colKey, col) {
                    page += '<td class="col-wrap"><div class="col-cell center-container">'

                    if(col.header) {
                        page += '<h3>'+col.header+'</h3>'
                    }

                    if(col.elements) {
                        $.each(col.elements, function (elKey, el) {

                            if(el.youtube) {
                                page += '<div class="pic-wrap"><iframe class="pic" src="https://www.youtube.com/embed/'+el.youtube+'" frameborder="0" allowfullscreen></iframe></div>';
                            }
                            else if(el.html) {
                                $.each(el.html, function (htmlKey, html) {
                                    page += html;
                                })
                            }

                        })
                    }

                    page += "</div></td>"
                })
        
                page += '</tr>'
            })
            page += "</table>"
        }

        page += '</div>'
    })

    page += ''
    return page
}