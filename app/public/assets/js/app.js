$(document).ready(function($) {
	$('.edit-article').click(function() {
		location.href = 'notes/' + $(this).data('id');
	});

	$('#delete-articles').click(function() {
		$.ajax({
			url: "/delete",
			method: "POST"
		});
	});

	$(".delete-articles").click(function() {
		$.ajax({
			url: "/delete",
			method: "POST",
			data: {
				id: $(this).data("id")
			}
		});
		location.reload();
	});

	$("#note-submit").click(function() {
		let note = $("#note-input").val().trim();
		let noteID = $('#note-id').text();

		$('#notes').append(`<p>${note}</p>`);

		$.ajax({
			url: "/notes/" + noteID,
			method: "POST",
			data: {
				note: note
			},
		});

		$("#note-input").val("");
	});

});