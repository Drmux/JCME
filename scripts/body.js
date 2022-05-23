///////////////////////////////////////////////////////////////////////////////////////////
//
//  Render Layout modules
//

function toolBarH() {
    //render a list of icons and their names with functions to change the active tool.
}

function opendialog(id) { //change to openDialog;
    var div = document.getElementById(id);
    div.style.visibility = "visible";
   // alert(div.style.visibility);
}

function closedialog(id) {//change to hideDialog
    var div = document.getElementById(id);
    //document.getElementById("loadstrdialog").visibility = "hidden";
    div.style.visibility = "hidden";
    //alert(div.style.visibility);
}

function dialogLoadString(title = "Load string", id = "loadstrdialog") {
    var str = "";
    var s = [];

    s.push(divO(id,"dialog-transparency hidden"));
        s.push("&nbsp;");
        s.push(divO("loadString", "dialog border2"));

            s.push(divO("", "dialoghead"));
                h2 = "<h2> " + title + "</h2>";
                s.push(div(h2, "", "fauto"));
                let onclick = "closedialog('"+id+"')";
                let imgClose = img("img/ui/close.png", "close", "buttonsmall", "Close Dialog")
                let link = a("#", imgClose, "closedialog", "", "onclick=\"" + onclick + "\"");
                s.push(div(link,"","right"));
            s.push(divC());


            s.push(divO("", "dialogcontent"));
            s.push(textarea("","dialogtextarea"));
            s.push(divC());

            //s.push();
        s.push(divC());//end dialog
    s.push(divC());//end transparency
    return s.join("");
}

function dialogSave(title = "Save City", id="savedialog") {
    var str = "";
    var s = [];

    s.push(divO(id,"dialog-transparency hidden"));
        s.push("&nbsp;");
        s.push(divO(id, "dialog border2 opaque"));
            s.push(divO("", "dialoghead"));
                h2 = "<h2> " + title + "</h2>";
                s.push(div(h2, "", "fauto"));
                let onclick = "closedialog('"+id+"')";
                let imgClose = img("img/ui/close.png", "close", "buttonsmall", "Close Dialog");
                let link = a("#", imgClose, "closedialog", "", "onclick=\"" + onclick+"\"");
                s.push(div(link,"","right"));
            s.push(divC());

            s.push(divO("", "dialogcontent"));
            s.push("Save feature not yet available.")
            s.push(divC());

            //s.push();
        s.push(divC());//end dialog
    s.push(divC());//end transparency
    return s.join("");
}

///////////////////////////////////////////////////////////////
// Static page components
//

function renderPageHead(h1="") {
    let s = [];
    let str = "";
    ////////////////////////////////////////////////
    s.push(divO("", "pagehead border1 "));
    s.push(div("<h1>" + h1 + "</h1>", "", "fauto"));
        let onclick = "opendialog('loadstrdialog')"
        str = (img("img/ui/new.png", "loadimg", "fauto buttonlarge", "", "frauto"));
        str = a("#", str, "loadlink", "", "onclick=\"" + onclick + "\"");
        s.push(div(str, "", "frauto"));

        onclick = "opendialog('savedialog')"
        str = (img("img/ui/save.png", "saveimg", "fauto buttonlarge", "", "frauto"));
        str = a("#", str, "savelink", "", "onclick=\"" + onclick + "\"");
    s.push(div(str, "", "frauto"));
    s.push(divC());//close pagehead
    return s.join("");
}

function renderPageNav(navlinks = { "Home": "index.html" }) {
    let s = [];
    let str = "";
    s.push(div("Nav"));
    return s.join("");
}

function renderPageFoot() {
    var s = [];
    s.push(divC());//end Content
    s.push(divC());//End Page
    s.push(div(AppName + " " + AppVersion, "", "pagefoot border1"));
    return s.join("");
}

function renderContent(module="",context="") {

}

function pageEventsDebug() {
    var canvas = document.getElementById("test_canvas");
    canvas.addEventListener("load", test_canvas,false);
}

function pageEvents(page = { "empty": "true" }) {


}


////////////////////////////////////////////////////////////////////////////

function renderPage(page = { "Empty": "True" }) {

    var str = "";
    var s = [];
    var title = "Hello!";

    s.push(divO("", "page"));//begin page render
    s.push(renderPageHead(title));
    //renderContent();
    s.push(renderPageFoot());
    return s.join("");
}


