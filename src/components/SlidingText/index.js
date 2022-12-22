import React from "react";
import "./style.scss";
const Slidingtext = () => {
    var scroll_text;
    document.querySelector("div.current-track").hover(
        function () {
            var $elmt = document.querySelector(this);
            scroll_text = setInterval(function () {
                scrollText($elmt);
            }, 5);
        },
        function () {
            clearInterval(scroll_text);
            document.querySelector(this).querySelector("h1").css({
                left: 0,
            });
        }
    );

    var scrollText = function ($elmt) {
        var left = $elmt.querySelector("h1").position().left - 1;
        left = -left > $elmt.querySelector("h1").width() ? $elmt.width() : left;
        $elmt.querySelector("h1").css({
            left: left,
        });
    };

    // });
    // $(function () {
    //     var scroll_text;
    //     $('div.current-track').hover(

    //         function () {
    //             var $elmt = $(this);
    //             scroll_text = setInterval(function () {
    //                 scrollText($elmt);
    //             }, 5);
    //         }, function () {
    //             clearInterval(scroll_text);
    //             $(this).find('h1').css({
    //                 left: 0
    //             });
    //         });

    //     var scrollText = function ($elmt) {
    //         var left = $elmt.find('h1').position().left - 1;
    //         left = -left > $elmt.find('h1').width() ? $elmt.width() : left;
    //         $elmt.find('h1').css({
    //             left: left
    //         });
    //     };

    // });

    // console.log($('div.current-track').find('h1').length);

    return (
        <>
            <div className="current-track">
                <h1>
                    <span id="title">Party All Night (Sleep All Day) -</span> Sean
                    Kingston
                </h1>
            </div>
        </>
    );
};

export default Slidingtext;
