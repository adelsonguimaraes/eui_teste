var usuario = window.sessionStorage.getItem('usuario');

    setTimeout(() => {
        if (usuario == null) {
            $('#main').panel({
                href:'app/views/login.html',
            })
        }
    }, 500);

   $('#cc').combobox({
        valueField:'value',
        textField:'field',
        data: [
            {
                value: 'libs/themes/default/easyui.css',
                field: 'Default'
            },
            {
                value: 'libs/themes/material-teal/easyui.css',
                field: 'Material'
            },
            {
                value: 'libs/themes/black/easyui.css',
                field: 'Black'
            },
            {
                value: 'libs/themes/gray/easyui.css',
                field: 'Gray'
            },
            {
                value: 'libs/themes/metro/easyui.css',
                field: 'Metro'
            }
        ],
        onSelect: function(rec){
            alterarTema(rec.value);
        }
    });
   
        var data = [
        {
        text: 'Cadastro',
        iconCls: 'icon-sum',
        state: 'open',
        children: [{
            text: 'Clientes',
            content: 'app/views/clientes.html'
        },{
            text: 'Option2'
        },{
            text: 'Option3',
            children: [{
                text: 'Option31'
            },{
                text: 'Option32'
            }]
        }]
    },{
        text: 'Item2',
        iconCls: 'icon-more',
        children: [{
            text: 'Option4'
        },{
            text: 'Option5'
        },{
            text: 'Option6'
        }]
    }];
    
    var index = 0;
            
    $("#sm").sidemenu({
        // quando selecionar um item do menu
        onSelect:function(item){
    
            // caso já exista uma aba referente a este item apenas a selecionamos
            if ($('#tt').tabs('getTab', item.text) !== null) return $('#tt').tabs('select', item.text);
            
            // se não criamos a aba
            $('#tt').tabs('add',{
                title: item.text,
                href: item.content,
                closable: true
            });
        }
    });

    function removePanel(){
        var tab = $('#tt').tabs('getSelected');
        if (tab){
            var index = $('#tt').tabs('getTabIndex', tab);
            $('#tt').tabs('close', index);
        }
    }