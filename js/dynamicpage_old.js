$(function() {
    var newHash      = "",
        $mainContent = $("#main-content"),
        $pageWrap    = $("#page-wrap"),
        baseHeight   = 0,
        $el;
        var arr = ["#index", "#about", "#vote", "#web_info"];
        
    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();
    
    $(".sidenav").delegate("a", "click", function() {
        window.location.hash = $(this).attr("href");
        return false;
    });
    
    $(window).bind('hashchange', function(){
        
        newHash = window.location.hash.substring(1);

        if (window.location.pathname.slice(14, -5) == ""){
            $("#index").addClass("active");
        }else{
            $("#" + window.location.pathname.slice(14, -5)).addClass("active");
        }

        if (newHash) {
            for(var i = 0; i < arr.length; i++){
                $(arr[i]).removeClass("active");
            }
            $("#" + newHash.slice(0,-5)).addClass("active");
            $mainContent
                .find("#guts")
                .fadeOut(200, function() {
                    $mainContent.hide().load(newHash + " #guts", function() {
                        $mainContent.fadeIn(200, function() {
                            $pageWrap.animate({
                                height: baseHeight + $mainContent.height() + "px"
                            });
                        });
                        $("nav a").removeClass("current");
                        //$("nav a[href="+newHash+"]").addClass("current");
                    });
                });
        };
        
    });
    
    $(window).trigger('hashchange');

});