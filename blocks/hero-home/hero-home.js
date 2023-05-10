export default function decorate(block) {
  const videoLink = block.querySelector("a");
  const videoRef = videoLink.href;
  videoLink.outerHTML = `<video class="home-video-banner" autoplay="" loop="" muted=""><source src="${videoRef}" type="video/mp4"></video>`;
  const mobile = block.children[0].children[1].innerHTML;
  const desktop = block.children[1].children[1].innerHTML;
  block.children[0].innerHTML = mobile;
  block.children[0].className = 'hero-mobile';
  block.children[1].innerHTML = desktop;
  block.children[1].className = 'hero-desktop';
}
