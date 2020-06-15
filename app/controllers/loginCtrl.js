var usuario = window.sessionStorage.getItem('usuario');

if (usuario !== null) {
    $('#main').panel({
        href:'app/views/viewport.html',
    })
}

function submitForm() {
    var dados = {};
    $.each($('#form-login').serializeArray(), function() {
        dados[this.name] = this.value;
    });
    
    if (dados.login == 'admin' && dados.senha == 'admin') {
        // criando session
        window.sessionStorage.setItem('usuario', JSON.stringify(dados));
        $('#main').panel({href:'app/views/startpage.html'});
        $('#win').window('close');
    }
}