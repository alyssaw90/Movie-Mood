$(function(){
	//ADD BUTTON ON MOVIE INFO PAGE
	$(".addButton").on("click", function(event){
		alert("Hello")
		var theButton = $(this);
		event.preventDefault();
		var thisAddButton = $(this);

		$.post("/favorite/list", {
			title: thisAddButton.data("title"),
			movieId: thisAddButton.data("movieId")
		}, function(data) {
			alert("Movie has been added!");
			theButton.closest(".addButton").fadeOut("slow", function(){
				$(this).remove();
			})
		}) 
	})

	//DELETE BUTTON ON FAVORITE PAGE
	$(".delete").on("click", function(event){
		event.preventDefault();
		var thisDeleteButton = $(this);

		$.ajax({
			url:"/favorite/"+thisDeleteButton.data("id"),
			type: "DELETE",
			success:function(result){
				thisDeleteButton.closest(".favoriteItem").fadeOut("slow", function(){
					$(this).remove();
				})
			}
		})
	})
});