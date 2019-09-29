var button=document.querySelector("#search_button");
button.addEventListener("click",searchStock);

function searchStock(e){
    var stockSymbol=document.querySelector("#stockSymbol").value;
    e.preventDefault();
    let stockObj=new Object();
    $.getJSON(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockSymbol}&apikey=PS2EH1AW4CFUT7LM`,
        function (checkObj){
            stockObj._symbol=checkObj["bestMatches"][0]["1. symbol"];
            stockObj._name=checkObj["bestMatches"][0]["2. name"];
        }
    );
    $.getJSON(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&apikey=PS2EH1AW4CFUT7LM`,
        function (checkPrice){
            var price=JSON.stringify(checkPrice["Time Series (1min)"]).substring(2, 21);
            stockObj._price=checkPrice["Time Series (1min)"][price]["4. close"];
        }
    );

    console.log(stockObj);
}
