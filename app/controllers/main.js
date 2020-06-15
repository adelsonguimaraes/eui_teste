// definindo a api
var api = "api/";

// função para alterar o tema 
function alterarTema (tema) {
    $(document).ready(function() {
        $("#tema").attr("href", tema);
        window.localStorage.setItem('tema', tema);
    });
}

// verificando se o usuário tem tema predefinido
var t = window.localStorage.getItem('tema');
if (t!==null) alterarTema(t);

// pagina inicial ao abrir o sistema
$(function (){
    $('#main').panel({
        href:'app/views/startpage.html'
    });
});

// função que carrega a página dentro da main
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


// setTimeout(function () {
//     var index = 0;
        
//     $("#sm").sidemenu({
//         // quando selecionar um item do menu
//         onSelect:function(item){
    
//             console.log('aqui');
    
//             // caso já exista uma aba referente a este item apenas a selecionamos
//             if ($('#tt').tabs('getTab', item.text) !== null) return $('#tt').tabs('select', item.text);
            
//             // se não criamos a aba
//             $('#tt').tabs('add',{
//                 title: item.text,
//                 href: item.content,
//                 closable: true
//             });
//         }
//     });
    
//     function removePanel(){
//         var tab = $('#tt').tabs('getSelected');
//         if (tab){
//             var index = $('#tt').tabs('getTabIndex', tab);
//             $('#tt').tabs('close', index);
//         }
//     }
// }, 100);

