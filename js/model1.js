define(['jquery'],function($){
	return{
		// 1.頭部菜單下拉
		topxiala:(function(){
			$('.location').on('mouseover',function(){
				$('.location-box').show();
				$('.prov').on('click',function(){
				$(this).css({
					background:'#f43499'
				}).siblings('.prov').css({
					background:'#fff'
				})
				$('.province').html($(this).text())
				})
			})
			$('.location').on('mouseout',function(){
				$('.location-box').hide();
			})
			$('.top-nav li').hover(function(){
				$('.top-nav-box').eq($(this).index()).show();
		// $('.top-nav-box').eq($(this).index()).siblings().hide();
			},function(){
				$('.top-nav-box').hide()
			})
		})(),

		// 2.banner部分輪播圖的透明度變化
		bannerop:(function(){
			$('.bannermain ol li').hover(function(){
				$(this).addClass('active').siblings().removeClass('active');
				$('.bannermain img').eq($(this).index()).stop(true,true).animate({
					opacity:1
				},400).siblings('img').stop(true,true).animate({
				opacity:0
				},400)
			})
		})(),

		// 3.側邊欄盒子移出顯示與隱藏
		sidebar:(function(){
			$(".sidebar-nav li").has(".sidebarcom-hover").hover(function(){
					$(this).find(".sidebarcom-hover").addClass("curr");
					$(this).addClass("hover")
				}, function() {
					$(this).find(".sidebarcom-hover").removeClass("curr");
					$(this).removeClass("hover")
				})
			/*回到頂部*/
			$(".sidebar-ft .totop").click(function() {
				$(window).scrollTop(0);
			})
		})(),

		// 4.搜索框下拉提示
		search: (function() {
			$('.search .input input').on("input", function() {
				var data = $('.search .input input').val();
				$.ajax({
					type: "get",
					url: "https://category.vip.com/ajax/getSuggest.php?callback=searchSuggestions&warehouse=",
					data: {
						keyword: data
					},
					dataType: "jsonp"
				}).done(function(data) {
					console.log(data.data)
					var li = "";
					for(var i = 0; i < data.data.length; i++) {
						li += '<li><a href="https://category.vip.com/suggest.php?keyword=' + data.data[i].word + '"</a>' + data.data[i].word + '</li>'
					}
					$(".inputsearch ul").html(li);
					$('.inputsearch').show()
				})
			})
			$('.search .input input').focus(function() {
				//				console.log($(".search-input").val())
				if($('.search .input input').val() != "") {
					$('.inputsearch').show();
				}
			})
			$('.search .input input').blur(function() {
				$('.inputsearch').hide();
			})
		})(),

		// 5.樓梯效果
		louti:(function(){
			$(window).on('scroll',function(){
				var $scrolltop = $(window).scrollTop();
				// var $top=$(this).scrollTop();
				// console.log($top)
				if($scrolltop>=500){
					$('#louti').show();
					$('#louti').css({
					position:'fixed',
					left:'20px',
					top:'120px'
					})	
				}else{
					$('#louti').hide();
				}
				$('.shoplist').each(function(){
					var $contop=$('.shoplist').eq($(this).index()).offset().top;
					if($contop+100>$scrolltop){
						$('#louti ul li').removeClass('act');
						$('#louti ul li').eq($(this).index()).addClass('act');
					return false;
					}	
				});

			});
			$('#louti ul li').on('click',function(){

			})	

		})(),
		// 6.吸頂菜單
		fixnav:(function(){
			$(window).on('scroll',function(){
				var $toph=$(this).scrollTop();
				if($toph>120){
					$('#nav').css({
						height:'40px',
						width:'100%',
						position:'fixed',
						top:0,
						zIndex:100,
						background:'#f10180'
					})
				}else{
					$('#nav').css({
						position:'static'
					})
				}
			})
			// console.log(1111);
		})(),

		// 7.数据拼接
		pinjie:(function(){$.ajax({
			type: "get",
			url: "php/brand.php",
			async: true,
			dataType: 'json'
		}).done(function(d){
			var $html = '';
			for(var i=10;i<18;i++){
			$html+='<li id="shopli">+<img src="'+d[i].url+'" />+<button>立即抢购</button>+</li>'
			}
			$(".shopul").append($html);
		})})(),

		firstShow: (function() {
			$.ajax({
				url: "php/brandgood.php",
				dataType: "json"
			}).done(function(data) {
				//console.log(data)
				data = data.brand;
				var $li = "";
				for(var $i = 10; $i < 20; $i++) {
					$li += '<li class="hoverOpacity">' +
						'<a href="vip-detail.html?id=' + data[$i].id + '" ><img src="' + data[$i].url + '"/></a>' +
						'</li>'
				}
				$("#firstShow #show .show-ul").html($li);
			})
		})(),
	}
})