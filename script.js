function menuClick() {
    var menu = document.getElementById('mobileMenu');
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
    }
  }

  function searchClick() {
    var menu = document.getElementById('search-box-mb');
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
    }
  }