/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
     window.plugins.toast.showLongBottom('Use the back button to return to main.');
     app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    $( document ).on( "swipeleft", ".ui-page", function( event ) {
            // Get the filename of the next page. We stored that in the data-next
            // attribute in the original markup.
            var next = $( this ).jqmData( "next" );
            if ( next ) {
                navnext( next );
            }
        });
    // The same for the navigating to the previous page
    $( document ).on( "swiperight", ".ui-page", function( event ) {
        var prev = $( this ).jqmData( "prev" );
        if (prev) {
            navprev( prev );
        }
    });
   $("#btnJson").click(function(){
        $.ajax({
           type: "GET",
           url: "http://futbolitoapp.herokuapp.com/get_tablasposicionesanio/2016",
           dataType: "json",
           success: function(data) {
            $('#torneos2016').empty();
            for(var i = 0; i < data.length; i++){
                var categoria = data[i].categoria;
                var anio = data[i].anio;
                var resultados = data[i].resultados;
                var header= $('<h3>'+categoria+' '+anio+'</h3>');
                var table = $('<table data-role="table" data-mode="columntoggle" class="ui-body-d ui-shadow table-stripe ui-responsive" data-column-btn-theme="b" data-column-btn-text="Datos..." data-column-popup-theme="a"></table>');
                var thead = $('<thead></thead>');
                var trhead = $('<tr class="ui-bar-d"></tr>');
                var th1 = $('<th data-priority="persist">#</th>');
                var th2 = $('<th data-priority="persist">EQ</th>');
                var th3 = $('<th data-priority="persist">PJ</th>');
                var th4 = $('<th data-priority="persist">PTS</th>');
                var th5 = $('<th data-priority="1">PG</th>');
                var th6 = $('<th data-priority="1">PE</th>');
                var th7 = $('<th data-priority="1">PP</th>');
                var th8 = $('<th data-priority="2">GF</th>');
                var th9 = $('<th data-priority="2">GC</th>');
                var th10 = $('<th data-priority="2">GD</th>');
                var tbody = $('<tbody></tbody>');
                for (var j = 0; j < resultados.length ; j++){
                    var trbody = $('<tr></tr>');
                    trbody.append('<th>'+(j+1)+'</th>');
                    trbody.append('<th><a value="'+resultados[j].ID+'" class="equipo'+i.toString()+j.toString()+'" href="#page3" data-transition="slide">'+resultados[j].equipo+'</a></th>');
                    trbody.append('<th>'+resultados[j].PJ+'</th>');
                    trbody.append('<th>'+resultados[j].PTS+'</th>');
                    trbody.append('<td>'+resultados[j].PG+'</th>');
                    trbody.append('<td>'+resultados[j].PE+'</th>');
                    trbody.append('<td>'+resultados[j].PP+'</th>');
                    trbody.append('<td>'+resultados[j].GF+'</th>');
                    trbody.append('<td>'+resultados[j].GC+'</th>');
                    trbody.append('<td>'+resultados[j].GD+'</th>');
                    tbody.append(trbody);
                }
                $('#torneos2016').append(header);
                $('#torneos2016').append(table);
                table.append(thead);
                table.append(tbody);
                thead.append(trhead);
                trhead.append(th1);
                trhead.append(th2);
                trhead.append(th3);
                trhead.append(th4);
                trhead.append(th5);
                trhead.append(th6);
                trhead.append(th7);
                trhead.append(th8);
                trhead.append(th9);
                trhead.append(th10);
                for(var j = 0; j < resultados.length; j++){
                    $(".equipo"+i.toString()+j.toString()).bind('click', function(){
                        $('#equipoDetalle').empty();
                        $('.equipoNombre').html("");
                        var idEquipo = $(this).attr("value");
                        console.log(idEquipo);
                        $.ajax({
                            type: "GET",
                            url: "http://futbolitoapp.herokuapp.com/get_equipo/"+idEquipo,
                            dataType: "json",
                            success: function(data) {
                                if(idEquipo == data.id){
                                    $('#equipoDetalle').append(data.nombre+" // "+data.director_tecnico+" // "+data.categoria);
                                    $('.equipoNombre').html(data.nombre);
                                    $.ajax({
                                        type: "GET",
                                        url: "http://futbolitoapp.herokuapp.com/get_jugadores_equipo/"+idEquipo,
                                        dataType: "json",
                                        success: function(data) {
                                            $('#equipoJugadores').empty();
                                            $('#equipoJugadores').append('</ul>');
                                            for(var i = 0; i < data.length; i++){
                                                $('#equipoJugadores').append('<li>'+data[i].nombre+" "+data[i].apellido+" // "+data[i].camiseta+'</li>');
                                            }
                                        },
                                        error: function(e) {
                                            alert('Error: ' + e.message);
                                        }
                                    });
                                    $.ajax({
                                        type: "GET",
                                        url: "http://futbolitoapp.herokuapp.com/get_ult10partidosequipo/"+idEquipo,
                                        dataType: "json",
                                        success: function(data) {
                                            $('#equipoDetalle').append('</ul>');
                                            for(var i = 0; i < data.length; i++){
                                                $('#equipoDetalle').append('<li>'+data[i].fecha+"//"+data[i].equipo_local+" "+data[i].gol_local+" - "+data[i].gol_visitante+" "+data[i].equipo_visitante+'</li>');
                                            }
                                        },
                                        error: function(e) {
                                            alert('Error: ' + e.message);
                                        }
                                    });
                                    $.ajax({
                                       type: "GET",
                                       url: "http://futbolitoapp.herokuapp.com/get_ultima_participacion/"+idEquipo,
                                       dataType: "json",
                                       success: function(data) {
                                        $('#equipoPosiciones').empty();
                                        var categoria = data.categoria;
                                        var anio = data.anio;
                                        var resultados = data.resultados;
                                        var header= $('<h3>'+categoria+' '+anio+'</h3>');
                                        var table = $('<table data-role="table" data-mode="columntoggle" class="ui-body-d ui-shadow table-stripe ui-responsive" data-column-btn-theme="b" data-column-btn-text="Datos..." data-column-popup-theme="a"></table>');
                                        var thead = $('<thead></thead>');
                                        var trhead = $('<tr class="ui-bar-d"></tr>');
                                        var th1 = $('<th data-priority="persist">#</th>');
                                        var th2 = $('<th data-priority="persist">EQ</th>');
                                        var th3 = $('<th data-priority="persist">PJ</th>');
                                        var th4 = $('<th data-priority="persist">PTS</th>');
                                        var th5 = $('<th data-priority="1">PG</th>');
                                        var th6 = $('<th data-priority="1">PE</th>');
                                        var th7 = $('<th data-priority="1">PP</th>');
                                        var th8 = $('<th data-priority="2">GF</th>');
                                        var th9 = $('<th data-priority="2">GC</th>');
                                        var th10 = $('<th data-priority="2">GD</th>');
                                        var tbody = $('<tbody></tbody>');
                                        for (var j = 0; j < resultados.length ; j++){
                                            var trbody = $('<tr></tr>');
                                            trbody.append('<th>'+(j+1)+'</th>');
                                            trbody.append('<th>'+resultados[j].equipo+'</th>');
                                            trbody.append('<th>'+resultados[j].PJ+'</th>');
                                            trbody.append('<th>'+resultados[j].PTS+'</th>');
                                            trbody.append('<td>'+resultados[j].PG+'</th>');
                                            trbody.append('<td>'+resultados[j].PE+'</th>');
                                            trbody.append('<td>'+resultados[j].PP+'</th>');
                                            trbody.append('<td>'+resultados[j].GF+'</th>');
                                            trbody.append('<td>'+resultados[j].GC+'</th>');
                                            trbody.append('<td>'+resultados[j].GD+'</th>');
                                            tbody.append(trbody);
                                        }
                                        $('#equipoPosiciones').append(header);
                                        $('#equipoPosiciones').append(table);
                                        table.append(thead);
                                        table.append(tbody);
                                        thead.append(trhead);
                                        trhead.append(th1);
                                        trhead.append(th2);
                                        trhead.append(th3);
                                        trhead.append(th4);
                                        trhead.append(th5);
                                        trhead.append(th6);
                                        trhead.append(th7);
                                        trhead.append(th8);
                                        trhead.append(th9);
                                        trhead.append(th10);
                                        $('#equipoPosiciones').enhanceWithin();
                                       },
                                       error: function(e) {
                                         alert('Error: ' + e.message);
                                       }
                                    });
                                }
                            },
                            error: function(e) {
                                alert('Error: ' + e.message);
                            }
                        });
                    });
                }
             }
            $('#torneos2016').enhanceWithin();
           },
           error: function(e) {
             alert('Error: ' + e.message);
           }
        });

    });
}

function navnext( next ) {
    $( ":mobile-pagecontainer" ).pagecontainer( "change", next, {
        transition: "slide"
    });
}
function navprev( prev ) {
    $( ":mobile-pagecontainer" ).pagecontainer( "change", prev, {
        transition: "slide",
        reverse: true
    });
}

