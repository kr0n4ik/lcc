let fer = [
	{
		"title": "B66291G0000X187 ELP 43/10/28 with ELP 43/10/28",
		"Ve": 13578,
		"Ae": 217,
		"le": 50.9,
		"Al": 7300,
		"mq": 1430,
		"Bs": 300,
		"Pv": 8.0
	},{
		"title": "B66291G0100X187 ELP 43/10/28 with ELP 43/10/28 GAP 0.1",
		"Ve": 13578,
		"Ae": 217,
		"le": 50.9,
		"Al": 2225,
		"mq": 470,
		"Bs": 300,
		"Pv": 8.0
	},{
		"title": "B66291G1000X187 ELP 43/10/28 with ELP 43/10/28 GAP 1.0",
		"Ve": 13578,
		"Ae": 217,
		"le": 50.9,
		"Al": 355,
		"mq": 75,
		"Bs": 300,
		"Pv": 8.0
	},{
		"title": "B65684A0000R087 PM62/49 N87",
		"Ae": 470,
		"le": 109,
		"Al": 9200,
		"mq": 1400,
		"Bs": 300,
		"Pv": 5.8
	},{
		"title": "B65684A0315A027 PM62/49 N27 GAP 2.6",
		"Ae": 470,
		"le": 109,
		"Al": 315,
		"mq": 48,
		"Bs": 300,
		"Pv": 5.8
	}
];
function echo(value, str, color) {
	if (value > 1000)
		return Math.round(value/1000)  + " к" + str;
	if (value > 0.99)
		return Math.round(value*10)/10 + " " + str;
	if (value > 0.00099)
		return Math.round(value*10000)/10 + " м" + str;
	if (value > 0.00000099)
		return Math.round(value*10000000)/10 + " мк" + str;
	if (value > 0.00000000099)
		return Math.round(value*10000000000)/10 + " н" + str;
	if (value > 0.00000000000099)
		return Math.round(value*10000000000000)/10 + " п" + str;
	return value;
}
$(document).ready(function() {
	$(fer).each(function( index ) { $("#tr_i").append("<option value=\"" + index + "\">" + fer[index].title + "</option>"); });
	$(fer).each(function( index ) { $("#dr_i").append("<option value=\"" + index + "\">" + fer[index].title + "</option>"); });
	$("#go").click(function() {
		let tr_i = $("#tr_i").val();
		let tr_n = $("#tr_n").val();
		let dr_i = $("#dr_i").val();
		let dr_n = $("#dr_n").val();
		let f = $("#f").val()*1000;
		let u_in_nom = $("#u_in_nom").val();
		let u_in_min = $("#u_in_min").val();
		let u_in_max = $("#u_in_max").val();
		let u_out = $("#u_out").val();
		let i_out = $("#i_out").val();
		
		let n = 3.5;
		
		let b_tr = (u_in_max*1100000)/(4*f*1.11*tr_n*fer[tr_i].Ae);
		let l_tr = Math.pow(tr_n, 2) * fer[tr_i].Al/1000000000;
		//let l_hz = (Math.pow(tr_n, 2)*4*Math.PI*fer[tr_i].mq*1000*fer[tr_i].Ae)/(1000000*fer[tr_i].le);
		//let b_i = (fer[tr].le*fer[tr].Bs)/(1257*fer[tr].mq*tr_n);
		//let b_i = (u_out*2)/(f*l_m);
		
		//let l_r = l_m/3.5;
		//let c_r = 1/(Math.pow((2*Math.PI*f), 2) * l_r);
		//let r_ac = (8*Math.pow(n, 2)*u_out)/(Math.pow(Math.PI,2)*i_out);
		
		
		$("#out").html("");
		$("#out").append("<p><b>Трансформатор</b></p>");
		if ( b_tr > (0.0009 * fer[tr_i].Bs))
			$("#out").append("<p style=\"color:red;\"><b>Плотность потока: </b>" + echo(b_tr, "Тл") + "</p>");
		else
			$("#out").append("<p><b>Плотность потока: </b>" + echo(b_tr, "Тл") + "</p>");
		$("#out").append("<p><b>Индуктивность: </b>" + echo(l_tr, "Гн") + "</p>");
		//$("#out").append("<p><b>Индуктивность: </b>" + echo(l_hz, "Гн") + "</p>");
		

		
	
	});
});

