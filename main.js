document.addEventListener('DOMContentLoaded', function() { 
    document.getElementsByTagName('form')[0].onsubmit = function(evt) { 
    evt.preventDefault();                                               // Preventing the form from submitting 
    checkWord();                                                        // Do your magic and check the entered word/sentence 
    window.scrollTo(0,150); 
} 
    // Get the focus to the text input to enter a word right away. 
document.getElementById('terminalTextInput').focus(); 

    // Getting the text from the input 
var textInputValue = document.getElementById('terminalTextInput').value.trim(); 

    //Getting the text from the results div 
var textResultsValue = document.getElementById('terminalReslutsCont').innerHTML; 

    // Clear text input 
var clearInput = function(){ 
    document.getElementById('terminalTextInput').value = ""; 
} 

    // Scrtoll to the bottom of the results div 
var scrollToBottomOfResults = function(){ 
    var terminalResultsDiv = document.getElementById('terminalReslutsCont'); 
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight; 
} 

    // Scroll to the bottom of the results 
scrollToBottomOfResults(); 

// Add text to the results div 
var addTextToResults = function(textToAdd){ 
    document.getElementById('terminalReslutsCont').innerHTML += "<p>" + textToAdd + "</p>"; 
    scrollToBottomOfResults(); 
} 

    // Getting the list of keywords for help & posting it to the screen 
var postHelpList = function(){ 
    // Array of all the help keywords 
    var helpKeyWords = [ 
    "- Open + website URL to open it in the browser (ex. open github.com)", 
    "- Google + your search topic (ex. Google cute puppies)", 
    "- YouTube + keyword to search directly in YouTube (ex. YouTube Shadowkai Gaming)", 
    "- Wiki + keyword to search directly in Wikipedia (ex. wiki Ruth Bader Ginsburg)", 
    "- 'Time' displays the current time.", 
    "- 'Date' displays the current date.",
    "* There are more keywords for you to find as you go." 
    ].join('<br>'); 
    addTextToResults(helpKeyWords); 
} 

    // Getting the time and date and post it depending on what you request for 
var getTimeAndDate = function(postTimeDay){ 
    var timeAndDate = new Date(); 
    var timeHours = timeAndDate.getHours(); 
    var timeMinutes = timeAndDate.getMinutes(); 
    var dateDay = timeAndDate.getDate(); 
    console.log(dateDay); 
    var dateMonth = timeAndDate.getMonth() + 1;                             // Because JS starts counting months from 0 
    var dateYear = timeAndDate.getFullYear();                               // Otherwise we'll get the count like 98,99,100,101...etc. 
    if (timeHours < 10){                                                    // if 1 number display 0 before it. 
        timeHours = "0" + timeHours; 
    } 

    if (timeMinutes < 10){                                                  // if 1 number display 0 before it. 
        timeMinutes = "0" + timeMinutes; 
    } 

    var currentTime = timeHours + ":" + timeMinutes; 
    var currentDate = dateDay + "/" + dateMonth + "/" + dateYear; 

    if (postTimeDay == "time"){ 
    addTextToResults(currentTime); 
    } 

    if (postTimeDay == "date"){ 
    addTextToResults(currentDate); 
    } 
} 
    
    // Opening links in a new window 
var openLinkInNewWindow = function(linkToOpen){ 
    window.open(linkToOpen, '_blank'); 
    clearInput(); 
} 

    // Having a specific text reply to specific strings 
var textReplies = function() { 
    switch(textInputValueLowerCase){ 
        // replies 
        case "code": 
        clearInput(); 
        addTextToResults("Get web elements source code at <a target='_blank' href='https://github.com/jburky15</a>"); 
        break; 

        case "i love you": 
        case "love you": 
        case "love": 
        clearInput(); 
        addTextToResults("Though I have no emotions, I Love you too <3"); 
        break; 

        case "Joe": 
        case "jburky": 
        case "programming": 
        case "coding":
        clearInput(); 
        addTextToResults('Check out my GitHub!'); 
        openLinkInNewWindow('https://github.com/jburky15'); 
        break; 

        case "hello": 
        case "hi": 
        case "hola": 
        clearInput(); 
        addTextToResults("Hello, how can I assist you today?"); 
        break; 

        case "what the": 
        case "wtf": 
        clearInput(); 
        addTextToResults("No need for that now!"); 
        break; 

        case "shit": 
        case "poop": 
        case "💩": 
        clearInput(); 
        addTextToResults("💩"); 
        break; 
    
        // replies 
        case "youtube": 
        clearInput(); 
        addTextToResults("Type youtube + a topic you would like to watch."); 
        break; 

        case "google": 
        clearInput(); 
        addTextToResults("Type google + something you would like to search for."); 
        break; 

        case "wiki": 
        case "wikipedia": 
        clearInput(); 
        addTextToResults("Type wiki + something you would like to know more about."); 
        break; 

        case "time": 
        clearInput(); 
        getTimeAndDate("time"); 
        break; 

        case "date": 
        clearInput(); 
        getTimeAndDate("date"); 
        break; 
    
        case "help": 
        case "?": 
        clearInput(); 
        postHelpList(); 
        break; 

        default: 
        clearInput(); 
        addTextToResults("<p><i>The command " + "<b>" + textInputValue + "</b>" + " was not found. Type <b>Help</b> to see all commands.</i></p>"); 
        break; 
    } 
} 
    
    // Main function to check the entered text and assign it to the correct function 
var checkWord = function() { 
    textInputValue = document.getElementById('terminalTextInput').value.trim();                                 //get the text from the text input to a variable 
    textInputValueLowerCase = textInputValue.toLowerCase();                                                     //get the lower case of the string 

        if (textInputValue != ""){                                                                              //checking if text was entered 
            addTextToResults("<p class='userEnteredText'>> " + textInputValue + "</p>"); 
             if (textInputValueLowerCase.substr(0,5) == "open ") {                                              //if the first 5 characters = open + space 
                openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5)); 
                addTextToResults("<i>Your search for " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened in a new tab.</i>"); 
            } else if (textInputValueLowerCase.substr(0,8) == "youtube ") { 
                openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8)); 
                addTextToResults("<i>I headed over to YouTube and found " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened in a new tab.</i>"); 
            } else if (textInputValueLowerCase.substr(0,7) == "google ") { 
                openLinkInNewWindow('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7)); 
                addTextToResults("<i>I did a search on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened in a new tab.</i>"); 
            } else if (textInputValueLowerCase.substr(0,5) == "wiki "){ 
                openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5)); 
                addTextToResults("<i>I looked on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened in a new tab.</i>"); 
            } else{ 
                textReplies(); 
            } 
        } 
    
};  
});
    
