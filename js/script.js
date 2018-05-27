var url = "https://evidenca.scv.si/trampolin/data.json";
var data;

var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';

xhr.onload = function () {
    data = xhr.response;
    //console.log(xhr.response);
    index();
    vote();
};

xhr.onerror = function () {
    console.log("Fetch Error");
};

xhr.send();

$(document).ready(function () {
    $('.sidenav').sidenav();
});

function index(){
    $(".index").html("");
    for(var i=0;i<data.ekipe.length;i++){
        //console.log(data.ekipe[i]);
        renderTeam(data.ekipe[i]);
    }
}

function vote(){
    var h = $(document).height() - 56;
    $(".vote").html('<iframe frameborder=0 src="' + data.slido + '" height="' + h + '"></iframe>');
}

function renderTeam(team){
    $(".index").append(
        `
        <div class="team-wrapper waves-effect" onclick="renderTeamInfo(` + team.id + `)">
            <img class="team-img" src="` + team.slika + `"/>
            <div class="team-inner">
                <span class="team-name"> ` + team.ime + `</span><br/>
                <span class="team-desc"> ` + team.kratek_opis + `</span>
            </div>
        </div>

        `)
}

function renderTeamInfo(id){
    var team = data.ekipe[id-1];
    //console.log(team);
    $(".index").html("");
    $(".index").append(`
        <div class="team-details-wrapper">
            <div class="team-details-header">
                <img class="team-details-img" src="` + team.slika + `"/>
                <div class="team-inner">
                    <span class="team-name team-name-details"> ` + team.ime + `</span>
                </div>
            </div>
            <div class="team-details-website">
                <a href="` + team.www + `" target="_blank" class="link waves-effect"><i data-target="slide-out" class="sidenav-trigger small material-icons">language</i>Email</a>
            </div>
            <span class="team-desc"> ` + team.kratek_opis + `</span>
        </div>

        `);
}