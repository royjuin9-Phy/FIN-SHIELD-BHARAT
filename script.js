const translations = {
    en: {
        title: "🛡️ FinShield Bharat",
        instruction: "Paste the suspicious message below to verify:",
        placeholder: "e.g. Join VIP group! 100% daily profit guaranteed...",
        btnText: "Scan for Risks",
        resultTitle: "Scan Report",
        errorEmpty: "Please enter a message to scan."
    },
    bn: {
        title: "🛡️ ফিনশিল্ড ভারত",
        instruction: "যাচাই করার জন্য সন্দেহজনক মেসেজটি নিচে পেস্ট করুন:",
        placeholder: "যেমন: ভিআইপি গ্রুপে যোগ দিন! ১০০% লাভের গ্যারান্টি...",
        btnText: "ঝুঁকি স্ক্যান করুন",
        resultTitle: "স্ক্যান রিপোর্ট",
        errorEmpty: "অনুগ্রহ করে স্ক্যান করার জন্য একটি মেসেজ দিন।"
    },
    hi: {
        title: "🛡️ फिनशील्ड भारत",
        instruction: "सत्यापित करने के लिए संदिग्ध संदेश नीचे पेस्ट करें:",
        placeholder: "जैसे: VIP ग्रुप से जुड़ें! 100% लाभ की गारंटी...",
        btnText: "जोखिम स्कैन करें",
        resultTitle: "स्कैन रिपोर्ट",
        errorEmpty: "कृपया स्कैन करने के लिए एक संदेश दर्ज करें।"
    }
};

let currentLang = "en";

function changeLanguage() {
    currentLang = document.getElementById("language-select").value;
    document.getElementById("app-title").innerText = translations[currentLang].title;
    document.getElementById("instruction-text").innerText = translations[currentLang].instruction;
    document.getElementById("message-input").placeholder = translations[currentLang].placeholder;
    document.getElementById("scan-btn").innerText = translations[currentLang].btnText;
    
    const resultBox = document.getElementById("result-box");
    if (!resultBox.classList.contains("hidden")) {
        document.getElementById("result-title").innerText = translations[currentLang].resultTitle;
    }
}

async function scanMessage() {
    const message = document.getElementById("message-input").value;
    
    if (!message.trim()) {
        alert(translations[currentLang].errorEmpty);
        return;
    }

    document.getElementById("scan-btn").innerText = "Scanning...";

    try {
        const response = await fetch("http://localhost:8000/api/v1/scan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: message, language: currentLang })
        });

        const data = await response.json();
        
        document.getElementById("result-box").classList.remove("hidden");
        document.getElementById("result-title").innerText = translations[currentLang].resultTitle;
        
        const riskScoreDiv = document.getElementById("risk-score");
        riskScoreDiv.innerText = `\({data.risk_level} (\){data.risk_score}/100)`;
        
        if (data.risk_score >= 60) riskScoreDiv.style.color = "red";
        else if (data.risk_score >= 30) riskScoreDiv.style.color = "orange";
        else riskScoreDiv.style.color = "green";

        document.getElementById("advice-text").innerText = data.advice_summary;

        const flagsList = document.getElementById("flags-list");
        flagsList.innerHTML = "";
        data.detected_flags.forEach(flag => {
            const li = document.createElement("li");
            li.innerText = `⚠️ ${flag}`;
            flagsList.appendChild(li);
        });

    } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("Failed to connect to the backend server. Make sure main.py is running!");
    } finally {
        document.getElementById("scan-btn").innerText = translations[currentLang].btnText;
    }
}