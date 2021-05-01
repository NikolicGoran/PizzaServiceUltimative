let pizzaPreis = 6
let extraBelege = [0, 0, 0, 0, 0, 0]
let extraBelegeNamen = ["Mais", "Sardellen", "Schinken", "Ei", "Oliven", "Chili"]
let showToggler = true

function berechnePreis(select){
    if (select<0){
        //Nimmt die Pizzagröße
        pizzaPreis = document.getElementById("selectGroeße").value
    }
    else {
        //Nimmt die Pizzagröße
        pizzaPreis = document.getElementById("selectGroeße").value

        //Schaut ob das was gedrückt wurde aus oder an gemacht wurde
        if (extraBelege[select] === 0){
            extraBelege[select] = 1
        }
        else {
            extraBelege[select] = 0
        }
    }

    //Zählt wie viele Extrabelege an sind
    let extra = 0
    for (let i=0; i<extraBelege.length; i++){
        if (extraBelege[i] === 1){
            extra++
        }
    }

    pizzaPreis = parseInt(pizzaPreis) + 0.5*extra
    preisAnzeigen(pizzaPreis)
}

function preisAnzeigen(preis){
    document.getElementById("pizzaPreis").innerHTML = preis
}

function pruefeAdresse(){
    let groese = document.forms["myForm"]["selectGroese"].value
    let sorte = document.forms["myForm"]["belagRadio"].value
    let extra = ""
    let name = document.forms["myForm"]["name"].value
    let strase = document.forms["myForm"]["strase"].value
    let plz = document.forms["myForm"]["plz"].value
    let ort = document.forms["myForm"]["ort"].value
    let fehlerCode = ""

    if (groese == 5){
        groese = "Klein"
    }
    if (groese == 6){
        groese = "Mittel"
    }
    if (groese == 7){
        groese = "Groß"
    }

    for (let i=0; i<extraBelege.length; i++){
        if (extraBelege[i] === 1){
            extra += extraBelegeNamen[i] + " "
        }
    }

    if (name === ""){
        fehlerCode += "Name "
    }
    if (strase === ""){
        fehlerCode += "Straße "
    }
    if (plz.toString().split("").length < 4){
        fehlerCode += "Postleitzahl "
    }
    if (ort === ""){
        fehlerCode += "Ort "
    }

    if(fehlerCode !== ""){
        alert("Bitte füllen sie noch folgende Felder aus: " + fehlerCode)
        return false
    }
    else{
        let order = "Größe: " + groese + "\n" + "Belag: " + sorte + "\n" + "Extrabelege: " + extra + "\n" + "Preis: " + pizzaPreis
        setCookies()
        return confirm(order);
    }
}

function setCookies(){
    let groese = document.forms["myForm"]["selectGroese"].value
    let sorte = document.forms["myForm"]["belagRadio"].value
    let name = document.forms["myForm"]["name"].value
    let strase = document.forms["myForm"]["strase"].value
    let plz = document.forms["myForm"]["plz"].value
    let ort = document.forms["myForm"]["ort"].value

    let date = new Date()
    date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 7))
    let expires = "expires= "+ date.toUTCString()

    document.cookie = "selectGroeße="+ groese + ";" + expires
    document.cookie = "belagRadio="+ sorte + ";" + expires
    document.cookie = "extra="+ extraBelege + ";" + expires
    document.cookie = "name="+ name + ";" + expires
    document.cookie = "straße="+ strase + ";" + expires
    document.cookie = "plz="+ plz + ";" + expires
    document.cookie = "ort="+ ort + ";" + expires
}

function deleteCookies(){
    document.cookie = "größe=" + "; expires=Mon 01 Jan 2000 00:00:00 UTC"
    document.cookie = "sorte=" + "; expires=Mon 01 Jan 2000 00:00:00 UTC"
    document.cookie = "extra=" + "; expires=Mon 01 Jan 2000 00:00:00 UTC"
    document.cookie = "name=" + "; expires=Mon 01 Jan 2000 00:00:00 UTC"
    document.cookie = "straße=" + "; expires=Mon 01 Jan 2000 00:00:00 UTC"
    document.cookie = "plz=" + "; expires=Mon 01 Jan 2000 00:00:00 UTC"
    document.cookie = "ort=" + "; expires=Mon 01 Jan 2000 00:00:00 UTC"
    document.cookie = "belagRadio=" + "; expires=Mon 01 Jan 2000 00:00:00 UTC"
    document.cookie = "selectGroeße=" + "; expires=Mon 01 Jan 2000 00:00:00 UTC"
    alert("Alle Cookies erfolgreich gelöscht!")
}

