const navMenuBtn = document.querySelector(".nav-menu-btn")
const navCloseBtn = document.querySelector(".nav-close-btn")
const navItem = document.querySelector('.nav-items');
const navBtns = document.querySelectorAll('.nav-btn')

// navMenuBtn.addEventListener("click", () => {
//     navItems.style.display = "flex";
// })

// navCloseBtn.addEventListener("click", () => {
//     navItems.style.display = "none"
// })

navBtns.forEach((navBtn) => {
    navBtn.addEventListener("click", () => {
        navItem.classList.toggle('res_nav')
    })
})

//addimg a read more
const readMores = document.querySelectorAll('.read-more');
const btns = document.querySelectorAll('.btn-project');
const isSmallScreen = 900;

// btns.forEach((btn) => { 
//     btn.addEventListener('click', () => {
//         if(btn.innerHTML === 'Read More'){
//             btn.innerHTML = 'Show less'
//             // readMore.style.display = "block";
//         }
//         else if(btn.innerHTML === 'Show less'){
//             btn.innerHTML = 'Read More'
//             readMore.style.display = "none";
//         }
//     })
// })

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        // console.log(btn.parentNode.previousSibling);
        console.log(btn.parentElement);
        console.log(btn)
        btn.textContent === 'Read More' ? (btn.textContent = 'Show less' ):  (btn.textContent = 'Read More');
        btn.parentElement.previousElementSibling.classList.toggle('active');
        console.log(btn.textContent)
    })
})

function smallScreen(){  
    if(window.innerWidth <= isSmallScreen){
        readMores.forEach((readMore) => {
            readMore.classList.remove('active')
        })

        btns.forEach((btn) => {
            btn.textContent === 'Show less'     
        })
    }else{
        btns.forEach((btn) => {
            btn.textContent = 'Read More'     
        })
    }
        
}

// window.addEventListener('resize', (event) => {
//     console.log(event);
//     console.log(event.currentTarget.innerWidth);
// });

window.addEventListener('resize',smallScreen);