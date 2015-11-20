$(function(){
	var content;
	$.getJSON("./data/bookmarks.json",function(data){
		content = data;
		content.forEach(function(element){
			$(".bookList").append("<li><div class='listContent'>"
				+ element.title +"</div><div class='listTime'>@created "
				+ getFormatDate(element.created) + "</div></li>");
		});
		
	});
	
	$(".keywords").focus(function(){
		if('please input key words' == $(this).val()) 
		$(this).val("");
	});
	
	$(".keywords").blur(function(){
		if('' == this.value){
			$(this).val("please input key words");
		}
	});
	
	$(".keywords").keyup(function(){
		
		var keywords = $(this).val();
		
			var keywordRE = new RegExp(keywords, "gi");
			

			$(".bookList").html("");  
			
			content.filter(function(obj) {
				return keywordRE.test(obj.title);
			}).map(function (obj) {
				var highlight = obj.title.replace(keywordRE, '<span class="highlight">$&</span>');
				
				$(".bookList").append("<li><div class='listContent'>"
				+ highlight +"</div><div class='listTime'>@created "
				+ getFormatDate(obj.created) + "</div></li>");
				
			});
		
		});	
			
	
		
	function  getFormatDate(ns){ 
		return new Date(parseInt(ns) * 1000).toLocaleString().replace(new RegExp("\\/","g"), "-");
			
	}
	
});





