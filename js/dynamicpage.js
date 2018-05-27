$(function() {

    if(Modernizr.history){

    var newHash      = "",
        $mainContent = $("#main-content"),
        $pageWrap    = $("#page-wrap"),
        baseHeight   = 0,
        $el;
        var arr = ["#index", "#about", "#vote", "#web_info"];
        
    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();
    
    $(".sidenav").delegate("a", "click", function() {
        _link = $(this).attr("href");
        history.pushState(null, null, _link);
        loadContent(_link);
        return false;
    });



    function loadContent(href){
        $mainContent
                .find("#guts")
                .fadeOut(200, function() {
                    $mainContent.hide().load(href + " #guts", function() {
                        $mainContent.fadeIn(200, function() {
                            $pageWrap.animate({
                                height: baseHeight + $mainContent.height() + "px"
                            });
                        });
                        $("nav a").removeClass("current");
                        //console.log(href);
                        if(href == "index.html"){
                            index();
                        }
                        switch(href){
                            case "index.html":
                                $(".nav-wrapper-wrapper a").html("Teams");
                                index();
                                break;
                            case "vote.html":
                                $(".nav-wrapper-wrapper a").html("Vote");
                                vote();
                                break;
                            case "about.html":
                                $(".nav-wrapper-wrapper a").html("About");
                                break;
                            case "web_info.html":
                                $(".nav-wrapper-wrapper a").html("Website Info");
                                break;
                        }
                        for (var i = 0; i < arr.length; i++) {
                            $(arr[i]).removeClass("active");
                        }
                        $("#" + href.slice(0, -5)).addClass("active");
                        $('.sidenav').sidenav('close');
                        //$("nav a[href$="+href+"]").addClass("current");
                    });
                });
    }
    
    $(window).bind('popstate', function(){
       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
        loadContent(_link);
    });

} // otherwise, history is not supported, so nothing fancy here.

    
});