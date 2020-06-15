// cliente 

function numSorter(a,b){
    a = parseFloat(a);
    b = parseFloat(b);
    return a==b?0:(a>b?1:-1);
}

var toolbar = [
    {
        id: 'filtar',
        text: 'Filter',
        type: 'input'
    },
    {
        text:'Add',
        iconCls:'icon-add',
        handler:function(){
            // ao clicar para adicionar, escondemos a grid e abrimos o form
            $('#cliente-cc').layout('expand', 'east');
            $('#ff').form('clear');
        }
    },
    {
        text:'Remover',
        iconCls:'icon-remove',
        handler:function(){
            // ao clicar para adicionar, escondemos a grid e abrimos o form
            var cliente = $('#cliente-table').datagrid('getSelected');
            var rowIndex = $('#cliente-table').datagrid('getRowIndex');
            
            if (cliente === null) return $.messager.alert('Atenção','Selecione um cliente para remover!');
            $.messager.confirm('Confirme','Seguir com a remoção dos dados?',function(r){
                if (r){
                    $('#cliente-table').datagrid('deleteRow', rowIndex);
                }
            });
        }
    }
];

// escondendo o formulário 1 milisegundo após renderizar
// setTimeout( function () {$('#cliente-form').hide()}, 1);
function submitForm(){
    // getando dados do formulário
    var dados = {};
    $.each($('#ff').serializeArray(), function() {
        dados[this.name] = this.value;
    });

    if (dados.id>0) {
        $('#cliente-table').datagrid('updateRow', {
            index: dados.index,
            row: {
                id: dados.id,
                nome: dados.nome,
                endereco: dados.endereco
            }
        });
    }else{
        var datagrid = $('#cliente-table').datagrid('getData');
        
        $('#cliente-table').datagrid('appendRow', {
            id: datagrid.rows[datagrid.rows.length-1].id + 1,
            nome: dados.nome,
            endereco: dados.endereco
        });
        
    }
    
    // $('#cliente-table').datagrid('loadData', datagrid);
    $('#cliente-cc').layout('collapse','east');
    $('#ff').form('clear');
}
function clearForm(){
    $('#ff').form('clear');
    $('#cliente-cc').layout('collapse','east');
}
function err(target, message){
    var t = $(target);
    if (t.hasClass('textbox-text')){
        t = t.parent();
    }
    var m = t.next('.error-message');
    if (!m.length){
        m = $('<div class="error-message"></div>').insertAfter(t);
    }
    m.html(message);
}
// function loadDados (param,success,error){
//     jQuery.ajax({
//         // url: 'ajax?action=getOverviewInoe',
//         url: 'clientes.json',
//         type: 'POST',
//         dataType: 'json',
//         contentType: 'application/json',
//         data: JSON.stringify({
//             a: 1,
//             b: 2
//         }),
//         success: function(data,textStatus, jqXHR){
//             success(data);
//         }
//     });
// }

$(function(){

    // var dg = $('#cliente-table').datagrid({
    //         url: `${api}src/rest/clientes_list.php`,
    //         pagination: true,
    //         clientPaging: false,
    //         remoteFilter: true,
    //         nowrap: true,
    //         autoRowHeight: false,
    //         multiSort:true,
    //         fitColumns: true,
    //         singleSelect:true,
    //         pageList: [10,20,50,100],
    //         toolbar: toolbar
    //     });

    var dgcc = $('#cliente-contatos-table').datagrid({
            url: `${api}src/rest/clientes_contatos.php`,
            pagination: false,
            clientPaging: false,
            remoteFilter: true,
            nowrap: true,
            autoRowHeight: false,
            multiSort:true,
            fitColumns: true,
            singleSelect:true,
            pageList: [10,20,50,100],
            toolbar: toolbar
        });

    // ativando o filtro
    // $('#cliente-table').datagrid('showFilterBar');
    
    // para que o usuário possa navegar utilizando as setas do teclado
    $('#cliente-table').datagrid('getPanel').panel('panel').attr('tabindex',1).bind('keydown',function(e){
        switch(e.keyCode){
            case 38:	// up
                var selected = $('#cliente-table').datagrid('getSelected');
                if (selected){
                    var index = $('#cliente-table').datagrid('getRowIndex', selected);
                    $('#cliente-table').datagrid('selectRow', index-1);
                } else {
                    $('#cliente-table').datagrid('selectRow', 0);
                }
                break;
            case 40:	// down
                var selected = $('#cliente-table').datagrid('getSelected');
                if (selected){
                    var index = $('#cliente-table').datagrid('getRowIndex', selected);
                    $('#cliente-table').datagrid('selectRow', index+1);
                } else {
                    $('#cliente-table').datagrid('selectRow', 0);
                }
                break;
        }
    });
    // editar quando um item for selecionado
    $('#cliente-table').datagrid({
        onSelect: function (index, item) {
            // ao clicar para adicionar, escondemos a grid e abrimos o form se estiver fechado
            if ($('#cliente-cc').layout('panel','east').panel('options').closed) $('#cliente-cc').layout('expand', 'east');
            var cliente = item;//$('#cliente-table').datagrid('getSelected');
            var rowIndex = index;//$('#cliente-table').datagrid('getRowIndex');
            $('#ff').form('load',{
                index: rowIndex,
                id: cliente.id,
                nome: cliente.nome,
                endereco: cliente.endereco
            });
        }
    });

    // codigo para paginação com backend manaual
    // $(function(){
    // 	var pager = $('#dg').datagrid('getPager');	// get the pager of datagrid
    // 	pager.pagination({
    //         //onBeforeRefresh:function(){
    //         //				alert('before refresh');
    //         //				return true;
    //         //			}
    //             onSelectPage:function(pageNumber, pageSize){
    //             //$(this).pagination('loading');
    //             //alert('pageNumber:'+pageNumber+',pageSize:'+pageSize);
    //             //$(this).pagination('loaded');
    //             $('#dg').datagrid('selectRow',0);
    //             onClickRow()
    //         }

    // 	});
        
    // });
});