function buildPage(data) {
    if(data.rev === 1)
        return pageRev1(data)
    else if(data.rev === 2)
        return pageRev2(data)
}

function toggleCollapse(section_id) {
    let el = document.getElementById(section_id)
    if(el.style.display === "none")
        el.style.display = "block"
    else
        el.style.display = "none"
}

function collapseAll(collapse) {
    let mode = "none"
    if(collapse === false) {
        mode = "block"
    }

    let sections = document.getElementsByClassName('collapsable')
    for(let i=0; i<sections.length; i++)
        sections[i].style.display = mode;
}

function pageRev2(data) {
    var page = ''
    page += '<div class="section">'
    page += '<h1 class="center">'+data.name+'</h1>'
    page += '<h3 class="center">'+data.subtext+'</h3>'
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
        page += '<div class="section-group">'
        page += '<div class="section-header" onclick="toggleCollapse(\'section_'+sectionKey+'\')"><h2 class="center">'+section.header+'</h2></div>'

        if(section.collapse)
            page += '<div class="section-body collapsable" id="section_'+sectionKey+'" style="display: none">'
        else
            page += '<div class="section-body collapsable" id="section_'+sectionKey+'">'

        if(section.description)
            page += '<h3 class="center">'+section.description+'</h3>'

        if(section.subsections) {
            $.each(section.subsections, function (subKey, sub) {
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
                            page += '<h3>'+el.step.title+'</h3>';
                            if(el.step.description)
                                page += '<p>'+el.step.description+'</p>';
                        }
                        else if(el.youtube) {
                            page += '<div class="pic-wrap"><iframe class="pic" src="https://www.youtube.com/embed/'+el.youtube+'" frameborder="0" allowfullscreen></iframe></div>';
                        }

                        page += "</div></td>"
                    })
                    page += '</tr></table>'
                }
        
            })
        }

        page += '<div class="section-footer" onclick="toggleCollapse(\'section_'+sectionKey+'\')"><h2 class="center section-footer-text">[Collapse]</h2></div>'
        page += '</div></div>'
    })

    page += ''
    return page
}







function pageRev1(data) {
    var page = ''
    page += '<div class="section">'
    page += '<h1 class="center">'+data.name+'</h1>'
    page += '<h3 class="center">'+data.subtext+'</h3>'
    page += '<br/>'
    page += '<div class="center"><a href="'+data.wiki+'" rel="noopener noreferrer" target="_blank" class="button">Call of Duty Wiki</a></div>'
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