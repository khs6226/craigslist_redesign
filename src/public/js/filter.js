const topBar = $('.filter-top-bar');
const filterArrow = $('.filter-arrow');
const filterContainer = $('.filter-container');
const filterDropdown = $('.filter-dropdown');

topBar.on('click' ,() => {
    filterDropdown.toggleClass('filter-dropdown filter-dropdown-visible');
    if (filterArrow.html() == '⯆') {
        filterArrow.html('⯅')
        filterContainer.css('height', '216px');
        return;
    } 
        filterArrow.html('⯆')
        filterContainer.css('height', '30px');
})