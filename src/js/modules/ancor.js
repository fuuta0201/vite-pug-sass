export const anchor = () => {
  // smoothscroll.polyfill();
  document.querySelectorAll('a[href^="#"]')
    .forEach(anchor => {
      anchor.addEventListener("click", clickAnchor);
    });
  function clickAnchor (e){
    e.preventDefault();
    let id = this.getAttribute('href');
    id = id.slice(1);
    const target = document.getElementById(id);
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  console.log('ok');
}