function insertCookies(){
    if(document.cookie){
        let cookies = decodeURI(document.cookie).split(";")
        if (findInCookies(cookies, "name") == false){
            alert("Sie haben Ihre letzte bestellung gelöscht")
        }else {
        console.log(cookies)

        //größe eingüllen
        let groeße = findInCookies(cookies, "selectGroeße")
        if (groeße == "5"){
            document.getElementById("selectGroeße").selectedIndex = "1"
        }
        if (groeße == "6"){
            document.getElementById("selectGroeße").selectedIndex = "0"
        }
        if (groeße == "7"){
            document.getElementById("selectGroeße").selectedIndex = "2"
        }

        //Belag einfüllen
        var belag = findInCookies(cookies, "belagRadio")
        if (belag == "Salami"){
            document.getElementById("salamiRadio").checked = true
        }
        if (belag == "Meeresfrüchte"){
            document.getElementById("meeresRadio").checked = true
        }
        if (belag == "Diavolo"){
            document.getElementById("diavoloRadio").checked = true
        }

        //Extrabelege einfüllen
        let extraBelagId = ["maisSelect", "sardellenSelect", "schineknSelect", "eiSelect", "olivenSelect", "chiliSelect"]
        let extra = findInCookies(cookies, "extra")
        extra = extra.split(",")
        for (let i=0; i<extraBelagId.length; i++){
            if (extra[i] == 1){
                document.getElementById(extraBelagId[i]).checked = true
                document.getElementById(extraBelagId[i]).value = true
                extraBelege[i] = 1
            }
        }

        //Adresse einfügen
        document.getElementById("name").value = findInCookies(cookies, "name")
        document.getElementById("straße").value = findInCookies(cookies, "straße")
        document.getElementById("ort").value = findInCookies(cookies, "ort")
        document.getElementById("plz").value = findInCookies(cookies, "plz")

        console.log(extraBelege)
        berechnePreis(-1)
        }
    }
    else {
        alert("Leider haben wir keine Cookies von Ihnen :(")
    }
}

function findInCookies(cookies, asked){
    for (let i=0; i<cookies.length; i++){
        let cookie = cookies[i].split("=")
        let cookieName = cookie[0]
        let cookieValue = cookie[1]

        if (cookieName.split(" ")[1] == null){
            if (cookieName == asked){
                return cookieValue
            }
        }else {
            cookieName = cookieName.split(" ")[1]
            if (cookieName == asked){
                return cookieValue
            }
        }

    }
    return false
}

function schowSettings(){
    if (showToggler === true){
        document.getElementById("einstellungen").innerHTML = "<iframe src='einstellungen.html'> </iframe>"
        showToggler = false
    }else {
        document.getElementById("einstellungen").innerHTML = ""
        showToggler = true
        loadStyle()
    }
}

