let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    window.speechSynthesis.cancel();  // Stop any ongoing speech
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir, how can I help you?");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const dropdown = document.querySelector(".dropdown");
    const submenuSections = document.querySelectorAll(".dropdown-section");

    // Toggle the main dropdown menu
    menuButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing dropdown when clicking the menu button
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    // Toggle submenus inside the dropdown sections
    submenuSections.forEach(section => {
        section.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing dropdown when clicking inside a section
            const submenu = section.querySelector(".submenu");

            // Close all other submenus
            document.querySelectorAll(".submenu").forEach(s => {
                if (s !== submenu) s.style.display = "none";
            });

            // Toggle the clicked submenu
            submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        });
    });

    // Close the dropdown and all submenus if clicking outside
    document.addEventListener("click", (e) => {
        if (!menuButton.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = "none"; // Close main dropdown
            document.querySelectorAll(".submenu").forEach(s => s.style.display = "none"); // Close all submenus
        }
    });
});

// Uncomment to greet on load
window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("when was vtu started")) {
        speak("VTU came into existence in the year 1998. Visvesvaraya Technological University (VTU), named after Bharat Ratna Dr. Sir M. Visvesvaraya, was established on 1st April 1998, as per the provisions of VTU Act 1994 of the Government of Karnataka.");
    } else if (message.includes("who are you")) {
        speak("I am E-virtual assistant.");
    } else if (message.includes("how are you")) {
        speak("I am fine. What about you? How can I help you?");
    } else if (message.includes("are you human being?")) {
        speak("No, I am not a human being. I am just an E-virtual assistant for student studies.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open vtu code")) {
        speak("Opening VTU Code...");
        window.open("https://vtucode.in/", "_blank");
    } else if (message.includes("tell about vtu")) {
        speak("Sure, here you go...");
        window.open("https://en.wikipedia.org/wiki/Visvesvaraya_Technological_University", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("open coursera")) {
        speak("Sure, here you go...");
        window.open("https://www.coursera.org/?msockid=2dddeffb18be68aa0417fab9195669ba");
    } else if (message.includes("open udemy")) {
        speak("Sure, here you go...");
        window.open("https://www.udemy.com/?utm_source=bing-brand&utm_medium=udemyads&utm_campaign=BG-Brand-Udemy_la.EN_cc.INDIA&campaigntype=Search&portfolio=BrandDirect&language=EN&product=Course&test=&audience=&topic=&priority=&utm_content=deal4584&utm_term=_._ag_1214960761428279_._ad__._kw_Udemy_._de_c_._dm__._pl__._ti_kwd-75935360497446:loc-90_._li_1660_._pd__._&matchtype=e&msclkid=0ab87f36921a1729a40b18782b810dce");
    } else if (message.includes("open vtu website")) {
        speak("Sure, here you go...");
        window.open("https://vtu.ac.in/");
    } else if (message.includes("open vtu syllabus")) {
        speak("Sure, here you go...");
        window.open("https://vtu.ac.in/b-e-scheme-syllabus/");
    } else if (message.includes("open vtu fees portal")) {
        speak("Sure, here you go...");
        window.open("https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=843012");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("Brainbot", "") || message.replace("Brainbot", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("Brainbot", "")}`, "_blank");
    }
}