/*
function print(value, str, color) {
	if (value > 1000)
		return Math.round(value/1000)  + " к" + str;
	if (value > 0.99)
		return Math.round(value*10)/10 + " " + str;
	if (value > 0.00099)
		return Math.round(value*10000)/10 + " м" + str;
	if (value > 0.00000099)
		return Math.round(value*10000000)/10 + " мк" + str;
	if (value > 0.00000000099)
		return Math.round(value*10000000000)/10 + " н" + str;
	if (value > 0.00000000000099)
		return Math.round(value*10000000000000)/10 + " п" + str;
	return value;
}
function M(x, k, q) {
	let v = 1/Math.sqrt(Math.pow(( 1 +(1/k)*(1 - 1/Math.pow(x,2)) ), 2) + Math.pow(q, 2)*Math.pow((x-1/x), 2));
	return (v > 1.4) ? 1.4 : v;
}
$(document).ready(function() {
	$(fer).each(function( index ) { $("#index").append("<option value=\"" + index + "\">" + fer[index].title + "</option>"); });
	$("#go").click(function() {
		let index = $("#index").val();
		let f = $("#f").val()*1000;
		let f_min = $("#f_min").val()*1000;
		let f_max = $("#f_max").val()*1000;
		let u_in_nom = $("#u_in_nom").val();
		let u_in_min = $("#u_in_min").val();
		let u_in_max = $("#u_in_max").val();
		let u_out = $("#u_out").val();
		let i_out = $("#i_out").val();
		let l_n = $("#l_n").val();
		let n = u_in_nom/u_out;
		let g_min = n*u_out/u_in_max;
		let g_max = n*u_out*1.1/u_in_min;
		
		let n_p = Math.ceil(u_in_nom*1100000000/(f*fer[index].Bs*fer[index].Ae));
		let l_m = Math.pow(n_p, 2) * fer[index].Al/1000000000;
		let l_r = l_m/l_n;
		let c_r = 1/(Math.pow((2*Math.PI*f), 2) * l_r);
		let r_ac = (8*Math.pow(n, 2)*u_out)/(Math.pow(Math.PI,2)*i_out);
		let Q = 1/(2*Math.PI*f*r_ac*c_r);
		
		$("#out").html("");
		if (n > 1)
			$("#out").append("<p><b>Коэффициент трансформации: </b>" + Math.round(n*10)/10 + ":1 </p>");
		else
			$("#out").append("<p><b>Коэффициент трансформации: </b>1:" + Math.round(10/n)/10 + " </p>");
		$("#out").append("<p><b>Коэффициент передачи: </b>" + Math.round(g_min*100)/100 + " - " + Math.round(g_max*100)/100 + " </p>");
		$("#out").append("<p><b>Число витков первички: </b>" + n_p + " </p>");
		$("#out").append("<p><b>Индуктивность Lm: </b>" + print(l_m, "Гн") + "</p>");
		$("#out").append("<p><b>Индуктивность Lr: </b>" + print(l_r, "Гн") + "</p>");
		$("#out").append("<p><b>Емкость Cr: </b>" + print(c_r, "Ф") + "</p>");
		$("#out").append("<p><b>Эквивалентное сопротивление Rac: </b>" + print(r_ac, "Ом") + "</p>");
		$("#out").append("<p><b>Добротность контура: </b>" + Math.round(Q*10)/10 + "</p>");
		
		let i_oe = (Math.PI*i_out)/(2*Math.sqrt(2)*n);
		let i_m = (0.901*n*u_out)/(2*Math.PI*f_min*l_m);
		let i_r = Math.sqrt(Math.pow(i_m, 2) + Math.pow(i_oe, 2));
		let u_r = 2*Math.PI*f_min*l_r*i_r;
		let u_c = i_r/(2*Math.PI*f_min*c_r);
		$("#out").append("<p><b>Действующий ток первички: </b>" + print(i_oe, "А") + "</p>");
		$("#out").append("<p><b>Действующий ток намагничевания: </b>" + print(i_m, "А") + "</p>");
		$("#out").append("<p><b>Действующий ток резонансного контура: </b>" + print(i_r, "А") + "</p>");
		$("#out").append("<p><b>Напряжение на резонаторе: </b>" + print(u_r, "В") + "</p>");
		$("#out").append("<p><b>Напряжение на конденсаторе: </b>" + print(u_c, "В") + "</p>");
		
		let i_xx = (n*u_out)/(4*f_max*(l_m+l_r));
		$("#out").append("<p><b>Ток холостого хода: </b>" + print(i_xx, "А") + "</p>");
		
		
		bb = Math.ceil(58*1000000000/(2*f*fer[index].Bs*fer[index].Ae));
		$("#out").append("<p><b>Напряжение на конденсаторе: </b>" + print(bb, "Тл") + "</p>");
		
		let r_max = [];
		r_ac = (8*Math.pow(n, 2)*u_out*10)/(Math.pow(Math.PI,2)*i_out);
		Q = 1/(2*Math.PI*f*r_ac*c_r);
		for (var i = 1; i < 400; i++) {
			r_max.push({x: f*i/100000, y: M(i/100, l_n, Q)} );
		}
		let r_q = [];
		r_ac = (8*Math.pow(n, 2)*u_out)/(Math.pow(Math.PI,2)*i_out);
		Q = 1/(2*Math.PI*f*r_ac*c_r);
		for (var i = 1; i < 400; i++) {
			r_q.push({x: f*i/100000, y: M(i/100, l_n, Q)} );
		}
		let r_min = [];
		r_ac = (8*Math.pow(n, 2)*u_out)/(Math.pow(Math.PI,2)*i_out*1.2);
		Q = 1/(2*Math.PI*f*r_ac*c_r);
		for (var i = 1; i < 400; i++) {
			r_min.push({x: f*i/100000, y: M(i/100, l_n, Q)} );
		}
		
		nv.addGraph(function() {
			chart = nv.models.lineChart().options({duration: 300, useInteractiveGuideline: true});
			chart.xAxis.axisLabel("Частота, кГц").tickFormat(d3.format(',f'));
			chart.yAxis.axisLabel('Усилиние').tickFormat(function(d) { if (d == null) { return 'N/A'; } return d3.format(',.2f')(d); });
			d3.select('#chart1').html("");
			d3.select('#chart1').append('svg').datum([{values: r_max, key: "Rн:10%", color: "#550000"},{values: r_q, key: "Rн:100%", color: "#ff0000"},{values: r_min, key: "Rн:120%", color: "#00ff00"}]).call(chart);
			nv.utils.windowResize(chart.update);
			return chart;
		});
		
	});
});*/
