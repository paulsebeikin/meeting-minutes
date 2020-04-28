window.onload = filterList

$("#typeSelector").change(function() {     
            
    $("#meetingItemList input").each(function() {
      $(this)[0].checked = false
    });

    var value = this.options[this.selectedIndex].value;
    filterList(value);    
  })

function filterList(value = null){
  $("#meetingItemList a").filter(function() {
    $(this).toggle($(this)[0].dataset.meetingtype === value);
  });
}