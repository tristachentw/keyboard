import Keyboard from '../images/mac-keyboard.svg';
import style from '../styles/app.styl';

const bindKeyEvent = () => {
  const elKeyName = document.querySelectorAll('.info_value')[0],
        elKeyCode = document.querySelectorAll('.info_value')[1];

  const onkeydown = ev => {
    console.log(ev);
    // document.body.removeEventListener('keydown', onkeydown);
    const id = ev.code;
    const rect = document.getElementById(id);
    rect.classList.add('on-press');
    elKeyName.innerHTML = ev.key;
    elKeyCode.innerHTML = ev.keyCode;
  };
  const onkeyup = ev => {
    // document.body.addEventListener('keydown', onkeydown);
    const id = ev.code;
    const rect = document.getElementById(id);
    rect.classList.remove('on-press');
    elKeyName.innerHTML = '';
    elKeyCode.innerHTML = '';
  };
  document.body.addEventListener('keydown', onkeydown);
  document.body.addEventListener('keyup', onkeyup);
};

const xhr = new XMLHttpRequest;
xhr.open('get', Keyboard, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) {
    return;
  }
  let svg = xhr.responseXML.documentElement;
  svg = document.importNode(svg, true);
  document.body.appendChild(svg);
  bindKeyEvent();
};
xhr.send();
