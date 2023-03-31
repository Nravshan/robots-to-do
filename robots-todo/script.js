const BASE_URL = "http://localhost:9120/users"
const getData = () => {
    fetch(BASE_URL)
        .then(msg => msg.json())
        .then(data => reload(data))
}
getData()

const form = document.querySelector("form")
const items = document.querySelectorAll(".items")


form.onsubmit = (event) => {
    event.preventDefault()

    let user = {
        image: "https://i.mycdn.me/i?r=AzGzPdfds0hBZVRwtGnPWxIb2zQQRSIb9h6cOX5-5eSL-e7WXg7vj3KBwuQgdnkaHBY"
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    })

   fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" } 
   })
    .then(res => res.json())
    .then(() => getData())
}

function reload (arr) {
    items.forEach(el => el.innerHTML = "")
    for(let item of arr) {
        let box = document.createElement("div"),
            top = document.createElement("div"),
            bottom = document.createElement("div"),
            fullName = document.createElement("h1"),
            img = document.createElement("img"),
            age = document.createElement("span"),
            ageNum = document.createElement("span");
            right = document.createElement('div'),
            cancelBtn = document.createElement('button'),
            cancelImg = document.createElement('img')

        fullName.innerHTML = `${item.firstName} ${item.lastName}`
        img.src = item.image
        age.innerHTML = "Age"
        ageNum.innerHTML = item.age

        box.classList.add("item")
        top.classList.add("top")
        bottom.classList.add("bottom")
        fullName.classList.add("top__full-name")
        age.classList.add("bottom__age")
        ageNum.classList.add("bottom__ageNum")
        cancelImg.classList.add('cancelImg')
        cancelBtn.classList.add('cancelBtn')


        box.style.background = generateRandomColor()

        box.append(top, bottom)
        top.append(fullName, img, )
        bottom.append(age, ageNum, cancelBtn)
        cancelBtn.append(cancelImg)
        

            // cancelBtn.onclick = () => {
            //     getData = getData.filter(el => el.age !== item.age)
            //     reload(getData)

        if(item.age < 30) {
            items[0].append(box)
        } else if(+ageNum.innerHTML >= 30 && +ageNum.innerHTML < 40){
            items[1].append(box)
        } else {
            items[2].append(box)
        }
    }
}


// rgb
function generateRandomColor() {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)

    return `rgb(${r}, ${g}, ${b})`
}


