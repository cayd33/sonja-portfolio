/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tc =>{
            tc.classList.remove('filters__active')
        })
        target.classList.add('filters__active')

        tabs.forEach(t =>{
            t.classList.remove('filter-tab-active')
        })
        tab.classList.add('filter-tab-active')
    })
})

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.profile__border`)
sr.reveal(`.profile__name`, {delay: 500})
sr.reveal(`.profile__profession`, {delay: 600})
sr.reveal(`.profile__social`, {delay: 700})
sr.reveal(`.profile__info-group`, {interval: 100, delay: 700})
sr.reveal(`.profile__buttons`, {delay: 800})
sr.reveal(`.filters__content`, {delay: 900})
sr.reveal(`.filters`, {delay: 1000})

/*============================= AGE =============================*/
const dob = new Date('11/05/2001');
//calculate month difference from current date in time
const month_diff = Date.now() - dob.getTime();

//convert the calculated difference in date format
const age_dt = new Date(month_diff);

//extract year from date
const year = age_dt.getUTCFullYear();

//now calculate the age of the user
const age = Math.abs(year - 1970);

//display the calculated age
document.getElementById('age').innerHTML = age;

/*============================= EXPERIENCE =============================*/
const exp_dob = new Date('11/05/2001');
const exp_month_diff = Date.now() - exp_dob.getTime();
const exp_dt = new Date(exp_month_diff);
const exp_year = exp_dt.getUTCFullYear();
const exp = Math.abs(year - 1991);

//display the calculated age
document.getElementById('exp').innerHTML = exp + '+';

/*============================= GIT REPOS =============================*/
const APIURL = 'https://api.github.com/users/';

getUser('sonjaalushi');

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    userRepos(respData);

    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + '/repos');
    const respData = await resp.json();

    // addReposToCard(respData);
}

function userRepos(user) {
    document.getElementById('repos').innerHTML = `${user.public_repos}+`;
}

