
function echo(value, str) {
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
	return (v > 2.2) ? 2.2 : v;
}

function Rac(l, c, f, n, r) {
	let arr = [];
	//let rac = (8*Math.pow(n, 2)*r)/(Math.pow(Math.PI,2));
	let Q = 1/(2*Math.PI*f*r*c);
	for (var i = 1; i < 200; i++) {
		arr.push({x: f*i/100000, y: M(i/100, l, Q)} );
	}
	return arr;
}

$(document).ready(function() {
	$(fer).each(function( index ) { $("#tr_i").append("<option value=\"" + index + "\">" + fer[index].title + "</option>"); });
	$(fer).each(function( index ) { $("#dr_i").append("<option value=\"" + index + "\">" + fer[index].title + "</option>"); });
	$("#go").click(function() {
		let type = $("#type").val();
		let f = $("#f").val()*1000;
		let u_out = $("#u_out").val();
		let r_out = $("#r_out").val();
		let i_out = $("#i_out").val();
		if (r_out != 0)
			i_out = u_out/r_out;
			console.log(i_out);
		let u_in_nom = 0;
		let u_in_min = 0;
		let u_in_max = 0;
		if (type == 0) {
			u_in_nom = $("#u_in_nom").val();
			u_in_min = $("#u_in_min").val();
			u_in_max = $("#u_in_max").val();
		} else if (type == 1) {
			u_in_nom = $("#u_in_nom").val()/2;
			u_in_min = $("#u_in_min").val()/2;
			u_in_max = $("#u_in_max").val()/2;
		}
		
		
		let tr_i = $("#tr_i").val();
		let tr_l = $("#tr_l").val()/1000000;
		let tr_n = $("#tr_n").val();
		let tr_b = $("#tr_b").val()/1000;
		let dr_l = $("#dr_l").val()/1000000;
		
		let n_p = 0;
		let l_m = 0;
		let n_b = 0;
		if (tr_n != "0") {
			n_p = Math.ceil(tr_n);
			l_m = (Math.pow(n_p, 2) * fer[tr_i].Al)/1000000000;
			n_b = (u_in_max*1000000)/(4*f*n_p*fer[tr_i].Ae);
		} else if (tr_l != "0") {
			l_m = tr_l;
			n_p = Math.round(Math.sqrt((l_m*1000000000)/fer[tr_i].Al));
			n_b = (u_in_max*1000000)/(4*f*n_p*fer[tr_i].Ae);
		} else {
			n_b = tr_b;
			n_p = Math.round((u_in_max*1000000)/(4*f*tr_b*fer[tr_i].Ae));
			l_m = (Math.pow(n_p, 2) * fer[tr_i].Al)/1000000000;
		}
		let n = u_in_nom/u_out;
		let g_min = n*u_out/u_in_max;
		let g_max = (n*u_out*1.1)/u_in_min;
		let l_r = dr_l;
		let c_r = 1/(Math.pow((2*Math.PI*f), 2) * l_r);
		let l_n = Math.round(l_m*100/l_r)/100;
		let r_ac = (8*Math.pow(n, 2)*u_out)/(Math.pow(Math.PI,2)*i_out);
		let Q = 1/(2*Math.PI*f*r_ac*c_r);
		
		//let b = (4*fer[tr_i].mq*Math.PI*n_p)/(10000000*
		
		$("#out").html("");
		if (n > 1)
			$("#out").append("<p><b>Коэффициент трансформации: </b>" + Math.round(n*10)/10 + ":1 </p>");
		else
			$("#out").append("<p><b>Коэффициент трансформации: </b>1:" + Math.round(10/n)/10 + " </p>");
		$("#out").append("<p><b>Коэффициент передачи: </b>" + Math.round(g_min*100)/100 + " - " + Math.round(g_max*100)/100 + " </p>");
		$("#out").append("<p><b>Индуктивность Lm: </b>" + echo(l_m, "Гн") + " ( B:" + echo(n_b, "Тл") + " N:" + n_p + " )" + "</p>");
		$("#out").append("<p><b>Индуктивность Lr: </b>" + echo(l_r, "Гн") + " ( Ln:" + l_n + " )" + "</p>");
		$("#out").append("<p><b>Емкость Cr: </b>" + echo(c_r, "Ф") + "</p>");
		$("#out").append("<p><b>Эквивалентное сопротивление Rac: </b>" + echo(r_ac, "Ом") + "</p>");
		$("#out").append("<p><b>Добротность контура: </b>" + Math.round(Q*10)/10 + "</p>");
		
		let i_oe = (Math.PI*i_out)/(2*Math.sqrt(2)*n);
		let i_m = (0.901*n*u_out)/(2*Math.PI*f*l_m);
		let i_r = Math.sqrt(Math.pow(i_m, 2) + Math.pow(i_oe, 2));
		$("#out").append("<p><b>Действующий ток первички: </b>" + echo(i_oe, "А") + "</p>");
		$("#out").append("<p><b>Действующий ток намагничевания: </b>" + echo(i_m, "А") + "</p>");
		$("#out").append("<p><b>Действующий ток резонансного контура RMS: </b>" + echo(i_r, "А") + "</p>");
		
		
		
		let r = [[],[],[],[]];
		r[0] = Rac(l_n, c_r, f, n, r_ac*10000);
		r[1] = Rac(l_n, c_r, f, n, r_ac*2);
		r[2] = Rac(l_n, c_r, f, n, r_ac);
		r[3] = Rac(l_n, c_r, f, n, r_ac*0.8);
		
		nv.addGraph(function() {
			chart = nv.models.lineChart().options({duration: 300, useInteractiveGuideline: true});
			chart.xAxis.axisLabel("Частота, кГц").tickFormat(d3.format(',f'));
			chart.yAxis.axisLabel('Усилиние').tickFormat(function(d) { if (d == null) { return 'N/A'; } return d3.format(',.2f')(d); });
			d3.select('#chart1').html("");
			d3.select('#chart1').append('svg').datum([{values: r[0], key: "Rн:0.01%", color: "#550000"},{values: r[1], key: "Rн:50%", color: "#0000ff"},{values: r[2], key: "Rн:100%", color: "#00ff00"},{values: r[3], key: "Rн:120%", color: "#ff0000"}]).call(chart);
			nv.utils.windowResize(chart.update);
			return chart;
		});
		
		let u = [[],[],[]];
		for (var i = 1; i < 200; i++) {
			let delta = f*i/100;
			let a = (Math.PI*i_out)/(2*Math.sqrt(2)*n);
			let b = (0.901*n*u_out)/(2*Math.PI*delta*l_m);
			let c = Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2));
			let d = 2*Math.PI*delta*l_r*c;
			let e = c/(2*Math.PI*delta*c_r);
			if (e > 900) e = 900;
			u[0].push({x: f*i/100000, y: d} );
			u[1].push({x: f*i/100000, y: e} );
		}
		
		nv.addGraph(function() {
			chart = nv.models.lineChart().options({duration: 300, useInteractiveGuideline: true});
			chart.xAxis.axisLabel("Частота, кГц").tickFormat(d3.format(',f'));
			chart.yAxis.axisLabel('Напряжение, В').tickFormat(function(d) { if (d == null) { return 'N/A'; } return d3.format(',.2f')(d); });
			d3.select('#chart2').html("");
			d3.select('#chart2').append('svg').datum([{values: u[0], key: "Ulr", color: "#ff0000"},{values: u[1], key: "Uc", color: "#00ff00"}]).call(chart);
			nv.utils.windowResize(chart.update);
			return chart;
		});
		
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
