import '../styles/app.styl';

const bindKeyEvent = () => {
  const elKeyName = document.querySelectorAll('.info_value')[0],
        elKeyCode = document.querySelectorAll('.info_value')[1];

  const toggleStatus = (ev = {code, key, keyCode}, isPressed = false) => {
    const id = ev.code;
    const rect = document.getElementById(id);
    if (isPressed) {
      rect.classList.add('on-press');
    } else {
      rect.classList.remove('on-press');
    }
    elKeyName.innerHTML = isPressed ? ev.key : '';
    elKeyCode.innerHTML = isPressed ? ev.keyCode : '';
  };

  const onkeydown = ev => {
    toggleStatus(ev, true);
  };
  const onkeyup = ev => {
    toggleStatus(ev, false);
  };
  document.body.addEventListener('keydown', onkeydown);
  document.body.addEventListener('keyup', onkeyup);
};
bindKeyEvent();
