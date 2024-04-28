$(function(){
	/*loader 제어*/
	$(document).ready(function(){
		// --------- 테이블 자동 생성 및 페이지네이션 생성 및 동작 관련-----------------------
		var page_per_row = 15;
		var per_rows;
		var per_count;
		var option_1;
		var option_2;
		var option_3;
		var option_4;
		function table_maker(){
			var get_table_json = './data/gridData_1.json';
			var item_condition;
			var index_val=0;
			var tr_index = 0;
			var in_index = 0;

			$.getJSON(get_table_json, function(data){
				$('.board_table_wrap').append('<table class="board_table"><caption class="blind">데이터 관리 목록 테이블</caption>\
					<colgroup><col style="width:12%"><col style="width:52%"><col style="width:12%"><col style="width:12%"><col style="width:12%"></colgroup>\
					<thead><tr><th scope="col">코드번호</th><th scope="col">사업명</th>	<th scope="col">상태</th><th scope="col">등록일</th><th scope="col">최종 수정자</th></tr></thead>\
					<tbody class="board_table_body"></tbody>\
					</table>'
				);
				$('.board_pagenation').append('<button type="button" class="page_next_btn" tabindex="0"></button><ul class="page_num_url"></ul><button type="button" class="page_back_btn" tabindex="0"></button>');
				$.each(data, function(I, item){
					item_condition = item.condition;
					tr_index++;

					$('.board_table_body').append('<tr class="data_tr_title data_tr_title_'+tr_index+'" data-index="'+tr_index+'"><td>'+item.id+'</td><td><a href="#none" tabindex="0">'+item.business+'</a></td><td><span class="">'+item.condition+'</span></td><td>'+item.date+'</td><td>'+item.name+'</td></tr>');
					// 테이블 사업명 중 같은 문자열 찾아서 노란색 경고 아이콘 활성화 및 해당 숫자를 파악하여 스테이터스 부분에 표시.
					var text_tr = $('.data_main, .log_main').find('.board_table_wrap').find('.board_table_body').children('tr').find('td:eq(1)');
					for(var i=1; i<text_tr.length; i++){
						for(var j=0; j<i; j++){
							var i_text = $(text_tr[i]).find('a');
							var j_text = $(text_tr[j]).find('a');
							var i_text_a = i_text.text();
							var j_text_a = j_text.text();
							if(i_text_a==j_text_a){
								i_text.addClass('caution_yellow');
								j_text.addClass('caution_yellow');
								var same_arr_length = $('.data_main, .log_main').find('.board_table_wrap').find('.caution_yellow').length;
								$('.data_main, .log_main').find('.board_status').find('ul').find('dl').find('.color_FF0000').text(same_arr_length);
							}
						}
					};
					// 데이터에 등록 된 상태를 체크하여 테이블에 상태에 맞는 class명 대입 및 해당 숫자를 파악하여 스테이터스 부분에 표시.
					$('.data_main, .log_main').find('.board_table_wrap').find('.board_table_body').children('tr').find('td:eq(2)').children('span').each(function(){
						// $('.board_table_body').children('tr').find('td:eq(2)').children('span').removeAttr('class');
						if($(this).text()=='신규'){
							$(this).addClass('color_000000');
							$(this).addClass('new_this');
							option_1 =$('.data_main, .log_main').find('.board_table_wrap').find('.board_table_body').children('tr').find('.new_this').length;
							$('.data_main, .log_main').find('.board_status').find('ul').find('dl').find('.color_000000').text(option_1);
						}
						if($(this).text()=='임시저장'){
							$(this).addClass('color_709CBC');
							option_2 = $('.data_main, .log_main').find('.board_table_wrap').find('.board_table_body').children('tr').find('.color_709CBC').length;
							$('.data_main, .log_main').find('.board_status').find('ul').find('dl').find('.color_709CBC').text(option_2);
						}
						if($(this).text()=='작성중'){
							$(this).addClass('color_000AFF');
							option_3 =  $('.data_main, .log_main').find('.board_table_wrap').find('.board_table_body').children('tr').find('.color_000AFF').length;
							$('.data_main, .log_main').find('.board_status').find('ul').find('dl').find('.color_000AFF').text(option_3);
						}
						if($(this).text()=='완료'){
							$(this).addClass('color_B8B8B8');
							option_4 = $('.data_main, .log_main').find('.board_table_wrap').find('.board_table_body').children('tr').find('.color_B8B8B8').length;
							$('.data_main, .log_main').find('.board_status').find('ul').find('dl').find('.color_9c9c9c').text(option_4);
						}
						index_val++;
					});
					per_rows = $('.data_main, .log_main').find('.board_table_body').find('tr');
					per_count = per_rows.length;
				});
				pagenation_maker();
			});
			// 페이지네이션 생성 함수.
			function pagenation_maker(){
				var page_count = Math.ceil(per_count/page_per_row);
				for(var i=1; i<=page_count; i++){
					$('.data_main, .log_main').find('.page_num_url').append('<li><a href="#" class="num_btn num_btn_'+i+'" data-num="'+i+'" tabindex="0">'+i+'</a></li>');
				};
				$('.num_btn_1').click();
			};
		};
		// 테이블 생성자 실행.
		table_maker();
		// 페이지네이션 각 숫자 버튼 제어.
		$('.data_main, .log_main').find('.board_pagenation').on('click','a',function(e){
			e.preventDefault();

			var num_btn = $('.data_main, .log_main').find('.board_pagenation').find('a');
			var view_page = $(this).data('num');
			var num_start =view_page*page_per_row;
			var num_end = num_start+page_per_row;
			var page_count = Math.ceil(per_count/page_per_row);

			num_btn.removeClass('on');
			$(this).addClass('on');
			console.log(num_end);
			$('.data_main, .log_main').find('.board_table_wrap').find('.board_table_body').children('tr').addClass('display_none');
			$('.data_main, .log_main').find('.board_pagenation').find('button').removeClass('off');

			for(var i=0; i<page_per_row; i++){
				var view_num = i+((view_page-1)*page_per_row);
				console.log('view_num = '+view_num);
				$('.data_main, .log_main').find('.board_table_wrap').find('.board_table_body').children('tr:eq('+view_num+')').removeClass('display_none');
			};
			if($(this).is('.num_btn_1')){
				$('.data_main, .log_main').find('.board_pagenation').find('.page_next_btn').addClass('off');
			}
			if($(this).is('.num_btn_'+page_count)){
				$('.data_main, .log_main').find('.board_pagenation').find('.page_back_btn').addClass('off');
			}
		});
		// 페이지네이션 각 앞뒤 버튼 제어.
		$('.data_main, .log_main').find('.board_pagenation').on('click','button',function(e){
			var page_length = $('.data_main, .log_main').find('.page_num_url').find('a').length;
			var this_page = $('.data_main, .log_main').find('.page_num_url').find('.on').data('num');
			var this_num;

			$('.data_main, .log_main').find('.board_pagenation').find('button').removeClass('off');
			$('.data_main, .log_main').find('.page_num_url').find('a').removeClass('on');

			if($(this).is('.page_back_btn')){
				if(this_page>=page_length){
					this_num=page_length;
					$(this).addClass('off');
				}else{
					this_num = this_page+1;
					if(this_page>=(page_length-1)){
						$(this).addClass('off');
					}
				}
				$('.data_main, .log_main').find('.page_num_url').find('.num_btn_'+this_num).click();
			}else if($(this).is('.page_next_btn')){
				console.log('this_page = '+this_page);
				if(this_page<=1){
					this_num=1;
					$(this).addClass('off');
				}else{
					this_num = this_page-1;
					if(this_page==2){
						$(this).addClass('off');
					}
				}
				$('.data_main, .log_main').find('.page_num_url').find('.num_btn_'+this_num).click();
			}
		});
		// ----------------------------------------------------------
		//-----검색 부분 셀랙트 박스 구현 부분
		var $select_lange = $('.select_lange');
		var $search_list = $('.search_list');
		var $sel_options = $('.search_list').children('li').find('button');
		var $select_input = $('.select_input');

		$select_lange.on('click keydown focusin focusout', function(e){
			if(e.type=='click'){
				$search_list.toggleClass('display_none');
			}
			if(e.type=='keydown'){
				$search_list.removeClass('display_none');
			}
			if(e.type=='focusin'){
				$search_list.addClass('display_none');
			}
			if(e.type=='focusout'){
				$search_list.removeClass('display_none');
			}
		});
		$('.search_list').on('focusin keydown', function(e){
			if(e.type=='focusin'){
				$search_list.removeClass('display_none');
			}
		});

		$sel_options.on('click focusout',function(e){
			if(e.type=='click'){
				$select_lange.text($(this).parent('li').data('option'));
				console.log('option = '+$(this).parent('li').data('option')+' / index = '+$(this).parent('li').data('index'));
				$(".hidden_select").find('option').removeAttr("selected");
				$(".hidden_select").find('option').eq($(this).parent('li').data('index')-1).attr("selected", "selected");
				$search_list.addClass('display_none');
			}
			// if(e.type=='focusout'){
			// 	$search_list.addClass('display_none');
			// }

		});

		$select_input.on('click focusin',function(e){
			$search_list.addClass('display_none');
		});
		//-------------------------

		//-----중복 된 제목 코드 확인 부분 셀랙트 박스 구현 부분
		var $code_select_open = $('.code_select_open');
		var $another_code_list = $('.another_code_list');
		var $code_options = $('.another_code_list').children('li').find('button');
		var $one_section_input = $('.one_section_input');

		$code_select_open.on('click keydown focusin focusout', function(e){
			if(e.type=='click'){
				$another_code_list.toggleClass('display_none');
			}
			if(e.type=='keydown'){
				$another_code_list.removeClass('display_none');
			}
			if(e.type=='focusin'){
				$another_code_list.addClass('display_none');
			}
			if(e.type=='focusout'){
				$another_code_list.removeClass('display_none');
			}
		});
		$('.another_code_list').on('focusin keydown', function(e){
			if(e.type=='focusin'){
				$another_code_list.removeClass('display_none');
			}
		});

		$code_options.on('click mousedown focusout',function(e){
			if(e.type=='click'){
				var click_option = $(this).parent('li').data('option');
				$code_select_open.text($(this).text());
				console.log('option = '+click_option+' / index = '+$(this).parent('li').data('index'));
				$(".anoter_code_selectbox").find('option').removeAttr("selected");
				$(".anoter_code_selectbox").find('option').eq($(this).parent('li').data('index')-1).attr("selected", "selected");
				$another_code_list.addClass('display_none');
			}
			// if(e.type=='focusout'){
			// 	$another_code_list.addClass('display_none');
			// }

		});

		$one_section_input.on('click focusin',function(e){
			$another_code_list.addClass('display_none');
		});
		//----------------------------

		// -------컨펌창 구현-------
		var summon_file_this;  // 업로드 파일 명 공유 변수 - 하단 삭제 버튼과 연동하여 사용.
		$('.upload_wrap').on('click', '.close_btn', function(e){
			$('.popup_filter').removeClass('display_none');
			$('.modal_confirm_1').removeClass('display_none');
			summon_file_this = $(this).parent();
			console.log(summon_file_this);
		});
		$('.save_all_btn').on('click',function(e){
			$('.popup_filter').removeClass('display_none');
			$('.modal_confirm_2').removeClass('display_none');
		});
		$('.cancle_btn').on('click',function(e){
			$('.popup_filter').addClass('display_none');
			$('.modal_confirm_1').addClass('display_none');
			$('section').find('[tabindex]').attr({'tabindex':'0','aria-hidden':'false','aria-selected':'true'});
		});
		// ------------------------

		// ------textarea 자동 확장 기능 구현
		var auto_text = document.querySelectorAll('.auto_textarea');

		[].forEach.call(auto_text,function(this_val){
			this_val.addEventListener('keydown',auto_con,false);
			this_val.addEventListener('keyup',auto_con,false);
		});

		function auto_con(){
			var auto_this = document.getElementById('auto_textarea_'+this.dataset.index);
			if(auto_this.scrollHeight > auto_this.clientHeight){ //textarea height 확장
				auto_this.style.height = auto_this.scrollHeight + "px";
				console.log('over drop = '+this.dataset.index);
			}
			else{ //textarea height 축소
				auto_this.style.height = (auto_this.scrollHeight-18) + "px";
			}
			console.log('auto_this.scrollHeight = '+auto_this.scrollHeight+' / auto_this.clientHeight = '+auto_this.clientHeight);
		};
		// --------------------------

		// ------- 데이트픽커 부분 ---
		var start_day;
		var end_day;

		$('.date_long_input').datepicker({
			dateFormat: "yy.mm.dd",
			dayNamesMin:['일','월','화','수','목','금','토'],
			monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
		});
		$('#date_start').on('change', function(e){
			start_day = $( this ).val();
		});
		

		$('#date_end').on('change', function(e){
			end_day = $( this ).val();
		});
		// -----------------------------
		// ------ json 에서 데이터 가져와 input 에 삽입----
		$('.data_main, .log_main').find('.board_table_wrap').on('mousedown mouseup','tr', function(e){
			var json_data = './data/gridData_1.json';
			var $rowId = $(this).find('td').eq(0).text();
			var data_arr = [];
			var auto_this = document.getElementById('auto_textarea_1');

			console.log('this = '+ $rowId);

			if(e.type=="mousedown"){
				if($(this).parent().is('.board_table_body')){
					$('.board_table_wrap').find('.board_table_body').find('tr').removeClass('backgroud_BFDCFF');
					$('.board_table_wrap').find('.board_table_body').find('tr').removeClass('font_weight_700');
					$('.board_table_wrap').find('.board_table_body').find('tr').children('td').removeClass('font_weight_700');
					$('.board_table_wrap').find('.board_table_body').find('tr').find('a').removeClass('font_weight_700');
				}
				$('.board_table_wrap').find('thead').find('tr').removeClass('backgroud_BFDCFF');
				$.getJSON(json_data, function(data){
					$.each(data, function(I, item){
						if(($rowId==item.id)&&($('.data_main, .log_main').find('.input_readonly_wrap, .data_form').length>0)){
							data_arr = item.id+' | '+item.date;
							console.log(item.condition);
							$('#business_input').val(item.business);
							$('#codeNum').val(item.id);
							$('#writeDay').val(item.date);
							$('#date_start').val(item.startDate);
							$('#date_end').val(item.endDate);
							$('#data_price').val(item.price);
							$('#auto_textarea_1').val(item.businessWord);
							$('.solo_badge_wrap').find('.btn_badge_type1').children('a').click(); // 보드 클릭 시 해당 뱃지 구성 전 초기화.
							$('.all_badge_wrap').find('.btn_badge_type2').children('a').click(); // 보드 클릭 시 해당 뱃지 구성 전 초기화.

							// ---- 각 뱃지 정보를 json에서 가져와 해당 필드에 맞게 재구성
							var badge_index_json_1;
							var badge_value_json_1;
							var badge_index_json_2;
							var badge_value_json_2;
							var badge_index_json_3;
							var badge_value_json_3;
							var badge_index_json_4;
							var badge_value_json_4;
							var badge_index_json_5;
							var badge_value_json_5;
							var badge_index_json_6;
							var badge_value_json_6;

							var split_solo_index_1 = item.badgeIndex_1.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_solo_value_1 = item.badgeValue_1.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_solo_index_2 = item.badgeIndex_2.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_solo_value_2 = item.badgeValue_2.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_solo_index_3 = item.badgeIndex_3.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_solo_value_3 = item.badgeValue_3.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_solo_index_4 = item.badgeIndex_4.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_solo_value_4 = item.badgeValue_4.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_all_index_1 = item.badgeIndex_5.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_all_value_1 = item.badgeValue_5.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_all_index_2 = item.badgeIndex_6.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							var split_all_value_2 = item.badgeValue_6.split(' | '); // json 파일의 해당 키값을 구분자로 구분하여 배열의 형태로 나눔.
							
							if((Object.keys(item.badgeIndex_1).length>0)&&(Object.keys(item.badgeValue_1).length>0)){ // json 파일의 해당 키값이 비었는지 확인.
								$(".solo_badge_wrap_1").removeClass('display_none');
								if(split_solo_index_1.length>1){ // json 파일의 해당 키값을 구분자로 구분 된 다수의 값을 가지는지 확인.
									badge_index_json_1 = split_solo_index_1;
									badge_value_json_1 = split_solo_value_1;
									
									for(i=0;i<split_solo_index.length;++i){ // 구분자로 구분 된 배열의 값을 순차적으로 구성.
										var src_solo_index = split_solo_index_1[i];
										var src_solo_value = split_solo_value_1[i];
										var out_html = '<div class="btn_badge_type1" data-index="'+src_solo_index+'" data-value="'+src_solo_value+'">'+src_solo_value+'<a href="#" onclick="fnc_remove1(this)">닫기버튼</a></div>';
										
										$(".solo_badge_wrap_1").append(out_html);
										$(".solo_badge_input_1").val("");
										$('.data_sch_list_solo_1').addClass('display_none');
										$('.data_sch_list_solo_1').children('.solo_src_data_option_'+src_solo_index).addClass('display_none');
										console.log(src_solo_index);
									}
									console.log('split_solo_index = '+split_solo_index+' / split_solo_value = '+split_solo_value+' / length ='+split_solo_index.length);
								}else{
									badge_index_json_1 = item.badgeIndex_1;
									badge_value_json_1 = item.badgeValue_1;

									var out_html = '<div class="btn_badge_type1" data-index="'+badge_index_json_1+'" data-value="'+badge_value_json_1+'">'+badge_value_json_1+'<a href="#" onclick="fnc_remove1(this)">닫기버튼</a></div>';
									$(".solo_badge_wrap_1").append(out_html);
									$(".solo_badge_input_1").val("");
									$('.data_sch_list_solo_1').addClass('display_none');
									$('.data_sch_list_solo_1').children('.solo_src_data_option_'+badge_index_json_1).addClass('display_none');
								};
								solo_badge_arr();
							};
							
							if((Object.keys(item.badgeIndex_2).length>0)&&(Object.keys(item.badgeValue_2).length>0)){ // json 파일의 해당 키값이 비었는지 확인.
								$(".solo_badge_wrap_2").removeClass('display_none');
								if(split_solo_index_2.length>1){ // json 파일의 해당 키값을 구분자로 구분 된 다수의 값을 가지는지 확인.
									badge_index_json_2 = split_solo_index_2;
									badge_value_json_2 = split_solo_value_2;
									for(i=0;i<split_solo_index.length;++i){ // 구분자로 구분 된 배열의 값을 순차적으로 구성.
										var src_solo_index = split_solo_index_2[i];
										var src_solo_value = split_solo_value_2[i];
										var out_html = '<div class="btn_badge_type1" data-index="'+src_solo_index+'" data-value="'+src_solo_value+'">'+src_solo_value+'<a href="#" onclick="fnc_remove1(this)">닫기버튼</a></div>';
										
										$(".solo_badge_wrap_2").append(out_html);
										$(".solo_badge_input_2").val("");
										$('.data_sch_list_solo_2').addClass('display_none');
										$('.data_sch_list_solo_2').children('.solo_src_data_option_'+src_solo_index).addClass('display_none');
										console.log(src_solo_index);
									}
									console.log('split_solo_index = '+split_solo_index+' / split_solo_value = '+split_solo_value+' / length ='+split_solo_index.length);
								}else{
									badge_index_json_2 = item.badgeIndex_2;
									badge_value_json_2 = item.badgeValue_2;

									var out_html = '<div class="btn_badge_type1" data-index="'+badge_index_json_2+'" data-value="'+badge_value_json_2+'">'+badge_value_json_2+'<a href="#" onclick="fnc_remove1(this)">닫기버튼</a></div>';
									$(".solo_badge_wrap_2").append(out_html);
									$(".solo_badge_input_2").val("");
									$('.data_sch_list_solo_2').addClass('display_none');
									$('.data_sch_list_solo_2').children('.solo_src_data_option_'+badge_index_json_2).addClass('display_none');
								};
								solo_badge_arr();
							};

							if((Object.keys(item.badgeIndex_3).length>0)&&(Object.keys(item.badgeValue_3).length>0)){ // json 파일의 해당 키값이 비었는지 확인.
								$(".solo_badge_wrap_3").removeClass('display_none');
								if(split_solo_index_3.length>1){ // json 파일의 해당 키값을 구분자로 구분 된 다수의 값을 가지는지 확인.
									badge_index_json_3 = split_solo_index_3;
									badge_value_json_3 = split_solo_value_3;
									for(i=0;i<split_solo_index.length;++i){ // 구분자로 구분 된 배열의 값을 순차적으로 구성.
										var src_solo_index = split_solo_index_3[i];
										var src_solo_value = split_solo_value_3[i];
										var out_html = '<div class="btn_badge_type1" data-index="'+src_solo_index+'" data-value="'+src_solo_value+'">'+src_solo_value+'<a href="#" onclick="fnc_remove1(this)">닫기버튼</a></div>';
										
										$(".solo_badge_wrap_3").append(out_html);
										$(".solo_badge_input_3").val("");
										$('.data_sch_list_solo_3').addClass('display_none');
										$('.data_sch_list_solo_3').children('.solo_src_data_option_'+src_solo_index).addClass('display_none');
										console.log(src_solo_index);
									}
									console.log('split_solo_index = '+split_solo_index+' / split_solo_value = '+split_solo_value+' / length ='+split_solo_index.length);
								}else{
									badge_index_json_3 = item.badgeIndex_3;
									badge_value_json_3 = item.badgeValue_3;

									var out_html = '<div class="btn_badge_type1" data-index="'+badge_index_json_3+'" data-value="'+badge_value_json_3+'">'+badge_value_json_3+'<a href="#" onclick="fnc_remove1(this)">닫기버튼</a></div>';
									$(".solo_badge_wrap_3").append(out_html);
									$(".solo_badge_input_3").val("");
									$('.data_sch_list_solo_3').addClass('display_none');
									$('.data_sch_list_solo_3').children('.solo_src_data_option_'+badge_index_json_3).addClass('display_none');
								};
								solo_badge_arr();
							};

							if((Object.keys(item.badgeIndex_4).length>0)&&(Object.keys(item.badgeValue_4).length>0)){ // json 파일의 해당 키값이 비었는지 확인.
								$(".solo_badge_wrap_4").removeClass('display_none');
								if(split_solo_index_4.length>1){ // json 파일의 해당 키값을 구분자로 구분 된 다수의 값을 가지는지 확인.
									badge_index_json_4 = split_solo_index_4;
									badge_value_json_4 = split_solo_value_4;
									for(i=0;i<split_solo_index.length;++i){ // 구분자로 구분 된 배열의 값을 순차적으로 구성.
										var src_solo_index = split_solo_index_4[i];
										var src_solo_value = split_solo_value_4[i];
										var out_html = '<div class="btn_badge_type1" data-index="'+src_solo_index+'" data-value="'+src_solo_value+'">'+src_solo_value+'<a href="#" onclick="fnc_remove1(this)">닫기버튼</a></div>';
										
										$(".solo_badge_wrap_4").append(out_html);
										$(".solo_badge_input_4").val("");
										$('.data_sch_list_solo_4').addClass('display_none');
										$('.data_sch_list_solo_4').children('.solo_src_data_option_'+src_solo_index).addClass('display_none');
										console.log(src_solo_index);
									}
									console.log('split_solo_index = '+split_solo_index+' / split_solo_value = '+split_solo_value+' / length ='+split_solo_index.length);
								}else{
									badge_index_json_4 = item.badgeIndex_4;
									badge_value_json_4 = item.badgeValue_4;

									var out_html = '<div class="btn_badge_type1" data-index="'+badge_index_json_4+'" data-value="'+badge_value_json_4+'">'+badge_value_json_4+'<a href="#" onclick="fnc_remove1(this)">닫기버튼</a></div>';
									$(".solo_badge_wrap_4").append(out_html);
									$(".solo_badge_input_4").val("");
									$('.data_sch_list_solo_4').addClass('display_none');
									$('.data_sch_list_solo_4').children('.solo_src_data_option_'+badge_index_json_4).addClass('display_none');
								};
								solo_badge_arr();
							};

							if((Object.keys(item.badgeIndex_5).length>0)&&(Object.keys(item.badgeValue_5).length>0)){ // json 파일의 해당 키값이 비었는지 확인.
								$(".all_badge_wrap_1").removeClass('display_none');
								if(split_all_index_1.length>1){ // json 파일의 해당 키값을 구분자로 구분 된 다수의 값을 가지는지 확인.
									badge_index_json_5 = split_all_index_1;
									badge_value_json_5 = split_all_value_1;
									for(i=0;i<split_all_index_1.length;++i){ // 구분자로 구분 된 배열의 값을 순차적으로 구성.
										var src_all_index = split_all_index_1[i];
										var src_all_value = split_all_value_1[i];
										var out_html = '<div class="btn_badge_type2" data-index="'+src_all_index+'" data-value="'+src_all_value+'">'+src_all_value+'<a href="#" onclick="fnc_remove2(this)">닫기버튼</a></div>';
										var choice_all_top_1 = $(".all_badge_wrap_1").height();
										
										$(".all_badge_wrap_1").append(out_html);
										$(".all_badge_input_1").val("");
										$('.data_sch_list_all_1').addClass('display_none');
										$('.data_sch_list_all_1').children('.all_src_data_option_'+src_all_index).addClass('display_none');
										$(".all_badge_input_1").css({'padding-top':choice_all_top_1+24});
										console.log(src_all_index);
									}
									console.log('split_all_index = '+split_all_index_1+' / split_all_value = '+split_all_value_1+' / length ='+split_all_index_1.length);
								}else{
									badge_index_json_5 = item.badgeIndex_5;
									badge_value_json_5 = item.badgeValue_5;

									var out_html = '<div class="btn_badge_type2" data-index="'+badge_index_json_5+'" data-value="'+badge_value_json_5+'">'+badge_value_json_5+'<a href="#" onclick="fnc_remove2(this)">닫기버튼</a></div>';
									$(".all_badge_wrap_1").append(out_html);
									$(".all_badge_input_1").val("");
									$('.data_sch_list_all_1').addClass('display_none');
									$('.data_sch_list_all_1').children('.all_src_data_option_'+badge_index_json_5).addClass('display_none');
								};
								all_badge_arr_1();
							};

							if((Object.keys(item.badgeIndex_6).length>0)&&(Object.keys(item.badgeValue_6).length>0)){ // json 파일의 해당 키값이 비었는지 확인.
								$(".all_badge_wrap_2").removeClass('display_none');
								if(split_all_index_2.length>1){ // json 파일의 해당 키값을 구분자로 구분 된 다수의 값을 가지는지 확인.
									badge_index_json_6 = split_all_index_2;
									badge_value_json_6 = split_all_value_2;
									for(i=0;i<split_all_index_2.length;++i){ // 구분자로 구분 된 배열의 값을 순차적으로 구성.
										var src_all_index = split_all_index_2[i];
										var src_all_value = split_all_value_2[i];
										var out_html = '<div class="btn_badge_type2" data-index="'+src_all_index+'" data-value="'+src_all_value+'">'+src_all_value+'<a href="#" onclick="fnc_remove2(this)">닫기버튼</a></div>';
										var choice_all_top_2 = $(".all_badge_wrap_2").height();

										$(".all_badge_wrap_2").append(out_html);
										$(".all_badge_input_2").val("");
										$('.data_sch_list_all_2').addClass('display_none');
										$('.data_sch_list_all_2').children('.all_src_data_option_'+src_all_index).addClass('display_none');
										$(".all_badge_input_2").css({'padding-top':choice_all_top_2+24});
										console.log(src_all_index);
									}
									console.log('split_all_index = '+split_all_index_2+' / split_all_value = '+split_all_value_2+' / length ='+split_all_index_2.length);
								}else{
									badge_index_json_6 = item.badgeIndex_6;
									badge_value_json_6 = item.badgeValue_6;

									var out_html = '<div class="btn_badge_type2" data-index="'+badge_index_json_6+'" data-value="'+badge_value_json_6+'">'+badge_value_json_6+'<a href="#" onclick="fnc_remove2(this)">닫기버튼</a></div>';
									$(".all_badge_wrap_2").append(out_html);
									$(".all_badge_input_2").val("");
									$('.data_sch_list_all_2').addClass('display_none');
									$('.data_sch_list_all_2').children('.all_src_data_option_'+badge_index_json_6).addClass('display_none');
								};
								all_badge_arr_2();
							};
							// console.log(badge_index_json_5+' / json / '+badge_value_json_1);
							// ------------------------------------------------------------------
						}
					});
				});
			}
			
			if(e.type=="mouseup"){
				var list_in_same_1;
				var list_in_same_2;

				$(this).addClass('backgroud_BFDCFF');
				$(this).addClass('font_weight_700');
				$(this).children('td').addClass('font_weight_700');
				$(this).find('a').addClass('font_weight_700');
				$('.board_table_wrap').find('thead').find('tr').removeClass('backgroud_BFDCFF');

				if($('.data_main, .log_main').find('.input_readonly_wrap, .data_form').length>0){
					auto_this.style.height = 28+'px';
					if(auto_this.scrollHeight>28){
						auto_this.style.height = auto_this.scrollHeight + "px";
					}
					console.log('auto_this = '+auto_this.scrollHeight);

					$('.caution_name').removeClass('on');
					$('.code_select_open').addClass('display_none');
					if($(this).find('.caution_yellow').length>0){
						var btn_txt = $(this).find('td:eq(0)').text();
						var btn_title = $(this).find('.caution_yellow').text();

						var i = 0;
						$('.data_main, .log_main').find('.board_table_wrap').find('.caution_yellow').each(function(){
							var list_text = $(this).text();
							var list_text_leng = $('.data_main, .log_main').find('.board_table_wrap').find('.caution_yellow').length;
							i++;
							$('.data_main, .log_main').find('.board_table_wrap').find('.caution_yellow:eq('+(i-1)+')').removeClass('caution_yellow_same');
							if(list_text==btn_title){
								var id_text = $(this).parent('td').parent('tr').find('td:eq(0)').text();
								var id_text_leng =   $(this).length;
								$('.data_main, .log_main').find('.board_table_wrap').find('.caution_yellow:eq('+(i-1)+')').removeClass('caution_yellow_same');
								$('.data_main, .log_main').find('.board_table_wrap').find('.caution_yellow:eq('+(i-1)+')').addClass('caution_yellow_same');
								list_in_same_1 =  $('.caution_yellow_same:eq(0)').parent('td').parent('tr').find('td:eq(0)').text();
								list_in_same_2 =  $('.caution_yellow_same:eq(1)').parent('td').parent('tr').find('td:eq(0)').text();
								console.log(list_in_same_2);
							}
						});

						$('.caution_name').addClass('on');
						$('.code_select_open').removeClass('display_none');
						$('.code_select_open').text(btn_txt);
						$('.another_code_list').find('.another_code:eq(0)').children('button').text(list_in_same_1);
						$('.another_code_list').find('.another_code:eq(0)').attr('data-option',list_in_same_1);
						$('.anoter_hidden_select:eq(0)').val(list_in_same_1);
						$('.anoter_hidden_select:eq(0)').text(list_in_same_1);
						$('.another_code_list').find('.another_code:eq(1)').children('button').text(list_in_same_2);
						$('.another_code_list').find('.another_code:eq(1)').attr('data-option',list_in_same_2);
						$('.anoter_hidden_select:eq(1)').val(list_in_same_2);
						$('.anoter_hidden_select:eq(1)').text(list_in_same_2);
					};
				};
			};
		});
		// -----------------------------------------------
		
		// ----- 콤보박스 및 벳지 컨트롤 --------------------
		var index_all_1;
		var value_all_1;
		var this_solo_list; //
		var this_all_badge; //
		var badge_wrap_choice;
		
		$(".solo_badge_input").on("change click focusin focusout keydown keyup", function(e){
			var this_solo_badge = $(this);
			var in_html_1 = '<div class="btn_badge_type1" data-index="'+index_all_1+'" data-value="'+this_solo_badge.val()+'">'+this_solo_badge.val()+'<a href="#" onclick="fnc_remove1(this)">닫기버튼</a></div>';
			
			if(e.type=='focusin'){
				this_solo_badge.siblings('.data_sch_list_solo').removeClass('display_none');
				this_solo_badge.siblings('.data_sch_list_solo').children(".solo_src_data_option").show();
			}
			if(e.type=='focusout'){
				this_solo_badge.siblings('.data_sch_list_solo').addClass('display_none');
				this_solo_badge.siblings('.data_sch_list_solo').children(".solo_src_data_option").show();
			}
			if(e.type=='change'){
				this_solo_badge.siblings(".solo_badge_wrap").append(in_html_1);
				this_solo_badge.siblings(".solo_badge_wrap").removeClass('display_none');
				this_solo_badge.val("");
			}
			if((e.type=='keydown')&&(e.keyCode==13)){
				e.preventDefault();
				e.stopPropagation();
				console.log('앤터 입력');
			}
			if(e.type=='keyup'){// input 입력 시 입력한 값이 포함 된 검색어 만 노출.
				var k = $(this).val();
				this_solo_badge.siblings('.data_sch_list_solo').children(".solo_src_data_option").hide();
				var temp = this_solo_badge.siblings('.data_sch_list_solo').children(".solo_src_data_option:contains('" + k + "')");
				$(temp).show();
			}
        });

		$('.data_form').find('.data_sch_list_solo').on('mousedown keydown focusin', 'button', function(e){
			this_solo_list = $(this);
			console.log('button click.');
			this_solo_list.parent().parent().siblings('.solo_badge_input').val("");
			// this_solo_list.parent().parent().siblings('.solo_badge_wrap').find('.btn_badge_type1').remove();
			value_all_1 = $(this).parent('li').data('value');
			index_all_1 =  $(this).parent('li').data('index');
			this_solo_list.parent().parent('.data_sch_list_solo').addClass('display_none');
			if($(this).parent().is('.etc_solo_sel')){
				$('section').find('[tabindex]').attr({'tabindex':'-1','aria-hidden':'true','aria-selected':'false'});
				$('.popup_filter').removeClass('display_none');
				$(".modal_confirm_4").removeClass('display_none');
				$('.modal_confirm_4').find('[tabindex]').focus();
			}else{
				var out_html_1 = '<div class="btn_badge_type1" data-index="'+index_all_1+'" data-value="'+value_all_1+'">'+value_all_1+'<a href="#" onclick="fnc_remove1(this)">닫기버튼</a></div>';
				this_solo_list.parent().parent().siblings(".solo_badge_wrap").append(out_html_1);
				this_solo_list.parent().parent().siblings(".solo_badge_wrap").removeClass('display_none');
				this_solo_list.parent().parent().siblings(".solo_badge_input").val("");
				solo_badge_arr();
			}
		});

		$('.all_badge_input').on("change click focusin focusout keydown keyup", function(e){
			this_all_badge = $(this);
            var all_wrap_width;
			var all_wrap_top;
			var in_html_2 = '<div class="btn_badge_type2">'+this_all_badge.val()+'<a href="#" onclick="fnc_remove2(this)">닫기버튼</a></div>';

			if(e.type=='focusin'){
				this_all_badge.siblings('.data_sch_list_all').removeClass('display_none');
				this_all_badge.siblings('.data_sch_list_all').children(".all_src_data_option").show();
			}
			if(e.type=='focusout'){
				this_all_badge.siblings('.data_sch_list_all').addClass('display_none');
				this_all_badge.siblings('.data_sch_list_all').children(".all_src_data_option").show();
			}
			if(e.type=='change'){
				this_all_badge.siblings(".all_badge_wrap").append(in_html_2);
				this_all_badge.siblings(".all_badge_wrap").removeClass('display_none');
				this_all_badge.val("");
				this_all_badge.css({'padding-left':'px'});
			}
			if((e.type=='keydown')&&(e.keyCode==13)){
				e.preventDefault();
				e.stopPropagation();
			}
			if(e.type=='keyup'){
				var k = $(this).val();
				this_all_badge.siblings('.data_sch_list_all').children(".all_src_data_option").hide();
				var temp = this_all_badge.siblings('.data_sch_list_all').children(".all_src_data_option:contains('" + k + "')");
				$(temp).show();
			}

			var badge_leng = this_all_badge.siblings('.all_badge_wrap').find('.btn_badge_type2').length;
			all_wrap_width = parseInt(this_all_badge.siblings('.all_badge_wrap').css('width'));
			all_wrap_top = parseInt($(this).siblings('.all_badge_wrap').height());
			console.log('badge_leng = '+badge_leng);

			$(this).css({'padding-top':all_wrap_top});
            // this_all_badge.val("");

            if(this_all_badge.siblings('.all_badge_wrap').find('.btn_badge_type2').length > 9){
				$(this).css({'padding-top':all_wrap_top});
				$('section').find('[tabindex]').attr({'tabindex':'-1','aria-hidden':'true','aria-selected':'false'});
				$('.popup_filter').removeClass('display_none');
				$(".modal_confirm_3").removeClass('display_none');
				$('.modal_confirm_3').find('[tabindex]').focus();
            }else{
				$(this).css({'padding-top':all_wrap_top});
			}
        });

		$('.data_form').find('.data_sch_list_all').on('mousedown','button', function(e){
			var data_all_length = this_all_badge.siblings('.data_sch_list_all').find('.all_src_data_option').length;

			this_all_badge.val("");
			value_all = $(this).parent('li').data('value');
			index_all =  $(this).parent('li').data('index');
			var select_etc = $('.etc_all_sel');
			// $('.btn_badge_type2').remove();
			if($(this).parent().is('.etc_all_sel')){
				$('section').find('[tabindex]').attr({'tabindex':'-1','aria-hidden':'true','aria-selected':'false'});
				$('.popup_filter').removeClass('display_none');
				$(".modal_confirm_5").removeClass('display_none');
				$('.modal_confirm_5').find('[tabindex]').focus();
			}else{
				var out_html = '<div class="btn_badge_type2" data-index="'+index_all+'" data-value="'+value_all+'">'+value_all+'<a href="#" onclick="fnc_remove2(this)">닫기버튼</a></div>';
				this_all_badge.siblings(".all_badge_wrap").append(out_html);
				this_all_badge.siblings(".all_badge_wrap").removeClass('display_none');
				this_all_badge.val("");
				this_all_badge.siblings('.data_sch_list_all').addClass('display_none');
				$(this).parent('.all_src_data_option').addClass('display_none');
				
				if(this_all_badge.siblings(".all_badge_wrap").is('.all_badge_wrap_1')){
					console.log('all_badge_wrap_1 is here.');
					all_badge_arr_1();
				}
				else if(this_all_badge.siblings(".all_badge_wrap").is('.all_badge_wrap_2')){
					console.log('all_badge_wrap_2 is here.');
					all_badge_arr_2();
				}else if(this_all_badge.siblings(".all_badge_wrap").is('.all_badge_wrap_3')){
					console.log('all_badge_wrap_3 is here.');
					all_badge_arr_3();
				}
			}
		});

        fnc_remove1 = function(item){
			$(item).parent().parent('.solo_badge_wrap').addClass('display_none');
			$(item).parent().remove();
			solo_badge_arr();
        };

        fnc_remove2 = function(item){
			var chain_index =  $(item).parent('.btn_badge_type2').data('index');
			var choice_badge_wrap = $(item).parent().parent('.all_badge_wrap');
			var choice_baadge_input = $(item).parent().parent().siblings('.all_badge_input');
			console.log('badge index = '+chain_index);
			$(item).parent().parent().siblings('.data_sch_list_all ').find('.all_src_data_option_'+chain_index).removeClass('display_none');
			$(item).parent().remove();
			if(choice_badge_wrap.find('.btn_badge_type2').length < 10){
				console.log('delete badge. = '+choice_badge_wrap.find('.btn_badge_type2').length);
				all_wrap_top = parseInt(choice_badge_wrap.height());
				choice_baadge_input.css({'padding-top':all_wrap_top});
			}else{
				all_wrap_top = parseInt(choice_badge_wrap.height());
				choice_baadge_input.css({'padding-top':all_wrap_top});
			}

			if(choice_badge_wrap.is('.all_badge_wrap_1')){
				console.log('all_badge_wrap_1 is here.');
				all_badge_arr_1();
			}
			else if(choice_badge_wrap.is('.all_badge_wrap_2')){
				console.log('all_badge_wrap_2 is here.');
				all_badge_arr_2();
			}else if(choice_badge_wrap.is('.all_badge_wrap_3')){
				console.log('all_badge_wrap_3 is here.');
				all_badge_arr_3();
			}
        };
	    
		$('.modal_confirm_4').find('.etc_create_btn').on('click',function(e){
			var create_option_solo =  $('.modal_confirm_4').find('.etc_create_input').val();
			var solo_length = this_solo_list.parent('li').parent('.data_sch_list').find('.solo_src_data_option').length;
			var solo_li_create = '<li data-index="'+solo_length+'" data-value="'+create_option_solo+'" class="solo_src_data_option solo_src_data_option_'+solo_length+'"><button tabindex="0">'+create_option_solo+'</button></li>';
			var solo_op_create = '<option value="'+create_option_solo+'">'+create_option_solo+'</option>';

			console.log('create_option = '+create_option_solo+' / this_solo_list = '+solo_length);
			this_solo_list.parent('li').parent('.data_sch_list_solo').prepend(solo_li_create);
			this_solo_list.parent('li').parent('.data_sch_list').siblings('.list_solo_select ').prepend(solo_op_create);
			$('.etc_create_input').val('');
			$('.popup_filter').addClass('display_none');
			$('.modal_confirm_4').addClass('display_none');
			$('section').find('[tabindex]').attr({'tabindex':'0','aria-hidden':'false','aria-selected':'true'});
		});

		$('.modal_confirm_5').find('.etc_create_btn').on('click',function(e){
			var create_option_all =  $('.modal_confirm_5').find('.etc_create_input').val();
			var all_length = this_all_badge.siblings('.data_sch_list_all').find('.all_src_data_option').length;
			var all_li_create = '<li data-index="'+all_length+'" data-value="'+create_option_all+'" class="all_src_data_option all_src_data_option_'+all_length+'"><button tabindex="0">'+create_option_all+'</button></li>';
			var all_op_create = '<option value="'+create_option_all+'">'+create_option_all+'</option>';

			console.log('create_option = '+create_option_all);
			this_all_badge.siblings('.data_sch_list_all').prepend(all_li_create);
			this_all_badge.siblings('.list_all_select').prepend(all_op_create);
			$('.etc_create_input').val('');
			$('.popup_filter').addClass('display_none');
			$('.modal_confirm_5').addClass('display_none');
			$('section').find('[tabindex]').attr({'tabindex':'0','aria-hidden':'false','aria-selected':'true'});
		});

		function solo_badge_arr(){ // 뱃지 단수 등록 부분 data-value 값 추출 함수로 변수 solo_badge_pipe 에서 string 으로 처리 된 값을 가짐.
			var solo_badge_pipe_1 = String($('.solo_badge_wrap_1').find('.btn_badge_type1').data('value'));
			var solo_badge_index_1 = String($('.solo_badge_wrap_1').find('.btn_badge_type1').data('index'));
			
			var solo_badge_pipe_2 = String($('.solo_badge_wrap_2').find('.btn_badge_type1').data('value'));
			var solo_badge_index_2 = String($('.solo_badge_wrap_2').find('.btn_badge_type1').data('index'));

			var solo_badge_pipe_3 = String($('.solo_badge_wrap_3').find('.btn_badge_type1').data('value'));
			var solo_badge_index_3 = String($('.solo_badge_wrap_3').find('.btn_badge_type1').data('index'));
			
			var solo_badge_pipe_4 = String($('.solo_badge_wrap_4').find('.btn_badge_type1').data('value'));
			var solo_badge_index_4 = String($('.solo_badge_wrap_4').find('.btn_badge_type1').data('index'));

			// 순환식으로 사용 시 이용
			// $('.solo_badge_wrap').find('[data-value]').each(function(){
			// 	solo_badge_pipe = $(this).attr('data-value');
			// 	solo_badge_pipe_wrap += String(solo_badge_pipe)+' | ';
			// 	solo_badge_index = $(this).attr('data-index');
			// 	solo_badge_index_wrap += String(solo_badge_index)+' | ';
				
			// 	console.log(solo_badge_pipe_wrap+' /data-value/ '+solo_badge_index_wrap);
			// });

			// 순환식으로 사용 시 이용 - 순환 기준을 data-index로 하고자 하는 경우 사용 - 상기의 data-value 순환 기준과 중복 사용 금지(값이 중복되어 변수에 입력 됨).
			// $('.solo_badge_wrap').find('[data-index]').each(function(){
			// 	solo_badge_pipe = $(this).attr('data-value');
			// 	solo_badge_pipe_wrap += String(solo_badge_pipe)+' | ';
			// 	solo_badge_index = $(this).attr('data-index');
			// 	solo_badge_index_wrap += String(solo_badge_index)+' | ';
				
			// 	console.log(solo_badge_pipe_wrap+' /data-index/ '+solo_badge_index_wrap);
			// });
			console.log('solo_badge_1 = '+solo_badge_pipe_1+' | '+solo_badge_index_1+' / solo_badge_2 = '+solo_badge_pipe_2+' | '+solo_badge_index_2);
		};

		function all_badge_arr_1(){ // 뱃지 복수 등록 부분 data-value 값 추출 함수로 변수 all_badge_pipe_wrap 에서 string 으로 처리 된 배열을 가짐.
			var all_badge_pipe_1;
			var all_badge_pipe_1_wrap = new Array(); // 복수 badge 의 data-value 값 string 묶음;
			var all_badge_index_1;
			var all_badge_index_1_wrap = new Array();
				
			$('.all_badge_wrap_1').find('[data-value]').each(function(){
				console.log('on all_arr_1 this = '+$(this).prop('className'));
				all_badge_pipe_1 = $(this).attr('data-value');
				all_badge_pipe_1_wrap += String(all_badge_pipe_1)+' | ';
				all_badge_index_1 = $(this).attr('data-index');
				all_badge_index_1_wrap += String(all_badge_index_1)+' | ';
				console.log(all_badge_pipe_1_wrap+' /data-value-1/ '+all_badge_index_1_wrap+' / this = '+$(this).prop('className'));
			});


			// 순환 기준을 data-index로 하고자 하는 경우 사용 - 상기의 data-value 순환 기준과 중복 사용 금지(값이 중복되어 변수에 입력 됨).
			// $('.all_badge_wrap_1').find('[data-index]').each(function(){
			// 	all_badge_pipe = $(this).attr('data-value');
			// 	all_badge_pipe_wrap += String(all_badge_pipe)+' | ';
			// 	all_badge_index = $(this).attr('data-index');
			// 	all_badge_index_wrap += String(all_badge_index)+' | ';
				
			// 	console.log(all_badge_pipe_wrap+' /data-index/ '+all_badge_index_wrap);
			// });
		};

		function all_badge_arr_2(){ // 뱃지 복수 등록 부분 data-value 값 추출 함수로 변수 all_badge_pipe_wrap 에서 string 으로 처리 된 배열을 가짐.
			var all_badge_pipe_2;
			var all_badge_pipe_2_wrap = new Array(); // 복수 badge 의 data-value 값 string 묶음;
			var all_badge_index_2;
			var all_badge_index_2_wrap = new Array();

			$('.all_badge_wrap_2').find('[data-value]').each(function(){
				console.log('on all_arr_2 this = '+$(this).prop('className'));
				all_badge_pipe_2 = $(this).attr('data-value');
				all_badge_pipe_2_wrap += String(all_badge_pipe_2)+' | ';
				all_badge_index_2 = $(this).attr('data-index');
				all_badge_index_2_wrap += String(all_badge_index_2)+' | ';
				console.log(all_badge_pipe_2_wrap+' /data-value-2/ '+all_badge_index_2_wrap+' / this = '+$(this).prop('className'));
			});

			// 순환 기준을 data-index로 하고자 하는 경우 사용 - 상기의 data-value 순환 기준과 중복 사용 금지(값이 중복되어 변수에 입력 됨).
			// $('.all_badge_wrap_2').find('[data-index]').each(function(){
			// 	all_badge_pipe = $(this).attr('data-value');
			// 	all_badge_pipe_wrap += String(all_badge_pipe)+' | ';
			// 	all_badge_index = $(this).attr('data-index');
			// 	all_badge_index_wrap += String(all_badge_index)+' | ';
				
			// 	console.log(all_badge_pipe_wrap+' /data-index/ '+all_badge_index_wrap);
			// });
		};

		function all_badge_arr_3(){ // 뱃지 복수 등록 부분 data-value 값 추출 함수로 변수 all_badge_pipe_wrap 에서 string 으로 처리 된 배열을 가짐.
			var all_badge_pipe_3;
			var all_badge_pipe_3_wrap = new Array(); // 복수 badge 의 data-value 값 string 묶음;
			var all_badge_index_3;
			var all_badge_index_3_wrap = new Array();

			$('.all_badge_wrap_3').find('[data-value]').each(function(){
				console.log('on all_arr_3 this = '+$(this).prop('className'));
				all_badge_pipe_3 = $(this).attr('data-value');
				all_badge_pipe_3_wrap += String(all_badge_pipe_3)+' | ';
				all_badge_index_3 = $(this).attr('data-index');
				all_badge_index_3_wrap += String(all_badge_index_3)+' | ';
				console.log(all_badge_pipe_3_wrap+' /data-value-3/ '+all_badge_index_3_wrap+' / this = '+$(this).prop('className'));
			});

			// 순환 기준을 data-index로 하고자 하는 경우 사용 - 상기의 data-value 순환 기준과 중복 사용 금지(값이 중복되어 변수에 입력 됨).
			// $('.all_badge_wrap_3').find('[data-index]').each(function(){
			// 	all_badge_pipe = $(this).attr('data-value');
			// 	all_badge_pipe_wrap += String(all_badge_pipe)+' | ';
			// 	all_badge_index = $(this).attr('data-index');
			// 	all_badge_index_wrap += String(all_badge_index)+' | ';
				
			// 	console.log(all_badge_pipe_wrap+' /data-index/ '+all_badge_index_wrap);
			// });
		};

		// ---------------------------------------------------

		// ------- 업로드 파일 목록 부분 삭제 동작 예시 부분 ----
		$('.add_file_btn').on('click', function(e){
			$('#careers_view_file').click();
		});

		$('#careers_view_file').on('change', function(e){
			var sum_num = $('.upload_file_wrap').find('.summon_file_wrap').length+1;
			if(window.FileReader){
				var filename = $(this)[0].files[0].name;
			}
			else {
				var filename = $(this).val().split('/').pop().split('\\').pop();
			};
			$('.upload_file_wrap').append('<div class="summon_file_wrap" id="summon_file_wrap_'+sum_num+'">\
			<a href="#" tabindex="0">'+filename+'</a>\
			<button type="button" class="close_btn small remove_summon_btn" tabindex="0"></button></div>');
		});

		$('.delete_btn').on('click', function(e){
			console.log('delete file name.');
			$(summon_file_this).remove();
			$('.popup_filter').addClass('display_none');
			$('.modal_confirm_1').addClass('display_none');
		});

		// ---------------------------------------------------
		// -----레이어 팝업 실행시 하위 레이어 tabindex 처리 및 상위 레이어 오토 포커스
		// var focus_this;
		// var layer_eq;
		// var focus_data;
		// var tab_length;
		// var tab_data;

		// var $l1_tab = $('section').find('[tabindex]');
		// var $l2_tab = $('.modal_confirm').find('[tabindex]');
		// var $l1_tab_leng=$l1_tab.length;
		// var $l2_tab_leng=$l2_tab.length;
		// var t1;
		// var eq;

		// $('section').find('[tabindex]').each(function(){
		// 	tab_data = $(this).attr('tabindex');
		// 	console.log('tab_data = '+tab_data);
		// });
		// function modal_close(e){
		// 	layer_eq = focus_this-1;
		// 	// var layer_1 = document.querySelector('section');
		// 	// var l1_focus = layer_1.querySelectorAll('a, button');
		// 	// var l1_data = layer_1.querySelectorAll('data-focus');
			
		// 	$('section').find('a, button, input').attr({'tabindex':'0','aria-hidden':'false','aria-selected':'true'});
		// 	focus_this.focus();
		// 	// $('section').find('li:eq('+layer_eq+')').children('a').focus();
		// 	// console.log(eq+' + '+t1);
		// };

		// $('section').find('a, input, button').on('click',function(){
		// 	focus_this = $(this).data('focus');
		// 	// tab_data = tab_length.data('focus');
		// 	$('section').find('a').attr({'tabindex':'-1','aria-hidden':'true','aria-selected':'false'});
		// 	$l2_tab.focus();
		// 	console.log(tab_length);
		// });
		// $('.layer_2').find('.close_btn').on('click',function(e){
		// 	modal_close();
		// });
		// $('.log_reload_btn').on('click',function(e){
		// 	location.reload();
		// });

		// $('.logo_link').on('click',function(e){
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	$('.wrap').load('./main.html .container');
		// });
		// $('.log_manage_button').on('click',function(e){
		// 	$('.wrap').load('./log.html .container');
		// });
		
		$('.login_page').find('.btn_wrap').children('button').on('click',function(e){
			location = './main.html';
		});

		// -----------------------------------------------
	});
	return false;
});
