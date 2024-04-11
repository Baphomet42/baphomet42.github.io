function buildPage(data) {
    var page = ''
    page += '<div class="section">'
    page += '<h1 class="center">'+data.name+'</h1>'
    page += '<h3 class="center">'+data.subtext+'</h3>'
    page += '<br/>'
    page += '<div class="center"><a href="'+data.wiki+'" rel="noopener noreferrer" target="_blank" class="button">Call of Duty Wiki</a></div>'
    page += '</div>'

    if(data.map) {
        mapLink = data.map.img;
        if(data.map.link)
            mapLink = data.map.link;
        page += '<div class="center"><a href="'+mapLink+'" rel="noopener noreferrer" target="_blank"><img src="'+data.map.img+'" class="img-border img-full"/></a></div>'
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
                                page += '<div class="video-wrap"><iframe class="video" src="https://www.youtube.com/embed/'+el.youtube+'" frameborder="0" allowfullscreen></iframe></div>';
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