$(function () {
    let includes = $('[data-include]')
    $.each(includes, function () {
        let file = $(this).data('include') + '.html'
        $(this).load(file)
    })
})