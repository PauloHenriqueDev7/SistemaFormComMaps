// Criar mapa
var mapa = L.map('map').setView([-23.5505, -46.6333], 13); // coordenadas do centro do mapa e nível de zoom

// Função para exibir mapa com base em um endereço
function exibirMapa(endereco) {
  // Adicionar camada do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(mapa);
  
  // Geocodificação do endereço informado
  var geocoder = L.Control.Geocoder.nominatim(); // usar o serviço Nominatim do OpenStreetMap
  geocoder.geocode(endereco, function(resultado) {
    // Adicionar marcador na posição encontrada
    var marcador = L.marker(resultado[0].center).addTo(mapa);
    // Centralizar o mapa na posição do marcador
    mapa.setView(resultado[0].center);
  
    // Exibir endereço dinamicamente
    document.getElementById('endereco').textContent = resultado[0].name + ', ' + resultado[0].city + ', ' + resultado[0].state + ', ' + resultado[0].country;
  });
}

// Evento de submit do formulário
document.getElementById('form-contato').addEventListener('submit', function(evento) {
  evento.preventDefault(); // impedir envio do formulário
  
  // Obter endereço informado pelo usuário
  var endereco = document.getElementById('address').value;
  
  // Exibir mapa com base no endereço
  exibirMapa(endereco);
});

// Adicionar classe CSS de carregamento ao elemento do mapa
document.getElementById('map').classList.add('map-loading');

// Evento de load do mapa
mapa.on('load', function() {
  document.getElementById('map').classList.remove('map-loading');
});