function pageRenderDebug(page = "", concmethod = "array", callback = null) {
    ///////////////0////////////////////////////////////////////////////////////
    //  Build page containing debug information
    //      Dev Sandbox
    ///////////////////////////////////////////////////////////////////////////


    var str = "";
    var s = [];

                                                                    
    gameState = defaultGameState;
    //city = gameState || defaultGameState;
    //city = gameState || emptyGameState();
    globalKeys = verifyObj(Object.keys(gameState)) || "";

    ///////////////////////////////////////////////////////////////
    //Copy data from game state (or return "not a string) - Should be try-catch instead
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

    //Verify game object first!

    //if (gameState.city === null) { } else {
        var misc = (isStr(gameState.city.misc)) ? objFromStr(gameState.city.misc) : "Not A string";
        var tilelist = (isStr(gameState.city.tilelist)) ? objFromStr(gameState.city.tilelist) : "Not A string";
        var labels = (isStr(gameState.city.labels)) ? objFromStr(gameState.city.labels) : "Not A string";
        var microsims = (isStr(gameState.city.microsims)) ? objFromStr(gameState.city.microsims) : "Not A string";
        var things = (isStr(gameState.city.things)) ? objFromStr(gameState.city.things) : "Not A string";
        var minimaps = (isStr(gameState.city.minimaps)) ? objFromStr(gameState.city.minimaps) : "Not A string";
        var graphs = (isStr(gameState.city.graphs)) ? objFromStr(gameState.city.graphs) : "Not A string";
        var scenario = (isStr(gameState.city.scenario)) ? objFromStr(gameState.city.scenario) : "Not A string";
    //}
    var city_name = gameState.city.city_name || "No City";
    var TotalPop = misc.TotalPop || "";
    var TotalFunds = misc.TotalFunds || "";


    ///////////////////////////////////////////////////////////////
    //Build page output (module)
    //vvvvvvvvvvvvvvv

    s.push(divO("", "page"));//begin page render
    ////////////////////////////////////////////////

        s.push(renderPageHead(city_name));

        s.push(div("", "&nbsp;", "", "spacer2"));

        s.push(divO("","content scroll border0"))//begin content
            //s.push(div())

        
            s.push(divO("", "flR2px border0"));
                s.push(div("Population:</b> " + TotalPop + ", <b>Funds: </b>" + TotalFunds));
            s.push(divC());

            s.push(div("<hr>", "", "f100"));

            s.push(divO("", "flR2px border0"));
            let dostring = 'alert("aaaaugh")';
                dostring = 'onload=\"' + dostring + '\"';
                s.push(canvas("test_canvas", "", "400", "300",dostring,""));
            s.push(divC());

            s.push(div("<hr>", "", "f100"));
            
            s.push(divO("", "flR2px border0"));

                    var o1 = recursiveSearchKey(gameState, "city",0,true)||"Failed to Read City Object.";
                    var o2 = recursiveSearchKey(gameState, "city_name",0, true);//||"No City Name";
                    //var o2 = city_name;//recursiveSearchKey(gameState, "city_name", 0, true);//||"No City Name";
                    //var o3 = recursiveSearchKey(gameState, "heat",0, true)||"No Things";
                    var o3 = recursiveSearchKey(misc, "heat",0, true)||"No Things";

                    s.push(span(o1,"","f100"));
                    //s.push("<hr>");
                    s.push(span(o2,"", "f100"));
                    //s.push("<hr>");
                    s.push(span(o3,"", "f100"));
                    //s.push("<br>");
                    //s.push("<br>");
                    //s.push("<hr>");
 

            s.push(divC());

           s.push(div("<hr>", "", "f100"));

            s.push(divO("","flR2px border0"));
                    //var messages = ["Message 1", "Message 2"];
                    s.push(span(label("consolebox", 'CONSOLE')));
                    s.push(div(textarea("consolebox", "consolebox", "consolebox", "10", "55", getConsoleMessages(), "", false)));
                    s.push(div(inpt("text", "consoleinput", "consoleinput", "Type something", "onclick=\"\"")));
                    s.push(div(a("#", "Clicky!", "onclicktest", "onclicktest", "onclick=\"consoleSubmit('consoleinput','consolebox')\"")));
                    
                    s.push(div("&nbsp;", "", "spacer"));
                    s.push(span(" Keys in gameState:"))
                    s.push(div(listKeysInObj(gameState)));
                    s.push(span(" Keys in metadata:"));
                    s.push(div(listKeysInObj(gameState.metadata)));
                    s.push(span(" Keys in city:"));
                    s.push(div(listKeysInObj(gameState.city)));
                    s.push(div("<hr>"));
                    s.push(span(" Entries in misc: <br />"));
                    s.push(div(listEntriesInObj(misc)));
                    s.push(span(" Entries in tilelist:"));
                    s.push(div(listEntriesInObj(tilelist))); s.push(span("<hr >"));
                    s.push(span(" Entries in Labels:"));
                    s.push(div(listEntriesInObj(labels))); s.push(span("<hr >"));
                    s.push(span(" Entries in Microsims:"));
                    s.push(div(listEntriesInObj(microsims))); s.push(span("<hr >"));
                    s.push(span(" Entries in things:"));
                    s.push(div(listEntries2Deg(things))); s.push(span("<hr >"));
                    s.push(span(" Entries in minimaps:"));
                    s.push(div(listEntries3Deg(minimaps))); s.push(span("<hr >"));
                    s.push(span(" Entries in graphs:"));
                    s.push(div(listEntries3Deg(graphs))); s.push(span("<hr >"));
                    s.push(span(" Entries in scenario:"));
                    s.push(div(listEntries3Deg(scenario))); s.push(span("<hr >"));

            s.push(divC());//end flR2pc bprder0

            s.push(div("&nbsp;", "", "spacer2"));///
    



    //^^^^^^^^^^^^^^^^^^^^^^^
    ///////////////////////////
    
    

    s.push(divC());//end Content
    s.push(divC());//End Page
    s.push(divC());//End Page

    s.push(div(AppName + " " + AppVersion, "", "pagefoot border1"));

    s.push(dialogLoadString("Load JSON"));
    s.push(dialogSave());

    return s.join("");    

}



function listen() {//body Onload
   // inpt = 
    //alert("can you dig it");
}



