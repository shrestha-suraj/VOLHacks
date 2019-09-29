

var button = document.querySelector("#search_button");
button.addEventListener("click", searchStock);
function searchStock(e) {
    var stock_symbol = null;
    var stock_value = null;
    var stockSymbol = document.querySelector("#stockSymbol").value;
    e.preventDefault();
    $.getJSON(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&apikey=ZB7L72AR2L8OL173`,
        function (checkObj) {
            stock_symbol = checkObj['Meta Data']['2. Symbol'];
            stock_value = checkObj['Time Series (1min)']['2019-09-27 14:21:00']['4. close'];
            var count = 0;
            (function ($) {
                jQuery.fn.checkEmpty = function () {
                    return !$.trim(this.html()).length;
                };
            }(jQuery));
            for (var i = 1; i <= 3; i++) {
                if ($(`#box${i}`).checkEmpty()) {
                    var card = document.getElementById(`box${i}`);
                    var trigger = document.getElementById(`row${i}`);
                    card.innerHTML = "<span><h2>" + stock_symbol + "</h2><br/>" + "<h3>" + stock_value + "</h3></span>";
                    trigger.innerHTML = "<h2>" + stock_symbol + `</h2><span><input type='number' placeholder='Trigger Price' id='trigger-price${i}'> <button id='save-trigger${i}' onclick='changeDesign(${i})'>Add</button></span>`;
                    break;
                } else {
                    if (i === 3) {
                        alert("Please Clear A Spot First");
                        break;
                    }
                }

                // console.log(card);
            }
        }
    )
}