function loadStyle(){
    let cookies = decodeURI(document.cookie).split(";")
    let backroundColor = findInCookies(cookies, "bodyColor")
    let HColor = findInCookies(cookies, "HCollor")
    let buttonColor = findInCookies(cookies, "buttonCollor")
    let btnRadius = findInCookies(cookies, "btnRadius")
    let Hfond = findInCookies(cookies, "Hfond")
    let GroeßeBackround = findInCookies(cookies, "groeßeFarbe")
    let belagFarbE = findInCookies(cookies, "belagFarbe")
    let ExbelagFarbE = findInCookies(cookies, "ExtrabelagFarbe")
    let addFarbe = findInCookies(cookies, "adressFarbe")
    let preisFarbe = findInCookies(cookies, "PreisFarbe")

    document.body.style.backgroundColor = backroundColor

    document.getElementById("PizzaServiseSzu").style.color = HColor
    document.getElementById("Belag").style.color = HColor
    document.getElementById("Extrabelag").style.color = HColor
    document.getElementById("Lieferadresse").style.color = HColor
    document.getElementById("Gesamtpreis").style.color = HColor

    document.getElementById("PizzaServiseSzu").style.fontFamily = Hfond
    document.getElementById("Belag").style.fontFamily = Hfond
    document.getElementById("Extrabelag").style.fontFamily = Hfond
    document.getElementById("Lieferadresse").style.fontFamily = Hfond
    document.getElementById("Gesamtpreis").style.fontFamily = Hfond

    document.getElementById("lastOrder").style.backgroundColor = buttonColor
    document.getElementById("delete").style.backgroundColor = buttonColor
    document.getElementById("settings").style.backgroundColor = buttonColor
    document.getElementById("submit").style.backgroundColor = buttonColor

    document.getElementById("lastOrder").style.borderRadius = btnRadius
    document.getElementById("delete").style.borderRadius = btnRadius
    document.getElementById("settings").style.borderRadius= btnRadius
    document.getElementById("submit").style.borderRadius = btnRadius

    document.getElementById("selectGroeseFarbe").style.backgroundColor = GroeßeBackround
    document.getElementById("belagFarbe").style.backgroundColor = belagFarbE
    document.getElementById("selectGroeseFarbe").style.backgroundColor = GroeßeBackround
    document.getElementById("ExtrabelagFarbe").style.backgroundColor = ExbelagFarbE
    document.getElementById("AdressFarbe").style.backgroundColor = addFarbe
    document.getElementById("pizzaPreis").style.backgroundColor = preisFarbe
}

function setBackroundcolor(){
    let date = new Date()
    date.setTime(date.getTime() + (1000*60*60*24*7))
    let expires = "; expires=" + date.toUTCString()

    let color = document.getElementById("hintergrundfarbe").value

    document.cookie = "bodyColor=" + color + expires
}

function setHeaderColor(){
    let date = new Date()
    date.setTime(date.getTime() + (1000*60*60*24*7))
    let expire = "; expires=" + date.toUTCString()

    let color = document.getElementById("ueberschriftenFarbe").value

    document.cookie = "HCollor="+ color + expire
}

function setButtonCollor(){
    let date = new Date()
    date.setTime(date.getTime() + (1000*60*60*24*7))
    let expire = "; expires=" + date.toUTCString()

    let color = document.getElementById("ButtonStyle").value

    document.cookie = "buttonCollor="+ color + expire
}

function setButtonRaius(){
    let date = new Date()
    date.setTime(date.getTime() + (1000*60*60*24*7))
    let expires = "; expires=" + date.toUTCString()

    let radius = document.getElementById("buttonRadius").value

    document.cookie = "btnRadius=" + radius + expires
}

function setHeaderFond(){
    let date = new Date()
    date.setTime(date.getTime() + (1000*60*60*24*7))
    let expires = "; expires=" + date.toUTCString()

    let Hfond = document.getElementById("ueberschriftenFond").value

    document.cookie = "Hfond=" + Hfond + expires
}

function setGroeseFarbe(){
    let date = new Date()
    date.setTime(date.setTime() + (1000*60*60*24*7))
    let expires = "; expires="+ date.toUTCString()

    let color = document.getElementById("groeseFarbe").value

    document.cookie = "groeßeFarbe="+ color + expires
}

function setBelagFarbe(){
    let date = new Date()
    date.setTime(date.setTime() + (1000*60*60*24*7))
    let expires = "; expires="+ date.toUTCString()

    let color = document.getElementById("BelagFarbe").value

    document.cookie = "belagFarbe="+ color + expires
}

function setExtraBelagFarbe(){
    let date = new Date()
    date.setTime(date.setTime() + (1000*60*60*24*7))
    let expires = "; expires="+ date.toUTCString()

    let color = document.getElementById("ExtraBelagFarbe").value

    document.cookie = "ExtrabelagFarbe="+ color + expires
}

function setAdresseFarbe(){
    let date = new Date()
    date.setTime(date.setTime() + (1000*60*60*24*7))
    let expires = "; expires="+ date.toUTCString()

    let color = document.getElementById("AdresseFarbe").value

    document.cookie = "adressFarbe="+ color + expires
}

function setPreisFarbe(){
    let date = new Date()
    date.setTime(date.setTime() + (1000*60*60*24*7))
    let expires = "; expires="+ date.toUTCString()

    let color = document.getElementById("PreisFarbe").value

    document.cookie = "PreisFarbe="+ color + expires
}
